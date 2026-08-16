import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://skinnycowboy-ai.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'SLED Platform & AI Technical Resources',
      description:
        'Technical resources for public-sector modernization, application platforms, disconnected operations, governed AI, and automation.',
      favicon: '/favicon.svg',
      lastUpdated: true,
      customCss: ['./src/styles/custom.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/skinnycowboy-ai',
        },
      ],
      sidebar: [
        {
          label: 'Start here',
          items: [
            { label: 'Resource center', slug: '' },
            { label: 'SLED overview', slug: 'sled' },
            { label: 'SLED solutions', slug: 'sled/solutions' },
          ],
        },
        {
          label: 'Public-sector priorities',
          items: [
            { label: 'Education', slug: 'sled/education' },
            { label: 'State & local government', slug: 'sled/state-local-government' },
            { label: 'Virtualization modernization', slug: 'sled/modernization' },
            { label: 'Disconnected operations', slug: 'sled/disconnected-environments' },
            { label: 'Security & compliance', slug: 'sled/security-compliance' },
            { label: 'Application platforms', slug: 'sled/application-platforms' },
            { label: 'Private & governed AI', slug: 'sled/artificial-intelligence' },
            { label: 'SLED field notes', slug: 'sled/field-notes' },
          ],
        },
        {
          label: 'Red Hat platform guides',
          items: [
            { label: 'Red Hat OpenShift', slug: 'openshift' },
            { label: 'Red Hat OpenShift AI', slug: 'red-hat-ai' },
            { label: 'OpenShift Virtualization', slug: 'virtualization' },
            { label: 'Ansible Automation Platform', slug: 'automation' },
          ],
        },
        {
          label: 'Labs & demonstrations',
          items: [
            { label: 'Project Vaquero lab', slug: 'project-vaquero' },
            { label: 'Vaquero architecture', slug: 'project-vaquero/architecture' },
            { label: 'Vaquero build journal', slug: 'project-vaquero/build-journal' },
            { label: 'Vaquero lessons learned', slug: 'project-vaquero/lessons-learned' },
            { label: 'Project Lightwell', slug: 'field-notes/project-lightwell-closed-loop' },
          ],
        },
        {
          label: 'Field Notes',
          items: [
            { label: 'Field notes index', slug: 'field-notes' },
            { label: 'Virtualization storage decisions', slug: 'field-notes/openshift-virtualization-storage-decisions' },
            { label: 'Disconnected OpenShift content flow', slug: 'field-notes/disconnected-openshift-content-flow' },
            { label: 'Home lab engineering', slug: 'homelab' },
          ],
        },
        { label: 'About', slug: 'about' },
      ],
    }),
  ],
});
