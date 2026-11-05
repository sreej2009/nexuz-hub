import Link from 'next/link';
import { PageHero } from '@/components/site/blocks';
import Icon from '@/components/ui/Icon';
import { LEGAL } from '@/data/legal';

const List = ({ items }) => (
  <ul className="mt-4 space-y-2.5">
    {items.map((li) => (
      <li key={li} className="flex gap-3">
        <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-gold" />
        <span>{li}</span>
      </li>
    ))}
  </ul>
);

export default function LegalPage({ slug }) {
  const doc = LEGAL[slug];
  const others = Object.entries(LEGAL).filter(([k]) => k !== slug);
  return (
    <>
      <PageHero crumbs={[{ label: doc.title }]} eyebrow={doc.eyebrow} title={doc.title} intro={doc.intro} />
      <section className="mx-auto grid max-w-[1440px] gap-14 px-5 py-20 md:px-8 md:py-24 lg:grid-cols-[16rem_1fr]">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="label text-ink/50">On this page</p>
          <ol className="mt-4 space-y-2 text-sm">
            {doc.sections.map((s, i) => (
              <li key={s.heading}>
                <a href={`#s${i + 1}`} className="flex gap-3 text-ink/65 hover:text-ink">
                  <span className="label text-gold-deep">{String(i + 1).padStart(2, '0')}</span> {s.heading}
                </a>
              </li>
            ))}
          </ol>
          <p className="label mt-10 text-ink/50">Related</p>
          <ul className="mt-3 space-y-2 text-sm">
            {others.map(([k, d]) => (
              <li key={k}>
                <Link href={`/${k}`} className="link-line text-ink/70">
                  {d.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
        <article className="max-w-3xl text-[1.05rem] leading-relaxed text-ink/75">
          {doc.preface?.map((p) => (
            <p key={p} className="mb-5">
              {p}
            </p>
          ))}
          {doc.sections.map((s, i) => (
            <section key={s.heading} id={`s${i + 1}`} className="scroll-mt-28 border-t border-line pt-8 pb-10">
              <h2 className="display flex items-baseline gap-4 text-3xl text-ink">
                <span className="font-stencil text-2xl text-gold-deep">{String(i + 1).padStart(2, '0')}</span>
                {s.heading}
              </h2>
              {s.body?.map((p) => (
                <p key={p} className="mt-4">
                  {p}
                </p>
              ))}
              {s.list && <List items={s.list} />}
              {s.after?.map((p) => (
                <p key={p} className="mt-4">
                  {p}
                </p>
              ))}
              {s.list2 && <List items={s.list2} />}
              {s.steps && (
                <ol className="mt-5 space-y-4">
                  {s.steps.map((st, k) => (
                    <li key={st.title} className="grid grid-cols-[2.5rem_1fr] gap-3 rounded-xl border border-line bg-white/50 p-5">
                      <span className="font-stencil text-2xl text-gold-deep">{k + 1}</span>
                      <span>
                        <span className="block font-semibold text-ink">{st.title}</span>
                        <span className="mt-1 block">{st.body}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              )}
              {s.link && (
                <Link href={s.link.href} className="label mt-5 inline-flex items-center gap-2 text-ink hover:text-gold-deep">
                  {s.link.label} <Icon name="arrow" size={14} />
                </Link>
              )}
            </section>
          ))}
        </article>
      </section>
    </>
  );
}
