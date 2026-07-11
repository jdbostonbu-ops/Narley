# Narley Mobile App Features

Last audited against the Reader app, Provider app, shared UI, shared Firebase helpers, and Firestore rules on July 10, 2026.

This document describes behavior that is implemented in the current codebase. Features that are still ideas or production gaps are separated from implemented behavior so they are not mistaken for working functionality.

## 1. Provider App

### 1.1 Access and navigation

The Provider app has five bottom tabs:

- Map
- Post
- My Posts
- Alerts
- Profile

All five tabs are behind shared Firebase email/password authentication. While authentication state is loading, the app displays a loading indicator. A signed-out user sees the shared login/create-account screen, and a signed-in user whose email is not verified sees the email-verification screen. Only a signed-in, email-verified user reaches the Provider tabs.

The authentication flow supports account creation, login, password show/hide, verification-email resend, verification-status refresh, switching to another email, and sign-out. Google Sign-In is disabled because its native configuration requires a development or production build rather than Expo Go.

The client verifies the email address but does not look up a Provider record before showing the tabs, so any email-verified account can reach the Provider UI. Firestore rules separately require a `/providers/{uid}` document whose `verified` field is true before resource creation or update. An account that passes the client gate but not the rules gate can open the screens but its writes will fail.

### 1.2 Provider Map

The Provider Map displays the same currently visible resource feed used by the Reader app. The screen supports:

- Searching by city or ZIP code and recentering the map from geocoding results.
- Viewing active resources with valid latitude and longitude as map pins and cards.
- Seeing the number of resources in the visible feed.
- Opening a Provider resource detail card from a pin or list card.
- Reviewing category, status, title, address, notes, phone, and website.
- Opening the resource editor or permanently deleting a resource after confirmation.

An empty search, an unknown location, or a geocoding failure produces an alert. The initial map region is Boston.

Important ownership limitation: the Provider Map uses the global visible-resource listener, not a provider-owned-resource query. It can therefore show resources created by other providers. The detail card exposes Edit and Delete for every displayed resource. The editor blocks a save when the signed-in UID is not the resource owner, and Firestore rules also restrict updates to the owner. Delete reaches the confirmation and helper but is rejected for every user by the current `allow delete: if false` rule. My Posts is the provider-owned management view.

Search only recenters the map. The cards and count are not filtered or sorted by distance from the searched location.

### 1.3 Post Resource

The Post screen creates a Firebase resource using the signed-in user's UID as `provider_id` and the user's display name, email, or `Provider` as `provider_name`.

Providers can enter:

- A default or custom category.
- Status: `active`, `expired`, or `removed`.
- Title.
- Address or location note.
- Notes.
- Phone number, formatted to a maximum of 10 digits.
- Website.
- Required expiration date.
- A map pin from a typed address or the device's current GPS location.

Default categories include Food, Shelter, Medical, Hygiene, Clothing, Transportation Help, Harm Reduction, Showers, Charging, and Wi-Fi. Choosing `+ Custom` reveals a custom-category input.

To pin a typed address, the provider taps Find Address on Map. The app requests foreground location permission, geocodes the address, validates the returned coordinates, and stores the result as the selected pin. Use Current Location requests permission and captures the device coordinates. Posting is blocked until a valid pin has been selected.

Submission validates that:

- A user is signed in.
- The title is present.
- The status is one of the supported values.
- The expiration date is present, parseable, and not in the past.
- Latitude and longitude are finite numbers.

The form does not currently reject an empty custom-category name. It also checks that coordinates are finite but does not explicitly enforce latitude/longitude ranges.

On an accepted write, the app creates the resource and then a `created` resource event, clears the form, and shows a confirmation. The new resource is visible to Readers only when its status is active and it has not expired. Current Firestore rules accept only `active` or `paused` on create, so UI submissions with `expired` or `removed` are rejected. Conversely, the rules accept `paused`, which the current UI and TypeScript resource status do not offer.

### 1.4 Resource lifecycle and visibility

The implemented statuses are:

- `active`: shown in the Reader and Provider visible-resource feeds.
- `expired`: hidden from the visible feed but included in the owner's My Posts query.
- `removed`: hidden from both the visible feed and the current My Posts query.

The shared visible-resource listener accepts active resources and legacy resources with no status, and requires valid coordinates. The Reader additionally hides a resource when `expires_at` is earlier than the current device time. The Provider Map does not apply that expiration-date filter, so an active resource whose expiration time has passed can remain visible there until its status changes.

There is no implemented paused or future-available status in the current resource type or forms. There is also no scheduled backend process in this repository that automatically changes an active resource to expired.

### 1.5 My Posts

