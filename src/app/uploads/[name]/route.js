import { CONTENT_TYPES, readUpload } from '@/lib/uploads';

// Serves product images uploaded from the admin page.
export async function GET(_req, { params }) {
  const { name } = await params;
  const file = await readUpload(name);
  if (!file) return new Response('Not found', { status: 404 });
  return new Response(file, {
    headers: {
      'Content-Type': CONTENT_TYPES[name.split('.').pop()],
      // File names are random and never reused, so they can be cached forever.
      'Cache-Control': 'public, max-age=31536000, immutable',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
