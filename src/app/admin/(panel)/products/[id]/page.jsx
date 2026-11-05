import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { PageTitle } from '@/components/admin/ui';
import Icon from '@/components/ui/Icon';
import { requireAdmin } from '@/lib/auth';
import { getProduct } from '@/lib/store';

export const metadata = { title: 'Edit product' };

export default async function EditProduct({ params }) {
  await requireAdmin();
  const product = await getProduct((await params).id);
  if (!product) notFound();
  return (
    <>
      <Link href="/admin/products" className="label inline-flex items-center gap-2 text-ink/55 hover:text-ink">
        <Icon name="arrow" size={14} className="rotate-180" /> Products
      </Link>
      <div className="mt-4">
        <PageTitle eyebrow="Edit product" title={product.name}>
          {product.published && (
            <a href={`/products/${product.slug}`} target="_blank" className="btn btn-line btn-sm">
              <Icon name="eye" size={15} /> View live
            </a>
          )}
        </PageTitle>
      </div>
      <ProductForm product={product} />
    </>
  );
}
