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

## Version 3 Pixel-Accurate Build Specification

This section is normative for Version 3. It records the actual Hayn Mobile Version 2 React Native values rather than a general visual direction. When an earlier sentence in this guide conflicts with this section, use this section. All dimensions are React Native density-independent pixels (`dp`); font sizes are scalable pixels (`sp`). Widths marked `fluid` must be calculated from the available viewport rather than replaced with a guessed fixed width.

### Measurement and Responsive Rules

- `W` = safe-area viewport width.
- `H` = safe-area viewport height.
- A full-width child inside horizontal padding `P` has width `W - (2 × P)`.
- A card with an additional horizontal margin `M` inside that child has width `W - (2 × P) - (2 × M)`.
- `height: auto` means content-driven height. Preserve the listed padding, line height, gaps, and margins; do not invent a fixed height that clips localized or accessibility-sized text.
- Screen containers use `flex: 1`, so their rendered height is the available height above the bottom tab bar. Scroll content extends naturally and uses the specified bottom clearance.
- Reader map/profile/alerts horizontal edge inset: `8`; therefore ordinary full-width sections are `W - 16`.
- Provider map horizontal edge inset: `12`; therefore full-width sections are `W - 24`.
- Provider form/profile/My Posts horizontal edge inset: `18`; therefore full-width sections are `W - 36`.
- Reader safe-area top offsets: Map `insets.top + 12`; Alerts/Profile `insets.top + 18`; Saved uses content top padding `24`. Reader Profile bottom is `insets.bottom + 160`.
- Do not place important content under navigation: Reader tab bar is `82` high; Reader list/form clearances are `120–160` as specified below. Provider uses the native React Navigation tab-bar height in Version 2, and content reserves `120–140`.

### Canonical Shape, Shadow, and Type Values

| Token | Exact value |
| --- | --- |
| Radius `sm` | `12` |
| Radius `md` | `16` |
| Radius `lg` | `20` |
| Radius `xl` | `24` |
| Radius `pill` | `999` |
| Spacing `xs/sm/md/lg/xl/xxl` | `4 / 8 / 16 / 24 / 32 / 40` |
| Card shadow | iOS `#000`, opacity `0.12`, offset `0×6`, radius `12`; Android elevation `4` |
| Floating shadow | iOS `#000`, opacity `0.18`, offset `0×10`, radius `18`; Android elevation `8` |
| Screen title | `32`, weight `900` (Provider Map `24`, Post `26`, Provider Profile `23`) |
| Section title | `17–22`, weight `900`, exact value per section below |
| Card title | `18`, weight `800–900`; Provider post title `20/900` |
| Body | `14–16`, line height `20–24` |
| Metadata | `12–14`, weight `600–900` |

No custom font family is loaded in Version 2. Version 3 must use the platform system font and the exact size/weight/line-height combinations in this guide unless a separate approved accessibility specification overrides them.

### Global Navigation and Authentication

#### Reader bottom navigation

- Frame: width `W`, height `82`, background `#071326`, top border `rgba(255,255,255,0.08)`, padding top `8`, padding bottom `18`.
- Active tint `#57C7B6`; inactive tint `#9CA3AF`.
- Labels: `12/800`. Icons use the navigator-provided icon size plus `3`.
- Tabs, in order: Map, Alerts, Saved, Profile.

#### Provider bottom navigation

- Frame: native React Navigation default width/height/background in Version 2; do not assign Reader's `82`-high dark bar unless Version 3 explicitly standardizes both apps.
- Active tint `#0F766E`; inactive tint `#64748B`; default navigator label/icon metrics.
- Tabs, in order: Map, Post, My Posts, Alerts, Profile.

#### Shared sign-in/create-account screen

