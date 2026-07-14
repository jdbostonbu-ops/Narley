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
- Provider-to-Narley problem reporting

---

# Authentication and Account Security

Narley shall provide token-based authentication that:

- Issues a signed JSON Web Token (JWT) on successful login.
- Uses separate token types for Reader and Provider accounts.
- Requires a valid bearer token on all protected requests.
- Persists sessions securely on-device (Expo SecureStore).
- Stores Reader and Provider accounts in separate account tables.
- Requires Reader email verification through a time-limited verification code before account use.
- Supports password reset for both Reader and Provider accounts using a short (6-character) single-use, time-limited code delivered by email.
- Enforces password policy on account creation and password reset.
- Derives the acting user's identity from the verified token, never from client-supplied identity.

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
- Treats a Reader's first-hand report as primary, real-time evidence.
- Treats stale or persistent public directories as weak evidence of current operation.
- Expresses honest uncertainty and low confidence when evidence conflicts.
- Recommends human verification and leaves the final decision to the owning Provider.

---

# Provider-to-Narley Reporting

Narley shall allow a Provider to escalate a problematic resource directly to the Narley administrator, separate from AI verification. This system shall:

- Present a report action on a resource card.
- Prefill the reported resource's title, address, phone, and website.
- Collect a Provider-entered description of the problem.
- Require Provider authentication and derive the reporting identity from the verified token.
- Deliver the report to the Narley administrator by transactional email.
- Never automatically modify or delete the reported resource.

---

# Real-Time Resource Synchronization

Narley shall keep resource information consistent across both applications:

- When a Provider creates, edits, or deletes a resource and the change succeeds, the change is persisted to the backend and reflected in the Reader application.
- Every editable and displayable resource field (title, category, address, phone, website, notes, expiration) shall propagate to the Reader.
- The Reader shall reflect Provider changes without requiring the user to manually refresh, including when the Reader returns to the foreground.
- No edited field may appear updated in one application while remaining stale, missing, or unpersisted in the other.

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

Resources shall also:

- Include title, category, address, coordinates, expiration, status, phone, website, and notes/details.
- Enforce an expiration date that is valid, in the future, and no more than one year away.
- Automatically stop appearing in live Reader and Provider results once expired.
- Record create and update history as auditable events.
- Enforce duplicate-resource rules on title and address.
- Restrict resource creation, editing, and deletion to authenticated Providers whose organization owns the resource.

---

# Notifications

Narley shall support notifications for:

Reader:

- Reminder notifications
- Emergency alerts
- Location-based weather alerts
- Resource availability updates (future)

Provider:

- Community reports
- AI verification results
- Location-based weather alerts
- Review reminders
- Resource status notifications

---

# Weather Alerts

Narley shall provide location-based weather alerts in both applications:

- Alerts use the device's current location; the user does not manually enter a location for weather alerts.
- Extreme-heat alerts trigger at a daily maximum temperature at or above 91°F.
- Extreme-cold alerts trigger at a temperature at or below 32°F.
- Official warnings are sourced from the National Weather Service.
- Forecast temperatures are sourced from Open-Meteo.
- A generated temperature alert persists for its full 24-hour lifetime and shall not disappear because a later forecast no longer meets the threshold.
- A transient forecast or warning-service failure shall not clear existing, unexpired alerts.
- Expired alerts are removed automatically.
- Weather alerts are controlled by a per-application preference and contribute to the Alerts tab badge count when enabled.

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
- Enforce organization ownership on all resource changes.
- Protect sensitive information.
- Use secure token-based authentication.
- Store credentials using server-side password hashing.
- Validate user input.
- Prevent common injection vulnerabilities.
- Require confirmation dialogs for destructive actions.
- Keep external-service credentials on the server only, never in the mobile applications.

---

# Technical Requirements

Version 3 shall use:

- React Native
- Expo
- TypeScript (Strict Mode)
- Neon PostgreSQL
- Prisma ORM
- Express JSON API
- JWT bearer authentication
- Resend transactional email
- OpenAI Responses API with web search
- Open-Meteo and National Weather Service for weather data

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

All domain and security logic shall be developed test-first (RED → GREEN) and covered by an automated test suite.

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
- A Provider may only edit or delete resources owned by that Provider's organization.
- AI and Readers may never edit, close, archive, or delete a resource.

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