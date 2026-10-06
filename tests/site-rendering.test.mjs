import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildSite } from '../src/build-site.mjs';
import { packages } from '../src/content.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

async function buildTempSite() {
  const output = await mkdtemp(path.join(tmpdir(), 'siraj-site-'));
  await buildSite(output, root);
  return output;
}

test('supports the GitHub Pages project subpath on every route', async (t) => {
  const output = await mkdtemp(path.join(tmpdir(), 'siraj-pages-site-'));
  await buildSite(output, root, { basePath: '/seraj-jaghorians' });
  t.after(() => rm(output, { recursive: true, force: true }));

  for (const route of ['', 'about', 'services', 'packages', 'order', 'contact']) {
    const html = await readFile(path.join(output, route, 'index.html'), 'utf8');
    assert.match(html, /href="\/seraj-jaghorians\/assets\/site\.css"/);
    assert.match(html, /src="\/seraj-jaghorians\/assets\/site\.js"/);
    assert.match(html, /src="\/seraj-jaghorians\/assets\/siraj-jaghorians-logo\.png"/);
    assert.match(html, /href="\/seraj-jaghorians\/about\/"/);
    assert.doesNotMatch(html, /(?:href|src)="\/(?:assets|about|services|packages|contact)\//);
  }
});

test('builds all six directly addressable Persian routes', async (t) => {
  const output = await buildTempSite();
  t.after(() => rm(output, { recursive: true, force: true }));

  for (const route of ['', 'about', 'services', 'packages', 'order', 'contact']) {
    const file = path.join(output, route, 'index.html');
    await stat(file);
    const html = await readFile(file, 'utf8');
    assert.match(html, /lang="fa"/);
    assert.match(html, /dir="rtl"/);
    assert.match(html, /سراج جاغوریان/);
  }
});

test('home page previews the real package catalog with a direct order path', async (t) => {
  const output = await buildTempSite();
  t.after(() => rm(output, { recursive: true, force: true }));
  const html = await readFile(path.join(output, 'index.html'), 'utf8');

  assert.match(html, /data-catalog-stat="package-count" data-value="19"/);
  assert.match(html, /data-catalog-stat="category-count" data-value="4"/);
  assert.match(html, /data-home-order-preview/);
  assert.match(html, /data-home-featured-packages/);
  assert.match(html, /wa\.me\/93766867136\?text=/);
  assert.doesNotMatch(html, /\/order\/\?plan=/);
});

test('renders the submitted monthly and hotspot package values', async (t) => {
  const output = await buildTempSite();
  t.after(() => rm(output, { recursive: true, force: true }));
  const html = await readFile(path.join(output, 'packages', 'index.html'), 'utf8');

  for (const fact of ['۳۰ گیگابایت', '۶۰۰ افغانی', '۵۰ گیگابایت', '۱۰۰۰ افغانی', '۱۵۰ گیگابایت', '۵۰۰ گیگابایت', '۴۰۰۰ افغانی']) {
    assert.ok(html.includes(fact), `package page should include ${fact}`);
  }
  for (let gigabytes = 1; gigabytes <= 10; gigabytes += 1) {
    assert.ok(html.includes(`${gigabytes}GB`), `package page should include ${gigabytes}GB hotspot`);
  }
  assert.match(html, /data-plan-filter/);
  assert.match(html, /https:\/\/wa\.me\/93766867136\?text=/);
  assert.doesNotMatch(html, /\/order\/\?plan=/);
  const links = [...html.matchAll(/class="button button-outline package-action" href="([^"]+)"/g)];
  assert.equal(links.length, packages.length, 'each package should have its own WhatsApp action');
  for (const [index, match] of links.entries()) {
    const action = new URL(match[1]);
    assert.equal(action.hostname, 'wa.me');
    assert.equal(action.pathname, '/93766867136');
    assert.ok(action.searchParams.get('text').includes(packages[index].name), `WhatsApp message should name ${packages[index].name}`);
  }
});

test('provides contact and order forms that draft email without a server', async (t) => {
  const output = await buildTempSite();
  t.after(() => rm(output, { recursive: true, force: true }));
  const order = await readFile(path.join(output, 'order', 'index.html'), 'utf8');
  const contact = await readFile(path.join(output, 'contact', 'index.html'), 'utf8');

  assert.match(order, /data-order-form/);
  assert.match(contact, /data-contact-form/);
  assert.match(order, /mr\.ali\.ibrahimi\.2004@gmail\.com/);
  assert.match(contact, /mr\.ali\.ibrahimi\.2004@gmail\.com/);
  assert.match(order, /data-plan=/);
  assert.match(order, /0766867136/);
  assert.match(contact, /فقط جاغوری تحت پوشش است/);
  assert.match(contact, /name="area"/);
  assert.doesNotMatch(contact, /name="province"|بادغیس|کابل|هرات/);
  assert.match(contact, /class="social-links"/);
  for (const name of ['واتساپ', 'اینستاگرام', 'فیسبوک', 'تلگرام']) assert.match(contact, new RegExp(`aria-label="${name}"`));
  assert.doesNotMatch(contact, /<bdi>ali_hero083<\/bdi>/);
});
