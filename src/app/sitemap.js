import { RANGES } from '@/data/ranges';
import { SERVICES } from '@/data/services';
import { SITE } from '@/data/site';
import { listProducts } from '@/lib/store';

export const revalidate = 3600;

const PAGES = ['', '/about', '/services', '/products', '/process', '/why-choose-us', '/testimonial', '/faq', '/blog', '/contact-us', '/privacy-policy', '/terms-conditions', '/refund-policy'];

export default async function sitemap() {
  const products = await listProducts();
  return [
    ...PAGES.map((p) => ({ url: `${SITE.url}${p}`, changeFrequency: 'weekly', priority: p === '' ? 1 : 0.7 })),
    ...SERVICES.map((s) => ({ url: `${SITE.url}/services/${s.slug}`, changeFrequency: 'monthly', priority: 0.8 })),
    ...RANGES.map((r) => ({ url: `${SITE.url}/products/${r.slug}`, changeFrequency: 'monthly', priority: 0.8 })),
    ...products.map((p) => ({ url: `${SITE.url}/products/${p.slug}`, lastModified: p.updatedAt, priority: 0.6 })),
  ];
}