- Screen: `W × H`, `#F7F3EA`, centered vertically, padding `24`.
- Title: `36/900`, `#0F4D35`, centered, bottom margin `8`.
- Subtitle: `15/400`, `#4B5563`, centered, bottom margin `24`.
- Text inputs/password row: width `W - 48`, height `auto` from vertical padding `14`, white, radius `12`, border `1 #E5E0D6`, horizontal padding `14`, bottom margin `12`; input text `15`, `#17201A`.
- Primary button: width `W - 48`, vertical padding `15`, radius `12`, `#0F4D35`, top margin `4`; label `16/900`, white.
- Google button: same width/padding/radius, white, border `1 #E5E0D6`, top margin `12`; label `16/900`, `#17201A`.
- Mode link: `#0F4D35`, weight `800`, centered, top margin `18`.

#### Shared verify-email screen

- Same screen frame as authentication.
- Title `30/900`, `#0F4D35`, centered, bottom margin `16`.
- Message `15`, `#374151`, centered, bottom margin `10`; email `16/900`, `#17201A`, centered, bottom margin `18`.
- Primary action: width `W - 48`, `#0F4D35`, vertical padding `15`, radius `12`, top margin `8`, label `16/900` white.
- Secondary action: vertical padding `15`, top margin `8`, text `#0F4D35/800`.

### Shared Brand Header

- Outer card: fluid width of parent; height `auto`; background `#0F4D35`; radius `28`; padding `22` vertical and `20` horizontal; bottom margin `18`; clipped overflow.
- Glow: absolute `220 × 220`, radius `999`, `rgba(255,255,255,0.05)`, top `-120`, right `-80`.
- Row is horizontal and vertically centered. Logo `54 × 54`, radius `16`, right margin `16`.
- Brand title `34/900`, letter spacing `1`, `#F8F4EA`; subtitle `14/500`, top margin `2`, `rgba(248,244,234,0.72)`.

## Reader App: Exact Screen and Section Specifications

### Reader Map Screen

- Screen: `flex: 1`, normal background `#071326`; emergency background `#2A0907`.
- Scroll content: width `W`, horizontal padding `8`, top `insets.top + 12`, bottom padding `120`.
- Search row: width `W - 16`, horizontal flex row, centered, gap `12`, bottom margin `14`.
- Search input: flexible width `W - 16 - 12 - searchButtonWidth`; fixed height `52`; `#172033`; radius `20`; horizontal padding `14`; text `16`, `#F8F4EA`.
- Search button: intrinsic width from label plus `36` horizontal padding; height `52`; radius `20`; normal `#2563EB`, emergency `#C0392B`; label `15/900`, `#F8F4EA`.
- Map card: exact width `W - 16`, height `420`, radius `24`, clipped overflow, bottom margin `20`.
- Nearby header: width `W - 16`, horizontal space-between row, bottom margin `16`. Title `22/900`, inverse text; count `14/800`, muted text.
- Resource list: width `W - 16`, bottom padding `20`.

#### Map pin/list resource cards

These are the cards associated with the pins and displayed below the map.

- Width: exactly the list's available width, `W - 16`; height `auto`.
- Outer surface: `#F5F1E8`, radius `24`, padding `16`, vertical margin `8`, border `1 rgba(255,255,255,0.05)`, card shadow.
- Header: horizontal space-between row, vertically centered, bottom margin `8`.
- Category: `#B7791F`, default system size, weight `700`. Status: `#0F766E`, default system size, weight `800`.
- Title: `18/800`, `#17201A`, bottom margin `6`.
- Notes: `14/400`, line height `20`, `#4B5563`, bottom margin `6`.
- Address: `13/400`, `#6B7280`.
- Minimum touch target must be at least `44 × 44` even though card height remains content-driven.

#### Reader resource-detail modal card

