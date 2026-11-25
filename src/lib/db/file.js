// Local-file storage back-end: <DATA_DIR>/db.json plus <DATA_DIR>/uploads.
// Used when no database is configured (local development, first deploys).
// Note: on Hostinger this folder is replaced on every deploy, so use MySQL there.
import { mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');
const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');

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
    if (err.code === 'ENOENT') return { products: [], enquiries: [] };
    throw err;
  }
}

async function save(db) {
  await mkdir(DATA_DIR, { recursive: true });
  const tmp = `${DB_FILE}.${process.pid}.tmp`;
  await writeFile(tmp, JSON.stringify(db, null, 2));
  await rename(tmp, DB_FILE); // atomic replace, so a crash never leaves half a file
}

function table(key) {
  return {
    all: async () => (await load())[key],
    insert: (doc) =>
      exclusive(async () => {
        const db = await load();
        db[key].push(doc);
        await save(db);
      }),
    save: (doc) =>
      exclusive(async () => {
        const db = await load();
        db[key] = db[key].map((x) => (x.id === doc.id ? doc : x));
        await save(db);
      }),
    remove: (id) =>
      exclusive(async () => {
        const db = await load();
        db[key] = db[key].filter((x) => x.id !== id);
        await save(db);
      }),
  };
}

export const fileBackend = {
  mode: 'file',
  products: table('products'),
  enquiries: table('enquiries'),
  files: {
    put: async (name, _type, buf) => {
      await mkdir(UPLOAD_DIR, { recursive: true });
      await writeFile(path.join(UPLOAD_DIR, name), buf);
    },
    get: async (name) => readFile(path.join(UPLOAD_DIR, name)).catch(() => null),
    remove: async (name) => unlink(path.join(UPLOAD_DIR, name)).catch(() => {}),
  },
  check: async () => ({ ok: true }),
};
