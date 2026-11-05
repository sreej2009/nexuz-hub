import Link from 'next/link';
import ProductForm from '@/components/admin/ProductForm';
import { PageTitle } from '@/components/admin/ui';
import Icon from '@/components/ui/Icon';
import { requireAdmin } from '@/lib/auth';

export const metadata = { title: 'Add product' };

export default async function NewProduct() {
  await requireAdmin();
  return (
    <>
      <Link href="/admin/products" className="label inline-flex items-center gap-2 text-ink/55 hover:text-ink">
        <Icon name="arrow" size={14} className="rotate-180" /> Products
      </Link>
      <div className="mt-4">
        <PageTitle eyebrow="Catalogue" title="Add product" />
      </div>
      <ProductForm />
    </>
  );
}
