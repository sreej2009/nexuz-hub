// After `next build` with output: 'export'.
// Next 16 writes route-group prefetch files as nested folders (e.g. __next.!KHNpdGUp/contact-us.txt)
// but the browser requests dot-joined names (__next.!KHNpdGUp.contact-us.txt). Write those copies too,
// so client-side navigation on GitHub Pages uses the prefetched data instead of a full page load.
import { copyFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';

const OUT = process.argv[2] || 'out';
let count = 0;

async function walk(dir) {
  for (const name of await readdir(dir)) {
    const full = path.join(dir, name);
    if (!(await stat(full)).isDirectory()) continue;
    if (name.startsWith('__next.')) await flatten(full, path.join(dir, name));
    else await walk(full);
  }
}

// Copy every file under a "__next.<group>" folder to "<folder>.<sub>.<path>.txt" next to it.
async function flatten(root, prefix) {
  const files = [];
  const collect = async (d) => {
    for (const n of await readdir(d)) {
      const f = path.join(d, n);
      if ((await stat(f)).isDirectory()) await collect(f);
      else files.push(f);
    }
  };
  await collect(root);
  for (const f of files) {
    const rel = path.relative(root, f).split(path.sep).join('.');
    await copyFile(f, `${prefix}.${rel}`);
    count++;
  }
}

await walk(OUT);
console.log(`Flattened ${count} prefetch files.`);
