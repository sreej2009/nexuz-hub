import Link from 'next/link';
import Footer from '@/components/site/Footer';
import Header from '@/components/site/Header';
import Icon from '@/components/ui/Icon';

export const metadata = { title: 'Page not found' };

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="relative overflow-hidden border-b border-line">
        <div className="grid-paper absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1440px] px-5 py-24 text-center md:px-8 md:py-36">
          <p className="label text-ink/50">Error 404 · Off the cutting line</p>
          <p className="font-stencil mt-6 text-[clamp(5.76rem,20.16vw,15.84rem)] leading-[0.8] text-ink">
            4<span className="text-gold">0</span>4
          </p>
          <h1 className="display mt-8 text-[clamp(1.8rem,3.6vw,3.24rem)]">This page doesn’t exist — the workshop does.</h1>
          <p className="lede mx-auto mt-5 max-w-lg">Head back home, or jump straight to what you were looking for.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/" className="btn btn-ink">
              Go home <Icon name="arrow" size={16} />
            </Link>
            <Link href="/services" className="btn btn-line">
              Services
            </Link>
            <Link href="/contact-us" className="btn btn-line">
              Get a quote
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
