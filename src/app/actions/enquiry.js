'use server';

import { revalidatePath } from 'next/cache';
import { clientIp, limited } from '@/lib/rate-limit';
import { addEnquiry } from '@/lib/store';

const TYPES = ['quote', 'service', 'product', 'callback', 'question'];
const PHONE = /^\+?[\d\s()-]{7,18}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const text = (fd, key, max) => String(fd.get(key) ?? '').trim().slice(0, max);

/**
 * Saves a customer enquiry from any public form. Returns { ok, errors?, message? }
 * for useActionState.
 */
export async function submitEnquiry(_prev, formData) {
  // Honeypot: real people never fill the hidden "website" field.
  if (text(formData, 'website', 200)) return { ok: true };

  const type = TYPES.includes(formData.get('type')) ? formData.get('type') : 'quote';
  const data = {
    type,
    name: text(formData, 'name', 80),
    phone: text(formData, 'phone', 20),
    email: text(formData, 'email', 120).toLowerCase(),
    service: text(formData, 'service', 80),
    product: text(formData, 'product', 120),
    quantity: text(formData, 'quantity', 40),
    message: text(formData, 'message', 3000),
    page: text(formData, 'page', 200),
  };

  const errors = {};
  if (data.name.length < 2) errors.name = 'Please enter your name.';
  if (data.phone && !PHONE.test(data.phone)) errors.phone = 'Please enter a valid phone number.';
  if (data.email && !EMAIL.test(data.email)) errors.email = 'Please enter a valid email address.';
  if (!data.phone && !data.email) {
    if (type === 'question') errors.email = 'Please add an email so we can reply.';
    else errors.phone = 'Please add a phone number so we can reach you.';
  }
  if (type === 'question' && data.message.length < 5) errors.message = 'Please type your question.';
  // `attempt` changes on every failed submit so the form re-mounts with the typed values.
  if (Object.keys(errors).length) return { ok: false, errors, values: data, attempt: Date.now() };

  // Only saved enquiries count towards the limit, so fixing a typo never locks a customer out.
  const ip = await clientIp();
  if (limited(`enquiry:${ip}`, 8, 10 * 60 * 1000)) {
    return { ok: false, values: data, attempt: Date.now(), message: 'Too many requests from this device. Please try again in a few minutes or WhatsApp us.' };
  }

  await addEnquiry(data);
  revalidatePath('/admin', 'layout');
  return { ok: true };
}
