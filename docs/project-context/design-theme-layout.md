# Narley Design, Theme, Layout, and Color Balance

This document describes the current visual direction in the app and the design rules to preserve as the Reader and Provider experiences evolve.

## Product Feel

Narley is designed as a practical community resource app. The interface should feel calm, trustworthy, fast to scan, and usable in stressful situations. It should avoid a marketing-site feel and prioritize clear actions, readable resource details, and quick access to maps, saved resources, alerts, and provider posting.

The current visual identity uses a grounded civic palette:

- Deep green for trust, stability, and the main brand.
- Dark navy for the Reader app shell and bottom navigation.
- Warm off-white surfaces for resource cards and authentication screens.
- Teal accents for active navigation and lightweight highlights.
- Blue for direct call-to-action controls such as search and submit.
- Red/brown emergency colors when emergency mode is active.

## App Structure

The repo contains two Expo React Native apps:

- `apps/reader`: public-facing resource discovery app.
- `apps/provider`: provider-facing app for posting and managing resources.

Shared UI, theme tokens, translations, Firebase access, and types live under `packages/`.

## Theme Tokens

Theme source:

- `packages/shared-ui/theme/colors.ts`
- `packages/shared-ui/theme/theme.ts`
- `packages/shared-ui/theme/spacing.ts`
- `packages/shared-ui/theme/typography.ts`
- `packages/shared-ui/theme/shadows.ts`

### Normal Theme

| Role | Color | Usage |
| --- | --- | --- |
| App background | `#071326` | Reader app shell, map screen background, bottom tab bar |
| Background | `#F5F1E8` | Warm neutral page/card background |
| Primary | `#0F4D35` | Brand header, primary brand actions |
| Primary dark | `#0B3D2D` | Deeper green states |
| Surface | `#FFFFFF` | Inputs and light panels |
| Surface dark | `#172033` | Dark inputs/search surfaces |
| Text | `#17201A` | Primary text on light surfaces |
| Text inverse | `#F8F4EA` | Text on dark green/navy backgrounds |
| Text muted | `#6B7280` | Secondary metadata |
| Border | `#E5E0D6` | Light dividers and input borders |
| Accent | `#57C7B6` | Active tabs and small highlights |
| CTA | `#2563EB` | Search/submit buttons |
| Success | `#22C55E` | Positive status |
| Warning | `#F59E0B` | Caution states |
| Danger | `#EF4444` | Error/destructive states |

### Emergency Theme

Emergency mode shifts the app from green/navy into a warmer red-brown palette. This makes high-urgency state changes visually obvious without relying only on copy.

| Role | Color | Usage |
| --- | --- | --- |
| App background | `#2A0907` | Emergency app shell |
| Background | `#F6EEE9` | Emergency warm page background |
| Primary | `#6B1D14` | Emergency brand/header color |
| Primary dark | `#4A120D` | Deeper emergency surfaces |
| Surface | `#FFF7F1` | Emergency light card surfaces |
| Surface dark | `#2A1210` | Emergency dark surfaces |
| Text | `#241A17` | Primary text on emergency light surfaces |
| Text inverse | `#FFF7F1` | Text on emergency dark/red surfaces |
| Text muted | `#7A5C55` | Emergency secondary text |
| Border | `#E9C8BD` | Emergency dividers and borders |
| Accent | `#E26D5A` | Emergency highlight |
| CTA | `#C0392B` | Emergency primary action |
| Danger | `#DC2626` | Critical/destructive state |

## Typography

Current typography is simple and high contrast:

| Token | Size | Weight | Usage |
| --- | ---: | ---: | --- |
| `title` | `28` | `900` | Screen or feature titles |
| `heading` | `22` | `800` | Section headings |
| `body` | `16` | `400` | Main readable copy |
| `label` | `14` | `700` | Field labels, tabs, metadata labels |
| `small` | `12` | `600` | Compact helper text and small metadata |

Design rule: keep type practical and dense. Use large type for app headers and screen titles only; cards, forms, and tabs should stay compact and readable.

## Spacing, Radius, and Elevation

Spacing tokens:

- `xs`: `4`
- `sm`: `8`
- `md`: `16`
- `lg`: `24`
- `xl`: `32`
- `xxl`: `40`

Radius tokens:

- `sm`: `12`
- `md`: `16`
- `lg`: `20`
- `xl`: `24`
- `pill`: `999`

Current components use rounded, soft corners. Resource cards use `xl` radius, inputs commonly use `12` to `20`, and category chips use pill corners.

