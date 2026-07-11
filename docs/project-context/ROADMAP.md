# ROADMAP.md

# Narley Version 3 Development Roadmap

**Project:** Narley

**Document Version:** 3.0.0

**Status:** Living Document

**Last Updated:** YYYY-MM-DD

---

# Purpose

This roadmap tracks the implementation progress of Narley Version 3.

It serves as the primary planning document for development and provides a high-level view of completed work, work in progress, and planned implementation phases.

The roadmap is updated throughout development and reflects the current state of the project.

---

# Roadmap Philosophy

Narley follows a documentation-first development process.

Every phase follows this workflow:

Documentation

↓

Architecture

↓

Implementation

↓

Testing

↓

Review

↓

Commit

Each phase should be completed before beginning the next whenever practical.

---

# Current Project Status

Project Phase

☑ Documentation Foundation Complete

☐ Version 3 Implementation

☐ Testing

☐ CPA Pilot

☐ Production Release

---

# Phase 1 – Documentation Foundation

**Objective**

Establish the complete technical documentation required to guide Version 3 development.

### Status

✅ Complete

### Deliverables

- [x] README.md
- [x] DOCUMENTATION-STATUS.md
- [x] VISION.md
- [x] DECISIONS.md
- [x] MVP.md
- [x] PRD.md
- [x] ARCHITECTURE.md
- [x] CODING-STANDARDS.md
- [x] VERSION-3-BUILD.md
- [x] READER-APP-SPEC.md
- [x] PROVIDER-APP-SPEC.md
- [x] UI-BEHAVIORS.md
- [x] COMMUNITY-INTELLIGENCE.md
- [x] AI-PIN-VERIFICATION.md
- [x] PIN-SYSTEM.md
- [x] LANGUAGE-SUPPORT.md

### Completion Criteria

- Documentation reviewed
- Folder structure established
- Version 3 implementation guidance complete

---

# Phase 2 – Version 3 Project Setup

**Objective**

Prepare the development environment for Version 3.

### Status

⬜ Not Started

### Tasks

- [ ] Duplicate Version 2 into Version 3 working folder
- [ ] Verify project builds successfully
- [ ] Configure Neon PostgreSQL
- [ ] Configure Prisma ORM
- [ ] Configure environment variables
- [ ] Verify Expo configuration
- [ ] Configure Google Sign-In
- [ ] Verify Apple Developer configuration
- [ ] Configure ESLint
- [ ] Configure TypeScript Strict Mode

### Dependencies

Phase 1 Complete

### Completion Criteria

Development environment is stable and ready for implementation.

---

# Phase 3 – Reader Application

**Objective**

Complete the Reader application.

### Status

⬜ Not Started

### Tasks

- [ ] Category icon pin system
- [ ] Resource card updates
- [ ] Resource Detail Modal improvements
- [ ] Save Resources
- [ ] Reminder support
- [ ] Directions
- [ ] Language selector
- [ ] Community reporting
- [ ] Accessibility improvements
- [ ] Error state review

### Dependencies

Phase 2 Complete

### Completion Criteria

Reader application matches Reader specification.

---

# Phase 4 – Provider Application

**Objective**

Complete the Provider application.

### Status

⬜ Not Started

### Tasks

- [ ] Provider Dashboard
- [ ] My Posts
- [ ] Resource lifecycle
- [ ] Community Intelligence Dashboard
- [ ] Review Queue
- [ ] Alerts
- [ ] Notifications
- [ ] Provider Profile

### Dependencies

Reader application stable

### Completion Criteria

Provider workflows fully operational.

---

# Phase 5 – Community Intelligence

**Objective**

Implement collaborative resource verification.

### Status

⬜ Not Started

### Tasks

- [ ] Reader reports
- [ ] Provider review queue
- [ ] Review workflow
- [ ] Confirmation dialogs
- [ ] Audit history

### Dependencies

Reader and Provider applications complete.

### Completion Criteria

Community Intelligence operational.

---

# Phase 6 – AI Verification

**Objective**

Implement AI-assisted verification.

### Status

⬜ Not Started

### Tasks

- [ ] Verification triggers
- [ ] Public evidence gathering
- [ ] Confidence scoring
- [ ] Evidence summaries
- [ ] Provider notifications
- [ ] Verification history
- [ ] AI feedback tracking

### Dependencies

Community Intelligence complete.

### Completion Criteria

AI verification operational.

---

# Phase 7 – Accessibility

**Objective**

Validate accessibility throughout the application.

### Status

⬜ Not Started

### Tasks

- [ ] Screen reader review
- [ ] Large touch targets
- [ ] Accessible labels
- [ ] High contrast
- [ ] Language selector
- [ ] Keyboard navigation (where applicable)

### Completion Criteria

Accessibility requirements satisfied.

---

# Phase 8 – Testing

**Objective**

Validate application quality.

### Status

⬜ Not Started

### Tasks

- [ ] Unit tests
- [ ] Component tests
- [ ] Authentication testing
- [ ] Reader workflow testing
- [ ] Provider workflow testing
- [ ] AI verification testing
- [ ] Accessibility testing
- [ ] Performance testing

### Completion Criteria

Testing complete with no critical defects.

---

# Phase 9 – CPA Pilot

**Objective**

Prepare Narley for pilot deployment with Community Partners in Action.

### Status

⬜ Not Started

### Tasks

- [ ] Seed public libraries
- [ ] Configure pilot data
- [ ] Verify provider accounts
- [ ] Review documentation
- [ ] Gather CPA feedback

### Completion Criteria

CPA pilot ready.

---

# Phase 10 – Production Release

**Objective**

Prepare Narley for public release.

### Status

⬜ Not Started

### Tasks

- [ ] Production database
- [ ] Production environment
- [ ] Security review
- [ ] Performance review
- [ ] Final QA
- [ ] App Store preparation
- [ ] Google Play preparation

### Completion Criteria

Production release approved.

---

# Future Work

The following items remain outside Version 3:

- Future Ideas
- Post Capstone features
- Features pending CPA approval

These items should not be implemented until they are formally approved and documented.

---

# Roadmap Maintenance

This roadmap is a living document.

When work begins:

- Update task status.
- Record completed phases.
- Add new approved phases as needed.
- Remove completed implementation risks.

---

# Guiding Principle

Narley is developed incrementally through documented, tested, and reviewable phases.

Each completed phase should improve the stability, accessibility, and reliability of the platform while remaining consistent with the Version 3 architecture.

