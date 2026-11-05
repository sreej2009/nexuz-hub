import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import EnquiryForm from '@/components/forms/EnquiryForm';
import CtaBand from '@/components/site/CtaBand';
import { FaqList, PageHero, SectionHead } from '@/components/site/blocks';
import Icon, { WhatsAppIcon } from '@/components/ui/Icon';
import { SERVICES, getService } from '@/data/services';
import { whatsappLink } from '@/data/site';

export const dynamicParams = false;
export const generateStaticParams = () => SERVICES.map((s) => ({ slug: s.slug }));

export async function generateMetadata({ params }) {
  const s = getService((await params).slug);
  return s ? { title: `${s.name} in Coimbatore`, description: s.description } : {};
}

// Bento cells: first and fifth tiles are wide.
const BENTO = ['md:col-span-2', '', '', '', 'md:col-span-2', ''];

export default async function ServicePage({ params }) {
  const s = getService((await params).slug);
  if (!s) notFound();
  const others = SERVICES.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services', href: '/services' }, { label: s.short }]}
        eyebrow={s.badge}
        title={[s.heroTitleLine1, <span key="b" className="text-gold-deep">{s.heroTitleLine2}</span>]}
        intro={s.description}
        image={s.heroImage}
        imageAlt={s.name}
        meta={s.metrics}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#quote" className="btn btn-gold">
            Get a quote <Icon name="arrow" size={16} />
          </a>
          <a href={whatsappLink(`Hi Nexuz Hub! I'd like a quote for ${s.name}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-line">
            <WhatsAppIcon size={17} /> WhatsApp
          </a>
        </div>
        <ul className="mt-6 flex flex-wrap gap-2">
          {s.pills.map((p) => (
            <li key={p} className="rounded-full border border-line bg-white/50 px-3.5 py-1.5 text-sm text-ink/70">
              {p}
            </li>
          ))}
        </ul>
      </PageHero>

      {/* Highlights */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
          {[s.infoCard1, s.infoCard2].map((c, i) => (
            <div key={c.title} className={`flex gap-5 px-5 py-10 md:px-8 ${i ? 'border-t border-line md:border-t-0 md:border-l' : ''}`} data-reveal style={{ '--d': i }}>
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-ink text-gold">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d={c.iconPath} />
                </svg>
              </span>
              <div>
                <h2 className="display text-2xl">{c.title}</h2>
                <p className="mt-1.5 text-ink/60">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Materials bento */}
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-28">
        <SectionHead index="01" eyebrow="Surfaces" title={<>{s.bentoTitle} <span className="text-gold-deep">{s.bentoSub}</span></>} />
        <div className="mt-14 grid auto-rows-[240px] gap-3 md:grid-cols-4 md:gap-4">
          {s.bentoItems.map((b, i) => (
            <div key={b.title} className={`group relative overflow-hidden rounded-2xl bg-ink ${BENTO[i] ?? ''}`} data-reveal style={{ '--d': i % 3 }}>
              <Image src={b.image} alt={b.title} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-paper">
                {b.sub && <p className="label text-[0.6rem] text-gold">{b.sub}</p>}
                <p className="display mt-1 text-2xl">{b.title}</p>
                {b.desc && <p className="mt-1 max-w-sm text-sm text-paper/70">{b.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper md:py-28">
        <div className="grid-paper-dark absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
          <SectionHead index="02" eyebrow="Why it works" title={<>{s.benefitsTitleLine1} <span className="text-gold">{s.benefitsTitleLine2}</span></>} dark />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
            {s.benefits.map((b, i) => (
              <div key={b.title} className="bg-ink p-7" data-reveal style={{ '--d': i }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-gold" aria-hidden="true">
                  <path d={b.icon} />
                </svg>
                <h3 className="display mt-6 text-2xl">{b.title}</h3>
                <p className="mt-2 text-paper/60">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-8 md:py-28 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHead index="03" eyebrow={s.workflowSubtitle} title="How your job runs." />
          <ol className="mt-10 space-y-8">
            {s.workflowSteps.map((w, i) => (
              <li key={w.num} className="grid grid-cols-[4.5rem_1fr] gap-4 border-t border-line pt-6" data-reveal style={{ '--d': i }}>
                <span className="font-stencil text-4xl leading-none text-gold-deep">{w.num}</span>
                <div>
                  <h3 className="display text-2xl">{w.title}</h3>
                  <p className="mt-1.5 text-ink/60">{w.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <figure className="crop" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-2">
            <Image src={s.workflowImage} alt={`${s.name} in progress`} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <figcaption className="label mt-3 text-ink/45">Saravanampatti workshop · quality control</figcaption>
        </figure>
      </section>

      {/* Applications */}
      <section className="border-y border-line bg-paper-2/60 py-24 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <SectionHead index="04" eyebrow="Applications" title={s.galleryTitle} />
          <div className="mt-14 grid gap-4 md:grid-cols-3 md:grid-rows-2">
            {s.galleryItems.map((g, i) => (
              <div key={g.title} className={`group relative overflow-hidden rounded-2xl bg-ink ${g.isLarge ? 'aspect-[4/3] md:row-span-2 md:aspect-auto' : 'aspect-[4/3]'}`} data-reveal style={{ '--d': i % 3 }}>
                <Image src={g.image} alt={g.title} fill sizes={g.isLarge ? '(min-width: 768px) 33vw, 100vw' : '(min-width: 768px) 33vw, 100vw'} className="object-cover opacity-85 transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 text-paper">
                  {g.category && <p className="label text-[0.6rem] text-gold">{g.category}</p>}
                  <p className="display mt-1 text-2xl">{g.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust + FAQ */}
      <section className="mx-auto grid max-w-[1440px] gap-16 px-5 py-24 md:px-8 md:py-28 lg:grid-cols-2">
        <div>
          <SectionHead index="05" eyebrow="Premium partnerships" title={<>{s.trustTitleLine1} <span className="text-gold-deep">{s.trustTitleLine2}</span></>} />
          <div className="mt-10 space-y-4">
            {s.trustPoints.map((t) => (
              <div key={t.title} className="flex gap-4 rounded-2xl border border-line bg-white/50 p-5" data-reveal>
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-deep">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={t.icon} />
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold">{t.title}</h3>
                  <p className="mt-1 text-ink/60">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div data-reveal>
          <p className="label text-ink/55">Questions about {s.short.toLowerCase()}</p>
          <div className="mt-5">
            <FaqList items={s.faqs} />
          </div>
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="scroll-mt-28 px-3 md:px-5">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink text-paper">
          <div className="grid-paper-dark absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:px-12 md:py-20 lg:grid-cols-[1fr_1.2fr]">
            <div data-reveal>
              <p className="label text-gold">Quote for {s.short}</p>
              <h2 className="display mt-5 text-[clamp(2.16rem,4.32vw,3.96rem)]">Tell us what you need made.</h2>
              <p className="mt-5 max-w-md text-paper/65">Share sizes, material and quantity — or just an idea. We’ll reply with a firm price and a digital proof plan.</p>
              <div className="mt-10">
                <p className="label text-paper/45">Other services</p>
                <ul className="mt-4 space-y-2">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link href={`/services/${o.slug}`} className="display inline-flex items-center gap-3 text-2xl text-paper/80 hover:text-gold">
                        {o.name} <Icon name="arrowUpRight" size={18} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div data-reveal style={{ '--d': 1 }}>
              <EnquiryForm type="service" service={s.short} dark submitLabel="Request quote" />
            </div>
          </div>
        </div>
      </section>
      <div className="pt-3 md:pt-5">
        <CtaBand />
      </div>
    </>
  );
}
