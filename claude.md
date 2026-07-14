


# Narley v3 — Architecture, Features, and Integration Guide

This file describes the current Narley v3 implementation. Use it as a code-level orientation guide for the Provider app, Reader app, shared backend, database, external services, and the flows connecting them.

## Product overview

Narley is a two-app community-resource platform:

- The **Provider app** lets authenticated organization members publish and manage community resources, receive Reader reports, review AI-assisted findings, monitor weather alerts, and report problematic resources to the Narley administrator.
- The **Reader app** lets authenticated community members discover live resources, inspect and save them, schedule reminders, receive location-based weather alerts, and report inaccurate resources.
- Both apps communicate through one Express API and one PostgreSQL database. They do not communicate directly with one another.

```text
Provider app ─┐
              ├── HTTP/JSON API ── Express server ── Prisma ── PostgreSQL
Reader app ───┘                         │
                                       ├── OpenAI Responses API + web search
                                       └── Resend transactional email

Both apps ── device location ── Open-Meteo + National Weather Service
Reader app ── expo-notifications ── local reminder notifications
```

## Monorepo layout

```text
apps/provider/       Provider Expo/React Native application
apps/reader/         Reader Expo/React Native application
packages/shared-ui/  Shared theme and resource-category configuration
server/              Express API, authentication middleware, email, and OpenAI
prisma/              Prisma schema and SQL migrations
generated/prisma/    Generated Prisma client
docs/project-context Product, architecture, testing, and design specifications
```

## Technology stack

### Mobile applications

- TypeScript with strict typing
- React 19
- React Native 0.81
- Expo SDK 54
- React Navigation bottom tabs
- `react-native-maps` using native maps
- `react-native-safe-area-context`
- Expo SecureStore for persisted authentication sessions and weather preferences
- Expo Location for current device coordinates
- Expo Notifications in Reader for local resource reminders
- Expo Splash Screen, Font, Image, Linking, Web Browser, Symbols, and System UI
- Ionicons through `@expo/vector-icons`
- Shared Narley theme tokens from `packages/shared-ui`

### Backend and persistence

- Node.js and TypeScript
- Express 5 JSON API
- CORS
- PostgreSQL hosted through the configured `DATABASE_URL`
- Prisma 7 with the PostgreSQL adapter
- JWT bearer authentication with separate `provider` and `reader` token types
- bcrypt for server-side password hashing and verification

### External services

- **Resend** for Reader verification, Provider password reset, Reader password reset, and Provider-to-admin report email
- **OpenAI Responses API** for researching Reader resource reports and producing structured provider-review findings
- **OpenAI web search** with high search context for current organization status research
- **Open-Meteo** for seven-day daily maximum temperature forecasts
- **National Weather Service API** for active regional warnings
- **Expo geocoding/location support** and Open-Meteo geocoding for resource/location search paths

### Testing and development

- Vitest for Provider, Reader, and server unit tests
- Jest/React Native test configuration remains available at the root and Provider package
- `tsx` runs the TypeScript API server
- Prisma migrations manage database changes

## Environment configuration

The root `.env` supplies runtime configuration. Never commit secret values.

Expected variables include:

```text
DATABASE_URL             PostgreSQL connection string
JWT_SECRET               JWT signing and verification secret
EXPO_PUBLIC_API_URL      API URL embedded into each Expo app
OPENAI_API_KEY           OpenAI API credential
OPENAI_MODEL             Optional model override; defaults to gpt-5-mini
RESEND_API_KEY           Resend API credential
```

On a physical phone, `EXPO_PUBLIC_API_URL` must use the Mac/server LAN address, not `localhost`, for example `http://10.0.0.x:4000`. The phone and development Mac normally need to be on the same network.

## Provider app

### Authentication

- Provider login uses `POST /login`.
- The server validates credentials against the Prisma `User` table and returns a provider JWT.
- The app persists `{userId, token}` in Expo SecureStore.
- Authenticated Provider requests attach `Authorization: Bearer <token>`.
- The auth gate shows login/reset flows until a valid session is restored.
- Provider password reset uses request and confirmation screens, password-policy validation, single-use reset records, and Resend delivery.
- Password reset invalidates existing reset/session state according to the server reset logic.
- Provider resource mutations and provider alert/report endpoints require a provider-type JWT.

### Navigation and branding

- Bottom tabs: Map, Post, My Posts, Alerts, and Profile.
- Profile is reached from the Map header menu and its tab button is hidden.
- The shared Provider header displays Narley branding and the `Help nearby.` tagline.
- The Alerts tab shows a numeric badge from the combined report/weather count.

