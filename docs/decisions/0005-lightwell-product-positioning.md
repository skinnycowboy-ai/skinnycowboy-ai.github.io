# ADR 0005: Align Lightwell content with the IBM and Red Hat offering

- Status: Accepted
- Date: 2026-08-16

## Context

The initial public-site content incorrectly described Project Lightwell as a
field-developed buying motion and mapped it speculatively to Red Hat OpenShift,
OpenShift AI, Ansible Automation Platform, and Advanced Cluster Security.

Official IBM and Red Hat sources establish that Lightwell is a joint commercial
initiative for validated remediation of vulnerable third-party open source
dependencies. It is structured as an annual subscription with Lightwell Network
currently available and Lightwell Clearinghouse Premier in limited availability.

## Decision

The site will:

- describe Lightwell as a joint IBM and Red Hat initiative and commercial
  subscription offering;
- distinguish Lightwell Network from Lightwell Clearinghouse Premier and state
  their current availability accurately;
- explain the customer workflow around dependency inventory, catalog
  applicability, secured repositories, existing build pipelines, application
  testing, approval, deployment, and rollback;
- cite current official IBM and Red Hat sources for product, catalog, and
  availability claims;
- document the no-charge access program for eligible U.S. research universities
  while requiring eligibility confirmation;
- label planned government availability for Clearinghouse Premier as future
  direction, not current general availability; and
- remove speculative claims that OpenShift AI, Ansible Automation Platform,
  Advanced Cluster Security, or other Red Hat products are Lightwell components.

The Lightwell-related statements in ADR 0002 and ADR 0004 are amended by this
decision.

## Consequences

- Customers receive a factually accurate product and buying-path explanation.
- Education readers can identify a potentially relevant no-charge access path.
- Government readers can distinguish the available Network subscription from
  future Clearinghouse Premier expansion.
- CI fails if the withdrawn field-developed-concept language returns or if the
  current offering-status boundary disappears.