My Posts listens to resources whose `provider_id` matches the signed-in user's UID. It currently lists owned resources with active or expired status and valid coordinates.

Each card shows category, status (`OPEN` for active and `CLOSED` for expired), title, notes, and address. Providers can:

- Edit the resource in the shared resource editor.
- Permanently delete it after a Cancel/Delete confirmation.

The current screen no longer has separate Pause and Activate buttons. Status changes are made through Edit.

The Delete control asks for confirmation and then calls the hard-delete helper. Current Firestore rules prohibit all resource deletion, so the app displays Delete failed and the resource remains. If that rule is changed later, the helper would hard-delete without writing a removal event or converting the status to removed.

### 1.6 Resource editing

The shared Provider editor is available from Provider Map details and My Posts. It supports editing:

- Title.
- Default or custom category.
- Notes.
- Address.
- Phone.
- Website.
- Latitude and longitude.
- Status.
- Required expiration date.
- Pin coordinates from the device's current location.

The editor validates ownership context, required title/category/location, finite coordinates, supported status, and expiration date. It does not explicitly enforce latitude/longitude ranges or prevent a past expiration date. Saving calls the shared update helper, updates the resource timestamp, and writes an `updated` resource event when both writes are permitted.

Closing an unchanged editor exits immediately. Closing after changes opens a Discard changes? confirmation so accidental edits are not lost.

### 1.7 Provider Alerts

Provider Alerts is still a placeholder that only displays the Alerts title. It does not subscribe to the shared active-alert listener.

### 1.8 Provider Profile

Provider Profile now displays:

- Organization identity from display name or email.
- Email-verification status.
- Resource activity and status-reminder switches.
- English, Spanish, Portuguese, and French language choices.
- A compact-updates switch.
- Signed-in account email.
- Log Out with a Cancel/Log Out confirmation.

Logging out clears the shared Firebase session and immediately returns the app to authentication, removing access to all Provider tabs.

The selected language is persisted through the shared language context. The three notification/preference switches are currently component state only: they are not persisted and are not connected to notification delivery or alert filtering.

## 2. Reader App

### 2.1 Access and navigation

The Reader app has four bottom tabs: Map, Alerts, Saved, and Profile. Like Provider, Reader is gated by shared Firebase email/password authentication and email verification. Loading, account creation, verification, resend, refresh, another-email, password visibility, and logout behavior are shared between the apps.

Google Sign-In remains disabled pending native development/production-build configuration.

### 2.2 Reader Map and nearby resources

The Reader Map is the main resource-discovery screen. It:

- Starts in the Boston region.
- Searches a city or ZIP code through device geocoding.
- Recenters on a successful search.
- Displays active resources with valid coordinates.
- Filters out resources whose expiration time has passed according to the device clock.
- Shows resource pins, a resource count, and tappable cards.
- Opens a resource detail modal from either a pin or card.

Empty, unknown, and failed searches show alerts. Search does not filter or sort the resource list by distance, and the resource count is the total loaded visible count rather than the count within the displayed map region.

Resource cards show the custom category when present, otherwise the default category, plus the status, title, notes, and address. Active status is labeled `OPEN`.

### 2.3 Resource details, directions, saving, reminders, and sharing

The Reader resource detail modal shows category, title, notes, and address and provides:

- Directions, which opens Google Maps using the resource coordinates.
- Save + Remind, which reveals the reminder picker and Save Resource action.
- Share, which opens the device share sheet with title, optional notes, optional address, and Narley attribution.
- Close controls and backdrop dismissal.

Reminder choices are No reminder, Test 1 min, Tomorrow, Next week, Next month, and Custom date + time. A custom reminder requires a valid date and time. Android uses a reminders notification channel, and reminder scheduling requests notification permission.

Tapping Save Resource stores a snapshot in the shared local saved-resources context, schedules a local notification when a reminder date was selected, and closes the modal. Saving the same resource ID again does not create a duplicate. Reminder timing itself is scheduled with the operating system; it is not stored as a field on the saved resource snapshot.

### 2.4 Saved Resources

Saved resources are persisted on the device with AsyncStorage and restored when the saved-resources context mounts. Each saved card shows category, title, address, and a tap-to-view hint. Tapping it reopens the standard detail modal.

Cards with an ID include Delete. Deleting opens a Cancel/Delete confirmation and removes the local saved snapshot only after confirmation. It does not delete the live Provider resource.

Saved data is currently device-local and uses one shared storage key rather than being namespaced by Firebase user. Signing out does not clear it, so different accounts using the same app installation can see the same locally saved list.

### 2.5 Reader Alerts