### Provider Map

- Loads active, unexpired resources from `GET /resources` through the shared resource store.
- Displays resources as map pins and synchronized cards.
- Pins use shared category icon/color configuration and do not rely only on color.
- Resource cards open a detail modal.
- Search/filter logic supports location and ZIP-oriented resource discovery.
- The same store drives Map and My Posts, preventing separate local copies of resources.

### Creating resources

- The Post form collects title, category/custom category, address, coordinates, expiration, phone, website, and notes/details.
- Address geocoding and coordinate validation support map placement.
- Expiration must be valid, future, and no more than one year away.
- Duplicate title/address rules are enforced by tested domain logic and the server.
- `POST /resources` requires provider authentication and active organization membership.
- The server writes the resource with `providerId` and `organizationId` and records a creation audit event.
- Notes are persisted in the real `Resource.notes` column.
- Successful creation updates Provider shared state; the form resets for the next resource.

### Editing resources

- My Posts opens prefilled resource details and an edit modal.
- Editable fields include title, category, address, phone, website, notes, and expiration.
- The app calls authenticated `PATCH /resources/:id`.
- The server verifies that the Provider membership owns the resource organization.
- Domain logic validates expiration and duplicates before Prisma updates the existing ID.
- Successful edits record an `updated` audit event.
- The endpoint returns the actual persisted resource through `toApiResource`.
- Provider state replaces the corresponding resource with the server response.
- Reader receives edits through its next `GET /resources` load or foreground refresh.

### Deleting resources

- Provider deletion requires confirmation in the UI.
- `DELETE /resources/:id` requires provider authentication and organization ownership.
- Successful deletion removes the resource from shared Provider state.
- Deleted or expired resources stop appearing in live Reader/Provider results.

### Provider alerts

Provider has its own `WeatherAlertsStore`; it is separate from Reader state but reuses tested pure weather utilities.

The Alerts screen has two independent sections:

1. **AI-verified Reader reports**
   - Loaded from authenticated `GET /provider/alerts`.
   - Limited to resources owned by the Provider's organization.
   - Shows resource title/address, reported reason, AI findings, confidence, uncertainty, sources, and timestamp.
   - Report alerts are counted regardless of the Weather Alerts preference.
   - Providers can delete an alert after a destructive confirmation through `DELETE /provider/alerts/:id`.
   - Deleting an alert does not delete or edit the underlying resource or source report.

2. **Weather alerts**
   - Uses current Provider device location.
   - Combines Open-Meteo temperature alerts with NWS alerts.
   - Refreshes when the Alerts tab gains focus and when the weather preference changes/restores.
   - Uses the tested expiry rules and `mergeAlerts` so still-unexpired temperature alerts survive forecast revisions and transient fetch failures.
   - Toggle-off and unavailable-location paths may clear weather alerts.
   - Weather alerts cannot be manually deleted.

The combined badge helper always counts report alerts and counts weather alerts only when Weather Alerts is enabled.

### Provider Profile

- Displays provider identity/profile information.
- Controls the persisted Provider Weather Alerts preference.
- Provides language-choice UI.
- Includes feedback/about/logout actions.
- Logout clears the persisted Provider session.

### Provider reports a problem to Narley

- A Provider can report a problematic resource through a dedicated modal.
- The form includes resource title, address, phone, website, and Provider-entered details.
- The app sends authenticated `POST /provider/report`.
- The server derives `reportedBy` from the JWT, never from client-supplied identity.
- Validated reports are emailed to the Narley administrator using Resend.
- This flow is separate from Reader-to-Provider AI verification.

## Reader app

### Authentication and account lifecycle

- Reader uses a separate Prisma `Reader` table, separate JWT type, and separate SecureStore session.
- Signup validates the password, hashes it with bcrypt, creates an unverified Reader, creates a 15-minute verification code, and sends the code through Resend.
- `POST /reader/verify` consumes the valid code and marks the Reader email verified.
- `POST /reader/login` returns a Reader JWT after credential verification.
- The auth gate supports loading, signup/login, verification, and authenticated tabs.
- Reader password reset uses the separate `ReaderResetToken` model and Resend email path.
- Authenticated saved-resource operations attach the Reader bearer token.

### Reader navigation and Map

