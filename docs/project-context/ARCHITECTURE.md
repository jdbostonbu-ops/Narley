# ARCHITECTURE.md

# Narley Architecture

**Project:** Narley  
**Architecture Version:** 3.0  
**Status:** Draft for Version 3 Planning  
**Primary Audience:** Developers, Codex, future AI agents, CPA technical reviewers, capstone reviewers

---

## 1. Purpose

This document defines the technical architecture for Narley Version 3.

Narley Version 3 extends the Version 2 application. It is not a redesign. The existing Reader app behavior, layout, theme, navigation, assets, and map/card/modal interaction patterns must be preserved unless explicitly changed in Version 3 documentation.

This document should be read together with:

- `VERSION-3-BUILD.md`
- `DECISIONS.md`
- `MVP.md`
- `READER-APP-SPEC.md`
- `PROVIDER-APP-SPEC.md`
- `UI-BEHAVIORS.md`
- `design-theme-layout.md`
- `Narley Features.md`

If this architecture conflicts with `VERSION-3-BUILD.md`, the Version 3 build document takes precedence for implementation scope.

---

## 2. Architecture Goals

Narley architecture should support:

1. A stable Reader app for people searching for community resources.
2. A Provider app for verified organizations to create, manage, and verify resources.
3. A shared resource database powered by Neon PostgreSQL and Prisma.
4. Accessibility-first mobile design.
5. Community Intelligence workflows.
6. AI-assisted verification without AI-controlled data changes.
7. Future CPA-requested expansion without redesigning the core system.

---

## 3. Version 3 Baseline Rule

Version 3 must begin by duplicating Version 2 into a new Version 3 working folder.

Preserve:

- Folder structure where practical
- Reader layout
- Provider layout where already implemented
- Navigation
- Theme
- Colors
- Typography
- Logos
- Assets
- Resource map behavior
- Resource card behavior
- Resource detail modal behavior
- Saved resource behavior
- Emergency Mode behavior

Version 3 extends Version 2. It does not replace it.

---

## 4. Technology Stack

### Mobile Framework

- React Native
- Expo
- TypeScript strict mode

### Backend / Database

- Neon PostgreSQL
- Prisma ORM

### Authentication

- Email/password authentication
- Email verification
- Google Sign-In
- Apple Developer account available for iOS deployment

### Maps and Location

- React Native Maps or equivalent Expo-compatible map implementation
- Device geolocation permissions
- Address/city/ZIP geocoding
- In-app route preview support

### Routing

Narley should support route previews for:

- Walking
- Transit
- Bicycle
- Driving

Route previews should display:

- Route line
- Distance
- Estimated travel time
- Travel mode
- Origin
- Destination resource pin

Full turn-by-turn navigation is not required unless later approved.

---

## 5. Application Structure

Narley contains two mobile applications.

```text
apps/
  reader/
  provider/
```

### Reader App

The Reader app is public-facing. It allows users to search for resources, view pins, view cards, open resource detail modals, save resources, receive reminders, report resource issues, change language preferences, and use Emergency Mode.

### Provider App

The Provider app is for verified organizations. It allows providers to post resources, manage their posts, review reports, verify AI findings, update resources, pause resources, mark resources closed, and archive resources.

---

## 6. Shared Package Structure

Shared code should be placed in packages whenever both apps need the same logic.

Recommended structure:

```text
packages/
  shared-ui/
  shared-types/
  shared-utils/
  shared-config/
```

### shared-ui

Contains reusable UI components:

- ResourceCard
- ResourceDetailModal
- MapPin
- CategoryPicker
- Buttons
- Inputs
- Badges
- Alert cards
- Confirmation dialogs

### shared-types

Contains shared TypeScript types:

- Resource
- ResourceStatus
- ResourceCategory
- User
- Provider
- ResourceReport
- VerificationResult
- SavedResource
- Notification

### shared-utils

Contains shared logic:

- Date formatting
- Distance calculations
- Category helpers
- Status label helpers
- Validation helpers
- Route formatting helpers

### shared-config

Contains shared configuration:

- Resource category definitions
- Theme tokens
- Language list
- Feature flags
- Environment variable helpers

---

## 7. Recommended Repository Structure

```text
Narley/
  apps/
    reader/
      screens/
      components/
      navigation/
      assets/
      services/
    provider/
      screens/
      components/
      navigation/
      assets/
      services/

  packages/
    shared-ui/
    shared-types/
    shared-utils/
    shared-config/

  prisma/
    schema.prisma
    migrations/
    seed/

  docs/
    project-context/

  assets/
    brand/
    icons/
    map-pins/
```

---

## 8. Database Architecture

Narley uses Neon PostgreSQL as the primary database and Prisma as the ORM.

The database should be treated as the system of record for:

