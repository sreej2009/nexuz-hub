// Single-password admin login with a signed, httpOnly session cookie.
// Set ADMIN_PASSWORD (and optionally ADMIN_SESSION_SECRET) in .env.local.
import { createHash, createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const COOKIE = 'nx_admin';
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export const adminConfigured = () => Boolean(process.env.ADMIN_PASSWORD);

const secret = () =>
  process.env.ADMIN_SESSION_SECRET || createHash('sha256').update(`nexuz-session:${process.env.ADMIN_PASSWORD}`).digest('hex');

const sign = (value) => createHmac('sha256', secret()).update(value).digest('base64url');

function safeEqual(a, b) {
  const x = createHash('sha256').update(a).digest();
  const y = createHash('sha256').update(b).digest();
  return timingSafeEqual(x, y);
}

export function checkPassword(password) {
  return adminConfigured() && typeof password === 'string' && safeEqual(password, process.env.ADMIN_PASSWORD);
}

export async function startSession() {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  const value = `${expires}.${sign(String(expires))}`;
  (await cookies()).set(COOKIE, value, {
    httpOnly: true,
    sameSite: 'lax',
    // Only mark Secure when the site is served over HTTPS, otherwise the browser drops the cookie.
    secure: process.env.COOKIE_SECURE === 'true',
    path: '/',
    maxAge: MAX_AGE,
  });
}

export async function endSession() {
  (await cookies()).delete(COOKIE);
}

export async function isAdmin() {
  if (!adminConfigured()) return false;
  const value = (await cookies()).get(COOKIE)?.value;
  if (!value) return false;
  const [expires, sig] = value.split('.');
  if (!expires || !sig || Number(expires) * 1000 < Date.now()) return false;
  return safeEqual(sig, sign(expires));
}

/** Use at the top of every admin page and server action. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect('/admin/login');
}
