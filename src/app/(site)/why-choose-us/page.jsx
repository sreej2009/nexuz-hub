import Image from 'next/image';
import Link from 'next/link';
import CtaBand from '@/components/site/CtaBand';
import { PageHero, SectionHead } from '@/components/site/blocks';
import Icon from '@/components/ui/Icon';
import { PROMISES } from '@/data/process';
import { STATS } from '@/data/site';

export const metadata = {
  title: 'Why Nexuz',
  description: 'All-in-one facility, digital proofs before production, per-piece QC at 0.1mm tolerance and transparent GST pricing — why businesses choose Nexuz Hub.',
};

const COMPARE = [
  ['Design, print, cut and finish', 'One facility', 'Several vendors'],
  ['Proof before production', 'Digital twin, always', 'Not always'],
  ['Quality checks', 'Every piece', 'Batch samples'],
  ['Standard turnaround', '48 hours', 'Depends on each vendor'],
  ['Invoicing', 'Itemised GST', 'Separate bills'],
];

export default function WhyPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Why Nexuz' }]}
        eyebrow="Reasons to select us"
        title={['Why businesses', <span key="b" className="text-gold-deep">trust Nexuz.</span>]}
        intro="From first sketch to final shipment, 400+ businesses rely on Nexuz because we treat every order like it’s our only one."
        image="/images/live/why_choose_us_content_blend.png"
        imageAlt="Nexuz Hub craftsmanship"
      />
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-28">
        <div className="grid gap-5 md:grid-cols-2">
          {PROMISES.map((p, i) => (
            <article key={p.title} className="rounded-2xl border border-line bg-white/50 p-8" data-reveal style={{ '--d': i % 2 }}>
              <span className="font-stencil text-4xl text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
              <h2 className="display mt-5 text-3xl">{p.title}</h2>
              <p className="mt-3 text-ink/65">{p.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="relative overflow-hidden bg-ink py-24 text-paper md:py-28">
        <div className="grid-paper-dark absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
          <SectionHead index="02" eyebrow="Side by side" title={<>Nexuz vs. the <span className="text-gold">usual way.</span></>} dark />
          <div className="mt-12 overflow-x-auto" data-reveal>
            <table className="w-full min-w-[560px] text-left">
              <thead>
                <tr className="label text-paper/45">
                  <th className="py-4 font-medium">What matters</th>
                  <th className="py-4 font-medium text-gold">Nexuz Hub</th>
                  <th className="py-4 font-medium">Multi-vendor job</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper/10 border-y border-paper/10">
                {COMPARE.map(([k, a, b]) => (
                  <tr key={k}>
                    <td className="py-5 pr-4 text-paper/80">{k}</td>
                    <td className="py-5 pr-4">
                      <span className="inline-flex items-center gap-2 font-semibold">
                        <Icon name="check" size={17} className="text-gold" strokeWidth={2} /> {a}
                      </span>
                    </td>
                    <td className="py-5 text-paper/45">{b}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <dl className="mt-16 grid grid-cols-2 gap-y-10 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} data-reveal>
                <dt className="label text-paper/50">{s.label}</dt>
                <dd className="font-stencil mt-2 text-5xl">
                  {s.value}
                  <span className="text-gold">{s.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-8 lg:grid-cols-2 lg:items-center">
        <figure className="crop" data-reveal>
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-paper-2">
            <Image src="/images/live/laser_qc_inspection.png" alt="Per-piece quality inspection" fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
          </div>
        </figure>
        <div>
          <SectionHead index="03" eyebrow="See it for yourself" title="Visit the workshop." intro="Drop by our Saravanampatti facility to see materials, samples and machines before you order." />
          <Link href="/contact-us" className="btn btn-ink mt-8" data-reveal>
            Plan a visit <Icon name="arrow" size={16} />
          </Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