- Bottom tabs: Map, Alerts, Saved, and Profile.
- Map shows the Narley banner, Community Resources/Reader app heading, search controls, map, pins, cards, and detail modal.
- `GET /resources` returns active, unexpired resources with title, category, status, address, coordinates, expiration, notes, phone, and website.
- The pure `parseResource` boundary validates required fields and preserves optional phone/website.
- Search supports city or ZIP geocoding and ZIP filtering.
- Resource cards and map markers open the same detail modal.

### Automatic resource synchronization

- Map loads resources when the screen gains navigation focus.
- A React Native `AppState` listener reloads resources when Reader returns from background/inactive to active.
- This makes Provider edits appear without manual Reader refresh.
- Selection stores a resource ID and derives the modal object from current resources, so an open modal reconciles after a refresh rather than retaining a stale object.
- Phone and website are preserved in the Reader resource model.

### Resource details and actions

- The detail modal displays core resource information and provides Directions, Share, Save, Remind, and Report actions as available.
- Save creates a database-backed Reader snapshot.
- Reminder validates a date/time, requests notification permission, and schedules a local Expo notification.
- Report collects an approved structured reason and sends it for server-side review.

### Saved resources

- `POST /reader/saved` creates a snapshot tied to the authenticated Reader.
- Duplicate saves return the existing snapshot instead of creating duplicates.
- `GET /reader/saved` returns only the signed-in Reader's records.
- Saved data loads on the Saved screen and on focus.
- `DELETE /reader/saved/:id` verifies ownership before deletion.
- Removing a saved snapshot never deletes the live Provider resource.
- Snapshots preserve the saved title, category, address, coordinates, notes, status, and saved time.

### Reader reports and Provider communication

Reader reporting is the main cross-app feedback loop:

```text
Reader resource detail
  → POST /reports with resourceId, address, and selected reason
  → server loads the canonical resource title
  → OpenAI performs structured web research
  → server validates structured findings
  → Prisma creates ProviderAlert linked to the resource
  → owning Provider loads GET /provider/alerts
  → Provider Alerts screen shows findings for human review
```

Important rules:

- The Reader report is treated as first-hand community evidence.
- OpenAI provides research assistance; it does not directly edit, close, archive, or delete resources.
- Findings include confidence, uncertainty, and source URLs.
- Persistent/stale directories are weak evidence of current operation.
- The owning Provider performs human review and decides what resource action, if any, is appropriate.

### Reader weather alerts

- The persisted Weather Alerts toggle controls Reader weather cards.
- Alerts use the Reader's current GPS coordinates; the user does not manually enter a ZIP for alerts.
- Open-Meteo supplies daily maximum Fahrenheit forecasts for seven days.
- Heat triggers at `>= 91°F`; cold triggers at `<= 32°F`.
- NWS supplies active official warnings and expiration timestamps.
- Temperature alerts use Narley's expected-date lifetime; NWS uses the supplied expiration.
- Raw alerts are retained across loads and passed through `mergeAlerts`.
- A forecast revision below the threshold does not remove an existing, unexpired temperature alert.
- A transient forecast/NWS failure surfaces an error without clearing unexpired alerts.
- Expired alerts are pruned during refresh.
- The Alerts screen refreshes on focus.
- The tab badge reflects the current active Reader weather-alert count.

### Reader Profile

- Controls the Reader Weather Alerts preference.
- Provides About Narley and feedback UI.
- Supports Reader logout by clearing the persisted session.
- Language/preference UI is present according to current screen implementation and project specifications.

## Shared resource lifecycle

The `Resource` database record is the canonical live resource. Core fields are:

```text
id, title, category, address, latitude, longitude, expiresAt, status,
phone, website, notes, providerId, organizationId, createdAt
```

Flow:

```text
Provider creates/edits
  → authenticated API validates membership and ownership
  → Prisma persists Resource
  → audit event records create/update
  → public GET /resources returns active + unexpired records
  → Provider and Reader map/card state consume the same data
```

`GET /resources` is public so discovery works without a provider credential, but both current apps place their main tab experiences behind their respective authentication gates.

## Authentication and authorization boundaries

- JWT payloads contain `userId` and account `type`.
- `requireAuth("provider")` rejects missing, invalid, expired, or Reader tokens on Provider routes.
- `requireAuth("reader")` rejects missing, invalid, expired, or Provider tokens on Reader saved routes.
- Provider resource changes require organization ownership in addition to authentication.
- Provider alerts are scoped to the Provider's organization resources.
- Reader saved-resource reads/deletes are scoped to the authenticated Reader.
- Provider report email identity is derived from the token.
- Client input is parsed and validated before database or external-service use.

