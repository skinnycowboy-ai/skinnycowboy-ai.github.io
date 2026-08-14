import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://skinnycowboy-ai.github.io',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    starlight({
      title: 'Platform & AI Technical Field Notes',
      description:
        'Role-based technical field notes for Red Hat OpenShift, AI, virtualization, automation, Project Vaquero, and SLED.',
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
          label: 'Project Vaquero',
          items: [{ autogenerate: { directory: 'project-vaquero' } }],
        },
        {
          label: 'SLED',
          items: [{ autogenerate: { directory: 'sled' } }],
        },
        {
          label: 'OpenShift',
          items: [{ autogenerate: { directory: 'openshift' } }],
        },
        {
          label: 'Red Hat AI',
          items: [{ autogenerate: { directory: 'red-hat-ai' } }],
        },
        {
          label: 'Virtualization',
          items: [{ autogenerate: { directory: 'virtualization' } }],
        },
        {
          label: 'Automation',
          items: [{ autogenerate: { directory: 'automation' } }],
        },
        {
          label: 'Home Lab',
          items: [{ autogenerate: { directory: 'homelab' } }],
        },
        {
          label: 'Field Notes',
          items: [{ autogenerate: { directory: 'field-notes' } }],
        },
        { label: 'About', slug: 'about' },
      ],
    }),
  ],
});
