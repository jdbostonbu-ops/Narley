# PRD.md

# Narley Product Requirements Document (PRD)

**Project:** Narley

**Document Version:** 3.0.0

**Status:** Draft

**Last Updated:** YYYY-MM-DD

**Related Documents:**

- VISION.md
- MVP.md
- ARCHITECTURE.md
- CODING-STANDARDS.md
- VERSION-3-BUILD.md
- READER-APP-SPEC.md
- PROVIDER-APP-SPEC.md

---

# Purpose

This Product Requirements Document (PRD) defines the functional and non-functional requirements for Narley Version 3.

It serves as the primary product specification for developers, AI coding assistants, and future contributors.

---

# Project Overview

Narley is a mobile platform that connects individuals with verified community resources through two applications:

- Reader Application
- Provider Application

Narley is designed to improve access to community resources while enabling providers to maintain accurate, trustworthy, and up-to-date information.

The initial pilot organization is:

**Community Partners in Action (CPA)**

---

# Mission

Help people quickly locate trusted community resources through an accessible, map-first mobile experience.

---

# Product Goals

Narley should:

- Improve access to community resources.
- Reduce outdated resource information.
- Support multilingual users.
- Improve accessibility.
- Enable provider-managed resource verification.
- Support Community Intelligence.
- Reduce provider administrative effort.
- Increase community trust.

---

# Target Users

## Reader

Individuals seeking:

- Shelter
- Food
- Libraries
- Community centers
- Employment assistance
- Transportation
- Other community resources

---

## Provider

Verified organizations responsible for:

- Creating resources
- Updating resources
- Reviewing reports
- Verifying information
- Managing community resource data

---

# Functional Requirements

## Reader Application

The Reader application shall provide:

- Authentication
- Google Sign-In
- Interactive map
- Resource search
- Category filtering
- Resource cards
- Resource Detail Modal
- Save Resources
- Reminder support
- In-app route previews
- Emergency Mode
- Alerts
- Profile management
- Language selection
- Community reporting

---

## Provider Application

The Provider application shall provide:

- Authentication
- Resource creation
- Resource editing
- Resource lifecycle management
- Community Intelligence Dashboard
- Review Queue
- AI-assisted verification review
- Provider notifications
- Organization profile management

---

# Community Intelligence

Narley shall provide a Community Intelligence system allowing:

- Readers to report issues.
- AI to gather verification evidence.
- Providers to review reports.
- Providers to approve published changes.

Readers and AI shall never directly modify published resource information.

---

# AI Verification

Narley shall provide an AI-assisted verification system that:

- Reviews publicly available information.
- Generates confidence scores.
- Produces evidence summaries.
- Notifies Providers.
- Never publishes changes automatically.

---

# Resource Management

Resources shall support lifecycle states including:

- Draft
- Active
- Paused
- Closed
- Archived
- Restored

Permanent deletion should be avoided whenever practical.

---

# Notifications

Narley shall support notifications for:

Reader:

- Reminder notifications
- Emergency alerts
- Resource availability updates (future)

Provider:

- Community reports
- AI verification results
- Review reminders
- Resource status notifications

---

# Mapping

Narley shall provide:

- Interactive maps
- Configurable category pins
- Resource cards synchronized with pins
- Current location
- Search by city or ZIP Code
- In-app route previews for:
  - Walking
  - Driving
  - Public Transit
  - Bicycle

---

# Accessibility Requirements

Narley shall support:

- Screen readers
- High contrast
- Large touch targets
- Accessible labels
- Icon-assisted navigation
- Plain language
- Approximately 67 interface languages

Accessibility is a core product requirement.

---

# Security Requirements

Narley shall:

- Require authenticated users.
- Verify Provider accounts.
- Separate Reader and Provider permissions.
- Protect sensitive information.
- Use secure authentication.
- Validate user input.
- Prevent common injection vulnerabilities.
- Require confirmation dialogs for destructive actions.

---

# Technical Requirements

Version 3 shall use:

- React Native
- Expo
- TypeScript (Strict Mode)
- Neon PostgreSQL
- Prisma ORM

Alternative technologies require project approval.

---

# Non-Functional Requirements

The application should be:

- Reliable
- Responsive
- Accessible
- Secure
- Maintainable
- Testable
- Scalable

Performance should prioritize usability over unnecessary visual effects.

---

# Business Rules

The following rules apply throughout the application:

- Providers own published resource data.
- Readers submit reports.
- AI assists Providers.
- Providers approve all published changes.
- Resource history should remain auditable.
- Public libraries are seeded as real resources.
- Mock production data is prohibited.

---

# Out of Scope

Version 3 does not include:

- Future Ideas
- Post Capstone features
- Features awaiting CPA approval
- Automatic AI publishing
- Automatic AI resource deletion
- Reader editing of published resources

---

# Success Criteria

Version 3 is considered successful when:

- Reader application is complete.
- Provider application is complete.
- Community Intelligence is operational.
- AI-assisted verification is functional.
- Accessibility requirements are satisfied.
- Documentation is complete.
- CPA pilot deployment is ready.

---

# Guiding Principle

Narley succeeds by providing accurate, trustworthy, and accessible community resource information through collaboration between Readers, Providers, and AI-assisted verification while ensuring Providers remain the final authority for all published data.

