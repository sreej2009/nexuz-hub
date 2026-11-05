import { notFound } from 'next/navigation';
import { RANGES, getRange } from '@/data/ranges';
import { getProductBySlug } from '@/lib/store';
import ProductView from './ProductView';
import RangeView from './RangeView';

// Built-in ranges are pre-rendered; products added in the admin page render on first visit.
export const generateStaticParams = () => RANGES.map((r) => ({ slug: r.slug }));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const range = getRange(slug);
  if (range) return { title: range.name, description: range.heroTagline };
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.shortDescription || product.description?.slice(0, 160),
    openGraph: product.images?.[0] ? { images: [product.images[0]] } : undefined,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const range = getRange(slug);
  if (range) return <RangeView range={range} />;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  return <ProductView product={product} />;
}
