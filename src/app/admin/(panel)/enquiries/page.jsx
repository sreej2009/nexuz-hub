import Link from 'next/link';
import { Notice, PageTitle, StatusBadge, TYPE_LABEL, formatDate, timeAgo } from '@/components/admin/ui';
import Icon from '@/components/ui/Icon';
import { requireAdmin } from '@/lib/auth';
import { ENQUIRY_STATUSES, listEnquiries } from '@/lib/store';

export const metadata = { title: 'Enquiries' };

export default async function EnquiriesPage({ searchParams }) {
  await requireAdmin();
  const sp = await searchParams;
  const status = ENQUIRY_STATUSES.includes(sp.status) ? sp.status : '';
  const type = TYPE_LABEL[sp.type] ? sp.type : '';
  const q = typeof sp.q === 'string' ? sp.q.slice(0, 80) : '';
  const [all, rows] = await Promise.all([listEnquiries(), listEnquiries({ status, type, q })]);
  const count = (s) => all.filter((e) => e.status === s).length;
  const qs = (patch) => {
    const p = new URLSearchParams({ ...(status && { status }), ...(type && { type }), ...(q && { q }), ...patch });
    for (const [k, v] of [...p]) if (!v) p.delete(k);
    const str = p.toString();
    return str ? `/admin/enquiries?${str}` : '/admin/enquiries';
  };

  return (
    <>
      <PageTitle eyebrow="Customers" title="Enquiries">
        <a href={`/admin/enquiries/export${status ? `?status=${status}` : ''}`} className="btn btn-line btn-sm">
          <Icon name="download" size={15} /> Export CSV
        </a>
      </PageTitle>
      {sp.deleted && <Notice>Enquiry deleted.</Notice>}

      <nav aria-label="Filter by status" className="flex flex-wrap gap-2">
        {[['', 'All', all.length], ...ENQUIRY_STATUSES.map((s) => [s, s, count(s)])].map(([s, label, n]) => (
          <Link
            key={s || 'all'}
            href={qs({ status: s })}
            className={`rounded-full border px-3.5 py-1.5 text-sm capitalize ${status === s ? 'border-ink bg-ink text-paper' : 'border-line bg-white/60 hover:border-ink'}`}
          >
            {label} <span className={status === s ? 'text-paper/55' : 'text-ink/40'}>{n}</span>
          </Link>
        ))}
      </nav>

      <form className="mt-4 flex flex-wrap gap-2" action="/admin/enquiries">
        {status && <input type="hidden" name="status" value={status} />}
        <label className="relative min-w-60 flex-1">
          <span className="sr-only">Search</span>
          <Icon name="search" size={17} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-ink/40" />
          <input name="q" defaultValue={q} placeholder="Search name, phone, email, message…" className="field !py-2.5 !pl-10" />
        </label>
        <select name="type" defaultValue={type} className="field !w-auto !py-2.5" aria-label="Source">
          <option value="">All sources</option>
          {Object.entries(TYPE_LABEL).map(([k, v]) => (
            <option key={k} value={k}>
              {v}
            </option>
          ))}
        </select>
        <button className="btn btn-ink btn-sm h-auto">Filter</button>
        {(q || type) && (
          <Link href={qs({ q: '', type: '' })} className="btn btn-line btn-sm h-auto">
            Clear
          </Link>
        )}
      </form>

      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-white/60">
        {rows.length ? (
          <table className="w-full text-left text-sm">
            <thead className="label hidden border-b border-line bg-paper-2/60 text-[0.62rem] text-ink/50 md:table-header-group">
              <tr>
                <th className="px-5 py-3 font-medium">Customer</th>
                <th className="px-5 py-3 font-medium">About</th>
                <th className="px-5 py-3 font-medium">Source</th>
                <th className="px-5 py-3 font-medium">Received</th>
                <th className="px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((e) => (
                <tr key={e.id} className="relative grid gap-1 px-5 py-4 hover:bg-paper-2/60 md:table-row md:p-0">
                  <td className="md:px-5 md:py-4">
                    <Link href={`/admin/enquiries/${e.id}`} className="font-semibold after:absolute after:inset-0 hover:text-gold-deep">
                      {e.name}
                    </Link>
                    <span className="block text-ink/55">{e.phone || e.email}</span>
                  </td>
                  <td className="max-w-xs md:px-5 md:py-4">
                    <span className="block font-medium">{e.product || e.service || '—'}</span>
                    {e.message && <span className="line-clamp-1 text-ink/55">{e.message}</span>}
                  </td>
                  <td className="text-ink/60 md:px-5 md:py-4">{TYPE_LABEL[e.type]}</td>
                  <td className="text-ink/60 md:px-5 md:py-4" title={formatDate(e.createdAt)}>
                    {timeAgo(e.createdAt)}
                  </td>
                  <td className="md:px-5 md:py-4">
                    <StatusBadge status={e.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="px-5 py-14 text-center text-ink/55">{all.length ? 'No enquiries match these filters.' : 'No enquiries yet. Forms on the website will land here.'}</p>
        )}
      </div>
    </>
  );
}
