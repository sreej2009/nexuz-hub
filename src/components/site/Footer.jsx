import Link from 'next/link';
import Icon, { WhatsAppIcon } from '@/components/ui/Icon';
import { RANGES } from '@/data/ranges';
import { SERVICES } from '@/data/services';
import { SITE, whatsappLink } from '@/data/site';
import Logo from './Logo';

const COMPANY = [
  { label: 'About us', href: '/about' },
  { label: 'Our process', href: '/process' },
  { label: 'Why Nexuz', href: '/why-choose-us' },
  { label: 'Reviews', href: '/testimonial' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact / Get a quote', href: '/contact-us' },
];
const LEGAL = [
  { label: 'Terms & Conditions', href: '/terms-conditions' },
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Refund Policy', href: '/refund-policy' },
];

function Col({ title, links }) {
  return (
    <div>
      <p className="label mb-5 text-gold">{title}</p>
      <ul className="space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-line text-paper/70 transition-colors hover:text-paper">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-paper">
      <div className="grid-paper-dark absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 pt-20 md:px-8 md:pt-24">
        <div className="grid gap-14 lg:grid-cols-[1.3fr_2fr]">
          <div className="max-w-sm">
            <Logo dark />
            <p className="mt-6 text-paper/60">
              Creative manufacturing facility in Coimbatore — UV printing, laser cutting & engraving, 3D printing, custom gifts and sign boards under one
              roof.
            </p>
            <div className="mt-8 space-y-3">
              <a href={SITE.phoneHref} className="flex items-center gap-3 text-paper/85 hover:text-gold">
                <Icon name="phone" size={17} /> {SITE.phone}
              </a>
              <a href={SITE.phone2Href} className="flex items-center gap-3 text-paper/85 hover:text-gold">
                <Icon name="phone" size={17} /> {SITE.phone2}
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-3 text-paper/85 hover:text-gold">
                <Icon name="mail" size={17} /> {SITE.email}
              </a>
              <p className="flex gap-3 text-paper/60">
                <Icon name="pin" size={17} className="mt-0.5 shrink-0" />
                <span>{SITE.address.join(', ')}</span>
              </p>
            </div>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-sm mt-8">
              <WhatsAppIcon size={16} /> WhatsApp us
            </a>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <Col title="Services" links={SERVICES.map((s) => ({ label: s.short, href: `/services/${s.slug}` }))} />
            <Col
              title="Products"
              links={[...RANGES.map((r) => ({ label: r.short, href: `/products/${r.slug}` })), { label: 'All products', href: '/products' }]}
            />
            <Col title="Company" links={COMPANY} />
            <Col title="Legal" links={LEGAL} />
          </div>
        </div>

        <div className="ruler mt-20 text-paper" aria-hidden="true" />
        <div className="flex flex-col gap-3 py-6 text-sm text-paper/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Nexuz Hub — {SITE.tagline}
          </p>
          <p className="label text-[0.62rem]">GSTIN {SITE.gstin}</p>
        </div>
      </div>
      <p
        className="display outline-type pointer-events-none relative -mb-[0.14em] text-center text-[21vw] leading-[0.8] font-black whitespace-nowrap select-none"
        aria-hidden="true"
      >
        Nexuz Hub
      </p>
    </footer>
  );
}