## API route reference

### Public/system

- `GET /health` — API health check
- `GET /resources` — active, unexpired live resources
- `POST /login` — Provider login
- `POST /request-reset` — Provider password-reset request
- `POST /confirm-reset` — Provider password-reset confirmation
- `POST /reader/signup` — Reader account creation and verification email
- `POST /reader/verify` — Reader verification-code consumption
- `POST /reader/login` — Reader login
- `POST /reader/request-reset` — Reader password-reset request
- `POST /reader/confirm-reset` — Reader password-reset confirmation
- `POST /reports` — Reader community report and AI verification workflow

### Provider-authenticated

- `POST /resources` — create resource
- `PATCH /resources/:id` — update owned resource
- `DELETE /resources/:id` — delete owned resource
- `POST /provider/report` — email a problem-resource report to Narley admin
- `GET /provider/alerts` — organization-scoped AI report alerts
- `DELETE /provider/alerts/:id` — delete a review alert

### Reader-authenticated

- `POST /reader/saved` — create/reuse saved snapshot
- `GET /reader/saved` — list signed-in Reader snapshots
- `DELETE /reader/saved/:id` — delete owned snapshot

## Prisma data model

- `User` — Provider account
- `Organization` — Provider organization
- `Membership` — Provider-to-organization relationship and status
- `ResetToken` — Provider password-reset token
- `Resource` — canonical live community resource
- `AuditEvent` — resource create/update history
- `ProviderReport` — model reserved for Provider-to-Narley reporting records
- `ProviderAlert` — AI-verified Reader report for Provider review
- `VerificationCode` — Reader email-verification code
- `Reader` — Reader account
- `SavedResource` — Reader-owned resource snapshot
- `ReaderResetToken` — Reader password-reset token

Prisma client generation output is `generated/prisma`. After schema migration/generation, restart the API so its in-memory client and route code use the new model.

## Resend integration

Resend is initialized in `server/email.ts`:

```ts
const resend = new Resend(process.env.RESEND_API_KEY);
```

Current sender for all transactional messages:

```text
onboarding@resend.dev
```

### 1. Reader signup verification

Function: `sendVerificationEmail(email, code)`

- Triggered by successful `POST /reader/signup`.
- Sends the generated verification code to the Reader's email.
- Subject: `Your Narley verification code`.
- The matching database code expires after 15 minutes and is consumed by verification.
- A Resend error causes signup completion to return an API error even if account creation already occurred; retry/recovery behavior must account for that possibility.

### 2. Provider password reset

Function: `sendPasswordResetEmail(email, token)`

- Triggered by `POST /request-reset` when the dependency-injected reset workflow sends a reset code.
- Subject: `Reset your Narley provider password`.
- Email states that the code expires in 30 minutes and is single-use.
- Confirmation uses `POST /confirm-reset`.

### 3. Reader password reset

Function: `sendReaderPasswordResetEmail(email, token)`

- Triggered by `POST /reader/request-reset`.
- Subject: `Reset your Narley reader password`.
- Email states that the code expires in 30 minutes and is single-use.
- Confirmation uses `POST /reader/confirm-reset` and the separate Reader reset-token table.
- Current code logs the full Resend success response or error for temporary delivery diagnostics; production logging should avoid exposing sensitive delivery data.

### 4. Provider report to Narley administrator

Function: `sendProviderReportEmail(report)`

- Triggered by authenticated `POST /provider/report`.
- Recipient is currently configured directly in `server/email.ts` as the Narley administrator address.
- Subject: `Narley: Provider report of a resource`.
- Includes resource title, address, optional phone and website, authenticated Provider user ID, and report details.
- This email does not run through OpenAI and does not directly modify the resource.

### Resend operational requirements

- `RESEND_API_KEY` must be set in the server environment.
- The API server, not either mobile app, calls Resend; the key must never be included in Expo configuration.
- `onboarding@resend.dev` is suitable for Resend development/testing constraints. Production should use a verified Narley sending domain and configured From address.
- Resend errors are converted to API failures; clients show appropriate error state.
- Restart the API after changing environment variables or email code.

## OpenAI integration

Reader `POST /reports` invokes `callOpenAI` only after validating the report and loading the canonical resource title.