- Overlay: absolute full screen, z-index `50`, aligned to bottom. Backdrop fills the screen with `rgba(0,0,0,0.45)`.
- Wrapper: horizontal padding `14`, bottom padding `100`.
- Card width formula: `W - 28 - 32 = W - 60` because the wrapper contributes `14` per side and the card contributes another `16` margin per side.
- Card height: content-driven with maximum `92%` of available height; top margin `70`; background `#F5F1E8`; radius `24`; border `1 rgba(255,255,255,0.06)`; clipped overflow; floating shadow.
- Scroll content: padding `24`, top padding `32`, bottom padding `42`.
- Close control: absolute top/right `14`; `38 × 38`; radius `19`; `rgba(0,0,0,0.08)`; X `24/900`, line height `26`, `#17201A`.
- Category pill: intrinsic width; `#F2E7C9`; padding `6` vertical/`12` horizontal; radius `999`; bottom margin `14`; text `12/800`, `#B7791F`.
- Title: `24/900`, `#17201A`, right padding `44`, bottom margin `10`.
- Notes: `16`, line height `24`, `#374151`, bottom margin `18`; address `14`, `#6B7280`, bottom margin `20`.
- Action row: wraps, gap `10`, top margin `10`.
- Directions/primary: `#0F4D35`, radius `20`, padding `16` vertical/`28` horizontal, top margin `10`; label `16/800`, `#F8F4EA`, letter spacing `0.3`.
- Secondary/share: `#374151`, radius `16`, padding `14` vertical/`18` horizontal, top margin `10`; label `14/700`, white.
- Save + Remind: `#16A34A`, radius `16`, padding `16` vertical/`18` horizontal, top margin `14`; label `16/900`, white.
- Reminder chips inside this modal: gap `8`; background `#374151` or selected `#0F4D35`; radius `20`; padding `9` vertical/`12` horizontal; label white/`700`. Custom input is white, radius `12`, padding `12`, border `1 #E5E0D6`.

### Reader Saved Screen

- Content width `W`, padding horizontal `8`, top `24`, bottom `140`; title `32/900`, inverse, bottom margin `18`.
- Empty card: width `W - 16`, auto height, `#F5F1E8`, radius `24`, padding `24`, card shadow. Empty title `18/900`, bottom `6`; body `15`, line height `22`, `#4B5563`.
- Saved card: width `W - 16`, auto height, `#F5F1E8`, radius `24`, padding `16`, bottom margin `14`, card shadow.
- Category `12/900 #B7791F`, bottom `6`; title `18/900 #17201A`, bottom `6`; address `14/600 #6B7280`, bottom `8`; hint `13/800 #0F4D35`.
- Delete button: intrinsic width, `#EF4444`, radius `16`, padding `8` vertical/`16` horizontal, top margin `8`; text `13/900`, inverse.
- Tapping a saved card uses the exact Reader resource-detail modal specification above.

### Reader Alerts Screen

- Screen padding horizontal `8`; top `insets.top + 18`. Title `32/900`, inverse, bottom `4`; subtitle `15`, muted, bottom `18`.
- List gap `14`, bottom padding `120`.
- Alert card: width `W - 16`, auto height, horizontal row, radius `24`, padding `16`, border `1`, card shadow.
- Emergency card: `#FFF1E8`, border `#E26D5A`; informational card: `#F5F1E8`, border `#E5E0D6`.
- Icon tile: `42 × 42`, radius `14`, centered, right margin `14`; emergency `#FBD1C6`, informational `#F2E7C9`; icon `18/900 #6B1D14`.
- Body flexes to remaining width. Title `17/900 #17201A`, bottom `4`; message `15`, line height `21`, `#4B5563`, bottom `8`; metadata `12/700 #9CA3AF`.

### Reader Profile Screen

- Content width `W`, horizontal padding `8`, top `insets.top + 18`, bottom `insets.bottom + 160`.
- Screen title `32/900`, inverse, bottom `4`; subtitle `15`, muted, bottom `18`.
- Identity card: width `W - 16`, auto height, horizontal centered row, `#F5F1E8`, radius `24`, padding `16`, bottom `24`, card shadow. Avatar `54 × 54`, radius `27`, right margin `14`; normal `#0F4D35`, weather/emergency `#8B2E24`; initial `24/900 #F8F4EA`. Name `15/900`; role `13/600`; verified text `12/900 #0F766E`, top `6`.
- Every profile section has bottom margin `24`. Section heading is `17/900`, inverse, bottom `10`.

#### Version 3 weather-alert toggle — required in both apps

