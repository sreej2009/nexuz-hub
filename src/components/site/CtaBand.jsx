import EnquiryForm from '@/components/forms/EnquiryForm';
import Icon, { WhatsAppIcon } from '@/components/ui/Icon';
import { whatsappLink } from '@/data/site';

// Closing call-to-action used at the bottom of most pages: quick callback form + WhatsApp.
export default function CtaBand({ title = 'Send a sketch. Get it made in 48 hours.', sub }) {
  return (
    <section className="px-3 pb-3 md:px-5 md:pb-5">
      <div className="relative overflow-hidden rounded-[2rem] bg-gold text-ink">
        <div className="grid-paper absolute inset-0 opacity-70" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1400px] gap-10 px-6 py-16 md:px-12 md:py-20 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div data-reveal>
            <p className="label flex items-center gap-2">
              <span className="size-2 rounded-full bg-ink" /> Start a project
            </p>
            <h2 className="display mt-5 text-[clamp(2.16rem,5.04vw,4.68rem)]">{title}</h2>
            <p className="mt-5 max-w-lg text-lg text-ink/75">
              {sub ?? 'Leave your number and we’ll call you back with ideas, material options and a firm price — no obligation.'}
            </p>
          </div>
          <div data-reveal style={{ '--d': 2 }}>
            <div className="rounded-2xl bg-paper/90 p-5 shadow-[0_20px_60px_-30px_rgb(21_19_15/0.5)] md:p-6">
              <p className="label mb-4 text-ink/60">Request a callback</p>
              <EnquiryForm type="callback" submitLabel="Call me" />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-ink/80">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold hover:underline">
                <WhatsAppIcon size={16} /> Or send it on WhatsApp
              </a>
              <span className="inline-flex items-center gap-2">
                <Icon name="check" size={16} /> No-obligation quote
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
