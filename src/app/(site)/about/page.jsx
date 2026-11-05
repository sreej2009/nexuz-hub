import Image from 'next/image';
import CtaBand from '@/components/site/CtaBand';
import { MaterialsMarquee, PageHero, SectionHead, TestimonialWall } from '@/components/site/blocks';
import Icon from '@/components/ui/Icon';
import { TESTIMONIALS } from '@/data/testimonials';

export const metadata = {
  title: 'About',
  description:
    'Nexuz Hub brings UV printing, laser cutting & engraving, 3D printing, custom gifts and sign boards together in a single facility in Saravanampatti, Coimbatore.',
};

const STEPS = [
  { tag: 'Step 01 / Preparation', title: 'Design & digital proofing', body: 'We import your sketches or vector artwork and prepare precise 3D digital mockups before production starts.', image: '/images/live/digital_proof_3d.png' },
  { tag: 'Step 02 / Manufacturing', title: 'Precision production & QC', body: 'State-of-the-art UV printers and laser cutters execute your job with 0.1 mm precision.', image: '/images/live/laser_qc_inspection.png' },
  { tag: 'Step 03 / Dispatch', title: 'Final finishing & delivery', body: 'Every item is hand-finished, carefully checked, packaged, and shipped out on time.', image: '/images/live/finished_delivery_products.png' },
];

const NUMBERS = [
  { value: '2500', unit: '+', label: 'Jobs delivered' },
  { value: '800', unit: '+', label: 'Happy clients' },
  { value: '98', unit: '%', label: 'On-time delivery' },
  { value: '10', unit: 'yrs', label: 'Hands-on experience' },
];

const CAPS = ['All under one roof', '0.1 mm precision', '48-hour turnaround', 'Per-piece quality checks'];

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'About' }]}
        eyebrow="Passion meets precision"
        title={['Coimbatore’s', <span key="b" className="text-gold-deep">making place.</span>]}
        intro="Nexuz Hub brings UV printing, laser cutting & engraving, 3D printing, custom gifts and sign boards together in a single facility in Saravanampatti. Cutting-edge machinery meets genuine craftsmanship, so every idea is made precisely, finished beautifully and delivered on time."
        image="/images/live/all_in_one_facility.png"
        imageAlt="The Nexuz Hub facility"
      />

      <section className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-[1fr_1.3fr]">
        <SectionHead index="01" eyebrow="Our mission" title={<>Every idea, <span className="text-gold-deep">precisely made.</span></>} />
        <div className="space-y-6 text-xl leading-relaxed text-ink/75" data-reveal>
          <p>
            We bring design and manufacturing together under one roof in Coimbatore — so businesses and creators can go from a rough sketch to a finished,
            delivery-ready product without chasing a dozen vendors.
          </p>
          <p className="text-lg text-ink/60">
            With more than ten years of hands-on experience, we’ve built a strong foundation of knowledge, skill and trust in our industry. Over the years we’ve
            navigated evolving trends, embraced new technologies, and stayed true to the craftsmanship that keeps every client coming back.
          </p>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-paper md:py-28">
        <div className="grid-paper-dark absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 md:px-8">
          <dl className="grid grid-cols-2 gap-y-12 lg:grid-cols-4">
            {NUMBERS.map((n, i) => (
              <div key={n.label} className={`px-2 ${i ? 'lg:border-l lg:border-paper/10 lg:pl-8' : ''}`} data-reveal style={{ '--d': i }}>
                <dt className="label text-paper/50">{n.label}</dt>
                <dd className="font-stencil mt-3 text-6xl leading-none md:text-7xl">
                  {n.value}
                  <span className="text-gold">{n.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32">
        <SectionHead index="02" eyebrow="How we work" title="Three stations, one standard." />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <article key={s.title} data-reveal style={{ '--d': i }}>
              <div className="crop">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-paper-2">
                  <Image src={s.image} alt={s.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
              </div>
              <p className="label mt-6 text-gold-deep">{s.tag}</p>
              <h3 className="display mt-2 text-3xl">{s.title}</h3>
              <p className="mt-2 text-ink/60">{s.body}</p>
            </article>
          ))}
        </div>
      </section>

      <MaterialsMarquee />

      <section className="mx-auto grid max-w-[1440px] gap-14 px-5 py-24 md:px-8 md:py-32 lg:grid-cols-2 lg:items-center">
        <div>
          <SectionHead index="03" eyebrow="Reasons to select us" title={<>One facility, <span className="text-gold-deep">every capability.</span></>} intro="From a single engraved gift to a thousand-piece corporate order, everything is made in-house at Nexuz Hub — so your project moves faster, stays consistent, and never waits on a third party." />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {CAPS.map((c) => (
              <li key={c} className="flex items-center gap-3 rounded-xl border border-line bg-white/50 px-4 py-3.5 font-medium" data-reveal>
                <span className="flex size-7 items-center justify-center rounded-full bg-gold text-ink">
                  <Icon name="check" size={15} strokeWidth={2.2} />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
        <figure className="crop" data-reveal>
          <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-paper-2">
            <Image src="/images/live/hero_precision_machining.png" alt="Precision machining at Nexuz Hub" fill sizes="(min-width: 1024px) 48vw, 100vw" className="object-cover" />
          </div>
        </figure>
      </section>

      <section className="border-t border-line bg-paper-2/60 py-24 md:py-32">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <SectionHead index="04" eyebrow="Customer success" title="Real people. Real results." />
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
