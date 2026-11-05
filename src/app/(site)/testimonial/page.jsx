import CtaBand from '@/components/site/CtaBand';
import { PageHero, TestimonialWall } from '@/components/site/blocks';
import { TESTIMONIALS } from '@/data/testimonials';

export const metadata = {
  title: 'Reviews',
  description: 'What Coimbatore businesses say about Nexuz Hub — UV printing, laser cutting, engraving, 3D printing, gifts and sign boards.',
};

export default function TestimonialPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Reviews' }]}
        eyebrow="Client words"
        title={['Made here.', <span key="b" className="text-gold-deep">Loved there.</span>]}
        intro="From decal suppliers to hardware startups and retail showrooms — here’s what the businesses we make for say about working with Nexuz Hub."
        meta={[
          { label: 'Rating', value: '5.0', highlight: true },
          { label: 'Clients', value: '500+' },
          { label: 'On time', value: '98%' },
          { label: 'Turnaround', value: '48hr' },
        ]}
      />
      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-28">
        <TestimonialWall items={TESTIMONIALS} />
      </section>
      <CtaBand title="Your project could be next." />
    </>
  );
}
