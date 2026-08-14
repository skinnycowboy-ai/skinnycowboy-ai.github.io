# ADR-0001: Astro, Starlight, and GitHub Pages

- Status: Accepted for implementation
- Date: 2026-08-14

## Context

The site needs a maintainable technical-writing workflow, file-based navigation,
MDX components, full-text search, static hosting, and a straightforward path from
an article to human-reviewed channel derivatives.

## Decision

Use Astro with Starlight and store all public technical content in
`src/content/docs/`. Build a static site and deploy it to the special
`skinnycowboy-ai.github.io` GitHub Pages repository.

Pin direct package versions and commit the npm lockfile. Validate required
content paths and editorial boundaries before each build.

## Consequences

- Articles remain reviewable as ordinary MDX files.
- Git history provides the editorial and architecture record.
- GitHub Pages serves a static site without runtime credentials or server state.
- Content changes require a build before publication.
- A future CMS or channel-draft generator must preserve the MDX source of truth.
