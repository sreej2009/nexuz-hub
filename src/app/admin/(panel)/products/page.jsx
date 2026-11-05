import Image from 'next/image';
import Link from 'next/link';
import { deleteProductAction, toggleProductFlag } from '@/app/admin/actions';
import ConfirmButton from '@/components/admin/ConfirmButton';
import { Notice, PageTitle, timeAgo } from '@/components/admin/ui';
import Icon from '@/components/ui/Icon';
import { categoryLabel } from '@/data/ranges';
import { requireAdmin } from '@/lib/auth';
import { listProducts } from '@/lib/store';

export const metadata = { title: 'Products' };

function Toggle({ id, field, on, label }) {
  return (
    <form action={toggleProductFlag}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="field" value={field} />
      <button
        className={`label rounded-full border px-2.5 py-1 text-[0.6rem] transition-colors ${on ? 'border-ink bg-ink text-paper' : 'border-line text-ink/50 hover:border-ink hover:text-ink'}`}
        aria-pressed={on}
        title={`Click to ${on ? 'turn off' : 'turn on'} ${label.toLowerCase()}`}
      >
        {label}
      </button>
    </form>
  );
}

export default async function AdminProducts({ searchParams }) {
  await requireAdmin();
  const sp = await searchParams;
  const products = await listProducts({ includeDrafts: true });

  return (
    <>
      <PageTitle eyebrow="Catalogue" title="Products">
        <Link href="/admin/products/new" className="btn btn-gold btn-sm">
          <Icon name="plus" size={15} /> Add product
        </Link>
      </PageTitle>
      {sp.saved && <Notice>“{sp.saved}” saved. It’s now on the website{products.find((p) => p.name === sp.saved && !p.published) ? ' as a draft (hidden)' : ''}.</Notice>}
      {sp.deleted && <Notice>Product deleted.</Notice>}

      {products.length ? (
        <ul className="grid gap-3">
          {products.map((p) => (
            <li key={p.id} className="flex flex-wrap items-center gap-4 rounded-2xl border border-line bg-white/60 p-3 pr-5">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-paper-2">
                {p.images?.[0] ? <Image src={p.images[0]} alt="" fill sizes="80px" className="object-cover" /> : <div className="hatch absolute inset-0" />}
              </div>
              <div className="min-w-48 flex-1">
                <Link href={`/admin/products/${p.id}`} className="font-semibold hover:text-gold-deep">
                  {p.name}
                </Link>
                <p className="text-sm text-ink/55">
                  {categoryLabel(p.category)}
                  {p.price && ` · ${p.price}`} · {p.images?.length ?? 0} photo{p.images?.length === 1 ? '' : 's'} · updated {timeAgo(p.updatedAt)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Toggle id={p.id} field="published" on={p.published} label={p.published ? 'Live' : 'Draft'} />
                <Toggle id={p.id} field="featured" on={p.featured} label="Featured" />
                {p.published && (
                  <a href={`/products/${p.slug}`} target="_blank" className="flex size-9 items-center justify-center rounded-full border border-line hover:border-ink" aria-label="View on website">
                    <Icon name="eye" size={16} />
                  </a>
                )}
                <Link href={`/admin/products/${p.id}`} className="flex size-9 items-center justify-center rounded-full border border-line hover:border-ink" aria-label="Edit">
                  <Icon name="edit" size={16} />
                </Link>
                <form action={deleteProductAction}>
                  <input type="hidden" name="id" value={p.id} />
                  <ConfirmButton message={`Delete “${p.name}” and its photos?`} className="flex size-9 items-center justify-center rounded-full border border-line text-laser hover:border-laser">
                    <Icon name="trash" size={16} />
                  </ConfirmButton>
                </form>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="hatch rounded-2xl border border-dashed border-ink/25 px-6 py-16 text-center">
          <p className="display text-3xl">No products yet.</p>
          <p className="mx-auto mt-2 max-w-md text-ink/60">Add your first product — it will appear on the Products page and its range page as soon as you save it.</p>
          <Link href="/admin/products/new" className="btn btn-ink mt-6">
            <Icon name="plus" size={15} /> Add product
          </Link>
        </div>
      )}
    </>
  );
}