- Version 3 must label the control **Weather alerts** (not generic “Preferences,” “Emergency mode,” “Resource activity,” or “Compact updates”). The supporting copy should explain that it enables notifications for severe weather, shelter changes, closures, and urgent community conditions.
- Reader placement: first card under the Safety section. Provider placement: first row of the Notification Preferences card. Both apps must use the same visual container and state colors appropriate to their existing Version 2 profile screen.
- Reader toggle card: width `W - 16`, auto height; `#F5F1E8`, radius `24`, padding `16`, card shadow. Top row space-between, bottom `10`; label `18/900 #17201A`, right padding `12`; description `14`, line height `20`, `#4B5563`.
- Reader Switch colors: track off `#9CA3AF`, on `#E26D5A`; thumb off `#0F4D35`, on `#6B1D14`; iOS off background `#9CA3AF`. Active card adds border `2 #E26D5A`; active badge is `#8B2E24`, text `#F8F4EA 12/900`, letter spacing `1`, padding `6/12`, radius `999`, top `14`.
- Provider toggle row: horizontal space-between, centered, gap `12`, vertical padding `10`; label area flexes; label `15/900 #17201A`, bottom `2`; description `14`, line height `20`, `#4B5563`. Switch track off `#334155`, on `#0F766E`; thumb off `#CBD5E1`, on `#57C7B6`.
- Preserve the native React Native `Switch` control dimensions for the target OS; Version 2 does not override its width or height. Do not draw a custom differently-sized toggle.

#### Reader profile menu, account, logout, and About modal

- Standard menu row: width `W - 16`, auto height, `#F5F1E8`, radius `20`, padding `16`, bottom `10`, horizontal space-between. Title `15/800 #17201A`; value `13/700 #6B7280`.
- Expanded language list: width `W - 16`, `#F5F1E8`, radius `20`, padding `8`, bottom `10`; each option padding `12`, radius `16`, label `15/800 #17201A`.
- About row uses the standard row dimensions plus card shadow; chevron `28/900 #0F4D35`.
- Feedback button: width `W - 16`, auto height from vertical padding `14`, `#0F4D35`, radius `16`, centered label `15/900 #F8F4EA`, card shadow.
- Account card: width `W - 16`, auto height, `#F5F1E8`, radius `24`, padding `16`, card shadow. Heading `18/900`, bottom `12`; email `15/700 #4B5563`.
- Reader logout button: width `W - 16`, `#8B2E24`, radius `16`, vertical padding `14`, centered label `15/900 #F8F4EA`, bottom margin `24`.
- About modal overlay: full screen, `rgba(2,6,23,0.72)`, centered, padding `18`.
- About modal card: width `W - 36`, max height `82%`, auto actual height, `#F5F1E8`, radius `24`, padding `16`, card shadow.
- Header bottom `14`; title `22/900 #17201A`. Close `36 × 36`, radius `18`, `#E5E0D6`; X `16/900 #17201A`.
- Modal section heading `15/900 #0F4D35`, top `12`, bottom `6`; body `15/600 #4B5563`, line height `22`; version `13/900 #17201A`, top `18`.

## Provider App: Exact Screen and Section Specifications

### Provider Map Screen

- Screen `flex: 1`, background `#020617`; content horizontal padding `12`, top safe inset `+16`, bottom `124`.
- Header bottom `16`; eyebrow `12/900 #57C7B6`, uppercase, bottom `6`; title `24/900`, inverse, bottom `6`.
- Search row/input/button match Reader dimensions and colors, but total row width is `W - 24`.
- Map card width `W - 24`, exact height `420`, radius `24`, clipped, bottom `20`.
- Section header width `W - 24`, bottom `14`; title `22/900`, inverse; count `14/900 #CBD5E1`.
- Provider-owned pin cards below the map use the shared Resource Card specification (`W - 24`, radius `24`, padding `16`, auto height).
- Empty card: `W - 24`, auto height, `#F5F1E8`, radius `24`, padding `24`, card shadow; title `18/900`, bottom `6`; body `15`, line height `22`.

#### Provider pin-detail modal

