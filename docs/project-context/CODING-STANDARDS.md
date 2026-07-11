# CODING-STANDARDS.md

# Narley Coding Standards

**Project:** Narley

**Version:** 3.0

**Status:** Approved

---

# Purpose

This document defines the mandatory coding standards, engineering practices, security requirements, accessibility requirements, and development workflow for the Narley project.

These standards apply to:

- Developers
- AI coding assistants (Codex, ChatGPT, etc.)
- Future contributors

These standards are **non-negotiable** unless formally revised.

---

# Development Philosophy

Narley prioritizes:

- Simplicity
- Readability
- Accessibility
- Security
- Maintainability
- Testability
- Documentation
- Long-term sustainability

The goal is not to write the shortest code.

The goal is to write the simplest correct solution that remains easy to understand and maintain.

---

# Technology Standards

Required technologies:

- React Native
- Expo
- TypeScript (Strict Mode)
- Neon PostgreSQL
- Prisma ORM

Alternative technologies should not be introduced without project approval.

---

# Code Constraints (Non-Negotiable)

## TypeScript

The following rules are mandatory.

- TypeScript Strict Mode is required.
- The `any` type is prohibited.
- Use `unknown` when a value cannot be typed immediately and narrow it safely.
- All exported functions, interfaces, types, and components must be strongly typed.
- Avoid unnecessary type assertions.

---

## Variables

Variable declarations must follow these rules.

- `var` is prohibited.
- `const` must be used by default.
- `let` may only be used when reassignment is required.

---

## Functions

Narley uses closure-based function components and arrow functions.

Preferred:

```tsx
const ResourceCard = () => {
  // component
};
```

Avoid:

```tsx
function ResourceCard() {
}
```

Maintain a consistent functional programming style throughout the project.

---

## Simplicity Without Sacrificing Quality

Write the simplest correct solution.

Avoid:

- Clever code
- Premature optimization
- Duplicate logic
- Over-engineering
- Unnecessary abstractions

Simple code should never reduce:

- Readability
- Maintainability
- Security
- Accessibility
- Testability

---

# Shared Code

Before creating new code:

Check whether functionality already exists.

If functionality is shared by Reader and Provider applications:

Place it inside the appropriate shared package.

Avoid code duplication whenever practical.

---

# Naming Conventions

Use descriptive names.

Avoid abbreviations.

Example:

Good

```tsx
resourceCategory
```

Avoid

```tsx
rc
```

Names should clearly communicate intent.

---

# Component Design

Components should:

- Have one responsibility
- Be reusable
- Be composable
- Be testable

Avoid large monolithic components.

---

# State Management

Keep state as local as practical.

Avoid unnecessary global state.

Derived state should not be duplicated.

---

# Error Handling

Every user-facing workflow should include:

- Loading state
- Empty state
- Error state
- Retry path (where appropriate)

Never silently ignore errors.

---

# Security Standards

Security is required.

---

## Authentication

Use secure authentication.

Reader and Provider authorization must remain separate.

Provider-only functionality must require verified provider access.

---

## Input Validation

Never trust user input.

Validate:

- Forms
- Search
- Reports
- Provider submissions

Server-side validation is required for persisted data.

---

## XSS Prevention

Treat all user-supplied content as untrusted.

Requirements:

- Never inject raw HTML from user input.
- Render user content using the platform's safe text rendering mechanisms.
- Sanitize externally sourced content where appropriate.
- Prevent Cross-Site Scripting (XSS) and related injection attacks.

---

## Secrets

Never commit:

- API keys
- Database credentials
- Tokens
- Secrets

Use environment variables.

---

# Accessibility Standards

Accessibility is a required feature.

Not an enhancement.

---

## Labels

Every interactive form control must have an associated accessible label.

Forms should satisfy accessibility requirements and avoid form-node violations identified by developer tools.

---

## Color

Never communicate meaning using color alone.

Always combine:

- Color
- Text
- Icons

---

## Touch Targets

Interactive elements should provide comfortable touch targets for mobile devices.

---

## Screen Readers

Interactive controls should expose meaningful accessibility labels and roles.

---

# Map Standards

Map pins and resource cards represent the same resource.

Selecting either:

- Opens the same Resource Detail Modal.

Do not duplicate business logic between map pins and cards.

---

# Confirmation Dialogs

Any action that changes, hides, archives, closes, removes, or deletes data must require confirmation.

Examples:

- Archive
- Mark Closed
- Remove Saved Resource
- Delete
- Pause Resource

Users must always be given an opportunity to cancel.

---

# AI Development Rules

AI coding assistants must:

- Read project documentation before coding.
- Preserve Version 2 behavior.
- Follow all coding standards.
- Ask for clarification rather than making assumptions.

AI assistants must not:

- Invent features
- Redesign the application
- Ignore documentation
- Introduce unapproved dependencies

---

# Documentation First

Major functionality should be documented before implementation.

When behavior changes:

1. Update documentation.
2. Update implementation.
3. Update tests.

Documentation remains the source of truth.

---

# Testing Standards

Testing should focus on:

- Shared utilities
- Business logic
- Resource workflows
- Authentication
- Provider authorization
- Community reporting
- Confirmation dialogs

Critical workflows should not rely solely on manual testing.

---

# Command Execution

AI assistants do not execute terminal commands.

Instead:

Provide the exact command required.

Jacqueline executes all terminal commands.

Example:

```bash
npx prisma migrate dev
```

Never state that commands have already been executed.

---

# Project Non-Negotiables

The following rules apply throughout the Narley project.

- Preserve Version 2 as the baseline.
- Extend Version 2 rather than redesign it.
- No mock production data.
- Public libraries are real seeded resources.
- Future Ideas are out of scope.
- Post Capstone features are out of scope.
- Features awaiting CPA approval are not implemented.
- AI assists providers but never makes final decisions.
- Community reports require provider review.
- Confirmation dialogs are required for destructive actions.

---

# Definition of Done

A feature is considered complete when:

- Requirements are implemented.
- Code follows these standards.
- Accessibility requirements are met.
- Security requirements are met.
- Tests pass.
- Documentation has been updated.
- Linting passes with no errors.
- TypeScript compiles with no errors.

---

# Guiding Principle

Every line of code should improve Narley while remaining readable, secure, accessible, maintainable, and consistent with the project's documented architecture.