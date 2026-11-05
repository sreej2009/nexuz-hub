'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icon, { WhatsAppIcon } from '@/components/ui/Icon';
import { SERVICES } from '@/data/services';
import { SITE, whatsappLink } from '@/data/site';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Products', href: '/products' },
  { label: 'Process', href: '/process' },
  { label: 'About', href: '/about' },
  { label: 'Reviews', href: '/testimonial' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact-us' },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close on navigation and lock page scroll while open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.documentElement.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex size-11 items-center justify-center rounded-full bg-ink text-paper lg:hidden"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <Icon name="menu" size={20} />
      </button>

      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-ink text-paper transition-[opacity,visibility] duration-300 lg:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="grid-paper-dark absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative flex h-[4.5rem] items-center justify-between px-5">
          <span className="label text-paper/50">Menu</span>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex size-11 items-center justify-center rounded-full border border-paper/20"
            aria-label="Close menu"
          >
            <Icon name="close" size={20} />
          </button>
        </div>

        <nav className="relative flex-1 overflow-y-auto px-5 pb-8">
          <ul>
            {LINKS.map((l, i) => (
              <li
                key={l.href}
                className={`border-b border-paper/10 transition-all duration-500 ease-[var(--ease-out-expo)] ${open ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
                style={{ transitionDelay: open ? `${80 + i * 40}ms` : '0ms' }}
              >
                <Link href={l.href} className="flex items-baseline justify-between py-3.5">
                  <span className={`display text-[2.6rem] ${pathname === l.href ? 'text-gold' : ''}`}>{l.label}</span>
                  <span className="label text-paper/35">{String(i + 1).padStart(2, '0')}</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="label mt-8 mb-3 text-paper/40">Services</p>
          <div className="flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="rounded-full border border-paper/15 px-3.5 py-2 text-sm text-paper/80">
                {s.short}
              </Link>
            ))}
          </div>
        </nav>

        <div className="relative grid grid-cols-2 gap-3 border-t border-paper/10 p-5">
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
            <WhatsAppIcon size={17} /> WhatsApp
          </a>
          <a href={SITE.phoneHref} className="btn btn-line-light">
            <Icon name="phone" size={16} /> Call
          </a>
        </div>
      </div>
    </>
  );
}