Elevation is used for cards and floating resource detail panels:

- Card shadow: medium lift, used on resource cards.
- Floating shadow: stronger lift, used on overlays and detail cards.

Design rule: use elevation to clarify stacked surfaces, not as decoration. The map, cards, and modal detail sheet are the main surfaces that should feel layered.

## Layout Patterns

### Reader App

The Reader app uses a dark shell with light content cards:

- Full-screen dark navy app background.
- Bottom tab bar with dark navy background, teal active tab color, and gray inactive tab color.
- Safe-area aware top padding.
- `ScrollView` content with compact horizontal padding.
- Brand header at top.
- Search row below header.
- Large map card.
- Resource list section.
- Resource details open as a bottom overlay/floating card.

Primary Reader screen hierarchy:

1. Brand header.
2. Search by city or ZIP.
3. Map.
4. Nearby resource count.
5. Resource cards.
6. Detail overlay for selected resource.

### Provider App

The Provider app currently uses a simpler default tab setup and darker form screens:

- Dark form background, currently `#020617`.
- White titles and labels.
- Dark slate inputs.
- Blue submit buttons.
- Category chips for resource type selection.
- Scrollable forms with generous bottom padding for keyboard and tab bar clearance.

The Provider screens should gradually align with the shared theme so they feel related to the Reader app while still being clearly operational and form-focused.

### Authentication

The Reader auth screen uses the light brand side of the theme:

- Warm off-white background.
- Deep green title and primary button.
- White inputs with light borders.
- Muted gray supporting text.

This is a good pattern for low-stress account flows.

## Component Design

### App Header

Current style:

- Deep green rounded container.
- Logo on the left.
- Large uppercase brand text.
- Small muted inverse subtitle.
- Subtle decorative glow inside the header.

The header acts as the primary brand moment. It should remain concise and should not become a marketing block.

### Resource Cards

Current style:

- Warm off-white card surface.
- Rounded corners and light shadow.
- Category label on the left.
- Status label on the right.
- Strong resource title.
- Muted notes and address.

Resource cards should prioritize scan speed. Category, status, title, notes, and location should remain visually distinct.

### Resource Detail Card

Current style:

- Floating warm card over a dark translucent backdrop.
- Close button in the top right.
- Category pill.
- Large title.
- Notes and address.
- Directions, Save + Remind, and Share actions.

The detail card should feel like a focused task surface. It should keep actions visible and avoid burying directions or save/reminder controls.

### Category Picker

Current style:

- Wrapping chip grid.
- Dark slate default chips.
- Blue selected chip.
- Optional custom category input.

Future improvement: align chip colors with the shared theme, especially for Provider app consistency.

## Color Balance Rules

The current palette works best when colors are balanced by role:

- Use dark navy/green as the app frame, not the dominant content surface everywhere.
- Use warm off-white cards for readable resource content.
- Use teal sparingly for active states and positive visual focus.
- Use blue only for high-value direct actions like Search, Submit, or Continue.
- Use red only for emergency mode, destructive actions, errors, or urgent alerts.
- Keep gray text for metadata and secondary copy only.

Approximate visual balance for Reader screens:

- 45% dark app shell and map/navigation areas.
- 35% warm light content surfaces.
- 10% brand green.
- 5% teal accent.
- 5% blue/red/yellow status and action colors.

Approximate visual balance for Provider screens:

- 55% dark operational form background.
- 25% input surfaces.
- 10% primary action color.
- 10% status, label, and chip accents.

## Current Inconsistencies

Some screens and components still hardcode colors instead of using theme tokens. Examples include:

- Reader tab bar colors in `apps/reader/App.tsx`.
- Reader map/search styles in `apps/reader/screens/MapScreen.tsx`.
- Provider form colors in `apps/provider/screens/PostResourceScreen.tsx`.
- Category picker colors in `packages/shared-ui/CategoryPicker.tsx`.
- Resource card/detail colors in `packages/shared-ui/ResourceCard.tsx` and `ResourceDetailCard.tsx`.

This is acceptable for the current starter state, but future work should move hardcoded values into shared tokens when possible.

## Recommended Direction

For the next design pass:

1. Make both apps consume `getTheme()` consistently.
2. Give Provider tabs the same level of visual polish as Reader tabs.
3. Standardize cards, inputs, chips, and buttons around shared component styles.
4. Keep the Reader app warm, accessible, and map-first.
5. Keep the Provider app denser and form-first, but not visually disconnected.
6. Reserve emergency colors for emergency mode and urgent states only.
