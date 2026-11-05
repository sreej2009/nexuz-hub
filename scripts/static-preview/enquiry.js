// Static-preview replacement for src/app/actions/enquiry.js (GitHub Pages has no server).
// Validates the form like the real action, then hands the details to WhatsApp.
import { SITE } from '@/data/site';

const PHONE = /^\+?[\d\s()-]{7,18}$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const text = (fd, key, max) => String(fd.get(key) ?? '').trim().slice(0, max);

export async function submitEnquiry(_prev, formData) {
  if (text(formData, 'website', 200)) return { ok: true };
  const type = text(formData, 'type', 20) || 'quote';
  const data = {
    name: text(formData, 'name', 80),
    phone: text(formData, 'phone', 20),
    email: text(formData, 'email', 120),
    service: text(formData, 'service', 80),
    product: text(formData, 'product', 120),
    quantity: text(formData, 'quantity', 40),
    message: text(formData, 'message', 3000),
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
  if (Object.keys(errors).length) return { ok: false, errors, values: data, attempt: Date.now() };

  const lines = [
    `Hi Nexuz Hub! New enquiry from the website:`,
    `Name: ${data.name}`,
    data.phone && `Phone: ${data.phone}`,
    data.email && `Email: ${data.email}`,
    data.service && `Service: ${data.service}`,
    data.product && `Product: ${data.product}`,
    data.quantity && `Quantity: ${data.quantity}`,
    data.message && `Message: ${data.message}`,
  ].filter(Boolean);
  return { ok: true, whatsapp: `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}` };
}
