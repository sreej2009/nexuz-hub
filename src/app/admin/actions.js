'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { RANGES, PRODUCT_CATEGORIES } from '@/data/ranges';
import { checkPassword, endSession, requireAdmin, startSession } from '@/lib/auth';
import { clientIp, limited } from '@/lib/rate-limit';
import {
  ENQUIRY_STATUSES,
  createProduct,
  deleteEnquiry,
  deleteProduct,
  getProduct,
  slugTaken,
  updateEnquiry,
  updateProduct,
} from '@/lib/store';
import { removeUpload, saveUpload } from '@/lib/uploads';

const MAX_IMAGES = 6;
const RESERVED = new Set(RANGES.map((r) => r.slug));

const str = (fd, k, max = 200) => String(fd.get(k) ?? '').trim().slice(0, max);
const lines = (v) =>
  String(v ?? '')
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
const slugify = (s) =>
  s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

// Product pages, listings and the home page all show products.
const refreshSite = () => revalidatePath('/', 'layout');

/* ------------------------------ Session ------------------------------ */

export async function login(_prev, formData) {
  const ip = await clientIp();
  if (limited(`login:${ip}`, 8, 15 * 60 * 1000)) return { error: 'Too many attempts. Wait 15 minutes and try again.' };
  if (!checkPassword(String(formData.get('password') ?? ''))) return { error: 'Wrong password.' };
  await startSession();
  redirect('/admin');
}

export async function logout() {
  await endSession();
  redirect('/admin/login');
}

/* ------------------------------ Products ----------------------------- */

export async function saveProduct(_prev, formData) {
  await requireAdmin();
  const id = str(formData, 'id', 60) || null;
  const existing = id ? await getProduct(id) : null;
  if (id && !existing) return { error: 'This product no longer exists.' };

  const name = str(formData, 'name', 120);
  const slug = slugify(str(formData, 'slug', 80) || name);
  const category = str(formData, 'category', 40);
  const values = {
    name,
    slug,
    category: PRODUCT_CATEGORIES.some((c) => c.value === category) ? category : 'other',
    price: str(formData, 'price', 40),
    shortDescription: str(formData, 'shortDescription', 220),
    description: str(formData, 'description', 5000),
    features: lines(formData.get('features')).slice(0, 12).map((l) => l.slice(0, 160)),
    specs: lines(formData.get('specs'))
      .slice(0, 12)
      .map((l) => {
        const i = l.indexOf(':');
        return i > 0 ? { key: l.slice(0, i).trim().slice(0, 40), value: l.slice(i + 1).trim().slice(0, 120) } : null;
      })
      .filter(Boolean),
    published: formData.get('published') === 'on',
    featured: formData.get('featured') === 'on',
  };

  const errors = {};
  if (name.length < 2) errors.name = 'Enter a product name.';
  if (!slug) errors.slug = 'Enter a web address (letters and numbers).';
  else if (RESERVED.has(slug)) errors.slug = 'This address is used by a product range. Choose another.';
  else if (await slugTaken(slug, id)) errors.slug = 'Another product already uses this address.';

  // Keep the photos the admin didn't remove, in the order shown, then add new uploads.
  const keep = formData.getAll('keepImages').map(String).filter((u) => existing?.images?.includes(u));
  const files = formData.getAll('images').filter((f) => typeof f === 'object' && f.size > 0);
  if (keep.length + files.length > MAX_IMAGES) errors.images = `Up to ${MAX_IMAGES} photos per product.`;
  if (Object.keys(errors).length) return { errors };

  const added = [];
  try {
    for (const f of files) added.push(await saveUpload(f));
  } catch (err) {
    await Promise.all(added.map(removeUpload));
    return { errors: { images: err.message } };
  }
  const images = [...keep, ...added];

  if (existing) {
    await updateProduct(id, { ...values, images });
    await Promise.all((existing.images ?? []).filter((u) => !images.includes(u)).map(removeUpload));
  } else {
    await createProduct({ ...values, images });
  }
  refreshSite();
  redirect(`/admin/products?saved=${encodeURIComponent(name)}`);
}

export async function deleteProductAction(formData) {
  await requireAdmin();
  const removed = await deleteProduct(str(formData, 'id', 60));
  if (removed) await Promise.all((removed.images ?? []).map(removeUpload));
  refreshSite();
  redirect('/admin/products?deleted=1');
}

export async function toggleProductFlag(formData) {
  await requireAdmin();
  const id = str(formData, 'id', 60);
  const field = formData.get('field') === 'featured' ? 'featured' : 'published';
  const product = await getProduct(id);
  if (product) await updateProduct(id, { [field]: !product[field] });
  refreshSite();
}

/* ------------------------------ Enquiries ---------------------------- */

export async function setEnquiryStatus(formData) {
  await requireAdmin();
  const status = String(formData.get('status'));
  if (!ENQUIRY_STATUSES.includes(status)) return;
  await updateEnquiry(str(formData, 'id', 60), { status });
  revalidatePath('/admin', 'layout');
}

export async function saveEnquiryNotes(formData) {
  await requireAdmin();
  await updateEnquiry(str(formData, 'id', 60), { notes: str(formData, 'notes', 4000) });
  revalidatePath('/admin', 'layout');
}

export async function deleteEnquiryAction(formData) {
  await requireAdmin();
  await deleteEnquiry(str(formData, 'id', 60));
  revalidatePath('/admin', 'layout');
  redirect('/admin/enquiries?deleted=1');
}
