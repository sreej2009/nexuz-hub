'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';
import { saveProduct } from '@/app/admin/actions';
import Icon from '@/components/ui/Icon';
import { PRODUCT_CATEGORIES } from '@/data/ranges';

const MAX_IMAGES = 6;
const MAX_BYTES = 5 * 1024 * 1024;

function Label({ children, hint }) {
  return (
    <span className="mb-2 flex items-baseline justify-between gap-3">
      <span className="label text-ink/60">{children}</span>
      {hint && <span className="text-xs text-ink/45">{hint}</span>}
    </span>
  );
}

const Err = ({ msg }) => (msg ? <span className="mt-1.5 block text-sm text-laser">{msg}</span> : null);

export default function ProductForm({ product }) {
  const [state, action, pending] = useActionState(saveProduct, null);
  const err = state?.errors ?? {};
  const [kept, setKept] = useState(product?.images ?? []);
  const [added, setAdded] = useState([]); // { file, url }
  const [localError, setLocalError] = useState('');
  const [slugEdited, setSlugEdited] = useState(Boolean(product));
  const [slug, setSlug] = useState(product?.slug ?? '');

  useEffect(() => () => added.forEach((a) => URL.revokeObjectURL(a.url)), []); // eslint-disable-line react-hooks/exhaustive-deps

  const addFiles = (list) => {
    setLocalError('');
    const room = MAX_IMAGES - kept.length - added.length;
    const files = [...list].filter((f) => {
      if (!f.type.startsWith('image/')) return setLocalError(`“${f.name}” isn’t an image.`), false;
      if (f.size > MAX_BYTES) return setLocalError(`“${f.name}” is over 5 MB. Please use a smaller photo.`), false;
      return true;
    });
    if (files.length > room) setLocalError(`Only ${MAX_IMAGES} photos per product — extra photos were skipped.`);
    setAdded((a) => [...a, ...files.slice(0, Math.max(0, room)).map((file) => ({ file, url: URL.createObjectURL(file) }))]);
  };

  const autoSlug = (name) =>
    name
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 80);

  const total = kept.length + added.length;

  // Submit manually so React doesn't reset the form on validation errors, and attach the new photos.
  const onSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    fd.delete('images');
    added.forEach((a) => fd.append('images', a.file));
    startTransition(() => action(fd));
  };

  return (
    <form onSubmit={onSubmit} className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
      {product && <input type="hidden" name="id" value={product.id} />}
      {kept.map((u) => (
        <input key={u} type="hidden" name="keepImages" value={u} />
      ))}

      <div className="space-y-6">
        <section className="space-y-5 rounded-2xl border border-line bg-white/60 p-6">
          <label className="block">
            <Label>Product name *</Label>
            <input
              name="name"
              defaultValue={product?.name}
              required
              maxLength={120}
              placeholder="e.g. Engraved walnut photo frame"
              className="field"
              onChange={(e) => !slugEdited && setSlug(autoSlug(e.target.value))}
            />
            <Err msg={err.name} />
          </label>
          <label className="block">
            <Label hint="/products/…">Web address</Label>
            <input
              name="slug"
              value={slug}
              onChange={(e) => {
                setSlugEdited(true);
                setSlug(e.target.value);
              }}
              placeholder="engraved-walnut-photo-frame"
              className="field font-mono text-sm"
            />
            <Err msg={err.slug} />
          </label>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <Label>Category</Label>
              <select name="category" defaultValue={product?.category ?? PRODUCT_CATEGORIES[0].value} className="field">
                {PRODUCT_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <Label hint="optional">Price</Label>
              <input name="price" defaultValue={product?.price} maxLength={40} placeholder="e.g. From ₹499" className="field" />
            </label>
          </div>
          <label className="block">
            <Label hint="shown on product cards">Short description</Label>
            <input name="shortDescription" defaultValue={product?.shortDescription} maxLength={220} placeholder="One line that sells it" className="field" />
          </label>
          <label className="block">
            <Label hint="blank line = new paragraph">Full description</Label>
            <textarea name="description" defaultValue={product?.description} rows={6} maxLength={5000} className="field resize-y" />
          </label>
        </section>

        <section className="grid gap-5 rounded-2xl border border-line bg-white/60 p-6 sm:grid-cols-2">
          <label className="block">
            <Label hint="one per line">Highlights</Label>
            <textarea
              name="features"
              defaultValue={product?.features?.join('\n')}
              rows={6}
              placeholder={'Laser-engraved name or date\nGift box included\nReady in 48 hours'}
              className="field resize-y text-sm"
            />
          </label>
          <label className="block">
            <Label hint="Label: value, one per line">Specifications</Label>
            <textarea
              name="specs"
              defaultValue={product?.specs?.map((s) => `${s.key}: ${s.value}`).join('\n')}
              rows={6}
              placeholder={'Material: Solid walnut\nSize: 6 × 8 in\nFinish: Natural oil'}
              className="field resize-y font-mono text-sm"
            />
          </label>
        </section>
      </div>

      <div className="space-y-6">
        <section className="rounded-2xl border border-line bg-white/60 p-6">
          <Label hint={`${total}/${MAX_IMAGES} · JPG, PNG, WebP · max 5 MB`}>Photos</Label>
          <div className="grid grid-cols-3 gap-2">
            {kept.map((u, i) => (
              <div key={u} className="group relative aspect-square overflow-hidden rounded-xl bg-paper-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={u} alt="" className="size-full object-cover" />
                {i === 0 && <span className="label absolute top-1.5 left-1.5 rounded-full bg-ink px-2 py-0.5 text-[0.55rem] text-gold">Cover</span>}
                <button type="button" onClick={() => setKept((k) => k.filter((x) => x !== u))} className="absolute top-1.5 right-1.5 flex size-7 items-center justify-center rounded-full bg-paper/90 text-laser" aria-label="Remove photo">
                  <Icon name="close" size={14} />
                </button>
              </div>
            ))}
            {added.map((a, i) => (
              <div key={a.url} className="relative aspect-square overflow-hidden rounded-xl bg-paper-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={a.url} alt="" className="size-full object-cover" />
                {kept.length === 0 && i === 0 && <span className="label absolute top-1.5 left-1.5 rounded-full bg-ink px-2 py-0.5 text-[0.55rem] text-gold">Cover</span>}
                <span className="label absolute bottom-1.5 left-1.5 rounded-full bg-gold px-2 py-0.5 text-[0.55rem]">New</span>
                <button
                  type="button"
                  onClick={() => {
                    URL.revokeObjectURL(a.url);
                    setAdded((list) => list.filter((x) => x !== a));
                  }}
                  className="absolute top-1.5 right-1.5 flex size-7 items-center justify-center rounded-full bg-paper/90 text-laser"
                  aria-label="Remove photo"
                >
                  <Icon name="close" size={14} />
                </button>
              </div>
            ))}
            {total < MAX_IMAGES && (
              <label
                className="flex aspect-square cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border border-dashed border-ink/30 text-ink/55 transition-colors hover:border-ink hover:text-ink"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  addFiles(e.dataTransfer.files);
                }}
              >
                <Icon name="upload" size={22} />
                <span className="text-xs">Add photos</span>
                <input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple className="sr-only" onChange={(e) => (addFiles(e.target.files), (e.target.value = ''))} />
              </label>
            )}
          </div>
          <Err msg={localError || err.images} />
          <p className="mt-3 text-xs text-ink/45">The first photo is the cover. Square photos look best.</p>
        </section>

        <section className="space-y-4 rounded-2xl border border-line bg-white/60 p-6">
          <label className="flex items-start gap-3">
            <input type="checkbox" name="published" defaultChecked={product ? product.published : true} className="mt-1 size-4 accent-[var(--color-ink)]" />
            <span>
              <span className="block font-medium">Show on website</span>
              <span className="text-sm text-ink/55">Untick to save as a hidden draft.</span>
            </span>
          </label>
          <label className="flex items-start gap-3">
            <input type="checkbox" name="featured" defaultChecked={product?.featured} className="mt-1 size-4 accent-[var(--color-ink)]" />
            <span>
              <span className="block font-medium">Featured</span>
              <span className="text-sm text-ink/55">Shown first and on the home page.</span>
            </span>
          </label>
        </section>

        {state?.error && <p className="text-sm text-laser">{state.error}</p>}
        <button type="submit" disabled={pending} className="btn btn-ink w-full">
          {pending ? 'Saving…' : product ? 'Save changes' : 'Add product'}
        </button>
      </div>
    </form>
  );
}
