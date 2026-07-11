# DECISIONS.md

# Narley Project Decisions

This document records architectural, product, and implementation decisions that govern the Narley project.

These decisions should be treated as project rules unless formally revised.

---

# Product Decisions

## Reader and Provider Applications

Narley consists of two separate mobile applications.

- Reader App
- Provider App

Both applications share architecture, components, theme, and database models where appropriate.

---

## Version Philosophy

Version 3 is an extension of Version 2.

Version 3 is **not** a redesign.

Existing Reader layouts, navigation, colors, themes, assets, and workflows should be preserved unless explicitly changed.

---

## MVP First

Narley follows an MVP-first development strategy.

Only features required for the CPA pilot should be implemented.

Future ideas remain documented but are intentionally excluded until approved.

---

## CPA Guided Development

Future functionality should be guided by CPA feedback.

Features are not implemented simply because they are technically possible.

---

# Technology Decisions

Backend

- Neon PostgreSQL

ORM

- Prisma

Framework

- React Native

Platform

- Expo

Language

- TypeScript (Strict Mode)

Authentication

- Google Sign-In
- Apple deployment
- Email authentication

---

# AI Decisions

Artificial Intelligence assists providers.

AI never replaces provider decision making.

AI may:

- Detect possible closures
- Check disconnected phone numbers
- Identify stale resources
- Generate confidence scores

AI may not:

- Delete resources
- Publish changes
- Modify provider information
- Remove pins

Provider approval is always required.

---

# Community Intelligence

Community reporting is a core feature.

Readers may report:

- Closed
- Wrong location
- Wrong phone number
- Phone disconnected
- Hours changed
- No funding
- Other approved report reasons

Providers review all reports before changes are published.

---

# Resource Management

Providers manage their own resources.

Allowed actions include:

- Create
- Edit
- Pause
- Mark Closed
- Archive
- Restore

Every destructive action must display a confirmation dialog.

---

# Data Preservation

Resources should be archived rather than permanently deleted whenever practical.

This preserves reporting history and audit information.

---

# Accessibility

Accessibility is required.

Narley should support:

- High contrast
- Screen readers
- Large touch targets
- Icon-assisted navigation
- Multi-language support

Accessibility should be considered during every feature implementation.

---

# Language Support

Reader App supports a multi-language experience.

Version 3 includes an expanded language selector.

---

# Navigation

Reader App:

- Map
- Alerts
- Saved
- Profile

Provider App:

- Map
- Post
- My Posts
- Alerts
- Profile

Navigation should remain consistent across updates.

---

# Map Philosophy

The map is the primary navigation experience.

Resource cards below the map represent the same resources shown on the map.

Selecting either the map pin or the corresponding resource card opens the same Resource Detail Modal.

---

# Pin System

The icon-based map pin system is proposed for Version 3.

Final implementation depends on CPA approval.

Until approved, the pin system should remain configurable.

---

# Routing

Version 3 will support in-app route previews when technically feasible.

Supported travel modes include:

- Walking
- Driving
- Transit
- Bicycle

---

# Authentication

Reader and Provider authentication remain separate.

Provider pages require verified provider authentication.

Reader authentication requires email verification before application access.

---

# Security

No mock authentication.

No demo provider accounts in production.

Production builds must use secure authentication.

---

# Notifications

Reminder notifications require user permission.

Provider notifications support Community Intelligence workflows.

---

# Documentation

Documentation precedes implementation.

All major features should be documented before development begins.

---

# Future Features

Future Ideas

Post Capstone

CPA Requests

Experimental Features

These remain documented but are excluded from Version 3 until formally approved.

---

# Guiding Principle

When uncertain, choose the solution that:

- Improves accessibility.
- Preserves Version 2.
- Supports CPA.
- Protects data.
- Maintains simplicity.