# Nexuz Hub website

Redesigned website for Nexuz Hub (Saravanampatti, Coimbatore) with an admin page for products and customer enquiries.

Built with Next.js 16, React 19 and Tailwind CSS 4. No animation libraries: motion is CSS-only, so pages stay fast on phones.

## Run it

```bash
npm install
npm run build
npm start          # http://localhost:3000
```

For editing with live reload: `npm run dev`.

## Admin page

- Address: `/admin` (sign in at `/admin/login`).
- Password: `ADMIN_PASSWORD` in `.env.local`. To change it, edit the file and restart the server.
- **Enquiries**: every form on the site lands here: contact/quote form, service pages, product pages, the "Request a callback" strip, and FAQ questions. You can filter by status or source, search, set a status (new → contacted → quoted → won / closed), add internal notes, call or WhatsApp the customer in one tap, and export everything to CSV for Excel or Google Sheets.
- **Products**: add products with up to 6 photos, price, highlights and specifications. Each product gets its own page at `/products/<web-address>` and appears in the Products catalogue, on its range page, and (if marked Featured) on the home page. "Draft" hides a product without deleting it.

## Where data is stored (for now)

Everything is saved locally in `data/` (created automatically on the first save):

- `data/db.json`: products and enquiries
- `data/uploads/`: product photos

Back this folder up. It is not in git. To store it somewhere else, set `DATA_DIR=/path/to/folder`.

**Moving to a real database later:** all reads and writes go through `src/lib/store.js`. Re-implement the functions in that one file (same names and return shapes) for MySQL, PostgreSQL, MongoDB, Supabase or similar, and the rest of the site keeps working unchanged. Photos are handled in `src/lib/uploads.js` and can move to cloud storage the same way.

## Settings (`.env.local`)

| Name | What it does |
|---|---|
| `ADMIN_PASSWORD` | Admin login password (admin login is off if empty) |
| `ADMIN_SESSION_SECRET` | Random string used to sign the login cookie |
| `COOKIE_SECURE` | Set `true` once the site is served over **https** |
| `NEXT_PUBLIC_SITE_URL` | Public address, e.g. `https://your-domain.com` (used for SEO links and the sitemap) |
| `DATA_DIR` | Optional folder for `db.json` and uploads |

See `.env.example`.

## Deploying on the VPS

The site needs a Node server, not static hosting, because the admin page saves data. On the server:

```bash
npm ci && npm run build
PORT=3000 npm start      # keep it running with pm2 or systemd
```

Point nginx at port 3000. Run a single instance, because the local JSON storage expects one server process.

## Where things are

| Path | What |
|---|---|
| `src/data/` | Site content: services, product ranges, reviews, FAQ, process steps, legal text, contact details |
| `src/app/(site)/` | Public pages |
| `src/app/admin/` | Admin pages and actions |
| `src/components/site/` | Header, footer, shared page sections |
| `src/app/globals.css` | Colours, fonts and design styles |
| `src/fonts/` | Brand fonts shared with thulirmedia.com (Warownia Black Extended for headings, Warownia Narrow for body, Warownia for labels), self-hosted |

Old template pages with no real Nexuz content (`/team`, `/career`, `/features`, `/integration`) redirect to the closest real page (see `next.config.mjs`). The faithful copy of the original site is kept in `../site-clone-backup/`.

## GitHub Pages preview

Every push to `main` publishes a static preview with GitHub Actions (`.github/workflows/pages.yml`).

Because GitHub Pages has no server, the preview differs from the full site:

- No admin page, and products added in admin don't appear.
- Forms check the details, then open WhatsApp with the enquiry already written (nothing is stored).
- Photos are pre-resized to WebP during the build (`scripts/optimize-images.mjs`).

The full site (admin, enquiry storage, product uploads) needs a Node server. See "Deploying on the VPS" above.
