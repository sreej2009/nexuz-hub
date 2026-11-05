import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { MATERIALS } from '@/data/site';

/** Numbered section heading: "§02 — Eyebrow" + big display title. */
export function SectionHead({ index, eyebrow, title, intro, dark = false, align = 'left', className = '' }) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-3xl ${className}`} data-reveal>
      <p className={`label flex items-center gap-3 ${center ? 'justify-center' : ''} ${dark ? 'text-paper/55' : 'text-ink/55'}`}>
        {index && <span className="text-gold-deep">§{index}</span>}
        {index && <span className={`h-px w-8 ${dark ? 'bg-paper/25' : 'bg-ink/25'}`} />}
        {eyebrow}
      </p>
      <h2 className={`display mt-5 text-[clamp(1.98rem,4.32vw,3.96rem)] ${dark ? 'text-paper' : 'text-ink'}`}>{title}</h2>
      {intro && <p className={`lede mt-5 ${center ? 'mx-auto' : ''} max-w-2xl ${dark ? '!text-paper/65' : ''}`}>{intro}</p>}
    </div>
  );
}

/** Headline whose lines rise into view on first paint (CSS only). Pass a string or an array of lines. */
export function RiseLines({ lines }) {
  return (Array.isArray(lines) ? lines : [lines]).map((line, i) => (
    <span key={i}>
      <span style={{ '--i': i }}>{line}</span>
    </span>
  ));
}

/** Inner-page hero with breadcrumb, giant title and optional photo. */
export function PageHero({ crumbs = [], eyebrow, title, intro, image, imageAlt = '', children, meta }) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="grid-paper absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 pt-12 pb-16 md:px-8 md:pt-16 md:pb-24 lg:grid-cols-[1.15fr_1fr] lg:items-end">
        <div>
          <nav aria-label="Breadcrumb" className="label flex flex-wrap items-center gap-2 text-ink/45">
            <Link href="/" className="hover:text-ink">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-2">
                <span>/</span>
                {c.href ? (
                  <Link href={c.href} className="hover:text-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-ink/75">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
          {eyebrow && <p className="chip mt-8 text-ink/70">{eyebrow}</p>}
          <h1 className="display rise mt-6 text-[clamp(2.45rem,6.48vw,6.12rem)]">
            <RiseLines lines={title} />
          </h1>
          {intro && (
            <p className="lede mt-7 max-w-xl" data-reveal>
              {intro}
            </p>
          )}
          {children && (
            <div className="mt-9" data-reveal style={{ '--d': 1 }}>
              {children}
            </div>
          )}
          {meta && (
            <dl className="mt-10 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4" data-reveal style={{ '--d': 2 }}>
              {meta.map((m) => (
                <div key={m.label} className="bg-paper px-4 py-3.5">
                  <dt className="label text-[0.6rem] text-ink/45">{m.label}</dt>
                  <dd className={`display mt-1 text-2xl ${m.highlight ? 'text-gold-deep' : ''}`}>{m.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
        {image && (
          <div className="crop" data-reveal style={{ '--d': 1 }}>
            <div className="relative aspect-[4/3.4] overflow-hidden rounded-2xl bg-paper-2">
              <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              <div className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-gold/15 to-transparent" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** Endless strip of materials we work with (CSS animation only). */
export function MaterialsMarquee({ dark = false, items = MATERIALS }) {
  const row = (
    <div className="flex shrink-0 items-center">
      {items.map((m) => (
        <span key={m} className="flex items-center">
          <span className="display px-6 text-3xl md:text-4xl">{m}</span>
          <span className="text-2xl text-gold">✦</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className={`overflow-hidden border-y py-5 ${dark ? 'border-paper/10 bg-ink text-paper' : 'border-line text-ink'}`} aria-label="Materials we work with">
      <div className="animate-marquee flex w-max">
        {row}
        <div aria-hidden="true" className="flex">
          {row}
        </div>
      </div>
    </div>
  );
}

/** Editorial index list of the six services with a hover photo. */
export function ServiceIndex({ services }) {
  return (
    <ul className="border-t border-line">
      {services.map((s, i) => (
        <li key={s.slug} className="border-b border-line" data-reveal style={{ '--d': i % 3 }}>
          <Link href={`/services/${s.slug}`} className="group grid items-center gap-4 py-6 md:grid-cols-[5rem_1.2fr_1.4fr_auto] md:gap-8 md:py-8">
            <span className="label text-ink/40 transition-colors group-hover:text-gold-deep">{s.index}</span>
            <span className="display text-[clamp(1.58rem,3.17vw,2.88rem)] transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-2">
              {s.name}
            </span>
            <span className="flex items-center gap-5">
              <span className="relative hidden h-20 w-28 shrink-0 overflow-hidden rounded-lg bg-paper-2 md:block">
                <Image
                  src={s.image}
                  alt=""
                  fill
                  sizes="112px"
                  className="scale-110 object-cover grayscale transition-all duration-700 group-hover:scale-100 group-hover:grayscale-0"
                />
              </span>
              <span className="text-ink/65">{s.blurb}</span>
            </span>
            <span className="flex items-center gap-4 md:justify-end">
              <span className="chip text-ink/60">{s.tag}</span>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-line transition-all duration-300 group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                <Icon name="arrowUpRight" size={18} />
              </span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Masonry wall of customer quotes. */
export function TestimonialWall({ items, dark = false }) {
  return (
    <div className="columns-1 gap-5 md:columns-2 xl:columns-3">
      {items.map((t, i) => (
        <figure
          key={t.name + i}
          className={`mb-5 break-inside-avoid rounded-2xl border p-7 ${dark ? 'border-paper/10 bg-ink-2 text-paper' : 'border-line bg-white/55'}`}
          data-reveal
          style={{ '--d': i % 3 }}
        >
          <div className="flex items-center justify-between">
            <span className="flex gap-0.5 text-gold" aria-label="5 out of 5">
              {Array.from({ length: 5 }, (_, k) => (
                <Icon key={k} name="star" size={15} className="fill-current" />
              ))}
            </span>
            <span className={`label text-[0.6rem] ${dark ? 'text-paper/40' : 'text-ink/40'}`}>{t.service}</span>
          </div>
          <blockquote className={`mt-5 text-[1.05rem] leading-relaxed ${dark ? 'text-paper/85' : 'text-ink/85'}`}>“{t.quote}”</blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span className="display flex size-11 items-center justify-center rounded-full bg-gold text-xl text-ink">{t.name[0]}</span>
            <span>
              <span className="block font-semibold">{t.name}</span>
              <span className={`text-sm ${dark ? 'text-paper/50' : 'text-ink/50'}`}>{t.role}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Accessible accordion using native <details> (no JavaScript). */
export function FaqList({ items, dark = false }) {
  return (
    <div className={`divide-y border-y ${dark ? 'divide-paper/10 border-paper/10' : 'divide-line border-line'}`}>
      {items.map((f, i) => (
        <details key={f.q} className="group py-1" open={f.open ?? i === 0}>
          <summary className="flex items-start justify-between gap-6 py-5">
            <span className="text-lg font-semibold md:text-xl">{f.q}</span>
            <span
              className={`acc-icon mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border transition-transform duration-300 ${dark ? 'border-paper/20' : 'border-line'}`}
            >
              <Icon name="plus" size={16} />
            </span>
          </summary>
          <p className={`max-w-3xl pb-6 leading-relaxed ${dark ? 'text-paper/65' : 'text-ink/65'}`}>{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Card for a product added from the admin page. */
export function ProductCard({ product, priority = false }) {
  const img = product.images?.[0];
  return (
    <Link href={`/products/${product.slug}`} className="group block" data-reveal>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-2">
        {img ? (
          <Image
            src={img}
            alt={product.name}
            fill
            priority={priority}
            sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
          />
        ) : (
          <div className="hatch absolute inset-0" />
        )}
        {product.featured && <span className="label absolute top-3 left-3 rounded-full bg-ink px-2.5 py-1 text-[0.58rem] text-gold">Featured</span>}
        <span className="absolute right-3 bottom-3 flex size-11 translate-y-2 items-center justify-center rounded-full bg-paper opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Icon name="arrowUpRight" size={18} />
        </span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold leading-snug">{product.name}</h3>
          {product.shortDescription && <p className="mt-1 line-clamp-2 text-sm text-ink/55">{product.shortDescription}</p>}
        </div>
        {product.price && <span className="label shrink-0 pt-0.5 text-gold-deep">{product.price}</span>}
      </div>
    </Link>
  );
}
