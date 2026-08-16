# Contributing

## Content workflow

1. Create a branch from the current `main` branch.
2. Add or update MDX under `src/content/docs/`.
3. Keep customer, contact, account, opportunity, and pricing data out of the repo.
4. Verify product claims against current official Red Hat documentation.
5. State what Project Vaquero evidence proves and what remains outside scope.
6. Run `npm test` and `git diff --check`.
7. Open a draft pull request for technical and editorial review.

## Article requirements

Every field note must include:

- A specific technical question or problem
- Named Red Hat products when relevant
- Current product-documentation review before publication
- Architecture assumptions and operational ownership
- Evidence and acceptance criteria for demonstrations
- Explicit limitations
- No confidential or customer-identifying information

Lightwell must be identified as a joint IBM and Red Hat commercial initiative.
Content must distinguish the currently available Lightwell Network subscription
from the limited-availability Lightwell Clearinghouse Premier offering and cite
current official IBM or Red Hat sources for availability and catalog claims.

## Dependency changes

Pin dependency versions in `package.json`, regenerate `package-lock.json`, and
run the complete validation build. Dependabot may open grouped Astro updates,
but each update still requires a successful build and review.
