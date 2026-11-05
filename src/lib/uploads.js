// Product image uploads, stored next to the JSON data in <DATA_DIR>/uploads
// and served by the /uploads/[name] route.
import { randomUUID } from 'node:crypto';
import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { DATA_DIR } from './store';

export const UPLOAD_DIR = path.join(DATA_DIR, 'uploads');
export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const TYPES = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/avif': 'avif',
};
export const CONTENT_TYPES = Object.fromEntries(Object.entries(TYPES).map(([type, ext]) => [ext, type]));

// Check the file's first bytes too, so a renamed non-image is rejected.
function sniff(buf) {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png';
  if (buf.subarray(0, 4).toString() === 'RIFF' && buf.subarray(8, 12).toString() === 'WEBP') return 'image/webp';
  if (buf.subarray(4, 12).toString() === 'ftypavif') return 'image/avif';
  return null;
}

/** Saves an uploaded File and returns its public URL. Throws with a readable message on bad input. */
export async function saveUpload(file) {
  if (!file || typeof file.arrayBuffer !== 'function' || file.size === 0) return null;
  if (file.size > MAX_UPLOAD_BYTES) throw new Error(`"${file.name}" is larger than 5 MB.`);
  const buf = Buffer.from(await file.arrayBuffer());
  const type = sniff(buf);
  if (!type) throw new Error(`"${file.name}" is not a JPG, PNG, WebP or AVIF image.`);
  const name = `${randomUUID()}.${TYPES[type]}`;
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, name), buf);
  return `/uploads/${name}`;
}

export const isUploadName = (name) => /^[0-9a-f-]{36}\.(jpg|png|webp|avif)$/.test(name);

export async function readUpload(name) {
  if (!isUploadName(name)) return null;
  try {
    return await readFile(path.join(UPLOAD_DIR, name));
  } catch {
    return null;
  }
}

export async function removeUpload(url) {
  const name = url?.startsWith('/uploads/') ? url.slice('/uploads/'.length) : null;
  if (!name || !isUploadName(name)) return;
  await unlink(path.join(UPLOAD_DIR, name)).catch(() => {});
}
