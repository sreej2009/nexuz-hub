import EnquiryForm from '@/components/forms/EnquiryForm';
import { RiseLines } from '@/components/site/blocks';
import Icon, { WhatsAppIcon } from '@/components/ui/Icon';
import { SITE, mapsLink, whatsappLink } from '@/data/site';

export const metadata = {
  title: 'Contact Us',
  description: 'Get a quote from Nexuz Hub — 221 D/1, Sathy Road (East), Saravanampatti, Coimbatore. Call +91 90036 24196 or WhatsApp us.',
};

const { lat, lng } = SITE.coords;
const MAP_SRC = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.012}%2C${lat - 0.008}%2C${lng + 0.012}%2C${lat + 0.008}&layer=mapnik&marker=${lat}%2C${lng}`;

export default function ContactPage() {
  const cards = [
    { icon: 'phone', label: 'Call us', lines: [SITE.phone, SITE.phone2], href: SITE.phoneHref },
    { icon: 'mail', label: 'Email us', lines: [SITE.email], href: `mailto:${SITE.email}` },
    { icon: 'pin', label: 'Visit us', lines: SITE.address, href: mapsLink, external: true },
  ];
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-paper absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1440px] gap-14 px-5 pt-12 pb-20 md:px-8 md:pt-16 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <p className="chip text-ink/70">Reply within 24 hours</p>
            <h1 className="display rise mt-7 text-[clamp(2.59rem,6.48vw,5.76rem)]">
              <RiseLines lines={['Let’s build', <span key="b" className="text-gold-deep">something.</span>]} />
            </h1>
            <p className="lede mt-7 max-w-lg" data-reveal>
              Have a project in mind? Send us your idea, artwork or a rough sketch and we’ll reply with a quote within 24 hours. WhatsApp is the fastest way to reach us.
            </p>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ink mt-8" data-reveal>
              <WhatsAppIcon size={17} /> Chat on WhatsApp
            </a>
            <ul className="mt-12 space-y-3">
              {cards.map((c, i) => (
                <li key={c.label} data-reveal style={{ '--d': i }}>
                  <a
                    href={c.href}
                    {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex gap-5 rounded-2xl border border-line bg-white/50 p-5 transition-colors hover:border-ink"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gold text-ink">
                      <Icon name={c.icon} size={19} />
                    </span>
                    <span className="flex-1">
                      <span className="label block text-ink/50">{c.label}</span>
                      {c.lines.map((l) => (
                        <span key={l} className="mt-1 block font-medium">
                          {l}
                        </span>
                      ))}
                    </span>
                    <Icon name="arrowUpRight" size={18} className="text-ink/40 transition-colors group-hover:text-ink" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="crop self-start" data-reveal style={{ '--d': 1 }}>
            <div className="rounded-[1.6rem] border border-line bg-paper p-6 shadow-[0_40px_80px_-50px_rgb(21_19_15/0.5)] md:p-9">
              <p className="label text-ink/55">Quote request</p>
              <h2 className="display mt-3 text-4xl">Tell us about your project.</h2>
              <EnquiryForm type="quote" submitLabel="Send request" className="mt-8" />
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="label text-ink/50">Find the workshop</p>
            <p className="display mt-2 text-3xl">{SITE.address[1]}</p>
          </div>
          <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-line btn-sm">
            Open in Google Maps <Icon name="external" size={14} />
          </a>
        </div>
        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-paper-2">
          <iframe title="Nexuz Hub location map" src={MAP_SRC} loading="lazy" className="h-[340px] w-full grayscale-[0.4] md:h-[480px]" />
        </div>
      </section>
    </>
  );
}
