'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Icon from '@/components/ui/Icon';

// Services index.
// Desktop: list on the left, a large photo panel on the right that follows hover/focus.
// Mobile: swipeable photo cards (CSS scroll-snap) with a position counter.
export default function ServiceShowcase({ services }) {
  const [active, setActive] = useState(0);
  const [slide, setSlide] = useState(0);
  const track = useRef(null);
  const s = services[active];

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const card = el.firstElementChild;
    const step = card ? card.getBoundingClientRect().width + 12 : el.clientWidth;
    setSlide(Math.min(services.length - 1, Math.round(el.scrollLeft / step)));
  };

  return (
    <>
      {/* ---------- Desktop ---------- */}
      <div className="hidden gap-12 lg:grid lg:grid-cols-[1fr_1.05fr] xl:gap-16">
        <ul className="border-t border-line">
          {services.map((x, i) => {
            const on = i === active;
            return (
              <li key={x.slug} className="border-b border-line">
                <Link
                  href={`/services/${x.slug}`}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  className="group relative grid grid-cols-[3.25rem_1fr_auto] items-center gap-4 py-6 pr-2 xl:py-7"
                  aria-current={on ? 'true' : undefined}
                >
                  <span
                    className={`absolute top-0 bottom-0 -left-5 w-[3px] origin-top rounded-full bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] ${on ? 'scale-y-100' : 'scale-y-0'}`}
                    aria-hidden="true"
                  />
                  <span className={`font-stencil text-3xl leading-none transition-colors ${on ? 'text-gold-deep' : 'text-ink/25'}`}>{x.index}</span>
                  <span>
                    <span
                      className={`display block text-[clamp(1.6rem,2.3vw,2.25rem)] transition-all duration-500 ease-[var(--ease-out-expo)] ${on ? 'translate-x-1 text-ink' : 'text-ink/45 group-hover:text-ink/70'}`}
                    >
                      {x.name}
                    </span>
                    <span
                      className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${on ? 'mt-2 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <span className="overflow-hidden text-[0.95rem] text-ink/60">{x.blurb}</span>
                    </span>
                  </span>
                  <span
                    className={`flex size-11 items-center justify-center rounded-full border transition-all duration-300 ${on ? 'border-ink bg-ink text-gold' : 'border-line text-ink/40'}`}
                  >
                    <Icon name="arrowUpRight" size={18} />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="relative">
          <div className="crop sticky top-28">
            <div className="relative aspect-[4/4.6] overflow-hidden rounded-[1.6rem] bg-ink">
              {services.map((x, i) => (
                <Image
                  key={x.slug}
                  src={x.image}
                  alt={x.name}
                  fill
                  sizes="(min-width: 1440px) 680px, 48vw"
                  className={`object-cover transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] ${i === active ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
              <div className="absolute top-5 right-5 left-5 flex items-center justify-between">
                <span className="chip border-paper/30 bg-ink/50 text-paper backdrop-blur-sm">{s.tag}</span>
                <span className="label rounded-full bg-ink/50 px-3 py-1.5 text-paper/80 backdrop-blur-sm">
                  {s.index} / {String(services.length).padStart(2, '0')}
                </span>
              </div>
              <div key={s.slug} className="showcase-in absolute inset-x-0 bottom-0 p-7 text-paper">
                <p className="label text-gold">{s.badge}</p>
                <p className="display mt-3 text-[2.4rem] leading-[0.95]">{s.name}</p>
                {s.metrics?.length > 0 && (
                  <dl className="mt-6 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-paper/15 bg-paper/15">
                    {s.metrics.slice(0, 3).map((m) => (
                      <div key={m.label} className="bg-ink/70 px-3 py-3 backdrop-blur-sm">
                        <dt className="label text-[0.56rem] text-paper/50">{m.label}</dt>
                        <dd className={`font-stencil mt-1 text-2xl leading-none ${m.highlight ? 'text-gold' : ''}`}>{m.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                <Link href={`/services/${s.slug}`} className="btn btn-gold btn-sm mt-6">
                  Explore {s.short} <Icon name="arrow" size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Mobile / tablet ---------- */}
      <div className="lg:hidden">
        <div
          ref={track}
          onScroll={onScroll}
          className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] md:-mx-8 md:scroll-px-8 md:px-8 [&::-webkit-scrollbar]:hidden"
          aria-label="Services"
        >
          {services.map((x) => (
            <Link
              key={x.slug}
              href={`/services/${x.slug}`}
              className="relative w-[82%] shrink-0 snap-start overflow-hidden rounded-[1.4rem] bg-ink text-paper sm:w-[46%]"
            >
              <div className="relative aspect-[4/5]">
                <Image src={x.image} alt={x.name} fill sizes="(min-width: 640px) 46vw, 82vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
                <span className="font-stencil absolute top-4 left-4 text-4xl leading-none text-paper/90">{x.index}</span>
                <span className="chip absolute top-4 right-4 border-paper/30 bg-ink/50 text-[0.58rem] text-paper backdrop-blur-sm">{x.tag}</span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="display text-[1.85rem] leading-[0.95]">{x.name}</p>
                  <p className="mt-2.5 line-clamp-3 text-sm text-paper/70">{x.blurb}</p>
                  <span className="label mt-4 inline-flex items-center gap-2 text-gold">
                    Explore <Icon name="arrow" size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-1.5" aria-hidden="true">
            {services.map((x, i) => (
              <span key={x.slug} className={`h-1.5 rounded-full transition-all duration-300 ${i === slide ? 'w-7 bg-ink' : 'w-1.5 bg-ink/20'}`} />
            ))}
          </div>
          <p className="label text-ink/50">
            <span className="text-ink">{String(slide + 1).padStart(2, '0')}</span> / {String(services.length).padStart(2, '0')} · Swipe
          </p>
        </div>
      </div>
    </>
  );
}
