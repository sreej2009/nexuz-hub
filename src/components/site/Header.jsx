import Image from 'next/image';
import Link from 'next/link';
import Icon, { WhatsAppIcon } from '@/components/ui/Icon';
import { RANGES } from '@/data/ranges';
import { SERVICES } from '@/data/services';
import { NAV, SITE, whatsappLink } from '@/data/site';
import Logo from './Logo';
import MobileNav from './MobileNav';

// Dropdown panels open on hover and keyboard focus with CSS only — no JS needed on desktop.
function Dropdown({ item }) {
  const isServices = item.menu === 'services';
  return (
    <li className="group/dd relative">
      <Link
        href={item.href}
        className="flex items-center gap-1 rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-ink/75 transition-colors hover:text-ink group-focus-within/dd:text-ink"
      >
        {item.label}
        <Icon name="chevron" size={14} className="transition-transform duration-300 group-hover/dd:rotate-180" />
      </Link>
      <div className="invisible absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3 opacity-0 transition-all duration-300 ease-[var(--ease-out-expo)] group-focus-within/dd:visible group-focus-within/dd:opacity-100 group-hover/dd:visible group-hover/dd:opacity-100">
        <div
          className={`overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_30px_80px_-30px_rgb(21_19_15/0.45)] ${isServices ? 'w-[720px]' : 'w-[520px]'}`}
        >
          <div className="grid grid-cols-[1fr_200px]">
            <ul className="p-3">
              {(isServices ? SERVICES : RANGES).map((s, i) => (
                <li key={s.slug}>
                  <Link
                    href={`/${isServices ? 'services' : 'products'}/${s.slug}`}
                    className="group/item flex items-baseline gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-paper-2"
                  >
                    <span className="label text-ink/40 group-hover/item:text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
                    <span>
                      <span className="block font-semibold text-ink">{isServices ? s.name : s.short}</span>
                      <span className="line-clamp-1 text-sm text-ink/55">{s.blurb}</span>
                    </span>
                  </Link>
                </li>
              ))}
              <li className="mt-1 border-t border-line px-3 pt-3 pb-1">
                <Link href={item.href} className="label inline-flex items-center gap-2 text-ink hover:text-gold-deep">
                  View all {item.label.toLowerCase()} <Icon name="arrow" size={14} />
                </Link>
              </li>
            </ul>
            <div className="relative bg-ink">
              <Image
                src={isServices ? '/images/live/why_choose_us_big_hero.png' : '/images/products/personalized-gifts.png'}
                alt=""
                fill
                sizes="200px"
                className="object-cover opacity-80"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-4 pt-12 text-paper">
                <p className="label text-gold">{isServices ? 'One facility' : 'Made to order'}</p>
                <p className="mt-1 text-sm leading-snug text-paper/80">
                  {isServices ? 'All six services under one roof in Saravanampatti.' : 'Single pieces or bulk — dispatched in 24–48 hours.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Header() {
  return (
    <>
      {/* Utility strip */}
      <div className="bg-ink text-paper/70">
        <div className="mx-auto flex h-9 max-w-[1440px] items-center justify-between gap-4 px-5 md:px-8">
          <p className="label flex items-center gap-2 truncate text-[0.62rem]">
            <span className="relative flex size-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-laser opacity-60" />
              <span className="relative size-1.5 rounded-full bg-laser" />
            </span>
            Workshop open · Saravanampatti, Coimbatore · 48-hour standard dispatch
          </p>
          <div className="label hidden shrink-0 items-center gap-5 text-[0.62rem] md:flex">
            <a href={SITE.phoneHref} className="hover:text-gold">
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="hover:text-gold">
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur-md supports-[backdrop-filter]:bg-paper/75">
        <div className="mx-auto flex h-[4.5rem] max-w-[1440px] items-center justify-between gap-6 px-5 md:h-20 md:px-8">
          <Logo />
          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center">
              {NAV.map((item) =>
                item.menu ? (
                  <Dropdown key={item.href} item={item} />
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className="rounded-full px-3.5 py-2 text-[0.95rem] font-medium text-ink/75 transition-colors hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden size-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-[#25D366] hover:bg-[#25D366] hover:text-white sm:flex"
              aria-label="Chat on WhatsApp"
            >
              <WhatsAppIcon size={19} />
            </a>
            <Link href="/contact-us" className="btn btn-gold btn-sm hidden sm:inline-flex">
              Get a quote <Icon name="arrow" size={15} />
            </Link>
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  );
}
