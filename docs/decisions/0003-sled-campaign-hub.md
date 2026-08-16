# ADR 0003: Organize SLED field content through a campaign hub

- Status: Accepted
- Date: 2026-08-16

## Context

The repository has durable Red Hat product collections and SLED context pages,
but it lacks a clear path from an observed customer problem to discovery,
technical proof, evidence, and a next decision. Copying product claims into
campaign pages would create editorial drift. Storing account or opportunity data
would also violate the repository's public-data boundary.

Project Lightwell must appear as a SLED buying motion while remaining clearly
separate from the Red Hat product catalog. Project Vaquero can contribute lab
evidence, but its results cannot be presented as production assurance.

## Decision

Create `src/content/docs/sled/campaign-hub/index.mdx` as the connective layer
between SLED customer signals and the existing technical library.

The hub will:

- define a small set of reusable buying motions;
- organize each motion around signal, discovery, capabilities to evaluate,
  smallest useful proof, evidence, and next decision;
- link to canonical product and field-note pages instead of copying their
  detailed claims;
- label Project Lightwell as a field-developed buying motion and explicitly
  state that it is not a Red Hat product;
- preserve Project Vaquero's lab-evidence boundary;
- exclude customer, contact, account, pricing, opportunity, and CRM data; and
- treat LinkedIn, YouTube, Facebook, and X content as human-reviewed drafts for
  approved systems, not automatic publishing targets.

CI will require the hub route and verify the Project Lightwell boundary in both
source and rendered output.

## Consequences

- SLED outreach can begin with a problem and a proof rather than a product list.
- Product facts remain easier to update because the technical collections are
  canonical.
- The public repository can support reusable field enablement without becoming
  a CRM or lead-capture system.
- New buying motions must follow the same evidence and data boundaries.
- Social automation remains a future, approved-system integration and cannot be
  inferred from content publication alone.

