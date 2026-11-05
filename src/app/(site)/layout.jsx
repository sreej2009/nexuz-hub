import Footer from '@/components/site/Footer';
import Header from '@/components/site/Header';
import RevealObserver from '@/components/site/RevealObserver';
import { WhatsAppIcon } from '@/components/ui/Icon';
import { whatsappLink } from '@/data/site';

export default function SiteLayout({ children }) {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
      <a
        href={whatsappLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Nexuz Hub on WhatsApp"
        className="fixed right-4 bottom-4 z-30 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_30px_-8px_rgb(37_211_102/0.7)] transition-transform hover:scale-105 md:right-6 md:bottom-6"
      >
        <WhatsAppIcon size={28} />
      </a>
      <RevealObserver />
    </>
  );
}
