import { access, readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const dist = new URL('../dist/', import.meta.url);

const requiredRoutes = [
  'index.html',
  'about/index.html',
  'openshift/index.html',
  'red-hat-ai/index.html',
  'virtualization/index.html',
  'automation/index.html',
  'homelab/index.html',
  'project-vaquero/index.html',
  'project-vaquero/architecture/index.html',
  'project-vaquero/build-journal/index.html',
  'project-vaquero/lessons-learned/index.html',
  'sled/index.html',
  'sled/campaign-hub/index.html',
  'sled/security-compliance/index.html',
  'field-notes/index.html',
  'field-notes/openshift-virtualization-storage-decisions/index.html',
  'field-notes/disconnected-openshift-content-flow/index.html',
  'field-notes/project-lightwell-closed-loop/index.html',
  '404.html',
  'sitemap-index.xml',
];

const errors = [];

for (const route of requiredRoutes) {
  try {
    await access(new URL(route, dist));
  } catch {
    errors.push(`Missing build artifact: dist/${route}`);
  }
}

async function collectHtml(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory() && !['_astro', 'pagefind'].includes(entry.name)) {
      files.push(...(await collectHtml(path)));
    }
    if (entry.isFile() && entry.name.endsWith('.html')) files.push(path);
  }
  return files;
}

const htmlFiles = await collectHtml(new URL(dist).pathname);

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const links = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  for (const href of links) {
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const path = href.split('#')[0].split('?')[0];
    if (path === '') continue;

    const target = path.endsWith('/')
      ? new URL(`.${path}index.html`, dist)
      : new URL(`.${path}`, dist);
    try {
      await access(target);
    } catch {
      errors.push(`${file}: unresolved internal link ${href}`);
    }
  }
}

const home = await readFile(new URL('index.html', dist), 'utf8');
if (!home.includes('Platform &amp; AI Technical Field Notes')) {
  errors.push('Home page is missing the expected site title.');
}
if (!home.includes('Red Hat OpenShift')) {
  errors.push('Home page is missing the Red Hat OpenShift collection.');
}

const lightwell = await readFile(
  new URL('field-notes/project-lightwell-closed-loop/index.html', dist),
  'utf8',
);
if (!/field-developed buying motion/i.test(lightwell)) {
  errors.push('Rendered Project Lightwell page lost the buying-motion boundary.');
}
if (!/not a Red Hat product/i.test(lightwell)) {
  errors.push('Rendered Project Lightwell page lost the product-name boundary.');
}

const campaignHub = await readFile(
  new URL('sled/campaign-hub/index.html', dist),
  'utf8',
);
if (!/field-developed buying motion/i.test(campaignHub)) {
  errors.push('Rendered SLED Campaign Hub lost the Project Lightwell buying-motion boundary.');
}
if (!/not a Red Hat product/i.test(campaignHub)) {
  errors.push('Rendered SLED Campaign Hub lost the Project Lightwell product-name boundary.');
}
if (!/does not publish automatically to external\s+networks/i.test(campaignHub)) {
  errors.push('Rendered SLED Campaign Hub lost the human-reviewed outreach boundary.');
}

if (errors.length > 0) {
  console.error([...new Set(errors)].join('\n'));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} rendered pages, required artifacts, and internal links.`);

