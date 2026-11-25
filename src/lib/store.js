// Storage for admin-managed products, customer enquiries and product photos.
//
// Uses MySQL when DB_HOST, DB_NAME and DB_USER are set (production on Hostinger),
// otherwise a local JSON file in ./data (development). Both back-ends live in
// src/lib/db/ and expose the same small interface; nothing else in the app
// talks to storage directly.
import { randomUUID } from 'node:crypto';
import { fileBackend } from './db/file';
import { mysqlBackend } from './db/mysql';

const useMysql = Boolean(process.env.DB_HOST && process.env.DB_NAME && process.env.DB_USER);
export const backend = useMysql ? mysqlBackend : fileBackend;

const now = () => new Date().toISOString();

// Reads never crash a page: if the database is unreachable (e.g. during a build or a
// brief outage) we log it and show no products/enquiries. The admin dashboard shows
// a red warning from storageInfo() in that case.
async function all(table) {
  try {
    return await backend[table].all();
  } catch (err) {
    console.error(`[store] could not read ${table}:`, err.code || err.message);
    return [];
  }
}
const byNewest = (a, b) => b.createdAt.localeCompare(a.createdAt);

/** Which storage is in use and whether it is reachable (shown on the admin dashboard). */
export async function storageInfo() {
  return { mode: backend.mode, ...(await backend.check()) };
}

/* ----------------------------- Products ----------------------------- */

export async function listProducts({ includeDrafts = false, category } = {}) {
  const products = await all('products');
  return products
    .filter((p) => (includeDrafts || p.published) && (!category || p.category === category))
    .sort((a, b) => Number(b.featured) - Number(a.featured) || byNewest(a, b));
}

export async function getProduct(id) {
  return (await all('products')).find((p) => p.id === id) ?? null;
}

export async function getProductBySlug(slug) {
  return (await all('products')).find((p) => p.slug === slug && p.published) ?? null;
}

export async function slugTaken(slug, exceptId) {
  return (await all('products')).some((p) => p.slug === slug && p.id !== exceptId);
}

export async function createProduct(data) {
  const product = { id: randomUUID(), ...data, createdAt: now(), updatedAt: now() };
  await backend.products.insert(product);
  return product;
}

export async function updateProduct(id, patch) {
  const p = await getProduct(id);
  if (!p) return null;
  const next = { ...p, ...patch, id, updatedAt: now() };
  await backend.products.save(next);
  return next;
}

export async function deleteProduct(id) {
  const p = await getProduct(id);
  if (p) await backend.products.remove(id);
  return p;
}

/* ----------------------------- Enquiries ---------------------------- */

export const ENQUIRY_STATUSES = ['new', 'contacted', 'quoted', 'won', 'closed'];

export async function listEnquiries({ status, type, q } = {}) {
  const enquiries = await all('enquiries');
  const needle = q?.trim().toLowerCase();
  return enquiries
    .filter((e) => !status || e.status === status)
    .filter((e) => !type || e.type === type)
    .filter(
      (e) =>
        !needle ||
        [e.name, e.phone, e.email, e.message, e.service, e.product].some((v) => v?.toLowerCase().includes(needle)),
    )
    .sort(byNewest);
}

export async function getEnquiry(id) {
  return (await all('enquiries')).find((e) => e.id === id) ?? null;
}

export async function addEnquiry(data) {
  const enquiry = { id: randomUUID(), status: 'new', notes: '', ...data, createdAt: now(), updatedAt: now() };
  await backend.enquiries.insert(enquiry);
  return enquiry;
}

export async function updateEnquiry(id, patch) {
  const e = await getEnquiry(id);
  if (!e) return null;
  const next = { ...e, ...patch, id, updatedAt: now() };
  await backend.enquiries.save(next);
  return next;
}

export async function deleteEnquiry(id) {
  await backend.enquiries.remove(id);
}

export async function getStats() {
  const [products, enquiries] = await Promise.all([all('products'), all('enquiries')]);
  const weekAgo = Date.now() - 7 * 864e5;
  return {
    products: products.length,
    published: products.filter((p) => p.published).length,
    enquiries: enquiries.length,
    newEnquiries: enquiries.filter((e) => e.status === 'new').length,
    thisWeek: enquiries.filter((e) => Date.parse(e.createdAt) > weekAgo).length,
  };
}
