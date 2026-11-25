// MySQL / MariaDB storage back-end (used when DB_HOST, DB_NAME and DB_USER are set).
// Each record is stored as a JSON document plus a few indexed columns, and product
// photos are stored as BLOBs so nothing lives in the (deploy-wiped) app folder.
import mysql from 'mysql2/promise';

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS nx_products (
     id VARCHAR(36) NOT NULL PRIMARY KEY,
     slug VARCHAR(100) NOT NULL,
     created_at VARCHAR(32) NOT NULL,
     doc LONGTEXT NOT NULL,
     UNIQUE KEY uq_slug (slug)
   ) DEFAULT CHARSET=utf8mb4`,
  `CREATE TABLE IF NOT EXISTS nx_enquiries (
     id VARCHAR(36) NOT NULL PRIMARY KEY,
     created_at VARCHAR(32) NOT NULL,
     doc LONGTEXT NOT NULL,
     KEY idx_created (created_at)
   ) DEFAULT CHARSET=utf8mb4`,
  `CREATE TABLE IF NOT EXISTS nx_uploads (
     name VARCHAR(64) NOT NULL PRIMARY KEY,
     content_type VARCHAR(40) NOT NULL,
     created_at VARCHAR(32) NOT NULL,
     data LONGBLOB NOT NULL
   ) DEFAULT CHARSET=utf8mb4`,
];

// One pool per server process (kept on globalThis so dev hot-reloads don't open more).
function pool() {
  if (!globalThis.__nxPool) {
    globalThis.__nxPool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      socketPath: process.env.DB_SOCKET || undefined,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      charset: 'utf8mb4',
      // Shared hosting limits processes/connections: keep the pool small.
      connectionLimit: Number(process.env.DB_POOL_SIZE || 4),
      waitForConnections: true,
      connectTimeout: 5000,
      enableKeepAlive: true,
    });
  }
  return globalThis.__nxPool;
}

// Create the tables the first time the app talks to the database.
async function db() {
  if (!globalThis.__nxSchemaReady) {
    globalThis.__nxSchemaReady = (async () => {
      for (const sql of SCHEMA) await pool().query(sql);
    })().catch((err) => {
      globalThis.__nxSchemaReady = null; // retry on the next request
      throw err;
    });
  }
  await globalThis.__nxSchemaReady;
  return pool();
}

const parse = (rows) => rows.map((r) => JSON.parse(r.doc));

export const mysqlBackend = {
  mode: 'mysql',
  products: {
    all: async () => parse((await (await db()).query('SELECT doc FROM nx_products'))[0]),
    insert: async (p) => {
      await (await db()).execute('INSERT INTO nx_products (id, slug, created_at, doc) VALUES (?, ?, ?, ?)', [
        p.id,
        p.slug,
        p.createdAt,
        JSON.stringify(p),
      ]);
    },
    save: async (p) => {
      await (await db()).execute('UPDATE nx_products SET slug = ?, doc = ? WHERE id = ?', [p.slug, JSON.stringify(p), p.id]);
    },
    remove: async (id) => {
      await (await db()).execute('DELETE FROM nx_products WHERE id = ?', [id]);
    },
  },
  enquiries: {
    all: async () => parse((await (await db()).query('SELECT doc FROM nx_enquiries'))[0]),
    insert: async (e) => {
      await (await db()).execute('INSERT INTO nx_enquiries (id, created_at, doc) VALUES (?, ?, ?)', [e.id, e.createdAt, JSON.stringify(e)]);
    },
    save: async (e) => {
      await (await db()).execute('UPDATE nx_enquiries SET doc = ? WHERE id = ?', [JSON.stringify(e), e.id]);
    },
    remove: async (id) => {
      await (await db()).execute('DELETE FROM nx_enquiries WHERE id = ?', [id]);
    },
  },
  files: {
    put: async (name, type, buf) => {
      await (await db()).execute('INSERT INTO nx_uploads (name, content_type, created_at, data) VALUES (?, ?, ?, ?)', [
        name,
        type,
        new Date().toISOString(),
        buf,
      ]);
    },
    get: async (name) => {
      const [rows] = await (await db()).execute('SELECT data FROM nx_uploads WHERE name = ?', [name]);
      return rows[0]?.data ?? null;
    },
    remove: async (name) => {
      await (await db()).execute('DELETE FROM nx_uploads WHERE name = ?', [name]);
    },
  },
  check: async () => {
    try {
      await (await db()).query('SELECT 1');
      return { ok: true };
    } catch (err) {
      return { ok: false, error: err.code || err.message };
    }
  },
};
