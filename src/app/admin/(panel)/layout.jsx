import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/ui/Icon';
import { requireAdmin } from '@/lib/auth';
import { getStats } from '@/lib/store';
import { logout } from '../actions';
import AdminNav from './AdminNav';

export default async function PanelLayout({ children }) {
  await requireAdmin();
  const stats = await getStats();
  return (
    <div className="lg:grid lg:min-h-dvh lg:grid-cols-[15rem_1fr]">
      <div className="bg-ink">
      <aside className="flex flex-col bg-ink text-paper lg:sticky lg:top-0 lg:h-dvh">
        <div className="flex items-center justify-between gap-3 px-5 py-4 lg:py-6">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/brand/mark.png" alt="" width={36} height={36} />
            <span className="leading-none">
              <span className="display block text-2xl">
                Nexuz <span className="text-gold">Hub</span>
              </span>
              <span className="label text-[0.55rem] text-paper/45">Admin</span>
            </span>
          </Link>
          <form action={logout} className="lg:hidden">
            <button className="flex size-10 items-center justify-center rounded-full border border-paper/15" aria-label="Sign out">
              <Icon name="logout" size={18} />
            </button>
          </form>
        </div>
        <AdminNav newCount={stats.newEnquiries} />
        <div className="mt-auto hidden space-y-1 border-t border-paper/10 p-3 lg:block">
          <a href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-paper/65 hover:bg-paper/5 hover:text-paper">
            <Icon name="external" size={17} /> View website
          </a>
          <form action={logout}>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-paper/65 hover:bg-paper/5 hover:text-paper">
              <Icon name="logout" size={17} /> Sign out
            </button>
          </form>
        </div>
      </aside>
      </div>
      <div className="min-w-0 px-4 py-8 md:px-10 md:py-10">{children}</div>
    </div>
  );
}