Reader Alerts currently displays four hardcoded sample cards covering heat, cold, shelter beds, and meals. Cards show title, message, location, time, and severity styling; emergency items receive stronger styling.

The screen does not subscribe to the shared Firebase active-alert listener, so these are examples rather than live data.

### 2.6 Reader Profile

Reader Profile includes:

- Display-name or email identity and a first-letter avatar.
- Verified-user badge.
- Emergency Mode toggle.
- Language selector for English, Spanish, Portuguese, and French.
- Count of locally saved resources.
- About Narley modal.
- External feedback link.
- Account email.
- Sign out.

The About modal explains Narley's mission and closes without leaving Profile. The feedback button opens the configured Tally form. Reader sign-out calls Firebase directly without a confirmation dialog and returns the app to authentication.

### 2.7 Emergency Mode and language

Emergency Mode changes supported Reader colors, including the Map background/search action and Profile emergency controls. It is held in React context for the current app session and is not persisted across app restarts.

Language selection is stored in AsyncStorage and restored on launch. Shared translations cover the main tab labels and selected Map, Saved, and Profile text. Not every string in either app is translated; many alerts, forms, details, and Provider labels remain English. Provider tab labels also remain English even when the shared language preference changes.

## 3. Shared Data and Security Behavior

### 3.1 Firebase resource behavior

The shared Firebase layer provides resource creation, update, deletion, visible-resource listeners, provider-owned listeners, alert helpers, saved-resource helpers, authentication, and resource event tracking.

Creating and editing a resource writes resource-event records. Hard deletion currently does not write an event. The apps listen to Firestore snapshots, so accepted resource creates and updates can appear without manually refreshing.

### 3.2 Firestore authorization and current contract mismatches

Current Firestore rules allow active or paused resources to be read, including without authentication. A verified Provider may also read their own resources, and an admin may read all resources. Creating requires a verified Provider record, an owned `provider_id`, and active or paused status. Updating requires a verified Provider and ownership. Resource deletion is always denied. Resource-event creation requires a verified Provider and matching `provider_id`.

The rules do enforce a Provider record and its `verified` field, but they do not check the Firebase Authentication `email_verified` claim. The client and rules therefore use different verification signals.

There are also two material client/rules contract mismatches:

- The client resource type and forms use active, expired, and removed, while create rules allow active and paused.
- `listenToVisibleResources` listens to the entire `resources` collection and filters statuses in client code. Firestore rules evaluate whether a query can return unauthorized documents rather than using client-side filtering, so this listener is not aligned with the status-restricted read rule and can fail with permission denied when the collection contains restricted records. The listener should query allowed statuses, or the data/rules design should be changed deliberately.

### 3.3 Known production gaps

The highest-priority gaps confirmed by this audit are:

- Align the client Provider gate with the existing verified Provider-record rule and clearly surface authorization failures.
- Reconcile the status contract across TypeScript, forms, listeners, Firestore rules, and documentation.
- Replace the unfiltered visible-resource listener with queries that Firestore rules can authorize.
- Prevent the Provider Map from offering Edit/Delete for resources the signed-in provider does not own, or change it to an owned-resource feed.
- Connect Reader and Provider Alerts to live Firebase data.
- Add backend expiration handling so expired resources are consistently hidden in every app without relying only on the Reader device clock.
- Decide whether deletion should remain prohibited, become a soft removal with an audit event, or permit owner hard deletion; then align controls and rules.
- Namespace or synchronize Reader saved resources by user, and define sign-out behavior for local saved data.
- Persist and implement Provider notification preferences and Reader Emergency Mode if those settings should survive restart.
- Add distance-based map/list filtering and sorting if “nearby” is intended literally.
- Add loading/error states for Firestore snapshot listeners and automated tests for authentication, posting, editing, expiration, ownership, saving, reminders, and deletion.

## 4. Proposed Reader Expansion (Not Implemented)

The following concepts appeared in the earlier feature document but have no current screens, navigation routes, data models, or workflows in the audited code:

- Hamburger menu.
- Todo/Saved action planner and Todo modal cards.
- Medical page with Medicaid and GoodRx links.
- Narley Cash balance page.
- Narley Cash Card ordering and cancellation.
- Work page with WIOA and BRS links.
- Training page with OIC links.
- General Resources page with location-dependent results.
- Insurance Card page.
- Documents page.
- “Save This to My Todo” flows, calendar events, submission dates, appointments, Todo notes, and Todo reminders.

If this expansion is implemented, saved Todo/resource cards should be stable snapshots, persist per user, preserve links/notes/dates/reminders, and require confirmation before destructive delete or card-cancellation actions. Financial and card features must not claim real-time balances or request outside wallet credentials without an approved, secure integration.
