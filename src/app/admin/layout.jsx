export const metadata = {
  title: { default: 'Admin', template: '%s · Nexuz Admin' },
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }) {
  return <div className="min-h-dvh bg-paper">{children}</div>;
}
