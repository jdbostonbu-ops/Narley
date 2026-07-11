# AI-PIN-VERIFICATION.md

# Narley AI Pin Verification System

**Project:** Narley

**Document Version:** 3.0.0

**Status:** Draft

**Last Updated:** YYYY-MM-DD

---

# Purpose

The AI Pin Verification System assists Providers in maintaining accurate community resource information.

Artificial Intelligence continuously evaluates published resources using publicly available information and community reports.

AI is designed to reduce manual research while preserving Provider authority.

AI never publishes changes.

AI never deletes resources.

AI never overrides Provider decisions.

---

# Philosophy

Artificial Intelligence serves as an intelligent research assistant.

Its responsibilities are:

- Gather evidence
- Detect potential problems
- Prioritize review items
- Present supporting information

Its responsibilities do NOT include:

- Publishing changes
- Closing resources
- Editing resources
- Removing resources
- Contacting Readers

Every published change requires Provider approval.

---

# Goals

The AI verification system should:

- Improve data accuracy.
- Reduce stale resource information.
- Detect potential closures.
- Detect disconnected phone numbers.
- Detect outdated addresses.
- Reduce Provider research time.
- Increase community trust.

---

# Verification Triggers

AI verification may begin when:

- A Reader submits a report.
- A new resource is created.
- A Provider updates a resource.
- A scheduled verification cycle occurs.
- A resource has not been reviewed within a defined period.
- A Provider manually requests verification.

These triggers may be expanded in future versions.

---

# Verification Workflow

```text
Verification Trigger

↓

Collect Public Evidence

↓

Evaluate Evidence

↓

Generate Confidence Score

↓

Create Verification Result

↓

Notify Provider

↓

Provider Reviews

↓

Provider Decision
```

Provider approval is required before any published change.

---

# Public Evidence Sources

AI may evaluate publicly available information, including:

- Official organization websites
- Government websites
- Public nonprofit directories
- Public business listings
- News articles
- Public announcements
- Public social media announcements (when appropriate)
- Public contact information

AI should prioritize authoritative sources whenever possible.

---

# Community Reports

Reader reports may increase the priority of verification.

Example:

```text
Three Readers report:

Phone Not in Service

↓

AI verifies phone number

↓

Confidence increases

↓

Provider notified
```

Reader reports assist prioritization but never determine outcomes.

---

# Confidence Levels

Each verification result includes a confidence level.

Suggested categories:

```text
High

Medium

Low
```

Confidence reflects the strength of available evidence.

Confidence does not determine Provider decisions.

---

# Evidence Summary

Each verification should generate a concise evidence summary.

Example:

```text
Organization website indicates permanent closure.

Public announcement dated May 2024.

Phone number unreachable during verification.

Confidence:

High
```

Evidence summaries should remain factual and avoid speculation.

---

# Provider Notification

Providers should receive an in-app notification when:

- High-confidence verification results are generated.
- Multiple community reports exist.
- A resource requires immediate review.

Notifications should link directly to the relevant resource.

---

# Provider Actions

After reviewing AI evidence, Providers may:

- Leave resource unchanged.
- Update resource information.
- Pause resource.
- Mark resource closed.
- Archive resource.
- Restore resource.

All changes require Provider confirmation.

---

# Hallucination Prevention

AI verification must minimize incorrect conclusions.

To reduce hallucinations:

- Prefer authoritative sources.
- Compare multiple independent sources.
- Clearly distinguish facts from recommendations.
- Never fabricate evidence.
- Report uncertainty when evidence is inconclusive.

If confidence is low, AI should recommend additional Provider review rather than suggesting a specific action.

---

# Evidence Requirements

AI recommendations should include:

- Source type
- Date of evidence (when available)
- Summary
- Confidence level

Providers should understand why the recommendation was generated.

---

# Scheduled Verification

Providers may configure periodic verification for resources.

Examples:

- Monthly
- Quarterly
- Annually

Resources with recent community reports may be prioritized.

---

# Verification History

Every verification should be recorded.

History may include:

- Verification date
- Trigger
- Confidence level
- Evidence summary
- Provider decision

Verification history supports auditing and future review.

---

# Notifications

Providers may receive notifications for:

- High-confidence verification results
- Resources awaiting review
- Repeated community reports
- Scheduled verification reminders

Notification preferences should be configurable.

---

# Security

AI must never:

- Modify production data directly.
- Delete resources.
- Publish updates.
- Override Provider authority.

All AI operations should follow the principle of least privilege.

---

# Accessibility

Verification information should be presented using:

- Plain language
- Clear headings
- High contrast
- Accessible labels

Complex technical terminology should be avoided where possible.

---

# Business Rules

The following rules apply:

- AI assists Providers.
- Providers approve all published changes.
- Reader reports increase review priority.
- AI confidence is advisory.
- Verification history should be retained.
- Evidence should remain transparent.

---

# Future Enhancements

Potential future improvements include:

- Additional public data sources
- Improved confidence scoring
- Better evidence summarization
- Agency-specific verification rules

Future enhancements require documentation and approval before implementation.

---

# Out of Scope

Version 3 does not include:

- Automatic resource publishing
- Automatic resource deletion
- Automatic Provider decisions
- Fully autonomous AI moderation
- AI communication with Readers

These capabilities are intentionally excluded.

---

# Guiding Principle

Artificial Intelligence strengthens Community Intelligence by reducing manual research while preserving human oversight.

Every recommendation should help Providers make informed decisions without replacing their judgment.