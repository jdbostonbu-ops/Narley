# PIN-SYSTEM.md

# Narley Map Pin System Specification

**Project:** Narley

**Document Version:** 3.0.0

**Status:** Draft (Pending CPA Design Approval)

**Last Updated:** YYYY-MM-DD

---

# Purpose

This document defines the architecture, behavior, accessibility requirements, and configuration of the Narley map pin system.

The goal is to provide a consistent, accessible, and configurable visual language for community resources displayed on the Reader and Provider maps.

The pin system should allow icon and color changes without requiring application logic changes.

---

# Design Philosophy

The map is the primary navigation experience in Narley.

Pins should allow Readers to quickly identify nearby resources while remaining understandable to users with varying literacy levels and accessibility needs.

The pin system should prioritize:

- Simplicity
- Accessibility
- Recognition
- Consistency
- Configurability

---

# Version 3 Design

Version 3 introduces a standardized reusable map pin.

Characteristics:

- White pin body
- Rounded map-pin shape
- Category icon centered inside the pin
- Colored category icon
- Subtle shadow for visibility
- Consistent size across all categories

Only the icon changes between categories.

The pin shape remains identical.

---

# Pending CPA Approval

The architecture is approved.

The final icon selection and visual styling remain subject to CPA review.

Changing icons or colors must not require application code changes.

---

# Pin Architecture

Pins should be rendered from reusable components.

Recommended architecture:

```text
resourceCategories.ts

↓

MapPin.tsx

↓

Map Screen
```

The UI should never contain hard-coded pin colors or icons.

---

# Category Configuration

Each resource category should define:

- Identifier
- Display Name
- Icon
- Icon Color
- Resource Card Icon
- Accessibility Label

Example:

```ts
{
  id: "shelter",
  label: "Shelter",
  icon: "bed",
  iconColor: "#2563EB",
  accessibilityLabel: "Shelter"
}
```

The rendering component should consume this configuration rather than duplicating values.

---

# Rendering

The reusable `MapPin` component is responsible for:

- Drawing the pin shape.
- Applying the white background.
- Rendering the category icon.
- Applying the configured icon color.
- Applying accessibility labels.

Individual screens should not draw pins directly.

---

# Reader Map Behavior

Each resource record produces:

```text
Resource

↓

Map Pin

↓

Resource Card

↓

Resource Detail Modal
```

These three views represent the same resource.

---

# Card Synchronization

Every category icon used on the map should also appear on the corresponding resource card.

Readers should immediately recognize that the card and the pin represent the same resource.

---

# Category Icons

The following table represents the proposed Version 3 icon set.

| Category | Icon | Icon Color |
|----------|------|------------|
| Shelter | Bed | Blue |
| Food Pantry | Shopping Basket | Green |
| Soup Kitchen | Bowl / Utensils | Orange |
| Community Center | People / Community | Purple |
| Library | Book | Brown |
| Transit | Bus | Yellow |
| Employment | Briefcase | Navy |
| Healthcare *(if approved)* | Red Cross | Red |
| Hospital *(if approved)* | H | Red |

Additional categories may be added following CPA approval.

---

# Accessibility

Pins must not rely on color alone.

Each pin should provide:

- Icon
- Accessible label
- Corresponding text within the resource card and modal

Screen readers should announce the category when the pin receives focus.

---

# Scalability

New categories should be added by updating the category configuration rather than modifying map rendering logic.

The map should automatically support newly configured categories.

---

# Performance

Pins should be lightweight.

Avoid loading separate image assets for each category when vector icons can be rendered efficiently.

If platform limitations require raster assets, generated SVG or PNG files may be introduced while preserving the same configuration architecture.

---

# Error Handling

If a category configuration is missing:

- Display the default Narley pin.
- Display a generic resource icon.
- Log the configuration error for development.

The application should never crash because of an unknown category.

---

# Business Rules

The following rules apply:

- Every resource has exactly one category.
- Every category has exactly one configured icon.
- Every category uses the same reusable pin shape.
- Cards and pins always display matching icons.
- Pin appearance is driven by configuration, not business logic.

---

# Future Enhancements

Future versions may include:

- Animated highlighted pins
- Cluster pins for dense areas
- Temporary event pins
- Seasonal resource overlays
- Agency-specific category icons

These enhancements require documentation and approval before implementation.

---

# Out of Scope

Version 3 does not include:

- Animated decorative pins
- User-customizable pin icons
- Multiple pin shapes
- Category-specific pin shapes
- 3D pins

---

# Guiding Principle

A Reader should be able to identify the type of resource at a glance using a consistent pin shape, a recognizable icon, and a synchronized resource card, regardless of language or reading ability.

