# Narley Project Documentation

Welcome to the Narley project documentation.

This folder contains the official technical, architectural, and product documentation for the Narley platform.

These documents are the single source of truth for application behavior, design decisions, architecture, coding standards, and implementation guidance.

Every significant feature should be documented before implementation.

---

# Project Overview

Narley is a mobile-first community resource platform designed to connect individuals with verified community resources through an accessible, map-based experience.

The platform consists of two mobile applications:

- **Reader App** – Public-facing application used to discover community resources.
- **Provider App** – Provider-facing application used to create, manage, and verify community resources.

Narley is initially being developed in collaboration with **Community Partners in Action (CPA)** and follows an MVP-first development strategy.

---

# Purpose of this Folder

This folder exists to ensure developers, AI coding assistants, instructors, and project partners all work from the same documentation.

Documentation should always be updated before or alongside implementation.

---

# Documentation Reading Order

New developers and AI coding assistants should review documents in the following order:

1. README.md
2. DOCUMENTATION-STATUS.md
3. VISION.md
4. DECISIONS.md
5. MVP.md
6. ARCHITECTURE.md
7. CODING-STANDARDS.md
8. VERSION-3-BUILD.md
9. READER-APP-SPEC.md
10. PROVIDER-APP-SPEC.md
11. UI-BEHAVIORS.md
12. PIN-SYSTEM.md
13. AI-PIN-VERIFICATION.md
14. COMMUNITY-INTELLIGENCE.md
15. LANGUAGE-SUPPORT.md
16. design-theme-layout.md
17. Narley Features.md
18. ROADMAP.md
19. PRD.md

---

# Source of Truth

If documentation conflicts, use the following order of precedence:

1. VERSION-3-BUILD.md
2. DECISIONS.md
3. ARCHITECTURE.md
4. PRD.md
5. Reader and Provider Specifications
6. UI Specifications
7. Narley Features.md

---

# Version 3 Philosophy

Version 3 extends Version 2.

Do not redesign the Reader application.

Preserve:

- Existing layouts
- Navigation
- Theme
- Colors
- Assets
- Logos
- Typography
- Existing Reader workflows
- Existing Provider workflows unless explicitly modified

Version 3 should improve the application while preserving the successful Version 2 user experience.

---

# Technology Stack

Current planned architecture:

- React Native
- Expo
- TypeScript (Strict Mode)
- Neon PostgreSQL
- Prisma ORM
- Google Authentication
- Apple Developer Program
- Shared component architecture

---

# Development Philosophy

Narley follows several core principles:

- MVP First
- Accessibility First
- Mobile First
- Community Driven
- AI Assisted
- Human Verified
- CPA Guided
- Security Focused
- Documentation Before Implementation

---

# AI Development Guidelines

AI coding assistants should:

- Read documentation before modifying code.
- Preserve Version 2 behavior.
- Avoid implementing future features.
- Never redesign the application without approval.
- Follow coding standards.
- Ask for clarification when documentation conflicts.

---

# CPA Collaboration

Narley is being developed in partnership with Community Partners in Action (CPA).

CPA feedback determines:

- Future features
- Resource categories
- Provider workflows
- Community Intelligence improvements
- Pin system approval
- Future roadmap priorities

---

# Documentation Maintenance

Whenever functionality changes:

1. Update the appropriate markdown document.
2. Update DOCUMENTATION-STATUS.md.
3. Update VERSION-3-CHANGELOG.md if implementation changes.
4. Commit documentation alongside code whenever practical.

---

# Repository Structure

```text
docs/
└── project-context/

capstone/

apps/

packages/

prisma/
```

---

# Goal

The goal of this documentation is to allow any developer, AI coding assistant, instructor, or CPA reviewer to understand Narley without relying on previous conversations or undocumented knowledge.