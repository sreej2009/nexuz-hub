import Link from 'next/link';
import { PageTitle, StatusBadge, TYPE_LABEL, timeAgo } from '@/components/admin/ui';
import Icon from '@/components/ui/Icon';
import { requireAdmin } from '@/lib/auth';
import { getStats, listEnquiries } from '@/lib/store';

export const metadata = { title: 'Dashboard' };

export default async function Dashboard() {
  await requireAdmin();
  const [stats, latest] = await Promise.all([getStats(), listEnquiries()]);
  const cards = [
    { label: 'New enquiries', value: stats.newEnquiries, href: '/admin/enquiries?status=new', accent: true },
    { label: 'Enquiries this week', value: stats.thisWeek, href: '/admin/enquiries' },
    { label: 'All enquiries', value: stats.enquiries, href: '/admin/enquiries' },
    { label: 'Products live', value: `${stats.published}/${stats.products}`, href: '/admin/products' },
  ];
  return (
    <>
      <PageTitle eyebrow="Overview" title="Dashboard">
        <Link href="/admin/products/new" className="btn btn-gold btn-sm">
          <Icon name="plus" size={15} /> Add product
        </Link>
      </PageTitle>

      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.label} href={c.href} className={`rounded-2xl border p-5 transition-colors ${c.accent ? 'border-gold bg-gold/15 hover:bg-gold/25' : 'border-line bg-white/60 hover:bg-white'}`}>
            <p className="label text-ink/55">{c.label}</p>
            <p className="font-stencil mt-3 text-4xl leading-none">{c.value}</p>
          </Link>
        ))}
      </div>

      <section className="mt-10 rounded-2xl border border-line bg-white/60">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="display text-2xl">Latest enquiries</h2>
          <Link href="/admin/enquiries" className="label inline-flex items-center gap-2 hover:text-gold-deep">
            View all <Icon name="arrow" size={14} />
          </Link>
        </div>
        {latest.length ? (
          <ul className="divide-y divide-line">
            {latest.slice(0, 6).map((e) => (
              <li key={e.id}>
                <Link href={`/admin/enquiries/${e.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4 hover:bg-paper-2/60">
                  <StatusBadge status={e.status} />
                  <span className="font-semibold">{e.name}</span>
                  <span className="text-sm text-ink/55">{e.product || e.service || TYPE_LABEL[e.type]}</span>
                  <span className="ml-auto text-sm text-ink/45">{timeAgo(e.createdAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-5 py-10 text-center text-ink/55">No enquiries yet. They’ll appear here as soon as someone fills a form on the website.</p>
        )}
      </section>

      <section className="mt-6 grid gap-3 md:grid-cols-2">
        <Link href="/admin/products/new" className="group flex items-center gap-4 rounded-2xl border border-line bg-white/60 p-5 hover:bg-white">
          <span className="flex size-11 items-center justify-center rounded-full bg-ink text-gold">
            <Icon name="box" size={19} />
          </span>
          <span className="flex-1">
            <span className="block font-semibold">Add a product</span>
            <span className="text-sm text-ink/55">Photos, price, features — shows on the Products page instantly.</span>
          </span>
          <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
        <a href="/admin/enquiries/export" className="group flex items-center gap-4 rounded-2xl border border-line bg-white/60 p-5 hover:bg-white">
          <span className="flex size-11 items-center justify-center rounded-full bg-ink text-gold">
            <Icon name="download" size={19} />
          </span>
          <span className="flex-1">
            <span className="block font-semibold">Download enquiries (CSV)</span>
            <span className="text-sm text-ink/55">Opens in Excel or Google Sheets.</span>
          </span>
          <Icon name="arrow" size={18} className="transition-transform group-hover:translate-x-1" />
        </a>
      </section>
    </>
  );
}
