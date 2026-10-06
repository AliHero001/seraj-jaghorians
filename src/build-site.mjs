import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderPage } from './render.mjs';

const sourceRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const routes = ['home', 'about', 'services', 'packages', 'order', 'contact'];
const routePath = { home: '' };

export async function buildSite(outputDirectory = path.join(sourceRoot, 'dist'), projectRoot = sourceRoot, { basePath = '' } = {}) {
  const out = path.resolve(outputDirectory);
  await rm(out, { recursive: true, force: true });
  await mkdir(path.join(out, 'assets'), { recursive: true });
  await cp(path.join(projectRoot, 'public', 'site.css'), path.join(out, 'assets', 'site.css'));
  await cp(path.join(projectRoot, 'public', 'site.js'), path.join(out, 'assets', 'site.js'));
  await cp(path.join(projectRoot, 'public', 'assets'), path.join(out, 'assets'), { recursive: true });

  for (const route of routes) {
    const slug = routePath[route] ?? route;
    const directory = slug ? path.join(out, slug) : out;
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, 'index.html'), renderPage(route, { basePath }), 'utf8');
  }
  return out;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const output = await buildSite(undefined, undefined, { basePath: process.env.SITE_BASE_PATH ?? '' });
  process.stdout.write(`Static site built at ${output}\n`);
}
