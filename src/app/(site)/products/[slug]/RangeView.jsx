import Image from 'next/image';
import EnquiryForm from '@/components/forms/EnquiryForm';
import CtaBand from '@/components/site/CtaBand';
import { PageHero, ProductCard, SectionHead } from '@/components/site/blocks';
import Icon, { WhatsAppIcon } from '@/components/ui/Icon';
import { whatsappLink } from '@/data/site';
import { listProducts } from '@/lib/store';

// Page for one of the three built-in product ranges.
export default async function RangeView({ range: r }) {
  const products = await listProducts({ category: r.slug });

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Products', href: '/products' }, { label: r.short }]}
        eyebrow={r.categoryTag}
        title={r.bigTitle.split(' ').length > 1 ? [r.bigTitle.split(' ')[0], <span key="b" className="text-gold-deep">{r.bigTitle.split(' ').slice(1).join(' ')}</span>] : [r.bigTitle]}
        intro={r.heroTagline}
        image={r.heroImage}
        imageAlt={r.name}
      >
        <div className="flex flex-wrap gap-3">
          <a href="#enquire" className="btn btn-gold">
            Enquire now <Icon name="arrow" size={16} />
          </a>
          <a href={whatsappLink(`Hi Nexuz Hub! I'm interested in ${r.name}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-line">
            <WhatsAppIcon size={17} /> WhatsApp
          </a>
        </div>
      </PageHero>

      {/* Banner strip */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-[1440px] sm:grid-cols-3">
          {r.bannerItems.map((b, i) => (
            <div key={b.title} className={`flex items-center gap-4 px-5 py-7 md:px-8 ${i ? 'border-t border-line sm:border-t-0 sm:border-l' : ''}`}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-gold-deep" aria-hidden="true">
                <path d={b.icon} />
              </svg>
              <div>
                <p className="label">{b.title}</p>
                <p className="mt-1 text-sm text-ink/55">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Story */}
      <section className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-8 md:py-28 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <figure className="crop" data-reveal>
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-paper-2">
            <Image src={r.bannerImage} alt={r.storyHeadline} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </figure>
        <div>
          <SectionHead index="01" eyebrow="The story" title={r.storyHeadline} />
          <div className="mt-6 space-y-4 text-ink/70" data-reveal>
            <p>{r.storyP1}</p>
            <p>{r.storyP2}</p>
          </div>
          <dl className="mt-10 space-y-4">
            {r.specs.map((s) => (
              <div key={s.label} className="grid grid-cols-[8rem_1fr] gap-4 border-t border-line pt-4" data-reveal>
                <dt className="label pt-0.5 text-gold-deep">{s.label}</dt>
                <dd className="text-ink/75">{s.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Options grid */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper md:py-28">
        <div className="grid-paper-dark absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
          <SectionHead index="02" eyebrow="Options" title="Make it yours." dark />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-paper/10 bg-paper/10 sm:grid-cols-2 lg:grid-cols-3">
            {r.gridItems.map((g, i) => (
              <div key={g.num} className="bg-ink p-7" data-reveal style={{ '--d': i % 3 }}>
                <span className="font-stencil text-3xl text-gold">{g.num}</span>
                <h3 className="display mt-4 text-2xl">{g.title}</h3>
                <p className="mt-2 text-paper/60">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors + tech specs */}
      <section className="mx-auto grid max-w-[1440px] gap-16 px-5 py-24 md:px-8 md:py-28 lg:grid-cols-2">
        <div>
          <SectionHead index="03" eyebrow="Where it goes" title="Made for every space." />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {r.sectors.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-line bg-white/50 p-5" data-reveal style={{ '--d': i % 2 }}>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-ink/60">{s.desc}</p>
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal>
          <p className="label text-ink/55">Technical specification</p>
          <table className="mt-5 w-full text-left">
            <tbody className="divide-y divide-line border-y border-line">
              {r.techSpecs.map((t) => (
                <tr key={t.key}>
                  <th scope="row" className="label w-40 py-4 align-top font-medium text-ink/50">
                    {t.key}
                  </th>
                  <td className="py-4 text-ink/80">{t.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {products.length > 0 && (
        <section className="border-t border-line bg-paper-2/60 py-24">
          <div className="mx-auto max-w-[1440px] px-5 md:px-8">
            <SectionHead index="04" eyebrow="In this range" title="Ready designs." />
            <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="enquire" className="scroll-mt-28 mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-8 md:py-28 lg:grid-cols-[1fr_1.2fr]">
        <SectionHead eyebrow={`Enquire · ${r.short}`} title="Tell us what to make." intro="Quantity, size, text or photo — share what you have and we’ll send a mock-up and price." />
        <div className="rounded-2xl border border-line bg-white/55 p-6 md:p-8" data-reveal>
          <EnquiryForm type="product" product={r.name} submitLabel="Send enquiry" />
        </div>
      </section>
      <CtaBand />
    </>
  );
}