- Users
- Providers
- Resources
- Saved resources
- Resource reports
- AI verification results
- Provider review actions
- Notifications
- Resource events

---

## 9. Core Data Models

### User

Represents a Reader account.

Recommended fields:

```text
id
email
displayName
profileImageUrl
emailVerified
preferredLanguage
emergencyModeEnabled
createdAt
updatedAt
```

### Provider

Represents an organization or staff account authorized to manage resources.

Recommended fields:

```text
id
organizationName
contactEmail
verified
serviceTerritory
createdAt
updatedAt
```

### Resource

Represents one community resource pin/card.

Recommended fields:

```text
id
providerId
title
category
customCategory
status
description
notes
address
latitude
longitude
phone
website
availableAgainAt
expiresAt
createdAt
updatedAt
archivedAt
closedAt
closedReason
```

### ResourceStatus

Recommended values:

```text
active
paused
future_available
expired
closed
archived
removed
```

Reader-visible statuses:

```text
active
paused
future_available
```

Non-visible statuses:

```text
expired
closed
archived
removed
```

### SavedResource

Represents a Reader-saved resource snapshot.

Recommended fields:

```text
id
userId
resourceId
resourceTitle
category
customCategory
providerName
savedAt
reminderEnabled
reminderAt
reminderNote
resourceExpiresAt
resourceAvailableAgainAt
```

Saved resources should preserve enough information for a Reader to recognize the resource even if the live resource later changes.

### ResourceReport

Represents a Reader-submitted issue report.

Recommended fields:

```text
id
resourceId
readerId
reportReason
status
createdAt
reviewedAt
reviewedByProviderId
```

Allowed report reasons should be structured and controlled.

Recommended reasons:

```text
closed
wrong_location
wrong_phone
phone_not_in_service
hours_changed
no_longer_offers_service
out_of_funding
```

Avoid open-ended free text in the Reader MVP unless later approved.

### VerificationResult

Represents AI-assisted or system-assisted resource verification.

Recommended fields:

```text
id
resourceId
verificationSource
status
confidenceScore
summary
evidence
createdAt
reviewedAt
reviewedByProviderId
providerDecision
```

AI results are advisory only.

### ResourceEvent

Represents resource lifecycle history.

Recommended events:

```text
created
updated
paused
activated
marked_closed
archived
restored
expired
reported
ai_flagged
provider_verified
```

---

## 10. Resource Lifecycle

Resources should move through statuses instead of being permanently deleted whenever practical.

### Create

Provider creates a resource.

### Active

Reader can see and interact with resource.

### Paused

Reader can see resource but should understand it is temporarily unavailable.

### Future Available

Reader can see resource and save/remind for future access.

### Closed

Reader does not see resource.

### Archived

Reader does not see resource. Resource remains preserved for reporting/history.

### Removed

Used only when a resource must be hidden or removed from active workflows.

---

## 11. Confirmation Dialog Requirement

Any destructive or visibility-changing action must show a confirmation dialog before it is applied.

This includes:

- Delete
- Archive
- Mark Closed
- Remove Saved Resource
- Cancel
- Pause
- Restore if it affects visibility
- Any action that hides a resource from Readers

Example:

```text
Mark this resource closed?

This resource will no longer appear to Readers.
It will remain stored for reporting history.

[Cancel] [Mark Closed]
```

---

## 12. Reader Architecture

The Reader app uses a map-first architecture.

Primary screens:

```text
Map
Alerts
Saved
Profile
```

### Reader Map Flow

One resource record powers all three UI surfaces:

```text
Resource record
  -> Map pin
  -> Resource card below map
  -> Resource detail modal
```

Tapping either the map pin or the matching resource card opens the same modal.

### Reader Profile

The Reader Profile supports:

- User identity
- Profile image
- Email
- Emergency Mode toggle
- Language selector
- Saved reminder count
- About Narley
- Feedback
- Sign out

### Language Support

Version 3 includes a 67-language selector. The selector should be architecture-ready even if full translations are rolled out incrementally.

---

## 13. Provider Architecture

Provider app primary tabs:

```text
Map
Post
My Posts
Alerts
Profile
```

### Provider Security

Provider pages must be protected behind provider authentication.

Logged-out users must not access:

- Map
- Post
- My Posts
- Alerts
- Profile

### Provider Resource Management

Providers can:

- Create resources
- Edit resources
- Pause resources
- Activate resources
- Mark resources closed
- Archive resources
- Restore resources when appropriate

### Provider Alerts

The Provider Alerts page should support Community Intelligence workflows.

It should show:

- Reader-submitted reports
- AI verification alerts
- Resources needing review
- System notifications

---

## 14. Community Intelligence Architecture

Community Intelligence is the workflow that keeps Narley data fresh.

It combines:

1. Reader reports
2. AI-assisted verification
3. Provider review

Readers do not directly edit resources.

AI does not directly edit resources.

