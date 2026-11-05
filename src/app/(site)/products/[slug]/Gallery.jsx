'use client';

import Image from 'next/image';
import { useState } from 'react';

// Product photo viewer: large image + thumbnails.
export default function Gallery({ images, name }) {
  const [active, setActive] = useState(0);
  if (!images.length) return <div className="hatch aspect-square rounded-2xl border border-dashed border-ink/25" />;

  return (
    <div>
      <div className="crop">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-paper-2">
          {images.map((src, i) => (
            <Image
              key={src}
              src={src}
              alt={`${name} — photo ${i + 1}`}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 52vw, 100vw"
              className={`object-cover transition-opacity duration-500 ${i === active ? 'opacity-100' : 'opacity-0'}`}
            />
          ))}
        </div>
      </div>
      {images.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              className={`relative size-20 shrink-0 overflow-hidden rounded-xl border-2 transition-colors ${i === active ? 'border-ink' : 'border-transparent opacity-70 hover:opacity-100'}`}
              aria-label={`Show photo ${i + 1}`}
              aria-pressed={i === active}
            >
              <Image src={src} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
