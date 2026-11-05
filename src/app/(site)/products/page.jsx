import Image from 'next/image';
import Link from 'next/link';
import CtaBand from '@/components/site/CtaBand';
import { PageHero, ProductCard, SectionHead } from '@/components/site/blocks';
import Icon from '@/components/ui/Icon';
import { PRODUCT_CATEGORIES, RANGES } from '@/data/ranges';
import { listProducts } from '@/lib/store';

export const metadata = {
  title: 'Products',
  description: 'Personalised gifts, signage & commercial branding and home decor — printed, engraved and finished in-house at Nexuz Hub, Coimbatore.',
};

export default async function ProductsPage({ searchParams }) {
  // The static preview has no server to read ?category=, so it always shows everything.
  const { category } = process.env.STATIC_EXPORT === '1' ? {} : await searchParams;
  const active = PRODUCT_CATEGORIES.some((c) => c.value === category) ? category : '';
  const [all, products] = await Promise.all([listProducts(), listProducts({ category: active || undefined })]);
  const counts = Object.fromEntries(PRODUCT_CATEGORIES.map((c) => [c.value, all.filter((p) => p.category === c.value).length]));

  return (
    <>
      <PageHero
        crumbs={[{ label: 'Products' }]}
        eyebrow="Made to order · 24–48 hr dispatch"
        title={['Objects worth', <span key="b" className="text-gold-deep">keeping.</span>]}
        intro="Three product ranges, endless combinations. Send a photo, logo or line of text — we print, engrave and finish every piece in Saravanampatti."
      />

      {/* Ranges */}
      <section className="mx-auto max-w-[1440px] px-5 py-20 md:px-8 md:py-28">
        <div className="space-y-20 md:space-y-28">
          {RANGES.map((r, i) => (
            <article key={r.slug} className={`grid gap-10 lg:grid-cols-2 lg:items-center ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <Link href={`/products/${r.slug}`} className="crop group block" data-reveal>
                <div className="relative aspect-[5/4] overflow-hidden rounded-2xl bg-paper-2">
                  <Image src={r.heroImage} alt={r.name} fill sizes="(min-width: 1024px) 48vw, 100vw" priority={i === 0} className="object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </Link>
              <div data-reveal style={{ '--d': 1 }}>
                <p className="label flex items-center gap-3 text-ink/50">
                  <span className="font-stencil text-3xl text-gold-deep">{String(i + 1).padStart(2, '0')}</span> {r.categoryTag}
                </p>
                <h2 className="display mt-4 text-[clamp(2.16rem,3.96vw,3.6rem)]">{r.name}</h2>
                <p className="lede mt-5 max-w-xl">{r.blurb}</p>
                <dl className="mt-8 grid max-w-xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line">
                  {r.techSpecs.slice(0, 4).map((t) => (
                    <div key={t.key} className="bg-paper px-4 py-3.5">
                      <dt className="label text-[0.6rem] text-ink/45">{t.key}</dt>
                      <dd className="mt-1 text-sm font-medium">{t.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <Link href={`/products/${r.slug}`} className="btn btn-ink">
                    Explore range <Icon name="arrow" size={16} />
                  </Link>
                  {counts[r.slug] > 0 && (
                    <Link href={`/products?category=${r.slug}#catalogue`} className="label link-line text-ink/70">
                      {counts[r.slug]} product{counts[r.slug] > 1 ? 's' : ''} in catalogue
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Catalogue of admin-managed products */}
      <section id="catalogue" className="scroll-mt-24 border-t border-line bg-paper-2/60 py-24 md:py-28">
        <div className="mx-auto max-w-[1440px] px-5 md:px-8">
          <SectionHead index="02" eyebrow="Catalogue" title="Shop the workshop." intro="Ready designs you can order as they are or personalise with your own text, photo or logo." />
          <nav aria-label="Filter by category" className="mt-10 flex flex-wrap gap-2">
            {[{ value: '', label: 'All' }, ...PRODUCT_CATEGORIES].map((c) => {
              const n = c.value ? counts[c.value] : all.length;
              if (c.value && !n) return null;
              const on = active === c.value;
              return (
                <Link
                  key={c.value || 'all'}
                  href={c.value ? `/products?category=${c.value}#catalogue` : '/products#catalogue'}
                  scroll={false}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${on ? 'border-ink bg-ink text-paper' : 'border-line bg-white/50 hover:border-ink'}`}
                  aria-current={on ? 'page' : undefined}
                >
                  {c.label} <span className={on ? 'text-paper/60' : 'text-ink/40'}>{n}</span>
                </Link>
              );
            })}
          </nav>

          {products.length ? (
            <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} priority={i < 4} />
              ))}
            </div>
          ) : (
            <div className="hatch mt-10 rounded-2xl border border-dashed border-ink/25 px-6 py-16 text-center">
              <p className="display text-3xl">New pieces are on the bench.</p>
              <p className="mx-auto mt-3 max-w-md text-ink/60">
                Our catalogue is being photographed. Tell us what you have in mind and we’ll send ideas and prices today.
              </p>
              <Link href="/contact-us" className="btn btn-ink mt-7">
                Ask for ideas <Icon name="arrow" size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>
      <div className="pt-3 md:pt-5">
        <CtaBand />
      </div>
    </>
  );
}
