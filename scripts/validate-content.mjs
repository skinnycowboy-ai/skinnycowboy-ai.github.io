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
}

const lightwell = await readFile(
  new URL('field-notes/project-lightwell-closed-loop.mdx', docsRoot),
  'utf8',
);
if (!/field-developed buying motion/i.test(lightwell)) {
  errors.push('Project Lightwell must remain labeled as a field-developed buying motion.');
}
if (!/not a Red Hat product/i.test(lightwell)) {
  errors.push('Project Lightwell must explicitly state that it is not a Red Hat product.');
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Validated ${files.length} content files and all required editorial boundaries.`);
