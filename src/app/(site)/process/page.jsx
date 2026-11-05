import Image from 'next/image';
import CtaBand from '@/components/site/CtaBand';
import { PageHero, SectionHead } from '@/components/site/blocks';
import Icon from '@/components/ui/Icon';
import { PROCESS } from '@/data/process';

export const metadata = {
  title: 'Process',
  description: 'From idea to finished product: share your idea, approve a digital proof, we craft it in-house, check every piece and dispatch within 48 hours.',
};

const IMAGES = [
  '/images/live/custom_gift_design_software.png',
  '/images/live/digital_proof_3d.png',
  '/images/live/uv_printing_process.jpg',
  '/images/live/laser_qc_inspection.png',
  '/images/live/finished_delivery_products.png',
];

const ACCEPTS = ['CorelDraw (.CDR)', 'Illustrator (.AI)', 'PDF / EPS', 'DXF / SVG', 'STL / OBJ', 'PNG / JPG photos'];

export default function ProcessPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'Process' }]}
        eyebrow="Process timeline"
        title={['From idea', <span key="b" className="text-gold-deep">to finished.</span>]}
        intro="A simple, transparent process — you share the idea, we handle the design, machining, quality and packaging, and you receive it finished and on time."
      />

      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-28">
        <ol className="relative">
          <span className="absolute top-0 bottom-0 left-[1.6rem] w-px bg-line md:left-1/2" aria-hidden="true" />
          {PROCESS.map((p, i) => (
            <li key={p.title} className="relative grid gap-8 pb-20 last:pb-0 md:grid-cols-2 md:gap-20">
              <span className="font-stencil absolute top-0 left-0 z-10 flex size-[3.2rem] items-center justify-center rounded-full border border-ink bg-paper text-2xl md:left-1/2 md:-translate-x-1/2">
                {i + 1}
              </span>
              <div className={`pl-20 md:pl-0 ${i % 2 ? 'md:order-2 md:pl-16' : 'md:pr-16 md:text-right'}`} data-reveal>
                <p className="label text-gold-deep">
                  Step {String(i + 1).padStart(2, '0')} · {p.time}
                </p>
                <h2 className="display mt-3 text-[clamp(1.87rem,3.24vw,2.88rem)]">{p.title}</h2>
                <p className={`mt-4 max-w-md text-lg text-ink/65 ${i % 2 ? '' : 'md:ml-auto'}`}>{p.body}</p>
              </div>
              <figure className={`crop ml-20 md:ml-0 ${i % 2 ? 'md:order-1 md:pr-16' : 'md:pl-16'}`} data-reveal style={{ '--d': 1 }}>
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-paper-2">
                  <Image src={IMAGES[i]} alt={p.title} fill sizes="(min-width: 768px) 40vw, 80vw" className="object-cover" />
                </div>
              </figure>
            </li>
          ))}
        </ol>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-paper md:py-28">
        <div className="grid-paper-dark absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 md:px-8 lg:grid-cols-2 lg:items-center">
          <SectionHead index="02" eyebrow="Send us anything" title={<>Any file. <span className="text-gold">Or just a photo.</span></>} intro="No design file? Share a photo, logo or rough idea and our team will prepare print- or cut-ready artwork and send you a proof before production starts." dark />
          <ul className="grid grid-cols-2 gap-3" data-reveal>
            {ACCEPTS.map((a) => (
              <li key={a} className="flex items-center gap-3 rounded-xl border border-paper/10 bg-paper/[0.03] px-4 py-4">
                <Icon name="check" size={17} className="text-gold" strokeWidth={2} /> {a}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <div className="pt-3 md:pt-5">
        <CtaBand />
      </div>
    </>
  );
}
