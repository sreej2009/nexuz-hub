// Small presentational helpers shared by admin pages.
export const STATUS_STYLE = {
  new: 'bg-gold text-ink',
  contacted: 'bg-sky-100 text-sky-900',
  quoted: 'bg-violet-100 text-violet-900',
  won: 'bg-emerald-100 text-emerald-900',
  closed: 'bg-ink/10 text-ink/60',
};

export const TYPE_LABEL = {
  quote: 'Quote form',
  service: 'Service page',
  product: 'Product enquiry',
  callback: 'Callback',
  question: 'Question',
};

export function StatusBadge({ status }) {
  return <span className={`label inline-block rounded-full px-2.5 py-1 text-[0.6rem] ${STATUS_STYLE[status] ?? STATUS_STYLE.closed}`}>{status}</span>;
}

export function PageTitle({ eyebrow, title, children }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="label text-ink/50">{eyebrow}</p>}
        <h1 className="display mt-2 text-4xl md:text-5xl">{title}</h1>
      </div>
      {children && <div className="flex flex-wrap gap-2">{children}</div>}
    </div>
  );
}

export function Notice({ children, tone = 'ok' }) {
  return (
    <p className={`mb-6 rounded-xl border px-4 py-3 text-sm ${tone === 'ok' ? 'border-emerald-300 bg-emerald-50 text-emerald-900' : 'border-laser/40 bg-laser/10 text-ink'}`} role="status">
      {children}
    </p>
  );
}

const fmt = new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' });
export const formatDate = (iso) => fmt.format(new Date(iso));

export function timeAgo(iso) {
  const s = Math.max(1, Math.round((Date.now() - Date.parse(iso)) / 1000));
  if (s < 60) return 'just now';
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hr ago`;
  const d = Math.round(h / 24);
  return d < 30 ? `${d} day${d > 1 ? 's' : ''} ago` : formatDate(iso);
}
