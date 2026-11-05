import Image from 'next/image';
import Link from 'next/link';
import CtaBand from '@/components/site/CtaBand';
import { MaterialsMarquee, ProductCard, RiseLines, SectionHead, ServiceIndex, TestimonialWall } from '@/components/site/blocks';
import Icon, { WhatsAppIcon } from '@/components/ui/Icon';
import { MAKES, PROCESS, PROMISES } from '@/data/process';
import { RANGES } from '@/data/ranges';
import { SERVICES } from '@/data/services';
import { STATS, whatsappLink } from '@/data/site';
import { TESTIMONIALS } from '@/data/testimonials';
import { listProducts } from '@/lib/store';

export const metadata = {
  title: { absolute: 'Nexuz Hub | Creative Manufacturing in Coimbatore' },
};

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="grid-paper absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 pt-12 pb-20 md:px-8 md:pt-16 lg:grid-cols-[1.05fr_1fr] lg:items-center lg:pb-28">
        <div>
          <p className="chip text-ink/70">Coimbatore’s all-in-one printing studio</p>
          <h1 className="display rise mt-7 text-[clamp(3.02rem,5.6vw,5.4rem)]">
            <RiseLines
              lines={[
                'Your vision,',
                <>
                  our <span className="text-gold">Nexuz.</span>
                </>,
              ]}
            />
          </h1>
          <p className="lede mt-7 max-w-xl" data-reveal>
            UV printing, laser cutting, 3D printing, custom gifts and sign boards — made under one roof in{' '}
            <strong className="font-semibold text-ink">Saravanampatti</strong> and delivered in 48 hours.
          </p>
          <div className="mt-9 flex flex-wrap gap-3" data-reveal style={{ '--d': 1 }}>
            <Link href="/contact-us" className="btn btn-gold">
              Get a free quote <Icon name="arrow" size={16} />
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-line">
              <WhatsAppIcon size={17} /> Send a sketch
            </a>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ink/60" data-reveal style={{ '--d': 2 }}>
            <span className="flex items-center gap-2">
              <span className="flex text-gold">
                {Array.from({ length: 5 }, (_, i) => (
                  <Icon key={i} name="star" size={14} className="fill-current" />
                ))}
              </span>
              500+ happy clients
            </span>
            <span className="flex items-center gap-2">
              <Icon name="check" size={16} /> Same-day digital proofs
            </span>
            <span className="flex items-center gap-2">
              <Icon name="check" size={16} /> GST invoicing
            </span>
          </div>
        </div>

        {/* Photo composition */}
        <div className="relative mx-auto w-full max-w-[640px] pb-16 sm:pb-20 lg:pb-0">
          <figure className="crop relative ml-auto w-[86%]" data-reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.6rem] bg-paper-2">
              <Image src="/images/live/hero_uv_printing.png" alt="UV flatbed printer printing a tiger artwork onto walnut wood" fill priority sizes="(min-width: 1024px) 40vw, 86vw" className="object-cover" />
              <div className="animate-scan pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-transparent via-gold/15 to-transparent" />
            </div>
            <figcaption className="label mt-3 hidden text-right text-ink/50 sm:block">Fig. 01 — UV flatbed · Tol. ±0.05 mm</figcaption>
          </figure>
          <figure className="absolute bottom-0 left-0 w-[46%] sm:bottom-2" data-reveal style={{ '--d': 2 }}>
            <div className="relative aspect-square overflow-hidden rounded-2xl border-[6px] border-paper bg-paper-2 shadow-[0_30px_60px_-25px_rgb(21_19_15/0.55)]">
              <Image src="/images/live/hero_laser_cutting.png" alt="CO2 laser cutting acrylic" fill sizes="(min-width: 1024px) 20vw, 46vw" className="object-cover" />
            </div>
            <figcaption className="label mt-2 text-ink/50">Fig. 02 — CO2 laser</figcaption>
          </figure>
          <div className="absolute top-[8%] left-[2%] w-44 rounded-2xl bg-ink p-4 text-paper shadow-xl sm:w-52 sm:p-5" data-reveal style={{ '--d': 3 }}>
            <p className="label text-[0.6rem] text-gold">Standard dispatch</p>
            <p className="font-stencil mt-1 text-5xl leading-none">48hr</p>
            <div className="ruler mt-3 text-paper" />
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative border-t border-line bg-paper">
        <dl className="mx-auto grid max-w-[1440px] grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div key={s.label} className={`px-5 py-7 md:px-8 ${i ? 'border-l border-line' : ''} ${i === 2 ? 'max-md:border-l-0 max-md:border-t' : ''} ${i === 3 ? 'max-md:border-t' : ''}`}>
              <dt className="label text-ink/50">{s.label}</dt>
              <dd className="font-stencil mt-2 text-5xl leading-none md:text-6xl">
                {s.value}
                <span className="text-gold">{s.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function WhyNexuz() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper md:py-32">
      <div className="grid-paper-dark absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
        <SectionHead index="02" eyebrow="Why businesses trust us" title={<>One floor. <span className="text-gold">Zero</span> hand-offs.</>} dark />
        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <figure className="crop crop-light" data-reveal>
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <Image src="/images/live/why_choose_us_big_hero.png" alt="Inside the Nexuz Hub manufacturing facility" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <figcaption className="label mt-3 text-paper/45">Coimbatore facility · 0.1 mm precision</figcaption>
          </figure>
          <div>
            <blockquote className="display text-[clamp(1.37rem,2.3vw,2.09rem)] leading-[1] text-paper" data-reveal>
              “From first sketch to final shipment, 400+ businesses rely on Nexuz because we treat every order like it’s our only one.”
            </blockquote>
            <ol className="mt-12 divide-y divide-paper/10 border-y border-paper/10">
              {PROMISES.map((p, i) => (
                <li key={p.title} className="grid grid-cols-[3rem_1fr] gap-4 py-6" data-reveal style={{ '--d': i }}>
                  <span className="font-stencil text-2xl text-gold">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <p className="mt-1.5 text-paper/60">{p.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatWeMake() {
  const spans = ['md:col-span-2 md:row-span-2', '', '', '', 'md:col-span-2', ''];
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHead index="03" eyebrow="What we make" title={<>If you can imagine it, <span className="text-gold-deep">we make it.</span></>} />
        <Link href="/products" className="btn btn-line" data-reveal>
          Browse products <Icon name="arrow" size={16} />
        </Link>
      </div>
      <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[260px] md:grid-cols-4 md:gap-4">
        {MAKES.map((m, i) => (
          <Link key={m.title} href={m.href} className={`group relative overflow-hidden rounded-2xl bg-ink ${spans[i]}`} data-reveal style={{ '--d': i % 3 }}>
            <Image
              src={m.image}
              alt={m.title}
              fill
              sizes={i === 0 ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'}
              className="object-cover opacity-85 transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 text-paper">
              <div>
                <p className={`display ${i === 0 ? 'text-4xl md:text-5xl' : 'text-2xl'}`}>{m.title}</p>
                <p className="label mt-1.5 text-[0.6rem] text-paper/65">{m.sub}</p>
              </div>
              <Icon name="arrowUpRight" size={20} className="shrink-0 text-gold transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

const STEP_ICONS = ['chat', 'edit', 'sparkle', 'shield', 'truck'];

// Keeps hyphenated words like "in-house" from splitting across lines.
const noBreakHyphens = (text) =>
  text.split(' ').map((word, i) => (
    <span key={i}>
      {i > 0 && ' '}
      {word.includes('-') ? <span className="whitespace-nowrap">{word}</span> : word}
    </span>
  ));

function ProcessStrip() {
  const last = PROCESS.length - 1;
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-paper md:py-32">
      <div className="grid-paper-dark absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 size-[640px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(212_164_55/0.14)_0%,transparent_65%)]"
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead
            index="04"
            eyebrow="How it works"
            title={
              <>
                Sketch to shipment <span className="text-gold">in five steps.</span>
              </>
            }
            dark
          />
          <Link href="/process" className="btn btn-line-light" data-reveal>
            See the full process <Icon name="arrow" size={16} />
          </Link>
        </div>

        {/* Timeline: one rail joins the steps; the gold fill runs along it when scrolled into view. */}
        <div className="timeline relative mt-16 md:mt-20" data-reveal>
          <div className="absolute top-7 bottom-7 left-[27px] w-[2px] bg-paper/15 md:top-[27px] md:right-[calc((100%-64px)/5-28px)] md:bottom-auto md:left-7 md:h-[2px] md:w-auto" aria-hidden="true">
            <div className="rail-fill absolute inset-0 bg-gradient-to-b from-gold via-gold to-gold-2 shadow-[0_0_12px_rgb(212_164_55/0.6)] md:bg-gradient-to-r" />
          </div>

          <ol className="relative grid gap-8 md:grid-cols-5 md:gap-4">
            {PROCESS.map((p, i) => {
              const final = i === last;
              return (
                <li key={p.title} className="grid grid-cols-[3.5rem_1fr] gap-4 md:flex md:flex-col md:gap-0" data-reveal style={{ '--d': i + 1 }}>
                  <span
                    className={`font-stencil relative z-10 flex size-14 items-center justify-center rounded-full border text-2xl ${
                      final ? 'border-gold bg-gold text-ink shadow-[0_0_0_6px_rgb(212_164_55/0.18)]' : 'border-paper/30 bg-ink text-paper'
                    }`}
                  >
                    {i + 1}
                  </span>

                  <article
                    className={`group relative overflow-hidden rounded-2xl border p-6 md:flex-1 transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1 md:mt-7 ${
                      final ? 'border-gold/50 bg-gold/[0.08]' : 'border-paper/10 bg-ink-2/80 hover:border-gold/40'
                    }`}
                  >
                    <span
                      className="font-stencil pointer-events-none absolute -right-2 -bottom-8 text-[8.5rem] leading-none text-transparent opacity-60 [-webkit-text-stroke:1px_rgb(244_240_232/0.08)] transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div className="relative flex items-start justify-between gap-3">
                      <span className="label inline-flex items-center gap-2 rounded-full border border-gold/40 px-2.5 py-1 text-[0.6rem] text-gold">
                        <span className="size-1.5 rounded-full bg-gold" />
                        {p.time}
                      </span>
                      <span
                        className={`flex size-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
                          final ? 'bg-gold text-ink' : 'bg-paper/[0.06] text-gold group-hover:bg-gold group-hover:text-ink'
                        }`}
                      >
                        <Icon name={STEP_ICONS[i]} size={18} />
                      </span>
                    </div>
                    <h3 className="display relative mt-6 text-[1.35rem] leading-[1.05] text-balance">{noBreakHyphens(p.title)}</h3>
                    <p className="relative mt-3 text-[0.93rem] leading-relaxed text-paper/60">{p.body}</p>
                  </article>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Summary bar */}
        <div
          className="mt-12 flex flex-col gap-6 rounded-2xl border border-paper/10 bg-paper/[0.03] p-6 md:mt-16 md:flex-row md:items-center md:justify-between md:p-7"
          data-reveal
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <p className="flex items-baseline gap-3">
              <span className="font-stencil text-5xl leading-none text-gold">48hr</span>
              <span className="text-paper/70">from approval to dispatch</span>
            </p>
            <span className="hidden h-10 w-px bg-paper/15 md:block" />
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper/70">
              {['Proof before we make it', 'GST invoice', 'Courier across India'].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Icon name="check" size={16} className="text-gold" strokeWidth={2} /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={whatsappLink('Hi Nexuz Hub! I have a sketch/idea to share.')} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              <WhatsAppIcon size={17} /> Start with a sketch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ranges({ products }) {
  return (
    <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32">
      <SectionHead index="05" eyebrow="Product ranges" title="Ready-to-personalise products." intro="Pick a range, send your photo, logo or text — we print, engrave and finish it in-house." />
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {RANGES.map((r, i) => (
          <Link key={r.slug} href={`/products/${r.slug}`} className="group block" data-reveal style={{ '--d': i }}>
            <div className="crop">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-2">
                <Image src={r.heroImage} alt={r.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105" />
                <span className="label absolute top-4 left-4 rounded-full bg-paper/90 px-3 py-1.5 text-[0.6rem]">{r.tag}</span>
              </div>
            </div>
            <div className="mt-5 flex items-start justify-between gap-4">
              <div>
                <p className="label text-ink/40">Range {String(i + 1).padStart(2, '0')}</p>
                <h3 className="display mt-1 text-3xl">{r.short}</h3>
                <p className="mt-2 text-ink/60">{r.blurb}</p>
              </div>
              <span className="mt-1 flex size-12 shrink-0 items-center justify-center rounded-full border border-line transition-colors group-hover:border-ink group-hover:bg-ink group-hover:text-paper">
                <Icon name="arrowUpRight" size={18} />
              </span>
            </div>
          </Link>
        ))}
      </div>

      {products.length > 0 && (
        <div className="mt-20">
          <div className="flex items-end justify-between gap-4 border-b border-line pb-4">
            <h3 className="display text-3xl">Latest from the workshop</h3>
            <Link href="/products#catalogue" className="label inline-flex items-center gap-2 hover:text-gold-deep">
              All products <Icon name="arrow" size={14} />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default async function HomePage() {
  const products = (await listProducts()).slice(0, 4);
  return (
    <>
      <Hero />
      <MaterialsMarquee dark />
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHead
            index="01"
            eyebrow="Manufacturing capabilities"
            title={<>Everything you need, <span className="text-gold-deep">under one roof.</span></>}
            intro="UV flatbed printing, laser cutting, engraving and 3D prototyping — engineered in Saravanampatti, Coimbatore."
          />
          <Link href="/services" className="btn btn-line justify-self-start" data-reveal>
            All services <Icon name="arrow" size={16} />
          </Link>
        </div>
        <div className="mt-14">
          <ServiceIndex services={SERVICES} />
        </div>
      </section>
      <WhyNexuz />
      <WhatWeMake />
      <ProcessStrip />
      <Ranges products={products} />
      <section className="border-t border-line bg-paper-2/60 py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead index="06" eyebrow="Client words" title="Made in Coimbatore. Trusted across it." />
            <Link href="/testimonial" className="btn btn-line" data-reveal>
              All reviews <Icon name="arrow" size={16} />
            </Link>
          </div>
          <div className="mt-14">
            <TestimonialWall items={TESTIMONIALS.slice(0, 6)} />
          </div>
        </div>
      </section>
      <div className="pt-3 md:pt-5">
        <CtaBand />
      </div>
    </>
  );
}
