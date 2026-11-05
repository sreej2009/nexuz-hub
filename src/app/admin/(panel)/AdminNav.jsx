'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/Icon';

const ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: 'grid', exact: true },
  { href: '/admin/enquiries', label: 'Enquiries', icon: 'inbox', badge: true },
  { href: '/admin/products', label: 'Products', icon: 'box' },
];

export default function AdminNav({ newCount }) {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:pb-0">
      {ITEMS.map((it) => {
        const on = it.exact ? pathname === it.href : pathname.startsWith(it.href);
        return (
          <Link
            key={it.href}
            href={it.href}
            className={`flex shrink-0 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${on ? 'bg-paper text-ink' : 'text-paper/70 hover:bg-paper/5 hover:text-paper'}`}
          >
            <Icon name={it.icon} size={17} />
            {it.label}
            {it.badge && newCount > 0 && <span className="ml-auto rounded-full bg-gold px-2 py-0.5 font-mono text-[0.65rem] font-medium text-ink">{newCount}</span>}
          </Link>
        );
      })}
    </nav>
  );
}
