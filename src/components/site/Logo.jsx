import Image from 'next/image';
import Link from 'next/link';

export default function Logo({ dark = false, className = '' }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 ${className}`} aria-label="Nexuz Hub home">
      <Image
        src="/brand/mark.png"
        alt=""
        width={44}
        height={44}
        priority
        className="size-10 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:rotate-[360deg] md:size-11"
      />
      <span className="leading-none">
        <span className={`display block text-[1.65rem] font-black tracking-wide ${dark ? 'text-paper' : 'text-ink'}`}>
          Nexuz <span className="text-gold">Hub</span>
        </span>
        <span className={`label mt-1 block text-[0.56rem] ${dark ? 'text-paper/50' : 'text-ink/50'}`}>Creative manufacturing</span>
      </span>
    </Link>
  );
}
