# UI-BEHAVIORS.md

# Narley User Interface Behaviors

**Project:** Narley

**Document Version:** 3.0.0

**Status:** Draft

**Last Updated:** YYYY-MM-DD

---

# Purpose

This document defines the interactive behaviors of the Narley user interface.

Unlike the Reader and Provider specifications, this document focuses on **how the application behaves**, not simply what screens exist.

These behaviors should remain consistent throughout the application.

---

# Design Philosophy

Narley emphasizes:

- Predictability
- Simplicity
- Accessibility
- Consistency
- Low cognitive load

Animations should communicate state changes.

Animations should never exist solely for decoration.

---

# Map Behaviors

## Initial Map Load

When the Reader opens the application:

- Display loading indicator.
- Request location permission (if required).
- Center on the Reader's location or saved search area.
- Load nearby resources.
- Display synchronized resource cards.

---

## Selecting a Map Pin

When a Reader taps a map pin:

- Highlight the selected pin.
- Enlarge the selected pin slightly.
- Highlight the matching resource card.
- Open the Resource Detail Modal.
- Maintain current map zoom level.

The map should not unexpectedly reposition unless necessary.

---

## Selecting a Resource Card

When a Reader taps a resource card:

- Highlight the matching map pin.
- Open the Resource Detail Modal.
- Preserve current scroll position when practical.

Cards and pins must always remain synchronized.

---

## Recenter Button

Selecting the Recenter button:

- Centers the map on the Reader's current location.
- Refreshes visible resources when appropriate.

---

# Resource Cards

## Card Layout

Cards should display:

- Category icon
- Resource name
- Address
- Availability status
- Distance (when available)

Cards should remain visually concise.

---

## Card Interaction

Cards should provide immediate visual feedback when tapped.

Feedback should be subtle and consistent.

---

# Resource Detail Modal

## Opening

The modal should:

- Slide upward from the bottom.
- Dim the background.
- Preserve the underlying map state.

---

## Closing

The modal may close by:

- Close button
- Swipe down (if enabled)
- Tap outside (if enabled)
- Android Back button

Closing returns the Reader to the previous map state.

---

# Search Behavior

After a successful search:

- Update map location.
- Refresh resource pins.
- Refresh resource cards.
- Update resource count.

Map and cards must always represent identical search results.

---

## Invalid Search

If no location is found:

Display a friendly message.

Do not clear the previous successful search automatically.

---

# Saved Resources

## Save Resource

Selecting Save:

- Adds the resource to Saved.
- Displays a confirmation message.
- Updates the Saved tab immediately.

---

## Remove Saved Resource

Selecting Remove:

Display confirmation dialog.

Example:

Remove this resource?

Cancel

Remove

---

# Community Reporting

Selecting Report Resource:

- Opens report categories.
- Reader selects one reason.
- Confirmation dialog appears.
- Report submits.
- Success message displays.

Reports never modify resources directly.

---

# Provider Behaviors

## Community Review

Selecting a review item:

- Opens the related resource.
- Displays community reports.
- Displays AI verification results.
- Displays Provider actions.

---

## Resource Status Changes

Changing a resource status requires confirmation.

Example:

Mark Resource Closed?

Cancel

Mark Closed

---

# Confirmation Dialog Standards

Confirmation dialogs are required for:

- Delete
- Archive
- Pause
- Restore
- Mark Closed
- Remove Saved Resource
- Cancel editing

Users must always have a cancel option.

---

# Loading States

Every major workflow should include a loading state.

Examples:

- Authentication
- Search
- Map loading
- Saving
- Reporting
- Notifications

Loading indicators should clearly communicate progress.

---

# Empty States

Examples include:

- No nearby resources.
- No saved resources.
- No alerts.
- No community reports.
- No notifications.

Empty states should explain the situation and suggest the next action.

---

# Error States

Examples include:

- Network unavailable.
- Authentication expired.
- Resource unavailable.
- Directions unavailable.
- AI verification unavailable.

Errors should clearly explain the issue and provide recovery guidance.

---

# Accessibility Behaviors

Accessibility requirements include:

- Visible focus indicators.
- Accessible labels.
- Large touch targets.
- High contrast.
- Screen reader compatibility.
- Icon and text together.

Color alone must never communicate important information.

---

# Navigation Behaviors

Bottom navigation should:

- Preserve screen state when practical.
- Clearly indicate the active tab.
- Respond immediately to touch.

Navigation transitions should feel smooth and predictable.

---

# Notifications

Notifications should:

- Display concise information.
- Clearly identify affected resources.
- Allow navigation to the related screen.

Notification overload should be avoided.

---

# Performance Expectations

The interface should feel responsive.

Avoid unnecessary animations.

Avoid blocking interactions.

Avoid excessive loading delays.

Performance should always take priority over decorative effects.

---

# Business Rules

UI should never expose functionality unavailable to the current user role.

Readers should never see Provider-only actions.

Providers should never lose unsaved work without confirmation.

---

# Guiding Principle

Every interaction should answer three questions:

1. What just happened?
2. What can I do next?
3. How do I go back?

If the interface cannot answer those questions, the interaction should be reconsidered.