- Overlay/backdrop/wrapper are the same as Reader: full screen, bottom aligned, backdrop `rgba(0,0,0,0.45)`, wrapper horizontal `14`, bottom `100`.
- Card width `W - 60`, max height `92%`, top margin `70`, `#F5F1E8`, radius `24`, clipped, floating shadow; content padding `24`, top `32`, bottom `42`.
- Close control `38 × 38`, radius `19`, top/right `14`, `rgba(0,0,0,0.08)`; X `24/900`, line `26`.
- Metadata row wraps with gap `10`, right padding `48`, bottom `14`. Category pill `#F2E7C9`, status pill `#DDF7F1`; both padding `6/12`, radius `999`, text `12/900` (`#B7791F` category, `#0F766E` status).
- Title `24/900`, line height `30`, bottom `18`, right padding `34`.
- Detail blocks bottom `14`; uppercase label `12/900 #6B7280`, bottom `4`; value `15/700 #17201A`, line `22`; notes `15 #374151`, line `23`.
- Actions wrap with gap `10`, top `8`. Edit button `#2563EB`; delete button `#8B2E24`; each radius `16`, padding `14` vertical/`18` horizontal, label `14/900` white/inverse.

### Provider Edit Resource Modal

- This is a bottom sheet, not the light detail card. Overlay is full screen, z-index `80`, bottom aligned; backdrop `rgba(0,0,0,0.52)`.
- Sheet width `W`, max height `92%`, background `#020617`, top-left/right radius `24`, clipped overflow.
- Scroll content padding `24`, bottom `120`, gap `12`.
- Header horizontal space-between; title `24/900`, inverse. Close `40 × 40`, radius `20`, `#1F2937`; X `24/900`, line `26`.
- Field groups gap `6`; labels inverse/`900`; optional/helper text `13/800 #CBD5E1` (helper line height `18`).
- Inputs: full available width `W - 48`, or flex share in a row; auto height from padding `14`; `#1F2937`, radius `14`, text `16` inverse. Notes minimum height `100`.
- Date preview `14/800 #86EFAC`; clear-date button `#374151`, radius `12`, padding `10` vertical/`14` horizontal.
- Location row gap `10`; location field flexes to remaining width.
- Action row wraps, gap `10`, top `8`; Save `#2563EB`, Cancel `#374151`; radius `16`, padding `14` vertical/`18` horizontal; labels white/`900`.

### Provider Post Resource Screen

- Screen `#020617`; content width `W`, padding `18`, gap `14`, bottom `120`.
- Title `26/900` white, bottom `4`; labels white/`800`.
- Inputs: width `W - 36`, auto height, `#1F2937`, radius `14`, padding `14`, text `16` white; notes minimum height `100`.
- Address row width `W - 36`, gap `10`; address input flexes. Geocode button minimum width `112`; location buttons `#374151`, radius `14`, padding `14`, centered label white/`800`; disabled opacity `0.6`.
- Helper/optional text `13/800 #CBD5E1`, line height `18`; success/location text `#86EFAC/800`; error `14/800 #FCA5A5`.
- Category chips: wrapping row gap `8`; default `#374151`, selected `#2563EB`, radius `20`, padding `9` vertical/`12` horizontal; white/`700` label. Custom category input `#1F2937`, radius `12`, padding `12`, top `10`.
- Submit button: width `W - 36`, `#2563EB`, radius `16`, padding `16`, top `8`, centered label `16/900` white.

### Provider My Posts Screen

- Screen `#071326`, padding horizontal `18`, top `24`; title `32/900`, inverse, bottom `18`; list bottom `140`.
- Empty card: width `W - 36`, `#F5F1E8`, radius `24`, padding `24`, card shadow; title `18/900`, bottom `6`; body `15`, line `22`.
- Post card: width `W - 36`, auto height, `#F5F1E8`, radius `24`, padding `16`, bottom `14`, card shadow.
- Header horizontal space-between, bottom `8`; category `12/900 #B7791F`; status `13/900 #0F766E`.
- Title `20/900 #17201A`, bottom `8`; notes `15 #4B5563`, line `22`, bottom `8`; address `14/600 #6B7280`, bottom `14`.
- Actions wrap, gap `10`. Edit `#0F4D35`; Delete `#8B2E24`; both radius `16`, padding `12` vertical/`16` horizontal; label `#F8F4EA/900`.
- Tapping Edit opens the exact Provider Edit Resource Modal above.