- Uses the OpenAI Responses API.
- Defaults to `gpt-5-mini` unless `OPENAI_MODEL` is configured.
- Enables web search with high context.
- Uses a strict JSON schema for findings, confidence, and source URLs.
- Does not store the OpenAI response through the OpenAI API (`store: false`).
- Server validates/parses output before creating a `ProviderAlert`.
- Failures return an invalid/empty result and prevent an unverified alert from being presented as successful.
- The prompt is date-aware, treats Reader reports as primary real-time observations, discounts stale persistent directories, and requires honest uncertainty.

## Weather integration details

Both apps have separate weather stores but reuse pure alert utilities from Reader:

- `forecastTemperatureAlert` — threshold detection
- `isAlertExpired` — temperature/NWS expiry
- `filterActiveAlerts` — removes expired alerts
- `mergeAlerts` — retains unexpired prior alerts and deduplicates new ones
- `normalizeAlert` — display model conversion
- `getAlertsWithSetting` / `getAlertsForLocation` — source orchestration

Temperature alerts are identified by `type + expectedAt`; NWS alerts by `event + expires`. Merge order retains active previous alerts before adding new alerts.

Weather preferences are app-specific SecureStore keys:

```text
reader.weatherAlerts.enabled
provider.weatherAlerts.enabled
```

The stores are not durable alert databases: alert history is retained in memory across refreshes during the app session. Toggle-off and unavailable-location behavior intentionally clears the current weather list.

## Shared UI and design

- `packages/shared-ui/theme` defines colors, spacing, typography, radii, and shadows.
- Normal and emergency themes provide distinct semantic palettes.
- `packages/shared-ui/resourceCategories.ts` centralizes resource-category visuals.
- Cards, chips, modal surfaces, headers, and tab navigation use shared theme tokens where implemented.
- User content is rendered through React Native `<Text>`, never injected as HTML.
- Interactive controls require accessible names; icon-only actions use accessibility labels.
- Destructive actions use confirmation dialogs.

## Development commands

From the repository root:

```bash
# Start the API
npx tsx server/index.ts

# Run Provider + Reader + server tests
npm run test:all

# Generate Prisma client
npx prisma generate

# Create/apply a development migration
npx prisma migrate dev --name <migration_name>
```

From either mobile app directory:

```bash
npm start
npm run test:unit
```

Provider native development builds are configured with:

```bash
cd apps/provider
npm run ios -- --device
```

Reader currently uses its package scripts as configured in `apps/reader/package.json`; use an explicit physical-device `expo run:ios --device` workflow when a native Reader build is required.

## Testing rules

Follow `docs/project-context/AGENTS.md` and `TESTING.md`:

- RED → GREEN → REFACTOR
- Do not weaken, skip, or delete tests
- Strict TypeScript; no `any`, `var`, `@ts-ignore`, or `@ts-nocheck`
- Use arrow/closure functions and `const` by default
- Keep pure business logic isolated from React Native/Expo dependencies when unit testing
- Jacqueline runs terminal verification commands and supplies results

## Known implementation boundaries

- Mobile alerts are refreshed by app/store lifecycle events; there is no remote push-notification backend for weather.
- Reader reminders are local Expo notifications, not server-scheduled push notifications.
- Weather raw-alert retention is in-memory, not persisted across a full process restart.
- Saved resources are snapshots and do not automatically mutate the live Provider resource.
- OpenAI findings are advisory and require Provider review.
- Provider membership gating in the app shell currently supplies an active membership view when a Provider user is present; server-side ownership/membership checks remain authoritative.
- Some language/preference UI is present without complete application-wide translation coverage.

## Cross-app behavior summary

| Provider action | Shared backend effect | Reader result |
|---|---|---|
| Create resource | Inserts `Resource` and audit event | Appears in public active-resource feed |
| Edit resource | Updates same `Resource` ID and audit event | Foreground/focus reload shows new fields |
| Delete resource | Removes resource after ownership check | Disappears on next resource reload |
| Change weather preference | Provider SecureStore only | No Reader effect |
| Delete Provider alert | Deletes review alert | Does not change Reader report/resource |
| Report another resource to Narley | Resend email to admin | No direct Reader change |

| Reader action | Shared backend effect | Provider result |
|---|---|---|
| View/search resources | Public resource read | No Provider mutation |
| Save resource | Creates Reader-owned snapshot | Live Provider resource unchanged |
| Delete saved item | Deletes snapshot only | Live Provider resource unchanged |
| Report inaccurate resource | OpenAI research + `ProviderAlert` | Owning Provider sees review alert |
| Change weather preference | Reader SecureStore only | No Provider effect |
| Schedule reminder | Local device notification | No backend/Provider effect |
