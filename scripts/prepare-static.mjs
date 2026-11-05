// Prepares a throw-away checkout for the GitHub Pages static preview.
// Run only in CI (it deletes server-only parts): node scripts/prepare-static.mjs && STATIC_EXPORT=1 next build
import { cp, readFile, rm, writeFile } from 'node:fs/promises';

// Admin, uploads and the sitemap need a running server.
for (const p of ['src/app/admin', 'src/app/uploads', 'src/app/sitemap.js']) await rm(p, { recursive: true, force: true });

// Forms send the enquiry to WhatsApp instead of saving it.
await cp('scripts/static-preview/enquiry.js', 'src/app/actions/enquiry.js');

// Product pages: only the built-in ranges exist in the preview.
const productPage = 'src/app/(site)/products/[slug]/page.jsx';
const src = await readFile(productPage, 'utf8');
await writeFile(productPage, src.replace('export const generateStaticParams', 'export const dynamicParams = false;\nexport const generateStaticParams'));

console.log('Static preview prepared.');
