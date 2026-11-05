import { TYPE_LABEL } from '@/components/admin/ui';
import { isAdmin } from '@/lib/auth';
import { ENQUIRY_STATUSES, listEnquiries } from '@/lib/store';

const COLUMNS = [
  ['createdAt', 'Received'],
  ['status', 'Status'],
  ['type', 'Source'],
  ['name', 'Name'],
  ['phone', 'Phone'],
  ['email', 'Email'],
  ['service', 'Service'],
  ['product', 'Product'],
  ['quantity', 'Quantity'],
  ['message', 'Message'],
  ['notes', 'Notes'],
  ['page', 'Page'],
];

// Quote a CSV cell; prefix formula-like values so spreadsheets don't execute them.
const cell = (v) => {
  let s = String(v ?? '');
  if (/^[=+\-@]/.test(s)) s = `'${s}`;
  return `"${s.replace(/"/g, '""')}"`;
};

export async function GET(req) {
  if (!(await isAdmin())) return new Response('Unauthorized', { status: 401 });
  const status = new URL(req.url).searchParams.get('status');
  const rows = await listEnquiries({ status: ENQUIRY_STATUSES.includes(status) ? status : undefined });
  const csv = [
    COLUMNS.map(([, h]) => cell(h)).join(','),
    ...rows.map((e) => COLUMNS.map(([k]) => cell(k === 'type' ? TYPE_LABEL[e.type] : e[k])).join(',')),
  ].join('\r\n');
  const date = new Date().toISOString().slice(0, 10);
  // BOM so Excel opens UTF-8 (₹, Tamil names) correctly.
  return new Response('﻿' + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="nexuz-enquiries-${date}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
}
