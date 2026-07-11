# Narley Documentation Status

**Project:** Narley

**Documentation Version:** 3.0.0

**Last Updated:** July 2026

---

# Purpose

This document tracks the status of every project document used to design, build, and maintain the Narley platform.

It serves as the master documentation checklist and should be updated whenever a document is created, revised, approved, or retired.

This document also identifies which specifications are considered the official source of truth for Version 3.

---

# Documentation Philosophy

Narley is being documented before implementation.

The documentation is intended to eliminate ambiguity for:

- Developers
- AI coding assistants
- CPA reviewers
- Capstone reviewers
- Future contributors

Every major application behavior should exist inside a markdown specification before code is written.

---

# Source of Truth

If documentation conflicts, use the following order of precedence.

1. VERSION-3-BUILD.md
2. DECISIONS.md
3. ARCHITECTURE.md
4. PRD.md
5. Individual Application Specifications
6. Narley Features.md

---

# Documentation Status

| Document | Status | Notes |
|-----------|--------|------|
| VISION.md | Ready to Write | Project vision |
| DECISIONS.md | Ready to Write | Project decisions |
| MVP.md | Ready to Write | Version 1 scope |
| PRD.md | Pending | Depends on specifications |
| ARCHITECTURE.md | Ready to Write | System architecture |
| CODING-STANDARDS.md | Ready to Write | Engineering standards |
| ROADMAP.md | Pending | Generated after PRD |
| VERSION-3-BUILD.md | Ready to Write | Codex implementation contract |
| VERSION-3-CHANGELOG.md | Pending | Starts with Version 3 development |
| READER-APP-SPEC.md | Ready to Write | Reader application |
| PROVIDER-APP-SPEC.md | Ready to Write | Provider application |
| UI-BEHAVIORS.md | Ready to Write | UX behavior specification |
| PIN-SYSTEM.md | Awaiting CPA Review | Proposed pin architecture |
| AI-PIN-VERIFICATION.md | Ready to Write | AI verification workflow |
| COMMUNITY-INTELLIGENCE.md | Ready to Write | Community reporting |
| LANGUAGE-SUPPORT.md | Ready to Write | 67-language implementation |
| design-theme-layout.md | Complete | Current design specification |
| Narley Features.md | Complete | Master feature inventory |

---

# Completed Documents

## Completed

- design-theme-layout.md
- Narley Features.md

---

# In Progress

None

---

# Awaiting Review

PIN-SYSTEM.md

Status:

Pending CPA approval of final map pin design.

---

# Future Documents

These documents will be added after CPA meetings when needed.

- CPA Feature Requests.md
- CPA Decisions.md
- CPA Meeting Notes.md
- User Testing Results.md
- Accessibility Audit.md

---

# Documentation Rules

Every markdown document should:

- Have one clear responsibility.
- Avoid duplicating information from other documents.
- Reference related specifications where appropriate.
- Remain technology-agnostic unless documenting architecture.
- Be updated before implementation changes.

---

# Version History

## Version 3.0

Initial professional documentation package.

Includes:

- Reader specifications
- Provider specifications
- AI architecture
- Community Intelligence
- Version 3 implementation rules
- Coding standards
- Architecture
- Design system

---

# Maintenance

Whenever a document changes:

1. Update the document.
2. Update this status page.
3. Record the date of change.
4. Update VERSION-3-CHANGELOG.md if implementation is affected.

---

# Goal

The goal of this documentation is to make Narley understandable without requiring tribal knowledge.

A new developer, AI coding assistant, or project reviewer should be able to understand the project by reading the documentation in this folder.