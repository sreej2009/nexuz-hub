// Tiny in-memory rate limiter (per server process). Good enough to stop
// form spam and password guessing on a single VPS.
import { headers } from 'next/headers';

const buckets = new Map();

export async function clientIp() {
  const h = await headers();
  return h.get('x-forwarded-for')?.split(',')[0].trim() || h.get('x-real-ip') || 'local';
}

/** Returns true when the key has made more than `limit` calls within `windowMs`. */
export function limited(key, limit, windowMs) {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) buckets.clear();
  return hits.length > limit;
}
