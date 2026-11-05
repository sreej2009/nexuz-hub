'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

// One observer for the whole page: elements with [data-reveal] fade up once
// when they scroll into view. Cheap (no per-element JS) and re-scans on navigation.
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    let pending = [...document.querySelectorAll('[data-reveal]:not(.is-in)')];
    const show = (el) => el.classList.add('is-in');
    if (!('IntersectionObserver' in window)) {
      pending.forEach(show);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            show(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    pending.forEach((el) => io.observe(el));

    // Safety net: after fast scrolls or anchor jumps, reveal anything already above
    // the bottom of the screen so content can never stay hidden.
    let frame = 0;
    const sweep = () => {
      frame = 0;
      const limit = window.innerHeight;
      pending = pending.filter((el) => {
        if (el.classList.contains('is-in')) return false;
        if (el.getBoundingClientRect().top < limit) {
          show(el);
          io.unobserve(el);
          return false;
        }
        return true;
      });
      if (!pending.length) window.removeEventListener('scroll', onScroll);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sweep);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    const t = setTimeout(sweep, 400);

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      clearTimeout(t);
    };
  }, [pathname]);

  return null;
}
