import localFont from 'next/font/local';
import { SITE } from '@/data/site';
import './globals.css';

// Brand fonts shared with thulirmedia.com (Warownia family), self-hosted from src/fonts.
const heading = localFont({ src: '../fonts/WarowniaBlackExtended.woff2', weight: '900', variable: '--font-heading', display: 'swap' });
const body = localFont({ src: '../fonts/WarowniaNarrow.woff2', weight: '400', variable: '--font-body', display: 'swap' });
const label = localFont({ src: '../fonts/Warownia.woff2', weight: '400', variable: '--font-label', display: 'swap' });

const DESCRIPTION =
  'Nexuz Hub is a creative manufacturing studio in Saravanampatti, Coimbatore. UV printing, laser cutting & engraving, 3D printing, custom gifts and sign boards — 0.1mm precision, 48hr turnaround, all under one roof.';

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: 'Nexuz Hub | Creative Manufacturing in Coimbatore', template: '%s | Nexuz Hub' },
  description: DESCRIPTION,
  manifest: `${process.env.NEXT_PUBLIC_BASE_PATH || ''}/manifest.webmanifest`,
  openGraph: {
    title: 'Nexuz Hub — UV Printing, Laser Cutting & 3D Printing in Coimbatore',
    description: DESCRIPTION,
    url: SITE.url,
    siteName: 'Nexuz Hub',
    images: [{ url: '/images/live/services_hero.jpg', width: 1200, height: 630 }],
    type: 'website',
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport = {
  themeColor: '#15130f',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-IN" className={`${heading.variable} ${body.variable} ${label.variable}`} suppressHydrationWarning>
      <head>
        {/* Lets CSS hide reveal-on-scroll content only when JS can reveal it again. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