Providers make final decisions.

---

## 15. AI Verification Architecture

AI-assisted verification may check:

- Organization status
- Public website evidence
- Phone number signals where available
- Closure notices
- News sources
- Business listing signals
- Other public evidence

AI returns:

- Suggested status
- Confidence score
- Evidence summary
- Recommended provider action

AI must not:

- Delete resources
- Change live resource data
- Publish changes
- Override provider judgment

Provider approval is required before resource status changes.

---

## 16. Public Libraries as Anchor Resources

Narley Version 3 should support seeding public libraries as anchor resources.

Public libraries may provide:

- Wi-Fi
- Charging
- Printing
- Bathrooms
- Cooling/warming access
- Public computers
- Community information

These should be real records, not mock data.

---

## 17. No Mock Data Rule

Production Version 3 must not depend on mock data.

Development fixtures may exist only for local testing and must be clearly separated from production data.

Any demo values from Version 2 should be removed or replaced before production use.

---

## 18. Pin System Architecture

The proposed Version 3 pin system is pending CPA approval.

Recommended architecture:

```text
resourceCategories.ts
  -> category color
  -> category icon
  -> display label

MapPin.tsx
  -> renders reusable pin shape
  -> applies color
  -> places icon inside pin
```

Pins should be generated from configuration rather than stored as separate static PNGs whenever practical.

If platform rendering issues require PNG fallback assets, generated image assets may be added later.

---

## 19. Authentication Architecture

Authentication must support:

- Reader accounts
- Provider accounts
- Role separation
- Verified provider access
- Email verification
- Google Sign-In
- Secure sign out

Provider authorization must prevent Readers from accessing Provider tools.

---

## 20. API / Service Layer

Narley should use a service layer between UI screens and the database/API logic.

Recommended services:

```text
authService
resourceService
savedResourceService
reportService
verificationService
notificationService
routingService
languageService
```

Screens should call services instead of embedding database logic directly.

---

## 21. Error Handling

All major workflows should include:

- Loading states
- Empty states
- Error states
- Permission denied states
- Network failure states
- Retry paths

Important examples:

- Location permission denied
- Notification permission denied
- Route unavailable
- Search location not found
- Resource no longer available
- Provider authentication expired
- Report submission failed

---

## 22. Accessibility Architecture

Accessibility must be built into components.

Requirements:

- Large touch targets
- Screen reader labels
- High contrast
- Icon + text labels
- No color-only meaning
- Plain-language content
- Support for multilingual UI
- Readable typography

Map pins should use icon and color, not color alone.

---

## 23. Security Principles

Narley should follow:

- TypeScript strict mode
- Input validation
- Role-based access
- Secure authentication
- Least privilege access
- No production secrets in source control
- No mock production users
- No unsafe rendering of user text
- Audit-friendly data changes

---

## 24. Environment Configuration

Recommended environment variables:

```text
DATABASE_URL
DIRECT_URL
GOOGLE_CLIENT_ID
APPLE_BUNDLE_ID
ROUTING_API_KEY
AI_VERIFICATION_API_KEY
EMAIL_PROVIDER_API_KEY
APP_ENV
```

Secrets must not be committed.

---

## 25. Testing Strategy

Minimum testing expectations:

- Unit tests for shared utilities
- Component tests for shared UI
- Service tests for resource/report workflows
- Authentication flow tests
- Provider authorization tests
- Confirmation dialog tests
- Saved resource tests
- Community report tests

Version 3 should prioritize tests around workflows that affect resource visibility.

---

## 26. Deployment Notes

### Expo

Narley should remain Expo-compatible unless a documented reason requires otherwise.

### Apple

Apple Developer account is available for iOS deployment planning.

### Android

Android builds should be supported through Expo/EAS when configured.

### Backend

Neon PostgreSQL hosts the database.

Prisma manages schema and migrations.

---

## 27. Future Scalability

Architecture should support:

- Additional agencies
- Additional regions
- Agency-specific service territories
- More resource categories
- CPA-requested workflows
- More languages
- Improved AI verification

without requiring a major rewrite.

---

## 28. Out of Scope for Architecture Version 3

The architecture should not assume implementation of:

- Todo system
- Hamburger menu features
- Narley Cash
- Narley Cash Card
- Insurance Card
- Documents section
- Post-capstone features
- Future ideas not approved by CPA

These may remain documented in `Narley Features.md` but are not part of Version 3 unless approved.

---

## 29. Architecture Summary

Narley Version 3 is a two-app React Native / Expo platform supported by Neon PostgreSQL and Prisma.

The Reader app focuses on accessible resource discovery.

The Provider app focuses on verified resource management.

Community Intelligence and AI-assisted verification support fresh data, but providers remain the authority.

The architecture must preserve Version 2 behavior while enabling controlled Version 3 growth.
