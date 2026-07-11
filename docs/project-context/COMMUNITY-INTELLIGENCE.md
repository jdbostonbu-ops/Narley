# COMMUNITY-INTELLIGENCE.md

# Narley Community Intelligence

**Project:** Narley

**Document Version:** 3.0.0

**Status:** Draft

**Last Updated:** YYYY-MM-DD

---

# Purpose

Community Intelligence is Narley's collaborative resource verification system.

It combines:

- Reader observations
- AI-assisted verification
- Provider expertise

to maintain accurate, trustworthy, and up-to-date community resource information.

Community Intelligence is one of the core features that differentiates Narley from traditional resource directories.

---

# Philosophy

Resource information changes frequently.

Organizations may:

- Close
- Relocate
- Change phone numbers
- Lose funding
- Modify operating hours
- Expand services

Traditional directories often become outdated because updates rely on infrequent manual reviews.

Narley continuously improves information quality through community participation and provider verification.

---

# Core Principles

Community Intelligence follows five principles.

## Community Participation

Readers help identify potential issues.

Readers never directly modify published resources.

---

## AI Assistance

Artificial Intelligence gathers publicly available evidence.

AI provides recommendations.

AI never makes final decisions.

---

## Provider Authority

Providers are responsible for every published change.

Only Providers may:

- Update resources
- Close resources
- Archive resources
- Restore resources

---

## Transparency

Every published change should be traceable.

Review history should remain available for auditing purposes.

---

## Trust

Accuracy is more important than speed.

Verification should always be prioritized over automation.

---

# Community Intelligence Workflow

```text
Reader Report

↓

Provider Review Queue

↓

AI Verification

↓

Provider Review

↓

Provider Decision

↓

Published Resource Update

↓

Community Benefits
```

No stage should automatically bypass Provider review.

---

# Reader Reports

Readers may report resource issues directly from the Resource Detail Modal.

Readers are limited to structured report categories.

Version 3 supports:

- Closed
- Wrong Location
- Wrong Phone Number
- Phone Not in Service
- Hours Changed
- No Longer Offers Service
- Out of Funding

Future report categories require approval before implementation.

---

# Report Submission

Reader selects:

Report Resource

↓

Select Report Reason

↓

Confirmation Dialog

↓

Report Submitted

↓

Provider Review Queue

The Reader receives confirmation that the report has been submitted successfully.

---

# AI Verification

After a report is submitted, Narley may perform AI-assisted verification.

AI may collect publicly available information such as:

- Organization website status
- Public closure announcements
- Government listings
- News articles
- Public business directories
- Phone availability signals

AI produces:

- Confidence Score
- Evidence Summary
- Suggested Action

AI recommendations are advisory only.

---

# Provider Review Queue

All Reader reports and AI verification results enter the Provider Review Queue.

Each review item should display:

- Resource Name
- Category
- Report Type
- Submission Date
- AI Confidence (if available)
- Current Resource Status

Providers may sort and filter review items.

---

# Provider Review

Providers evaluate:

- Community reports
- AI evidence
- Internal knowledge
- Direct communication with the organization (if necessary)

Providers determine whether a published change is appropriate.

---

# Provider Decisions

After review, Providers may:

- Leave Resource Unchanged
- Update Resource Information
- Pause Resource
- Mark Resource Closed
- Archive Resource

Every published change should be recorded for auditing.

---

# Confirmation Dialogs

All resource visibility changes require confirmation.

Examples include:

- Mark Closed
- Archive
- Restore
- Pause

Users must always have the opportunity to cancel before changes are applied.

---

# Notifications

Providers should receive notifications for:

- New Reader Reports
- AI Verification Results
- Resources Requiring Review
- Pending Review Queue Items

Notification preferences should be configurable.

---

# Community Benefits

Community Intelligence improves:

- Resource accuracy
- Provider awareness
- Community engagement
- Reader trust
- Data quality

Readers become contributors without compromising data integrity.

---

# Accessibility

Community Intelligence workflows must remain accessible.

Requirements include:

- Plain language
- Accessible labels
- Large touch targets
- Screen reader compatibility
- High contrast
- Clear confirmation messages

---

# Security

Community Intelligence must protect against abuse.

Requirements include:

- Structured report categories
- Provider review before publication
- Audit history
- Role-based permissions

Readers cannot directly modify published resources.

---

# Business Rules

The following rules apply throughout Community Intelligence.

- Readers submit reports.
- AI gathers evidence.
- Providers review information.
- Providers make final decisions.
- Published changes require Provider approval.
- Resource history should remain auditable.

---

# Out of Scope

Version 3 does not include:

- Automatic AI publishing
- Automatic resource deletion
- Community voting on resource changes
- Anonymous resource editing
- Crowd-sourced publishing

Future enhancements require CPA approval.

---

# Success Metrics

Community Intelligence is successful when:

- Resource accuracy improves.
- Providers spend less time identifying stale information.
- Community reports help maintain reliable data.
- AI reduces manual research effort.
- Readers trust published resources.

---

# Guiding Principle

Community Intelligence combines community participation, provider expertise, and AI assistance to create a trustworthy, continuously improving community resource network.

Every published resource should reflect verified information rather than assumptions.

