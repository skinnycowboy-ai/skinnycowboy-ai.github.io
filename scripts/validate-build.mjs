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
  'sled/solutions/index.html',
  'sled/campaign-hub/index.html',
  'sled/security-compliance/index.html',
  'field-notes/index.html',
  'field-notes/openshift-virtualization-storage-decisions/index.html',
  'field-notes/disconnected-openshift-content-flow/index.html',
  'lightwell/index.html',
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
if (!home.includes('SLED Platform &amp; AI Technical Resources')) {
  errors.push('Home page is missing the customer-facing site title.');
}
if (!home.includes('Explore SLED solutions') || !home.includes('Red Hat OpenShift')) {
  errors.push('Home page is missing the SLED solution path or Red Hat product guides.');
}

const solutions = await readFile(new URL('sled/solutions/index.html', dist), 'utf8');
if (!/What to validate/i.test(solutions) || !/public-sector/i.test(solutions)) {
  errors.push('Rendered SLED Solutions page lost its customer-focused validation content.');
}
if (!/joint IBM and Red Hat/i.test(solutions) || !/Lightwell Network is currently available/i.test(solutions)) {
  errors.push('Rendered SLED Solutions page lost the verified Lightwell ownership or availability boundary.');
}

const lightwell = await readFile(
  new URL('lightwell/index.html', dist),
  'utf8',
);
if (!/joint IBM and Red Hat/i.test(lightwell)) {
  errors.push('Rendered Lightwell page lost the IBM and Red Hat ownership statement.');
}
if (!/Lightwell Network is currently available/i.test(lightwell)) {
  errors.push('Rendered Lightwell page lost the current Network availability statement.');
}
if (!/Lightwell Clearinghouse Premier\s+is limited availability/i.test(lightwell)) {
  errors.push('Rendered Lightwell page lost the Clearinghouse Premier availability boundary.');
}
if (!/third-party open source dependencies/i.test(lightwell)) {
  errors.push('Rendered Lightwell page lost the third-party dependency scope.');
}

const legacyRoute = await readFile(new URL('sled/campaign-hub/index.html', dist), 'utf8');
if (!legacyRoute.includes('/sled/solutions/')) {
  errors.push('Rendered legacy SLED route does not direct readers to SLED Solutions.');
}

const legacyLightwell = await readFile(
  new URL('field-notes/project-lightwell-closed-loop/index.html', dist),
  'utf8',
);
if (!legacyLightwell.includes('/lightwell/')) {
  errors.push('Rendered legacy Lightwell route does not direct readers to the corrected overview.');
}

const renderedContent = (await Promise.all(htmlFiles.map((file) => readFile(file, 'utf8')))).join('\n');
for (const phrase of [
  /SLED Campaign Hub/i,
  /customer signal/i,
  /outreach handoff/i,
  /qualification layer/i,
  /does not publish automatically/i,
  /field-developed buying motion/i,
  /not a Red Hat product/i,
]) {
  if (phrase.test(renderedContent)) {
    errors.push('Rendered site exposes internal campaign or outreach language.');
    break;
  }
}

if (errors.length > 0) {
  console.error([...new Set(errors)].join('\n'));
  process.exit(1);
}

console.log(`Validated ${htmlFiles.length} rendered pages, required artifacts, and internal links.`);
