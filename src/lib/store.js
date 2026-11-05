// Local JSON storage for admin-managed products and customer enquiries.
//
// Everything lives in <DATA_DIR>/db.json (default: ./data). To move to a real
// database later, re-implement the exported functions in this file with the
// same signatures — nothing else in the app touches the file directly.
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

export const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const EMPTY = { products: [], enquiries: [] };

// Serialise writes so two requests can't overwrite each other's changes.
let queue = Promise.resolve();
function exclusive(fn) {
  const run = queue.then(fn);
  queue = run.catch(() => {});
  return run;
}

async function load() {
  try {
    const db = JSON.parse(await readFile(DB_FILE, 'utf8'));
    return { products: db.products ?? [], enquiries: db.enquiries ?? [] };
  } catch (err) {
    if (err.code === 'ENOENT') return structuredClone(EMPTY);
    throw err;
  }
}

async function save(db) {
  await mkdir(DATA_DIR, { recursive: true });
  const tmp = `${DB_FILE}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(db, null, 2));
  await rename(tmp, DB_FILE); // atomic replace, so a crash never leaves half a file
}

const mutate = (fn) =>
  exclusive(async () => {
    const db = await load();
    const result = await fn(db);
    await save(db);
    return result;
  });

const now = () => new Date().toISOString();
const byNewest = (a, b) => b.createdAt.localeCompare(a.createdAt);

/* ----------------------------- Products ----------------------------- */

export async function listProducts({ includeDrafts = false, category } = {}) {
  const { products } = await load();
  return products
    .filter((p) => (includeDrafts || p.published) && (!category || p.category === category))
    .sort((a, b) => Number(b.featured) - Number(a.featured) || byNewest(a, b));
}

export async function getProduct(id) {
  const { products } = await load();
  return products.find((p) => p.id === id) ?? null;
}

export async function getProductBySlug(slug) {
  const { products } = await load();
  return products.find((p) => p.slug === slug && p.published) ?? null;
}

export async function slugTaken(slug, exceptId) {
  const { products } = await load();
  return products.some((p) => p.slug === slug && p.id !== exceptId);
}

export const createProduct = (data) =>
  mutate((db) => {
    const product = { id: randomUUID(), ...data, createdAt: now(), updatedAt: now() };
    db.products.push(product);
    return product;
  });

export const updateProduct = (id, patch) =>
  mutate((db) => {
    const p = db.products.find((x) => x.id === id);
    if (!p) return null;
    Object.assign(p, patch, { updatedAt: now() });
    return p;
  });

export const deleteProduct = (id) =>
  mutate((db) => {
    const p = db.products.find((x) => x.id === id);
    db.products = db.products.filter((x) => x.id !== id);
    return p ?? null;
  });

/* ----------------------------- Enquiries ---------------------------- */

export const ENQUIRY_STATUSES = ['new', 'contacted', 'quoted', 'won', 'closed'];

export async function listEnquiries({ status, type, q } = {}) {
  const { enquiries } = await load();
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
  const { enquiries } = await load();
  return enquiries.find((e) => e.id === id) ?? null;
}

export const addEnquiry = (data) =>
  mutate((db) => {
    const enquiry = { id: randomUUID(), status: 'new', notes: '', ...data, createdAt: now(), updatedAt: now() };
    db.enquiries.push(enquiry);
    return enquiry;
  });

export const updateEnquiry = (id, patch) =>
  mutate((db) => {
    const e = db.enquiries.find((x) => x.id === id);
    if (!e) return null;
    Object.assign(e, patch, { updatedAt: now() });
    return e;
  });

export const deleteEnquiry = (id) =>
  mutate((db) => {
    db.enquiries = db.enquiries.filter((x) => x.id !== id);
  });

export async function getStats() {
  const { products, enquiries } = await load();
  const weekAgo = Date.now() - 7 * 864e5;
  return {
    products: products.length,
    published: products.filter((p) => p.published).length,
    enquiries: enquiries.length,
    newEnquiries: enquiries.filter((e) => e.status === 'new').length,
    thisWeek: enquiries.filter((e) => Date.parse(e.createdAt) > weekAgo).length,
  };
}
