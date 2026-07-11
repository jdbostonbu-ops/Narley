# READER-APP-SPEC.md

# Narley Reader Application Specification

**Project:** Narley

**Application:** Reader

**Version:** 3.0

**Status:** Draft

**Audience:**

- Developers
- AI Coding Assistants
- Project Owner
- Future Contributors

---

# Purpose

The Reader application is the public-facing mobile application of Narley.

Its purpose is to help individuals quickly locate trusted community resources using a simple, accessible, and map-first experience.

The Reader application is intentionally designed to reduce stress during difficult situations by minimizing complexity and emphasizing speed, clarity, and accessibility.

The Reader application does **not** allow Readers to directly modify published resource information.

Readers contribute through Community Intelligence by reporting inaccurate resource information, while Providers remain responsible for publishing verified updates.

---

# Reader Goals

The Reader application should allow users to:

- Locate nearby community resources.
- Search for resources by city, ZIP code, or current location.
- View resource information on a map.
- View the same resources as cards below the map.
- Open a detailed resource modal.
- Save important resources.
- Receive reminders.
- Obtain directions.
- Report incorrect resource information.
- View emergency alerts.
- Use the application in multiple languages.
- Navigate the application with minimal learning.

The Reader experience should remain calm, predictable, and easy to understand.

---

# Design Philosophy

The Reader application follows these design principles:

## Accessibility First

The interface should remain usable by individuals with varying literacy levels, disabilities, and technology experience.

Accessibility is considered a required feature.

---

## Map First

The map is the primary method of discovering resources.

The resource list below the map is a synchronized secondary view of the same data.

---

## Community Trust

Readers should trust that published resources have been reviewed by providers.

Community reports help improve information quality but do not directly modify resources.

---

## Minimal Cognitive Load

Navigation should remain simple.

Avoid unnecessary menus, complicated workflows, and excessive configuration.

---

## Consistency

Interactions should behave consistently throughout the application.

Similar actions should always produce similar results.

---

# Reader Navigation

Version 3 preserves the Version 2 navigation structure.

Bottom navigation includes:

```text
Map

Alerts

Saved

Profile
```

The Reader application should not introduce additional primary navigation tabs without project approval.

---

# Authentication

The Reader application requires authentication.

Supported methods:

- Email and Password
- Google Sign-In

Reader accounts require email verification before full application access.

---

# Authentication Goals

Authentication should be:

- Simple
- Secure
- Accessible

Readers should spend as little time as possible on authentication before accessing community resources.

---

# Reader Home Screen

The Reader home screen is the Map.

The map serves as the application's primary interface.

The Reader should never feel lost.

Returning to the map should always provide a familiar starting point.

---

# Map Screen

## Purpose

Allow Readers to discover nearby community resources visually.

The map provides the fastest method for locating available assistance.

---

## Primary Components

The Map screen contains:

- Search
- Map
- Resource Pins
- Nearby Resource Cards
- Current Location
- Recenter Button
- Category Filters (if enabled)
- Resource Count

---

## Map Behavior

The map should:

- Display nearby resources.
- Center on the selected search area.
- Update when the search location changes.
- Synchronize with resource cards.
- Preserve state when practical.

---

# Search

Readers may search by:

- Current location
- City
- ZIP Code

Search should support partial matching where appropriate.

Invalid locations should display a clear message.

---

# Search Results

After a successful search:

- The map recenters.
- Resource pins refresh.
- Nearby resource cards refresh.
- Resource count updates.

The map and cards should always represent the same dataset.

---

# Resource Pins

Resource pins represent individual community resources.

Each pin corresponds to exactly one resource.

Version 3 introduces configurable category icon pins.

Final icon artwork is pending CPA approval.

The implementation should remain configurable.

---

# Pin Selection

Selecting a pin should:

- Visually indicate the selected pin.
- Highlight the corresponding resource card.
- Open the Resource Detail Modal.
- Preserve map position when practical.

---

# Resource Cards

Resource cards appear below the map.

Cards represent the exact same resources shown on the map.

Cards are not separate data.

Cards are simply an alternative representation of map resources.

---

# Card Contents

Each card should display:

- Category
- Resource Name
- Address
- Availability Status
- Distance (when available)

Cards should remain concise and easy to scan.

---

# Card Selection

Selecting a resource card should:

- Highlight the corresponding map pin.
- Open the Resource Detail Modal.

Cards and pins must remain synchronized at all times.

---

# Synchronization Rule

One resource record powers:

```text
Database Resource

↓

Map Pin

↓

Nearby Resource Card

↓

Resource Detail Modal
```

No duplicate business logic should exist between these views.

---

# Resource Detail Modal

The Resource Detail Modal displays complete information about a resource.

The modal may be opened by:

- Selecting a map pin.
- Selecting a nearby resource card.

Both entry points open the same modal.

---

# Modal Purpose

The modal provides complete information without requiring the Reader to leave the Map screen.

The Reader should always know:

- What the resource is.
- Where it is.
- How to contact it.
- How to navigate there.
- Whether to save it.
- Whether to report an issue.

---

# Resource Detail Modal

## Purpose

The Resource Detail Modal provides complete information about a selected community resource without requiring the Reader to leave the Map screen.

The modal is the primary location for viewing resource details and performing resource-related actions.

---

## Entry Points

The Resource Detail Modal may be opened by:

- Selecting a map pin.
- Selecting a nearby resource card.

Regardless of how the modal is opened, the same resource information must be displayed.

---

## Modal Layout

The modal should display information in the following order:

1. Resource Category
2. Resource Name
3. Current Availability Status
4. Address
5. Phone Number
6. Website (if available)
7. Description
8. Notes
9. Available Actions

Information should be presented using plain language and clear typography.

---

## Available Actions

Readers may:

- Get Directions
- Save Resource
- Share Resource
- Report Resource
- Close Modal

These actions should remain consistently positioned throughout the application.

---

## Closing the Modal

The modal may be closed by:

- Tapping the Close button.
- Swiping downward (if enabled).
- Tapping outside the modal (if enabled).
- Pressing the device Back button on Android.

Closing the modal returns the Reader to the same map position.

---

# Directions

## Purpose

Allow Readers to navigate from their current location to the selected resource.

---

## Supported Transportation Modes

Version 3 supports:

- Walking
- Driving
- Public Transit
- Bicycle

Where supported by the selected mapping provider, the application should display an in-app route preview.

If a required routing feature is unavailable, the application may open the native mapping application.

---

## Route Preview

When available, route previews should display:

- Route path
- Estimated travel time
- Estimated distance
- Selected transportation mode
- Starting location
- Destination

Route previews should not modify the Reader's saved search location.

---

# Saved Resources

## Purpose

Allow Readers to quickly return to frequently used resources.

---

## Saving a Resource

Readers may save a resource from the Resource Detail Modal.

A saved resource should remain available until:

- The Reader removes it.
- The Reader account is deleted.

---

## Saved Resource Information

Each saved resource should retain:

- Resource Name
- Category
- Address
- Provider Name
- Date Saved
- Reminder Settings

Saved resources should remain recognizable even if the live resource later changes.

---

## Reminder Support

Readers may optionally enable reminders for saved resources.

Examples include:

- Future availability
- Appointment reminders
- Resource reopening dates

Reminder scheduling should require user notification permission.

---

## Removing Saved Resources

Removing a saved resource requires confirmation.

Example:

```text
Remove this resource from Saved?

[Cancel] [Remove]
```

---

# Alerts

## Purpose

Provide Readers with important information that may affect access to community resources.

---

## Alert Types

Examples include:

- Emergency Alerts
- Severe Weather Alerts
- Community Alerts
- Resource Availability Alerts

Alert categories may expand in future versions.

---

## Alert Behavior

Alerts should be:

- Easy to read
- Time-sensitive
- Clearly categorized

Expired alerts should no longer appear in the active list.

---

# Emergency Mode

## Purpose

Emergency Mode simplifies the Reader experience during periods of crisis.

---

## Emergency Mode Behavior

Emergency Mode may:

- Increase visual emphasis
- Improve contrast
- Reduce visual clutter
- Prioritize urgent resources

Emergency Mode should not remove functionality.

---

# Reader Profile

## Purpose

Allow Readers to manage their personal preferences.

---

## Profile Information

The Reader Profile includes:

- Profile Image
- Display Name
- Email Address
- Preferred Language
- Reminder Settings
- Emergency Mode
- Sign Out

Future settings may be added following CPA approval.

---

# Language Support

Narley supports multilingual access.

Version 3 includes a language selector supporting approximately 67 languages.

The selected language should persist between sessions.

If a translation is unavailable, the application should safely fall back to the default language.

---

# Resource Reporting

## Purpose

Readers help improve data quality by reporting inaccurate resource information.

Readers do not directly edit resources.

---

## Report Categories

Version 3 supports structured reporting.

Available report reasons include:

- Closed
- Wrong Location
- Wrong Phone Number
- Phone Not in Service
- Hours Changed
- No Longer Offers Service
- Out of Funding

Additional categories require approval before implementation.

---

## Report Workflow

Reader selects:

Report Resource

↓

Choose Report Reason

↓

Confirmation Dialog

↓

Report Submitted

↓

Provider Review Queue

↓

Provider Decision

Readers should receive confirmation that the report was submitted successfully.

---

## Confirmation

Example:

```text
Submit this report?

Your report will be reviewed by the resource provider.

[Cancel] [Submit]
```

---

# Accessibility

Accessibility is a required feature.

The Reader application must support:

- Screen readers
- High contrast
- Large touch targets
- Accessible labels
- Icon-assisted navigation
- Multi-language support
- Plain language

Color alone must never communicate important information.

---

# Error States

Every major Reader workflow should include meaningful error handling.

Examples include:

- No Internet Connection
- Location Permission Denied
- Notification Permission Denied
- Resource Not Found
- Search Returned No Results
- Directions Unavailable
- Report Submission Failed
- Authentication Expired

Each error should explain the problem and, where possible, provide a recovery action.

---

# Offline Behavior

When connectivity is unavailable:

- Display a clear offline indicator.
- Preserve previously loaded map state where practical.
- Allow access to previously saved resources where feasible.
- Prevent actions that require network connectivity.
- Automatically retry pending operations when connectivity returns, if appropriate.

---

# Business Rules

The following rules apply throughout the Reader application:

- The map is the primary navigation experience.
- Resource cards and map pins always represent the same resource.
- One resource record powers the pin, card, and modal.
- Readers cannot directly edit published resources.
- Providers remain responsible for publishing verified changes.
- AI assists Providers but does not modify live resource data.
- Community reports require Provider review before any published change.

---

# Version 3 Reader Changes

Version 3 introduces:

- Configurable category icon map pins (pending CPA approval)
- 67-language selector
- In-app route previews
- Community resource reporting
- Community Intelligence integration
- Enhanced accessibility
- Improved reminder support

Version 3 preserves the successful Reader experience established in Version 2.

---

# Out of Scope

The following are not part of the Reader application for Version 3:

- Post Capstone features
- Future Ideas
- Unapproved CPA feature requests
- Experimental functionality
- Administrative tools
- Provider-only workflows

---

# Reader Specification Summary

The Reader application is designed to provide fast, reliable, and accessible access to verified community resources.

Every feature should support Narley's core mission:

**Helping people quickly find accurate, trustworthy community resources while keeping the experience simple, accessible, and dependable.**

