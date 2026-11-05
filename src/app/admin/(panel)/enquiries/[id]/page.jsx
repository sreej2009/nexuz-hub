import Link from 'next/link';
import { notFound } from 'next/navigation';
import { deleteEnquiryAction, saveEnquiryNotes, setEnquiryStatus } from '@/app/admin/actions';
import ConfirmButton from '@/components/admin/ConfirmButton';
import { PageTitle, StatusBadge, TYPE_LABEL, formatDate } from '@/components/admin/ui';
import Icon, { WhatsAppIcon } from '@/components/ui/Icon';
import { requireAdmin } from '@/lib/auth';
import { ENQUIRY_STATUSES, getEnquiry } from '@/lib/store';

export const metadata = { title: 'Enquiry' };

export default async function EnquiryPage({ params }) {
  await requireAdmin();
  const e = await getEnquiry((await params).id);
  if (!e) notFound();
  const waNumber = e.phone?.replace(/\D/g, '').replace(/^0/, '');
  const wa = waNumber ? `https://wa.me/${waNumber.length === 10 ? `91${waNumber}` : waNumber}?text=${encodeURIComponent(`Hi ${e.name}, this is Nexuz Hub following up on your enquiry${e.product || e.service ? ` about ${e.product || e.service}` : ''}.`)}` : null;
  const rows = [
    ['Phone', e.phone],
    ['Email', e.email],
    ['Service', e.service],
    ['Product', e.product],
    ['Quantity', e.quantity],
    ['Source', TYPE_LABEL[e.type]],
    ['Page', e.page],
    ['Received', formatDate(e.createdAt)],
  ].filter(([, v]) => v);

  return (
    <>
      <Link href="/admin/enquiries" className="label inline-flex items-center gap-2 text-ink/55 hover:text-ink">
        <Icon name="arrow" size={14} className="rotate-180" /> All enquiries
      </Link>
      <div className="mt-4">
        <PageTitle eyebrow={TYPE_LABEL[e.type]} title={e.name}>
          <StatusBadge status={e.status} />
        </PageTitle>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-line bg-white/60 p-6">
            <div className="flex flex-wrap gap-2">
              {e.phone && (
                <a href={`tel:${e.phone.replace(/\s/g, '')}`} className="btn btn-ink btn-sm">
                  <Icon name="phone" size={15} /> Call
                </a>
              )}
              {wa && (
                <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-sm bg-[#25D366] text-white hover:bg-[#1da851]">
                  <WhatsAppIcon size={15} /> WhatsApp
                </a>
              )}
              {e.email && (
                <a href={`mailto:${e.email}?subject=${encodeURIComponent('Your Nexuz Hub enquiry')}`} className="btn btn-line btn-sm">
                  <Icon name="mail" size={15} /> Email
                </a>
              )}
            </div>
            <dl className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
              {rows.map(([k, v]) => (
                <div key={k} className="bg-white px-4 py-3">
                  <dt className="label text-[0.6rem] text-ink/45">{k}</dt>
                  <dd className="mt-1 break-words">{v}</dd>
                </div>
              ))}
            </dl>
            {e.message && (
              <div className="mt-6">
                <p className="label text-ink/50">Message</p>
                <p className="mt-2 whitespace-pre-wrap leading-relaxed">{e.message}</p>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-6">
          <section className="rounded-2xl border border-line bg-white/60 p-6">
            <p className="label text-ink/50">Status</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {ENQUIRY_STATUSES.map((s) => (
                <form key={s} action={setEnquiryStatus}>
                  <input type="hidden" name="id" value={e.id} />
                  <input type="hidden" name="status" value={s} />
                  <button
                    className={`rounded-full border px-3.5 py-1.5 text-sm capitalize ${e.status === s ? 'border-ink bg-ink text-paper' : 'border-line bg-white hover:border-ink'}`}
                    aria-pressed={e.status === s}
                  >
                    {s}
                  </button>
                </form>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-line bg-white/60 p-6">
            <form action={saveEnquiryNotes}>
              <input type="hidden" name="id" value={e.id} />
              <label className="block">
                <span className="label mb-2 block text-ink/50">Internal notes</span>
                <textarea name="notes" rows={6} defaultValue={e.notes} placeholder="Quote sent, follow-up date, price agreed…" className="field resize-y" />
              </label>
              <button className="btn btn-ink btn-sm mt-3">Save notes</button>
            </form>
          </section>

          <form action={deleteEnquiryAction}>
            <input type="hidden" name="id" value={e.id} />
            <ConfirmButton message="Delete this enquiry permanently?" className="btn btn-line btn-sm text-laser hover:!border-laser hover:!bg-laser">
              <Icon name="trash" size={15} /> Delete enquiry
            </ConfirmButton>
          </form>
        </div>
      </div>
    </>
  );
}
