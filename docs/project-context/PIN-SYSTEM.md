# PIN-SYSTEM.md

# Narley Map Pin System Specification

**Project:** Narley

**Document Version:** 3.0.0

**Status:** Approved (Project owner executive decision)

**Last Updated:** 2026-07-12

---

# Purpose

This document defines the architecture, behavior, accessibility requirements, and configuration of the Narley map pin system.

The goal is to provide a consistent, accessible, and configurable visual language for community resources displayed on the Reader and Provider maps.

The pin system must allow icon and color changes without requiring application logic changes.

---

# Design Philosophy

The map is the primary navigation experience in Narley.

Pins should allow Readers to quickly identify nearby resources while remaining understandable to users with varying literacy levels and accessibility needs.

The pin system prioritizes:

- Simplicity
- Accessibility
- Recognition
- Consistency
- Configurability

Narley pins must stand out clearly from the map's default POI (point-of-interest) markers rendered by Apple/Google Maps.

---

# Version 3 Design

Version 3 introduces a standardized, reusable map pin.

Characteristics:

- Colored teardrop / map-pin shape (color is the category color)
- White inner circle centered in the pin
- Category icon centered inside the white circle, drawn in the category color
- Subtle shadow for visibility and separation from the map
- Consistent size and shape across all categories

Only the color and icon change between categories.

The pin shape remains identical for every category.

---

# Approval Status

The architecture and visual design are approved by the project owner.

Category names, icons, and colors are defined in this document and are the single source of truth.

Changing icons or colors must be done through the category configuration and must not require application code changes.

---

# Pin Architecture

Pins are rendered from reusable, configuration-driven components.

Architecture:

```text
resourceCategories.ts   (single source of truth for categories)

↓

MapPin.tsx              (reusable pin renderer)

↓

Map Screen              (renders a MapPin per resource)
```

The UI must never contain hard-coded pin colors or icons. All values come from `resourceCategories.ts`.

---

# Category Configuration

Each resource category defines:

- Identifier (id)
- Display Name (label)
- Icon (vector icon name)
- Icon / Pin Color
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

The rendering component and the Post form category chips both consume this configuration. Chips and pins must display the same icon and color for a given category.

---

# Version 3 Category Set

The following categories are the approved Version 3 set. The Post form chips, the map pins, and the resource cards all read from this same set.

| Category | id | Icon | Color |
|----------|------|------|-------|
| Shelter | shelter | bed | Blue `#2563EB` |
| Soup Kitchen | soup_kitchen | restaurant | Orange `#F59E0B` |
| Food Pantry | food_pantry | basket | Green `#22C55E` |
| Charging Station | charging_station | battery-charging | Teal `#57C7B6` |
| Community Center | community_center | business | Purple `#6B21A8` |
| Library | library | book | Brown `#7C4A02` |
| Transit | transit | bus | Yellow `#EAB308` |
| Employment | employment | briefcase | Navy `#1E3A5F` |
| Custom / Other | custom | star | Deep Green `#0F4D35` |

The **Custom / Other** category is used for the "+ Custom" chip (resources that do not fit a preset category, such as tents, bus passes, or career fairs). It also serves as the default fallback pin.

Additional categories may be added by updating this table and the configuration.

---

# Rendering

The reusable `MapPin` component is responsible for:

- Drawing the teardrop pin shape in the category color.
- Rendering the white inner circle.
- Rendering the category icon in the category color inside the circle.
- Applying the subtle shadow.
- Applying the accessibility label.

Individual screens must not draw pins directly.

---

# Reader and Provider Map Behavior

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

These views represent the same resource and must show the same category icon and color.

---

# Card Synchronization

Every category icon and color used on a map pin must also appear on the corresponding resource card and detail modal.

Readers should immediately recognize that the card and the pin represent the same resource.

---

# Accessibility

Pins must not rely on color alone.

Each pin provides:

- An icon
- An accessible label
- Corresponding text within the resource card and modal

Screen readers should announce the category when the pin receives focus.

---

# Scalability

New categories are added by updating the category configuration (`resourceCategories.ts`) and the Version 3 Category Set table, not by modifying map rendering logic.

The map automatically supports newly configured categories.

---

# Performance

Pins should be lightweight.

Prefer vector icons over separate raster image assets per category.

If platform limitations require raster assets, generated SVG or PNG files may be introduced while preserving the same configuration architecture.

---

# Error Handling

If a category configuration is missing or unknown:

- Display the default Narley pin (the Custom / Other pin: star icon, deep green).
- Display a generic resource icon on the card.
- Log the configuration error for development.

The application must never crash because of an unknown category.

---

# Business Rules

- Every resource has exactly one category.
- Every category has exactly one configured icon and color.
- Every category uses the same reusable pin shape.
- Cards and pins always display matching icons and colors.
- Chips, pins, and cards all read from the same category configuration.
- Pin appearance is driven by configuration, not business logic.

---

# Out of Scope (Version 3)

- Animated decorative pins
- User-customizable pin icons
- Multiple or category-specific pin shapes
- 3D pins
- Cluster pins (may be added in a future version with approval)

---

# Guiding Principle

A Reader should be able to identify the type of resource at a glance using a consistent pin shape, a recognizable icon, a distinct category color, and a synchronized resource card — regardless of language or reading ability.