### Provider Alerts Screen

- Version 2 is a placeholder: full-screen `#020617`, centered both axes; title `24/900` white. Version 3 must not invent alert cards and call them Version 2 parity. If Version 3 implements real alerts, use the approved feature specification and reuse the Reader alert-card geometry unless a Provider-specific design is approved.

### Provider Profile Screen

- Screen `#020617`; content padding `18`, bottom `132`, gap `14`.
- Header bottom `4`; eyebrow `12/900 #57C7B6`, uppercase, bottom `6`; title `23/900`, inverse.
- Standard section card: width `W - 36`, auto height, `#F5F1E8`, radius `24`, padding `24`, card shadow.
- Card title `18/900 #17201A`, bottom `10`; primary text `16/800 #17201A`, bottom `6`; secondary `14 #4B5563`, line `20`.
- Verification pill: intrinsic width, `#DDF7F1`, radius `999`, padding `6` vertical/`12` horizontal, bottom `10`; text `12/900 #0F766E`.
- Weather-alert preference uses the required shared Version 3 weather-alert rule above. Other approved preference rows retain the same row geometry.
- Logout section card: width `W - 36`, auto height, `#2A1210`, radius `24`, border `1 rgba(239,68,68,0.4)`, padding `24`.
- Logout title `18/900 #FFF7F1`, bottom `6`; explanation `14 #FCA5A5`, line `20`, bottom `14`; button intrinsic width, `#8B2E24`, radius `16`, padding `13` vertical/`18` horizontal; label `14/900 #F8F4EA`.
- Tapping Log Out must open the native platform confirmation alert with Cancel and destructive Log Out actions. Native `Alert.alert` dialogs intentionally use OS-controlled dimensions, font, radius, and color; do not replace them with an unapproved custom card merely to force cross-platform pixel identity.

## Modal and Dialog Inventory

Every Version 3 modal/dialog must map to one of these approved visual patterns:

| Trigger | Pattern | Exact specification |
| --- | --- | --- |
| Reader map card/pin | Reader light resource-detail card | Reader resource-detail modal above |
| Reader saved card | Reader light resource-detail card | Same component and dimensions as Map |
| Provider map pin | Provider light pin-detail card | Provider pin-detail modal above |
| Provider Map or My Posts Edit | Dark bottom edit sheet | Provider Edit Resource Modal above |
| Reader About Narley | Centered light modal | Reader About modal above |
| Logout, delete, validation, search failure, post result | Native OS alert | OS-controlled geometry; destructive action must require confirmation |

There are no custom modal cards on the Alerts, authentication, or verify-email screens in Version 2. Do not invent one for visual parity. If Version 3 adds a modal through an approved feature, explicitly select and document one of the patterns above before implementation.

## Implementation Acceptance Checklist

- Compare at the same viewport size and safe-area insets; do not compare a fixed pixel screenshot against a different device width.
- Verify Map is exactly `420` high in both apps and has radius `24`.
- Verify below-map resource cards are fluid full-list width, radius `24`, padding `16`, and content-driven height.
- Verify light detail cards use the `W - 60` width formula in the current nested wrapper structure, max height `92%`, and bottom clearance `100`.
- Verify the Reader About card uses `W - 36`, max height `82%`.
- Verify standard Reader profile/card width is `W - 16`; standard Provider profile/form/card width is `W - 36`.
- Verify every card, section, chip, input, button, and modal uses the exact color, radius, padding, type, line height, and shadow specified above.
- Verify both apps expose a clearly labeled Weather alerts toggle on Profile using their Version 2 container styling and native Switch dimensions.
- Verify text remains visible at larger accessibility font sizes; content-driven cards must grow rather than clip.
- Verify localized labels wrap without changing fixed control heights where a fixed height is specified.
- Treat native alerts and native switches as OS-rendered controls; exact cross-platform outer dimensions are not defined by the Hayn Mobile source.
