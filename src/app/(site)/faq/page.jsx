import EnquiryForm from '@/components/forms/EnquiryForm';
import { FaqList, PageHero } from '@/components/site/blocks';
import { WhatsAppIcon } from '@/components/ui/Icon';
import { FAQ } from '@/data/faq';
import { whatsappLink } from '@/data/site';

export const metadata = {
  title: 'FAQ',
  description: 'Answers about turnaround, quotes, GST invoices, delivery, artwork, privacy and terms at Nexuz Hub, Coimbatore.',
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: 'FAQ' }]}
        eyebrow="Commonly asked"
        title={['Questions,', <span key="b" className="text-gold-deep">answered.</span>]}
        intro="Quick answers about orders, timing, files and policies. Can’t find yours? Ask below or message us on WhatsApp."
      />
      <section className="mx-auto grid max-w-[1440px] gap-14 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-[16rem_1fr]">
        <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
          <p className="label text-ink/50">Topics</p>
          <ul className="mt-4 flex flex-wrap gap-2 lg:flex-col">
            {FAQ.map((g) => (
              <li key={g.group}>
                <a href={`#${g.group.toLowerCase()}`} className="block rounded-full border border-line bg-white/50 px-4 py-2 text-sm hover:border-ink lg:rounded-xl">
                  {g.group}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-20">
          {FAQ.map((g, i) => (
            <div key={g.group} id={g.group.toLowerCase()} className="scroll-mt-28">
              <p className="label flex items-center gap-3 text-ink/50">
                <span className="text-gold-deep">§0{i + 1}</span> {g.group}
              </p>
              <div className="mt-6">
                <FaqList items={g.items.map((x, k) => ({ ...x, open: i === 0 && k === 0 }))} />
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="px-3 pb-3 md:px-5 md:pb-5">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink text-paper">
          <div className="grid-paper-dark absolute inset-0" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-[1400px] gap-12 px-6 py-16 md:px-12 md:py-20 lg:grid-cols-[1fr_1.2fr]">
            <div data-reveal>
              <p className="label text-gold">Still have questions?</p>
              <h2 className="display mt-5 text-[clamp(2.16rem,4.32vw,3.96rem)]">Ask us directly.</h2>
              <p className="mt-5 max-w-md text-paper/65">If your question isn’t listed here, send it over — or message us on WhatsApp. We’re happy to help!</p>
              <a href={whatsappLink('Hi Nexuz Hub! I have a question.')} target="_blank" rel="noopener noreferrer" className="btn btn-line-light mt-8">
                <WhatsAppIcon size={17} /> WhatsApp us
              </a>
            </div>
            <div data-reveal style={{ '--d': 1 }}>
              <EnquiryForm type="question" dark submitLabel="Send question" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
