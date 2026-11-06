import Image from 'next/image';
import Link from 'next/link';
import CtaBand from '@/components/site/CtaBand';
import ServiceShowcase from '@/components/site/ServiceShowcase';
import { MaterialsMarquee, PageHero, SectionHead } from '@/components/site/blocks';
import Icon from '@/components/ui/Icon';
import { SERVICE_CARDS, SERVICES } from '@/data/services';

export const metadata = {
  title: 'Services',
  description:
    'UV flatbed printing, CO2 laser cutting, laser engraving, 3D printing, custom gifts and 3D sign boards — all made in-house at Nexuz Hub, Saravanampatti, Coimbatore.',
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Services' }]}
        eyebrow="Manufacturing capabilities"
        title={['Six machines.', <span key="b" className="text-gold-deep">One roof.</span>]}
        intro="UV flatbed printing, laser cutting, engraving and 3D prototyping — engineered in Saravanampatti, Coimbatore, with no third-party hand-offs."
        image="/images/live/why_choose_us_big_hero.png"
        imageAlt="Nexuz Hub production floor"
        meta={[
          { label: 'Precision', value: '0.05mm', highlight: true },
          { label: 'Turnaround', value: '48hr' },
          { label: 'Services', value: '6' },
          { label: 'Clients', value: '500+' },
        ]}
      />
      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-28">
        <ServiceShowcase services={SERVICE_CARDS} />
      </section>
      <MaterialsMarquee dark />
      <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-8 md:py-32">
        <SectionHead index="02" eyebrow="Up close" title="A look at each workstation." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Link key={s.slug} href={`/services/${s.slug}`} className="group block rounded-2xl border border-line bg-white/45 p-3 transition-colors hover:bg-white" data-reveal style={{ '--d': i % 3 }}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-paper-2">
                <Image src={s.workflowImage} alt={s.name} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="px-2 pt-5 pb-3">
                <p className="label text-gold-deep">{s.badge}</p>
                <h2 className="display mt-2 text-3xl">{s.name}</h2>
                <p className="mt-2 text-ink/60">{s.description}</p>
                <span className="label mt-5 inline-flex items-center gap-2 text-ink">
                  Explore <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
