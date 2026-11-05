import Image from 'next/image';
import Link from 'next/link';
import EnquiryForm from '@/components/forms/EnquiryForm';
import CtaBand from '@/components/site/CtaBand';
import { ProductCard, SectionHead } from '@/components/site/blocks';
import Icon, { WhatsAppIcon } from '@/components/ui/Icon';
import { categoryLabel, getRange } from '@/data/ranges';
import { whatsappLink } from '@/data/site';
import { listProducts } from '@/lib/store';
import Gallery from './Gallery';

// Page for a product added from the admin page.
export default async function ProductView({ product: p }) {
  const range = getRange(p.category);
  const related = (await listProducts({ category: p.category })).filter((x) => x.id !== p.id).slice(0, 4);

  return (
    <>
      <section className="relative border-b border-line">
        <div className="grid-paper absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1440px] gap-12 px-5 pt-10 pb-16 md:px-8 md:pt-14 lg:grid-cols-[1.1fr_1fr]">
          <Gallery images={p.images ?? []} name={p.name} />
          <div className="lg:pt-6">
            <nav aria-label="Breadcrumb" className="label flex flex-wrap gap-2 text-ink/45">
              <Link href="/" className="hover:text-ink">
                Home
              </Link>
              <span>/</span>
              <Link href="/products" className="hover:text-ink">
                Products
              </Link>
              <span>/</span>
              {range ? (
                <Link href={`/products/${range.slug}`} className="hover:text-ink">
                  {range.short}
                </Link>
              ) : (
                <span>{categoryLabel(p.category)}</span>
              )}
            </nav>
            <h1 className="display mt-6 text-[clamp(2.16rem,4.32vw,3.96rem)]">{p.name}</h1>
            {p.price && <p className="font-stencil mt-4 text-3xl text-gold-deep">{p.price}</p>}
            {p.shortDescription && <p className="lede mt-5">{p.shortDescription}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#enquire" className="btn btn-gold">
                Enquire / order <Icon name="arrow" size={16} />
              </a>
              <a href={whatsappLink(`Hi Nexuz Hub! I'd like to order: ${p.name}`)} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                <WhatsAppIcon size={17} /> WhatsApp
              </a>
            </div>
            {p.features?.length > 0 && (
              <ul className="mt-10 space-y-3 border-t border-line pt-8">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <Icon name="check" size={18} className="mt-0.5 shrink-0 text-gold-deep" strokeWidth={2} />
                    <span className="text-ink/80">{f}</span>
                  </li>
                ))}
              </ul>
            )}
            {p.specs?.length > 0 && (
              <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                {p.specs.map((s) => (
                  <div key={s.key} className="bg-paper px-4 py-3.5">
                    <dt className="label text-[0.6rem] text-ink/45">{s.key}</dt>
                    <dd className="mt-1 text-sm font-medium">{s.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </section>

      {p.description && (
        <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
            <p className="label text-ink/55">About this product</p>
            <div className="max-w-3xl space-y-4 text-lg leading-relaxed text-ink/75">
              {p.description.split(/\n{2,}/).map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="enquire" className="scroll-mt-28 border-t border-line bg-paper-2/60">
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:px-8 lg:grid-cols-[1fr_1.2fr]">
          <SectionHead eyebrow="Order enquiry" title="Make one for me." intro="Tell us the quantity and any text, photo or logo to add. We’ll confirm price and send a proof before making it." />
          <div className="rounded-2xl border border-line bg-white/60 p-6 md:p-8" data-reveal>
            <EnquiryForm type="product" product={p.name} submitLabel="Send enquiry" />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1440px] px-5 py-24 md:px-8">
          <SectionHead eyebrow="You may also like" title="More from this range." />
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </section>
      )}
      <CtaBand />
    </>
  );
}
