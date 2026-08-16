# ADR 0004: Make the public site customer-facing

- Status: Accepted
- Date: 2026-08-16
- Product-classification amendment: ADR 0005

## Context

SLED customers and technical stakeholders can read this public site. The initial
campaign-hub design exposed the author's internal field workflow, channel
planning, and pipeline-oriented language. That made the site look like an
operating dashboard for the author rather than a useful technical resource for
the reader.

## Decision

The public site will:

- lead with public-sector outcomes, constraints, platform approaches, and
  validation questions;
- use explicit customer-readable navigation labels rather than directory names;
- keep Red Hat product guides and long-form field notes as durable technical
  resources;
- present Project Vaquero as bounded lab evidence, not production assurance;
- present Lightwell as the joint IBM and Red Hat commercial offering documented
  in current official sources;
- retain a minimal compatibility page at the old campaign-hub URL that directs
  readers to SLED Solutions; and
- exclude customer records, contacts, account plans, pricing, opportunity data,
  lead capture, and internal channel or pipeline workflows.

Internal campaign planning and approved outreach workflows must live in a
separate access-controlled system. The public repository is not that system.

## Consequences

- A customer can begin with a mission or operational problem and reach relevant
  Red Hat platform guidance and technical evidence.
- Public navigation no longer exposes implementation-oriented folder names.
- Editorial checks fail when internal campaign language reappears in rendered
  site content.
- Product and lab boundaries remain visible without dominating the customer
  experience.
