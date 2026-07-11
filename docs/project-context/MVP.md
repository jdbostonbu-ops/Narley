# MVP.md

# Narley Minimum Viable Product (MVP)

**Project:** Narley

**Version:** 3.0 Planning

**Pilot Partner:** Community Partners in Action (CPA)

---

# Purpose

This document defines the minimum feature set required for the first production-ready pilot of Narley.

The MVP intentionally limits functionality to features necessary for CPA evaluation and real-world testing.

Features not listed in this document are considered out of scope unless explicitly approved.

---

# MVP Philosophy

Narley follows an MVP-first development strategy.

The objective is to build a stable, accessible, and maintainable platform before expanding into additional functionality.

Every feature included in the MVP should directly support individuals seeking community resources or providers managing those resources.

---

# Reader Application

The Reader application includes the following MVP features.

## Authentication

- Email registration
- Email login
- Email verification
- Google Sign-In
- Secure authentication
- Sign out

---

## Map

- Interactive map
- Search by city
- Search by ZIP code
- Display nearby resources
- Display resource count
- Map recentering

---

## Resource Pins

Version 3 introduces a configurable icon-based pin system.

Final icon design is pending CPA approval.

Pins must remain configurable without changing application logic.

---

## Resource Cards

Display:

- Category
- Status
- Resource title
- Address
- Notes

Cards remain synchronized with map pins.

Selecting either opens the Resource Detail Modal.

---

## Resource Detail Modal

Displays:

- Resource title
- Category
- Status
- Address
- Notes
- Directions
- Save
- Share
- Report Resource

---

## Routing

Support in-app route previews where technically feasible.

Travel modes:

- Walking
- Driving
- Transit
- Bicycle

---

## Saved Resources

Readers may:

- Save resources
- Remove saved resources
- View saved resources
- Receive reminders

---

## Alerts

Reader alerts include:

- Emergency alerts
- Weather alerts
- Resource alerts

---

## Profile

Reader profile includes:

- Profile image
- Display name
- Email
- Language selector
- Emergency Mode
- Reminder settings
- Sign out

---

## Language Support

Version 3 includes a 67-language selector.

The interface should support future translation expansion.

---

## Emergency Mode

Emergency Mode changes:

- Theme
- Colors
- Visual emphasis

without changing application functionality.

---

# Provider Application

Providers must authenticate before accessing the application.

---

## Provider Dashboard

Includes:

- Map
- Post
- My Posts
- Alerts
- Profile

---

## Resource Management

Providers may:

- Create resources
- Edit resources
- Pause resources
- Mark resources closed
- Archive resources
- Restore archived resources

---

## Community Intelligence

Providers review:

- Community reports
- AI verification results
- Resource verification requests

Providers remain the final authority.

---

## Alerts

Provider alerts include:

- Community reports
- AI verification alerts
- System notifications

---

## Provider Profile

Includes:

- Organization information
- Verification status
- Notification settings
- Sign out

---

# AI

Artificial Intelligence assists providers.

AI may:

- Detect stale resources
- Detect disconnected phone numbers
- Verify public information
- Generate confidence scores

AI never modifies published resources.

---

# Community Reporting

Readers may report:

- Closed
- Wrong phone number
- Wrong location
- Hours changed
- No funding
- Other approved categories

Reports enter the Provider Review Queue.

---

# Accessibility

The MVP includes:

- High contrast
- Large touch targets
- Screen reader support
- Icon-assisted navigation
- Multi-language support

Accessibility is considered a required feature.

---

# Architecture

Version 3 uses:

- React Native
- Expo
- TypeScript (Strict)
- Neon PostgreSQL
- Prisma ORM

---

# Excluded From MVP

The following are intentionally excluded.

## Future Ideas

All features listed as Future.

---

## Post Capstone

All Post Capstone features.

---

## CPA Requested Features

Features requested after the pilot begins.

These will be evaluated individually.

---

## Experimental Features

Prototype functionality.

Research ideas.

Unapproved concepts.

---

# Success Criteria

The MVP is successful when:

- Readers locate resources quickly.
- Providers easily manage resources.
- Community reporting improves data quality.
- AI reduces provider workload.
- CPA successfully evaluates the platform.

---

# MVP Guiding Principle

If a feature does not directly improve the CPA pilot, it should not be included in the MVP.