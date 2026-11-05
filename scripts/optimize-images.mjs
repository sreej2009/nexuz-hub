// After the static export: create resized WebP copies of every photo, because GitHub Pages
// can't resize images on the fly. Matches the widths used by src/lib/static-image-loader.js.
import { readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export const WIDTHS = [384, 640, 960, 1280, 1920];
const OUT = process.argv[2] || 'out';
const DIRS = ['images', 'brand'];

async function* walk(dir) {
  for (const name of await readdir(dir)) {
    const full = path.join(dir, name);
    if ((await stat(full)).isDirectory()) yield* walk(full);
    else if (/\.(png|jpe?g)$/i.test(name)) yield full;
  }
}

let files = 0;
let saved = 0;
for (const d of DIRS) {
  for await (const file of walk(path.join(OUT, d))) {
    const original = (await stat(file)).size;
    for (const w of WIDTHS) {
      const target = `${file}.${w}.webp`;
      const info = await sharp(file).resize({ width: w, withoutEnlargement: true }).webp({ quality: 74 }).toFile(target);
      if (w === 960) saved += original - info.size;
    }
    files++;
  }
}
console.log(`Optimised ${files} images × ${WIDTHS.length} sizes (≈${Math.round(saved / 1024 / 1024)} MB saved at 960px).`);
