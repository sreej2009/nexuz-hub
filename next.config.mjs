// STATIC_EXPORT=1 builds a static preview for GitHub Pages (see scripts/prepare-static.mjs).
// The normal build (npm run build) is the full site with admin and enquiry storage.
const STATIC = process.env.STATIC_EXPORT === '1';
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const fullSite = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/webp'],
    // Product photos never change at the same URL, so let browsers/CDNs keep them for a month.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  experimental: {
    serverActions: {
      // Admin product form uploads up to 6 photos × 5 MB.
      bodySizeLimit: '32mb',
    },
  },
  // Pages from the old template with no real Nexuz content point to the closest real page.
  async redirects() {
    return [
      { source: '/team/:path*', destination: '/about', permanent: true },
      { source: '/career/:path*', destination: '/contact-us', permanent: true },
      { source: '/features', destination: '/services', permanent: true },
      { source: '/integration', destination: '/services', permanent: true },
      { source: '/contact', destination: '/contact-us', permanent: true },
      { source: '/login', destination: '/admin/login', permanent: false },
    ];
  },
};

/** @type {import('next').NextConfig} */
const staticPreview = {
  reactStrictMode: true,
  output: 'export',
  basePath: BASE_PATH,
  trailingSlash: true,
  // GitHub Pages has no image server: serve the original files, prefixed with the base path.
  images: { loader: 'custom', loaderFile: './src/lib/static-image-loader.js' },
};

export default STATIC ? staticPreview : fullSite;
