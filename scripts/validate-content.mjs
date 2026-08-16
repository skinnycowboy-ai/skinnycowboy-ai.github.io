import { readFile, readdir } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = new URL('../', import.meta.url);
const docsRoot = new URL('../src/content/docs/', import.meta.url);

const requiredFiles = [
  'index.mdx',
  'about.mdx',
  'project-vaquero/index.mdx',
  'project-vaquero/architecture.mdx',
  'project-vaquero/build-journal.mdx',
  'project-vaquero/lessons-learned.mdx',
  'sled/index.mdx',
  'sled/solutions/index.mdx',
  'sled/campaign-hub/index.mdx',
  'sled/education/index.mdx',
  'sled/state-local-government/index.mdx',
  'sled/modernization/index.mdx',
  'sled/disconnected-environments/index.mdx',
  'sled/security-compliance/index.mdx',
  'sled/application-platforms/index.mdx',
  'sled/artificial-intelligence/index.mdx',
  'sled/field-notes/index.mdx',
  'openshift/index.mdx',
  'red-hat-ai/index.mdx',
  'virtualization/index.mdx',
  'automation/index.mdx',
  'homelab/index.mdx',
  'field-notes/index.mdx',
  'field-notes/openshift-virtualization-storage-decisions.mdx',
  'field-notes/disconnected-openshift-content-flow.mdx',
  'lightwell/index.mdx',
  'field-notes/project-lightwell-closed-loop.mdx',
];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await collectFiles(path)));
    if (entry.isFile() && /\.mdx?$/.test(entry.name)) files.push(path);
  }
  return files;
}

const errors = [];

for (const file of requiredFiles) {
  try {
    await readFile(new URL(file, docsRoot), 'utf8');
  } catch {
    errors.push(`Missing required content file: src/content/docs/${file}`);
  }
}

const files = await collectFiles(new URL(docsRoot).pathname);
for (const file of files) {
  const content = await readFile(file, 'utf8');
  const name = relative(new URL(root).pathname, file);
  if (!content.startsWith('---\n')) errors.push(`${name}: missing YAML frontmatter`);
  if (!/^title:\s+.+$/m.test(content)) errors.push(`${name}: missing title`);
  if (!/^description:\s+.+$/m.test(content)) errors.push(`${name}: missing description`);

  const internalPhrases = [
    /SLED Campaign Hub/i,
    /customer signal/i,
    /outreach handoff/i,
    /qualification layer/i,
    /does not publish automatically/i,
    /CRM exports/i,
    /field-developed buying motion/i,
    /not a Red Hat product/i,
  ];
  for (const phrase of internalPhrases) {
    if (phrase.test(content)) {
      errors.push(`${name}: exposes internal campaign or outreach language.`);
      break;
    }
  }

  if (
    !name.endsWith('field-notes/project-lightwell-closed-loop.mdx') &&
    content.includes('/field-notes/project-lightwell-closed-loop/')
  ) {
    errors.push(`${name}: links to the withdrawn Lightwell concept page.`);
  }
}

const lightwell = await readFile(
  new URL('lightwell/index.mdx', docsRoot),
  'utf8',
);
if (!/joint IBM and Red Hat/i.test(lightwell)) {
  errors.push('Lightwell must remain identified as a joint IBM and Red Hat initiative.');
}
if (!/Lightwell Network is currently available/i.test(lightwell)) {
  errors.push('Lightwell must retain the current Lightwell Network availability statement.');
}
if (!/Lightwell Clearinghouse Premier\s+is limited availability/i.test(lightwell)) {
  errors.push('Lightwell must retain the Clearinghouse Premier availability boundary.');
}
if (!/third-party open source dependencies/i.test(lightwell)) {
  errors.push('Lightwell must retain its third-party open source dependency scope.');
}
if (
  !lightwell.includes('https://www.redhat.com/en/lightwell') ||
  !lightwell.includes('https://www.ibm.com/products/lightwell')
) {
  errors.push('Lightwell must cite the official IBM and Red Hat offering pages.');
}

const solutions = await readFile(new URL('sled/solutions/index.mdx', docsRoot), 'utf8');
if (!/public-sector/i.test(solutions) || !/What to validate/i.test(solutions)) {
  errors.push('SLED Solutions must remain customer-focused and validation-oriented.');
}
if (!/joint IBM and Red Hat/i.test(solutions) || !/Lightwell Network is currently available/i.test(solutions)) {
  errors.push('SLED Solutions must retain the verified Lightwell ownership and availability boundary.');
}

const legacyRoute = await readFile(
  new URL('sled/campaign-hub/index.mdx', docsRoot),
  'utf8',
);
if (!legacyRoute.includes('/sled/solutions/')) {
  errors.push('The legacy SLED route must direct readers to SLED Solutions.');
}

const legacyLightwell = await readFile(
  new URL('field-notes/project-lightwell-closed-loop.mdx', docsRoot),
  'utf8',
);
if (!legacyLightwell.includes('/lightwell/')) {
  errors.push('The legacy Lightwell route must direct readers to the corrected overview.');
}

const config = await readFile(new URL('../astro.config.mjs', import.meta.url), 'utf8');
if (/autogenerate/.test(config)) {
  errors.push('Public navigation must use explicit labels instead of directory-generated labels.');
}
if (!/slug:\s*'sled\/solutions'/.test(config)) {
  errors.push('Public navigation must include the SLED Solutions route.');
}
if (!/slug:\s*'lightwell'/.test(config)) {
  errors.push('Public navigation must include the canonical Lightwell product route.');
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated ${files.length} content files and all public-site boundaries.`);
