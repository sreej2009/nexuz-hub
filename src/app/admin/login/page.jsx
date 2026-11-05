import Image from 'next/image';
import { redirect } from 'next/navigation';
import { adminConfigured, isAdmin } from '@/lib/auth';
import LoginForm from './LoginForm';

export const metadata = { title: 'Sign in' };

export default async function LoginPage() {
  if (await isAdmin()) redirect('/admin');
  return (
    <main className="grid min-h-dvh lg:grid-cols-2">
      <div className="relative hidden overflow-hidden bg-ink lg:block">
        <Image src="/images/live/why_choose_us_big_hero.png" alt="" fill priority sizes="50vw" className="object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-paper">
          <p className="label text-gold">Nexuz Hub · Workshop admin</p>
          <p className="display mt-4 text-6xl">Products & enquiries, in one place.</p>
        </div>
      </div>
      <div className="relative flex items-center justify-center px-5 py-16">
        <div className="grid-paper absolute inset-0" aria-hidden="true" />
        <div className="relative w-full max-w-sm">
          <Image src="/brand/mark.png" alt="Nexuz Hub" width={56} height={56} />
          <h1 className="display mt-6 text-4xl">Admin sign in</h1>
          {adminConfigured() ? (
            <>
              <p className="mt-2 text-ink/60">Enter the admin password to manage products and enquiries.</p>
              <LoginForm />
            </>
          ) : (
            <div className="mt-6 rounded-xl border border-laser/40 bg-laser/10 p-4 text-sm text-ink/80">
              Admin login is turned off. Add <code className="font-mono">ADMIN_PASSWORD=your-password</code> to <code className="font-mono">site/.env.local</code> and restart the server.
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
