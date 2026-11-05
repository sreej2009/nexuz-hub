import { SITE } from '@/data/site';

export const dynamic = 'force-static';

export default function robots() {
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/admin', '/admin/'] },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
