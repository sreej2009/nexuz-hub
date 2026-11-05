// Image loader for the GitHub Pages preview (no image server there).
// scripts/optimize-images.mjs pre-builds "<file>.<width>.webp" copies at these widths.
const WIDTHS = [384, 640, 960, 1280, 1920];

export default function staticImageLoader({ src, width }) {
  if (!src.startsWith('/')) return src;
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!/\.(png|jpe?g)$/i.test(src)) return `${base}${src}`;
  const w = WIDTHS.find((x) => x >= width) ?? WIDTHS[WIDTHS.length - 1];
  return `${base}${src}.${w}.webp`;
}
