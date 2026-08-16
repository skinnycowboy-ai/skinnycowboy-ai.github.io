# Platform & AI Technical Field Notes

Astro/Starlight source for the proposed GitHub Pages site at
`https://skinnycowboy-ai.github.io`.

The repository is a role-based technical library for Red Hat OpenShift, Red Hat
AI, OpenShift Virtualization, Ansible Automation Platform, Project Vaquero, and
state, local government, and education (SLED) contexts.

## Architecture

- Astro `7.2.2`
- Starlight `0.41.7`
- Static output for GitHub Pages
- MDX content in `src/content/docs/`
- GitHub Actions validation on every pull request and main-branch push
- Manual-only GitHub Pages deployment until publication is explicitly approved

The repository name follows GitHub's special `<username>.github.io` convention,
so the site is served from `/` and does not require an Astro `base` path.

## Content structure

```text
src/content/docs/
├── index.mdx
├── project-vaquero/
│   ├── architecture.mdx
│   ├── build-journal.mdx
│   └── lessons-learned.mdx
├── sled/
│   ├── education/
│   ├── state-local-government/
│   ├── modernization/
│   ├── disconnected-environments/
│   ├── security-compliance/
│   ├── application-platforms/
│   ├── artificial-intelligence/
│   └── field-notes/
├── openshift/
├── red-hat-ai/
├── virtualization/
├── automation/
├── homelab/
└── field-notes/
```

## Local development

Requirements:

- Node.js `>=22.12.0`
- npm `>=9.6.5`

```bash
npm ci
npm run dev
```

The development server prints the local URL after startup.

## Validation

```bash
npm test
git diff --check
git status --short
```

`npm test` validates the required content hierarchy, enforces the verified
Lightwell offering and availability boundaries, type-checks the Astro project, produces the static
site, verifies required build artifacts, and resolves every internal link in the
rendered HTML.

## Editorial boundaries

- Working technical notes developed for a Red Hat field role; not a personal
  commercial offering.
- Not official Red Hat product documentation, support guidance, or a production
  architecture review.
- Product claims require review against current official Red Hat documentation.
- No Salesforce integration, customer records, contact data, opportunity data,
  pricing, or lead-capture forms.
- No automatic social publication.
- Project Vaquero lab evidence is not production assurance.

See [Editorial boundaries](docs/decisions/0002-editorial-boundaries.md).

## Publication handoff

Public publication is intentionally disabled by process, not by an application
feature. The deployment workflow runs only through a manual GitHub Actions
dispatch.

After explicit approval:

1. Create `skinnycowboy-ai/skinnycowboy-ai.github.io` with the approved visibility.
2. Push the validated `main` branch.
3. In **Settings → Pages**, select **GitHub Actions** as the source.
4. Run **Deploy to GitHub Pages** manually from the Actions tab.
5. Verify the resulting URL and the key article routes.

No content or code license is granted yet. Select a code and written-content
license before public release if reuse should be permitted.
