TESTING.md
Narley Version 3 Testing Specification

Project: Narley
Document Version: 3.0.0
Status: Living Test Specification
Testing Approach: Test-Driven Development
Required Cycle: RED → GREEN → REFACTOR

# 1. Purpose

This document defines the observable behaviors that Narley Version 3 must satisfy.

It converts approved product behavior into testable expectations so Codex can:

Write a failing test before implementation.
Confirm the test fails for the correct reason.
Port or rewrite only the necessary Version 2 code.
Make the test pass.
Refactor without changing behavior.
Run the related test suite and full suite.

This document is not a feature wishlist.

It is a testing contract.

# 2. Source-of-Truth Order

When creating or interpreting tests, use this order:

VERSION-3-BUILD.md
MVP.md
TESTING.md
READER-APP-SPEC.md
PROVIDER-APP-SPEC.md
UI-BEHAVIORS.md
CODING-STANDARDS.md
Narley Features.md

Narley Features.md is an audit of Version 2 behavior. It includes implemented behavior, production gaps, and proposed features. Only approved Version 3 behavior should become a required test.

# 3. TDD Rules
## RED

Before implementation:

Write the test first.
Run the smallest relevant test.
Confirm the test fails.
Confirm it fails because the required behavior is missing or incorrect.
Do not create fake failures.
Do not weaken the assertion to force a pass.
Do not copy Version 2 code before the RED test exists.
## GREEN

After RED:

Add the smallest correct implementation.
Port Version 2 code only when it matches Version 3 requirements.
Run the targeted test.
Confirm the test passes.
Run related tests.
REFACTOR

After GREEN:

Improve structure without changing behavior.
Preserve all passing tests.
Follow CODING-STANDARDS.md.
Do not add future features during refactoring.
# 4. Testing Tools

Use Vitest for:

Pure TypeScript logic
Validation functions
Resource lifecycle rules
Date parsing
Permission logic
Service-layer behavior
Data transformation
Query filtering
Shared utilities

Use React Native Testing Library with the Expo-compatible test runner for:

Screen rendering
Button presses
Text inputs
Modals
Confirmation dialogs
Accessibility labels
Conditional navigation
Authentication gates
Map-card interaction where practical
Profile behavior

Use integration tests or controlled test doubles for:

Authentication services
Database writes
Resource listeners
Notifications
Geocoding
Location permissions
# 5. Provider Authentication and Access
AUTH-P-001 — Loading state

AUTH-P-002 — logged-out Provider sees authentication (one line corrected)
Behavior
A logged-out user must see the Provider login screen. Account creation is not offered here — it is reached only by scanning the org QR.

Expected result
Map, Post, My Posts, Alerts, Profile are not visible. Login controls are available. Account-creation controls are not shown on the cold signed-out screen (they appear only in the QR-initiated flow).

## RED Test 1
A logged-out user can reach Provider tabs, or can create an account without a QR.

## GREEN Test 1
The login screen renders when user === null.

AUTH-P-003 — logged-in Provider sees tabs (replaces the email-verification gate)

Behavior
A logged-in user with an ACTIVE membership in a verified, active org sees the Provider tabs. There is no email-verification screen — verification happened at account creation, by matching the approved allowlist through the org QR.

Expected result
Map, Post, My Posts, Alerts, Profile are visible. No "awaiting verification," resend, or refresh controls appear anywhere.

## RED Test 2
Tabs are hidden for a valid signed-in member, or an email-verification screen blocks a signed-in member.

## GREEN Test 2
The Provider tabs render when user !== null and the membership is ACTIVE.

AUTH-P-004 — QR-initiated account creation

Behavior
A user who scans the org QR is taken to a create-account screen that asks for email and a new password. The scanned token identifies the organization; the email is authorized only if it matches a PENDING allowlist row for that org. On success the account is created and the user is routed to login (no session is granted).

Expected result
The create-account screen shows an email field, a password field, and a submit control.
On submit, when the token resolves to a verified, active org and the email matches a PENDING invitation for that org:

the User is created with a hashed password
an ACTIVE membership is created
the invitation row is flipped to ACCEPTED
the user is routed to the login screen
no session is granted (they are not signed in)
Provider tabs are not shown

Provider tabs remain unavailable throughout this screen.

## RED Test 3
The screen grants a session and lands the user directly in the Provider tabs, or it creates an account for an email that is not on the org's PENDING allowlist, or it is reachable without a valid QR token.

## GREEN Test 3
The create-account screen renders only when a valid org token is present, and on successful submit the user is routed to login with no session.

Behavior

A signed-in, email-verified, authorized Provider can access:

Map
Post
My Posts
Alerts
Profile

Expected result

The five Provider tabs render only after all access requirements pass.

AUTH-P-005 — Provider write authorization

Behavior
A logged-in User may create/edit/delete pin only if they have an ACTIVE membership. Being a User (able to log in) is identity; the ACTIVE membership is what authorizes pinning. The client checks the same membership source the backend checks.

## RED Test 4
A logged-in User with no ACTIVE membership can reach or use pin/create/edit/delete pins controls; or the client authorizes on anything other than ACTIVE membership.

## GREEN Test 4
Pin/create/edit/delete pins is permitted only when an ACTIVE membership in a verified, active org is confirmed.

AUTH-P-006 — Login

Behavior: A Provider logs in with email + password. There is no email-link verification step — the employee's email was already verified by Narley admin during vetting and stored in the DB.

## RED Test 5
An email with no User row (terminated → removed) authenticates; or wrong credentials are accepted; or the error reveals which factor failed or leaks internals; or the password field is unmasked without an intentional eye toggle.

## GREEN Test 5
A session returns only for correct email + password matching an existing User; every other case is denied with a generic error; password stays masked unless toggled.

Behavior

A Provider can log in with valid email/password credentials.

Expected result

Valid credentials authenticate the user.
Invalid credentials show an error.
The error does not expose sensitive implementation details.
Password input remains protected unless visibility is intentionally toggled.

AUTH-P-007 — Password reset (all users: readers and providers)

Behavior
Any user can reset their own password without contacting an admin. From the login screen they tap "Forgot password?" (rendered below the login control), enter their email, and receive a reset link/code sent by the transactional email sender. Following it lets them set a new password. This applies identically to readers and providers.

Expected result
"Forgot password?" is visible below the login button. Submitting a known email sends a reset link/code to that address. The link/code is single-use and time-limited. Following a valid, unexpired link/code lets the user set a new password. After reset, the new password works and the old one does not. Existing sessions are invalidated, forcing re-login.
Security behaviors (these are the spec's teeth):

No account enumeration. Submitting an email returns the same response whether or not a User exists — e.g. "if that email is registered, a reset link is on its way." It must not reveal whether the email is in the DB.
Single-use. A reset link/code works once; reusing it after a successful reset is rejected.
Time-limited. An expired link/code is rejected.
Tampered/unknown token. A reset token that matches nothing is rejected.
Old sessions die. After a successful reset, previously issued sessions no longer authenticate.

## RED Test 6
The reset response reveals whether an email exists (enumeration); a reset link/code works more than once; an expired or unknown token still allows a reset; the old password still works after reset; or old sessions survive a reset.

## GREEN Test 6
A valid, unexpired, single-use token lets the matching user set a new password; the old password stops working; old sessions are invalidated; and the request-reset response is identical for existing and non-existing emails.

AUTH-P-008 — Password strength policy (all users)

Behavior
When a user sets or resets a password (at QR account creation per AUTH-P-004, or password reset per AUTH-P-007), the password must meet the strength policy before it is accepted and hashed. Validation happens before bcrypt — you never hash a password that fails the rules.

Expected result
A password is accepted only if all of these hold: length ≥ 8; at least 1 uppercase; at least 1 lowercase; at least 2 digits; at least 2 of !@#$%&*. A failing password is rejected with a clear message stating what's missing, and no User is created / no password is changed.

## RED Test 7

A password missing any requirement is accepted (too short; no uppercase; no lowercase; fewer than 2 digits; fewer than 2 specials); or a failing password still gets hashed/stored.

## GREEN Test 7

Only passwords satisfying all five rules are accepted and passed to bcrypt; every failing case is rejected before hashing with a message identifying the unmet requirement.

# 6. Reader Authentication and Access
AUTH-R-001 — Reader loading state

The Reader app displays a loading indicator while authentication state is resolving with spinner

AUTH-R-002 — Logged-out Reader sees authentication

A logged-out Reader sees the login/sign-up screen and cannot access Reader tabs.

AUTH-R-003 — Reader email verification

Verification process, Reader must receive a Hash code to verify email. Verification page needed

A logged-in but unverified Reader sees the verification screen.

AUTH-R-004 — Verified logged in Reader reaches tabs

A verified logged in Reader can access:

Map
Alerts
Saved
Profile

AUTH-R-005 — Reader logout

Logging out returns the Reader to authentication. Small eye toggle in password field.

If a confirmation dialog is required by Version 3, Cancel must preserve the session and Confirm must end it.


AUTH-T-001 — Token issued at login: On successful provider login and successful reader login, the server issues a signed token (JWT) containing the account's identity and a type claim distinguishing provider from reader. The token is returned to the app.

AUTH-T-002 — Protected endpoints require a valid token: Private reads and mutations require a valid, unexpired, correctly-signed token of the correct account type. Requests with a missing, malformed, expired, or wrong-type token are rejected (401). Public endpoints — login, reader signup/verify, password-reset request/confirm, and public resource reads (GET /resources) — do not require a token.

AUTH-T-003 — Identity comes from the token, not the request: Protected endpoints derive the acting user/organization identity from the verified token, never from client-supplied body/query fields. Client-supplied ownership ids are ignored.

AUTH-T-004 — Provider resource ownership: A provider may create resources only under their own organization (from the token), and may edit or delete only resources belonging to their own organization. Attempts to edit or delete another organization's resource are rejected.

AUTH-T-005 — Reader data ownership: A reader may read, create, and delete only their own saved resources (reader identity from the token). Attempts to access another reader's saved items are rejected.

AUTH-T-006 — Provider alerts scoping: Provider alert reads and deletions use the token-derived provider/organization identity (no client-supplied identity).

# 7. Provider Resource Creation
POST-001 — Signed-in Provider required

Behavior

Only an authorized Provider can submit a resource.

Expected result

Unauthenticated or unauthorized users cannot create a resource.

POST-002 — Required title

Behavior

A resource title is required.

Expected result

Whitespace-only or empty titles are rejected.

POST-003 — Required category

Behavior

A resource category is required.

Expected result

Submission fails when no category is selected.

POST-004 — Custom category validation

Behavior

Selecting a custom category requires a non-empty custom category name.

Expected result

+ Custom with an empty custom-category field is rejected.

Required V3 correction

Version 2 does not consistently reject an empty custom-category name.

POST-005 — Required location

Behavior

A resource cannot be published without a valid map location.

Expected result

Submission fails when latitude or longitude is missing.

POST-006 — Coordinate validation

Behavior

Latitude and longitude must be finite and inside valid geographic ranges.

Expected result

Latitude must be between -90 and 90.
Longitude must be between -180 and 180.
NaN, infinity, and invalid strings are rejected.

Required V3 correction

Version 2 validates finite coordinates but does not fully enforce coordinate ranges.

POST-007 — Typed address geocoding

Behavior

A Provider can enter an address and request a map location.

Expected result

Valid address results create a pin location.
Empty address shows a validation message.
Unknown address shows an error.
Geocoding failure does not preserve invalid coordinates.
POST-008 — Current-location pin

Behavior

A Provider can use the device’s current location.

Expected result

Permission is requested.
Granted permission stores coordinates.
Denied permission shows a clear explanation.
No resource is posted without valid coordinates.

POST-009 — Expiration date

Behavior

The Provider form uses an expiration date, not “expires in hours.” Expiration dates cannot exceed a year, and if a provider enters an expiration date past 1 year, a message will appear saying expiration date must be no more that 1 year.

Expected result

The field is labeled Expiration Date.
The value is stored as expiresAt.
A required expiration date must be present.
Invalid dates are rejected.
Past dates are rejected.

POST-010 — Expiration edits capped at one year: When a provider edits a resource's expiration date, the new date must be a valid future date no more than one year from the date of the edit. Attempts to set an expiration beyond one year are rejected and the provider sees the message: "Resources can be active for a maximum of 1 year. Choose a date within 1 year — you can extend again later by posting a new pin." Editing within one year remains allowed (extending a pin).

POST-011 — Status contract

Behavior

The same approved status values must be used by:

TypeScript
Provider forms
Database schema
Queries
Security rules
Tests
Documentation

Expected result

There is no mismatch such as UI allowing expired while rules only allow paused.

Required V3 correction

Version 2 has inconsistent status contracts.

POST-012 — Phone formatting

Behavior

Phone input accepts only the approved number of digits and stores a normalized value.

Expected result

Letters and excessive digits are rejected or normalized according to the specification.

When a user enters a 10-digit phone number, the field automatically displays it as `(XXX)XXX-XXXX`. The formatting updates as the user types, and saved phone numbers use this display format wherever shown. The underlying stored value remains normalized according to the approved data contract.

POST-013 — Successful post

Behavior

A valid submission creates one resource.

Expected result

providerId matches the signed-in Provider.
The resource is created once.
No duplicate is created.
A success message appears.
The form resets only after the write succeeds.

> When an authorized Provider successfully publishes an active resource with valid coordinates, the same resource ID appears as a pin on both the Provider Map and Reader Map, subject to the approved visibility rules.
>
> In both apps, a card for that same resource ID must also display below the map of the pinned resource. The pin and card must represent the same resource. If the user taps on the pin, the resource not the full details must show on the pin. The full details appear on the cards listed below the map upon tapping on the cards.

POST-014 — Resource event creation

Behavior

A successful resource creation creates a corresponding audit event.

Expected result

The event records:

Resource ID
Provider ID
Event type: created
Timestamp
POST-015 — Failed write

Behavior

A failed database write must not display a false success state.

Expected result

The form remains available.
User input is not silently discarded.
A clear error message appears.
No audit event is written when resource creation fails.
# 8. Provider Resource Editing
EDIT-001 — Existing data populates editor

Opening Edit loads the current:

Title
Category
Custom category
Notes
Address
Phone
Website
Coordinates
Status
Expiration date
Available-again date
EDIT-002 — Title can change

Behavior

A Provider can rename an existing resource.

Example

Test Soup Kitchen may be changed to Joe’s Barbershop.

Expected result

The existing resource is updated.

No duplicate resource is created. If there is a duplicate resource not duplicate address but a duplicate resource for the same address, a message will appear and say "duplicate resource, unable to process" If there is a conflict with the resource pinned by another user, the user may click report and state the reason for the report" Reports sent to Narley will be processed through Open-AI to check online verify report claim e.g. (changed hours, closed, no longer operating, etc) using news, online data, APIs if able, website verifying 404 page, first before sending to Narley admin in an email reporting findings and report from provider.

EDIT-003 — Category can change

A Provider can change the resource category and the corresponding card/pin configuration updates.

EDIT-004 — Notes can change

Updated notes appear in Provider and Reader views after the accepted update.

EDIT-005 — Address and coordinates can change

A Provider can update the address and pin location.

The map pin moves to the updated coordinates.

EDIT-006 — Phone and website can change

The updated values appear in the resource detail modal.

EDIT-007 — Expiration date validation

Editing must reject:

Missing required expiration date
Invalid date
Past expiration date

Required V3 correction

Version 2 editing does not consistently reject past expiration dates.

EDIT-008 — Ownership

Only the resource owner or an approved organization-authorized account may edit the resource.

Expected result

Unauthorized Providers do not see active Edit controls or receive a clear denial before saving.

EDIT-009 — Save updates existing record

Saving changes modifies the existing resource ID.

It does not create a second resource.

EDIT-010 — Audit event

A successful update writes one updated resource event.

A failed update does not write a success event.

EDIT-011 — Close unchanged editor

Closing an unchanged editor exits immediately.

EDIT-012 — Unsaved changes confirmation

Closing after a change shows:

Discard changes?

[Cancel] [Discard]

Cancel returns to editing.

Discard closes without saving.

# Live

For the refresh bug (A) — reader auto-updates on foreground:

LIVE-010 — Provider edits propagate to the reader: When a provider edits any field of a resource and the edit succeeds, the updated value is persisted to the backend and reflected in the reader app without the reader manually refreshing. This applies to every editable and displayable field. No edited field may appear updated on the provider while remaining stale, missing, or unpersisted for the reader.

For the notes persistence bug (B) — notes actually save:

POST-011 — Resource notes/details persist through edits: When a resource is created or edited with a notes/details value, that value is persisted to the database and returned by GET /resources. The notes field must not be silently dropped by the update endpoint or omitted from fetch responses. A resource's saved notes are visible to both the provider (on reload) and the reader.



# 9. Resource Lifecycle and Visibility
LIFE-001 — Active

Active resources appear in approved Reader and Provider feeds as well as the corrolated cards generated under the map.

LIFE-002 — Expired

Expired resources do not appear in Reader and Provider results as well as the corrolated cards generated under the map.

Life-003 - Deleted

Deleted resources do not appear in Reader and Provider results as well as the corrolated cards generated under the map.

LIFE-007 — Expiration consistency

A resource whose expiresAt is in the past is treated consistently across:

Reader Map
Provider Map
My Posts
Queries
API/service responses

Required V3 correction

Version 2 Reader and Provider Map do not apply expiration identically.

LIFE-008 — Automatic expiration

If Version 3 includes backend expiration processing, expired resources must stop appearing without relying only on the Reader device clock.

LIFE-009 — Status-change confirmation

Activate
Delete/remove (with confirmation dialogue)

The only resource lifecycle
  > states are ACTIVE and
  > EXPIRED. Delete is a
  > Provider-only action, not a
  > lifecycle state. 

  > An ACTIVE resource with
  > valid coordinates appears as
  > the same resource ID on both
  > the Provider Map and Reader
  > Map. Each map displays its
  > pin and corresponding card
  > below the map.

  > Tapping a pin selects the
  > resource and displays its
  > concise map preview. It does
  > not open the full detail
  > modal. Tapping the
  > corresponding card opens the
  > full detail modal for that
  > same resource ID.

  > When expiresAt passes, the
  > resource’s pin and
  > corresponding card
  > automatically disappear from
  > both Provider and Reader
  > apps. An expired resource
  > behaves as removed from both
  > maps and requires no Reader-
  > device refresh or manual
  > deletion.

  > Only an authorized Provider
  > may delete a resource.
  > Delete requires a
  > confirmation dialog. Cancel
  > preserves the resource.
  > Confirm deletes it and
  > removes its matching pin and
  > card from both Provider and
  > Reader apps.

For the phone/website display bug (C) — reader shows phone/website:

LIFE-011 — Reader displays resource phone and website: The reader app's resource data model and detail view include the resource's phone and website fields (when present), so that a provider's edits to phone or website are visible to readers.

# 10. Provider Map
PMAP-001 — Visible resource feed

The map displays only resources the logged-in Provider is allowed to view under the approved Version 3.

PMAP-002 — Ownership-sensitive controls

Edit, Save Edit update, and Delete, controls appear only when the Provider is authorized to perform those actions.

Required V3 correction

Version 2 can expose Edit/Delete UI for resources owned by other Providers.

PMAP-003 — Valid coordinates

Only resources with valid latitude and longitude render as pins.

PMAP-004 — Pin and card share one resource

The pin and card must receive the same resource object or resource ID.

PMAP-005 — Pin selection

Tapping a pin:

Selects the resource.
Highlights the matching card when applicable.
Opens the Provider resource detail modal.
PMAP-006 — Card selection

Tapping a card opens the same detail modal for the same resource.

PMAP-007 — Detail modal contents

The Provider detail modal shows:

Category
Status
Title
Address
Notes
Phone
Website
Expiration information when applicable
PMAP-008 — Provider actions

Authorized Provider actions include the approved subset of:

Edit
Save for update edits
Activate
Delete/remove
Close modal

Reader-only Save + Remind controls must not appear in Provider mode.

PMAP-009 — Search

A valid city or ZIP search recenters the map.

PMAP-010 — Invalid search

Empty, unknown, or failed searches show an error and preserve the last valid map state.

PMAP-011 — Nearby behavior

If the interface says “nearby,” the resource cards and count must reflect the approved geographic area or distance logic.

PMAP-012 — Report another Provider’s pin discrepancy

When a Provider identifies a discrepancy on a pin owned by another Provider and is not authorized to change that resource, the Provider may submit a report to the Narley admin. The report includes the affected resource ID, complete address, reporting Provider’s name and email, selected reason, and supporting details. Submitting the report does not allow the reporting Provider to edit the other Provider’s resource.

Required V3 decision

Version 2 recenters the map but does not distance-filter cards or counts.

# 11. My Posts
MYPOST-001 — Authentication

Unauthenticated users cannot access My Posts.

MYPOST-002 — Ownership filter

Only resources belonging to the signed-in Provider or approved organization scope are listed.

MYPOST-003 — Empty state

A Provider with no resources sees a clear empty state and next action.

MYPOST-004 — Card contents

Each resource card displays:

Category
Status
Title
Notes
Address
MYPOST-005 — Edit

Tapping Edit opens the correct existing resource.

MYPOST-006 — Pause/activate

Pause and Activate follow the approved lifecycle rules and require confirmation where specified.

MYPOST-007 — Mark closed

Mark Closed requires confirmation and removes the resource from Reader-visible results after success.

MYPOST-008 — Archive

Archive requires confirmation and preserves the resource for history.

MYPOST-009 — Delete policy

The Delete control must match the approved Version 3 data-retention policy.

Expected implementation should be one of:

Archive instead of hard delete, or
Authorized hard delete with audit history.

It must not expose a Delete action that the backend always rejects.

Required V3 correction

Version 2 UI and security rules conflict on deletion.

# 12. Reader Map and Resources
RMAP-001 — Initial map

The Reader Map opens in the approved initial region or the user’s available location.

RMAP-002 — Search

A valid city or ZIP search recenters the map.

RMAP-003 — Invalid search

Empty, unknown, or failed searches show a clear error.

The prior successful map state remains visible.

RMAP-004 — Reader-visible resource rules

The Reader sees only resources that satisfy all approved visibility rules, including:

Allowed status
Valid coordinates
Not expired
RMAP-005 — Resource count

The displayed count accurately represents the approved visible result set.

RMAP-006 — Card fields

A Reader resource card displays:

Custom category when present
Otherwise default category
Status
Title
Notes
Address
RMAP-007 — Active label

Active resources display the approved label, such as OPEN.

RMAP-008 — Pin opens modal

Tapping a pin opens the detail modal for that resource.

RMAP-009 — Card opens modal

Tapping a card opens the same detail modal.

RMAP-010 — Synchronization

Selecting either surface keeps the selected pin, card, and modal synchronized.

# 13. Reader Resource Detail
DETAIL-001 — Displayed information

The detail modal shows the approved fields:

Category
Title
Notes
Address
Phone when available
Website when available
Status
Date information when applicable
DETAIL-002 — Directions

Tapping Directions uses the resource coordinates.

The app opens the approved in-app route preview or external map fallback.

DETAIL-003 — Travel modes

When supported, route mode options include:

Walking
Driving
Transit
Bicycle
DETAIL-004 — Share

Sharing includes:

Resource title
Optional notes
Optional address
Narley attribution
DETAIL-005 — Close

The modal can close using all approved controls, including backdrop or device back behavior where enabled.

# 14. Saved Resources and Reminders
SAVE-001 — Save resource

Tapping Save stores one saved snapshot.

SAVE-002 — No duplicate

Saving the same resource ID twice does not create two saved cards.

SAVE-003 — Snapshot content

The saved record preserves enough data to recognize the resource if the live record later changes.

SAVE-004 — Persistence

Saved resources restore after app restart.

SAVE-005 — User isolation

Saved resources must be namespaced by signed-in user or synchronized to the approved backend.

Required V3 correction

Version 2 uses one shared local storage key across accounts.

SAVE-006 — Logout behavior

The expected behavior for saved resources after logout must be explicit.

Approved options may include:

Remove local user-scoped data from active display.
Preserve it securely under that user’s namespace.
Synchronize and restore it after login.

One user must not see another user’s saved resources.

SAVE-007 — Remove confirmation

Removing a saved resource requires confirmation.

SAVE-008 — Live resource unaffected

Deleting a saved snapshot does not delete the Provider’s live resource.

SAVE-009 — Saved page cards

Each resource saved by the logged-in Reader appears as a card on the Reader Saved page. Each saved card represents the same resource ID that the Reader saved from the map or resource detail view.

REM-001 — Reminder choices

Approved reminder choices display correctly.

REM-002 — Custom reminder validation

A custom reminder requires a valid date and time.

REM-003 — Notification permission

Scheduling a reminder requests notification permission.

Denied permission produces a clear message.

REM-004 — Notification schedule

A valid reminder schedules one local notification.

# 15. Reader Alerts
ALERT-R-001 — Live alerts

Reader Alerts load live regional data from the Open-Meteo API using the Reader’s current ZIP code. Only alerts applicable to that ZIP code or its defined forecast region are displayed. Supported alerts include blizzards, hurricanes, tornadoes, torrential rain, floods, earthquakes, temperatures above 91°F, and temperatures below 32°F. The test must verify the location source, geographic matching rules, condition thresholds, refresh behavior, and API failure state.

The Reader setting is labeled Weather Alerts and controls only Open-Meteo weather alerts. Reader weather alerts are delivered and displayed only when Weather Alerts is on. When Weather Alerts is off, weather alerts do not appear on the Reader Alerts page and no new weather alert notification is delivered. The test must verify both states and confirm that the saved setting is honored after the app restarts.

Alerts come in automatically based on the user's location — the reader does NOT type in a ZIP code. The app determines where the user is and shows alerts for that location, automatically. So this is GPS-based (automatic device location), not manual ZIP entry.

Required V3 correction

Version 2 uses hardcoded sample cards.

ALERT-R-002 — Alert fields

Each alert displays:

Title
Message
Location when applicable
Time
Severity
ALERT-R-003 — Emergency styling

Emergency alerts receive the approved stronger visual treatment without relying on color alone.

ALERT-R-004 — Empty state

No active alerts produces a clear empty state.

ALERT-R-005 — Error state

Listener or network failure produces an error state and retry path.

ALERT-R-006 — Alert expiry and removal
Weather and NWS alert cards are removed automatically when they expire; there is no manual delete for weather/NWS alerts.

NWS warnings expire at the NWS-provided expires timestamp. Once expires is in the past, the alert is removed.
Open-Meteo temperature alerts (heat ≥91°F, cold ≤32°F) have no built-in expiry and are removed 24 hours after the alert's expected date.
The Alerts screen re-fetches on focus and removes any alerts that have expired relative to the current time.
An expired alert must not remain visible after a refresh. (Applies to both Reader and Provider weather alerts.)

ALERT-R-007 — Heavy rain alert (2-day advance, persistent)

Behavior
Reader Alerts generate a single heavy-rain alert when the Open-Meteo daily
forecast shows heavy rain on the day two days ahead. The function reads ONLY the
daily forecast entry at index 2 (index 0 = today, index 1 = tomorrow, index 2 =
two days ahead). It does not alert on today or tomorrow. Heavy rain is identified
by the daily weathercode at index 2 being 65 (heavy rain) or 82 (violent rain
showers). At most one heavy-rain alert is produced, reported by that day's date.

The alert persists so the card does not fall off: once generated, the heavy-rain
card remains visible until 24 hours after its expected date. It is not removed by
a later refresh that no longer shows heavy rain, and a failed or unavailable
forecast fetch does not clear an existing unexpired card. The weather store merges
newly generated alerts with previously displayed, still-unexpired alerts rather
than replacing the list. (Same persistence and expiry behavior as ALERT-R-006.)

This is subject to the same Weather Alerts on/off setting, GPS-based location,
and refresh behavior as ALERT-R-001.

Expected result
When the daily weathercode at index 2 is 65 or 82, the function returns a
heavy-rain alert carrying the index-2 date. When index 2 is not 65 or 82, no
heavy-rain alert is produced, even if index 0 or index 1 shows heavy rain. An
empty or too-short forecast (no index 2) produces no alert. Once generated, the
card remains until 24 hours after its expected date and is not removed by a
refresh that no longer shows heavy rain or by a failed fetch.

RED Test
The function does not alert when index 2's weathercode is 65 or 82; or it alerts
when index 2 is not heavy rain; or it alerts from index 0 or index 1 instead of
index 2; or a generated card disappears before 24 hours after its expected date
when a later refresh no longer shows heavy rain or the fetch fails.

GREEN Test
The function flags heavy rain only from the index-2 daily entry (codes 65 or 82),
returns that day's date, produces no alert when index 2 does not qualify, and the
card persists until 24 hours past its expected date across refreshes and failed
fetches.

ALERT-R-008 — Heavy snow alert (2-day advance, persistent)

Behavior
Reader Alerts generate a single heavy-snow alert when the Open-Meteo daily
forecast shows heavy snow on the day two days ahead. The function reads ONLY the
daily forecast entry at index 2 (index 0 = today, index 1 = tomorrow, index 2 =
two days ahead). It does not alert on today or tomorrow. Heavy snow is identified
by the daily weathercode at index 2 being 75 (heavy snow) or 86 (heavy snow
showers). At most one heavy-snow alert is produced, reported by that day's date.

The alert persists so the card does not fall off: once generated, the heavy-snow
card remains visible until 24 hours after its expected date. It is not removed by
a later refresh that no longer shows heavy snow, and a failed or unavailable
forecast fetch does not clear an existing unexpired card. The weather store merges
newly generated alerts with previously displayed, still-unexpired alerts rather
than replacing the list. (Same persistence and expiry behavior as ALERT-R-006.)

This is subject to the same Weather Alerts on/off setting, GPS-based location,
and refresh behavior as ALERT-R-001.

Expected result
When the daily weathercode at index 2 is 75 or 86, the function returns a
heavy-snow alert carrying the index-2 date. When index 2 is not 75 or 86, no
heavy-snow alert is produced, even if index 0 or index 1 shows heavy snow (light
and moderate snow codes 71, 73, 77, 85 do not qualify). An empty or too-short
forecast (no index 2) produces no alert. Once generated, the card remains until
24 hours after its expected date and is not removed by a refresh that no longer
shows heavy snow or by a failed fetch.

RED Test
The function does not alert when index 2's weathercode is 75 or 86; or it alerts
when index 2 is not heavy snow; or it alerts from index 0 or index 1 instead of
index 2; or a generated card disappears before 24 hours after its expected date
when a later refresh no longer shows heavy snow or the fetch fails.

GREEN Test
The function flags heavy snow only from the index-2 daily entry (codes 75 or 86),
returns that day's date, produces no alert when index 2 does not qualify, and the
card persists until 24 hours past its expected date across refreshes and failed
fetches.

ALERT-R-009 — Thunderstorm alert (2-day advance, persistent)

Behavior
Reader Alerts generate a single thunderstorm alert when the Open-Meteo daily
forecast shows a thunderstorm on the day two days ahead. The function reads ONLY
the daily forecast entry at index 2 (index 0 = today, index 1 = tomorrow, index 2
= two days ahead). It does not alert on today or tomorrow. A thunderstorm is
identified by the daily weathercode at index 2 being 95 (thunderstorm), 96
(thunderstorm with slight hail), or 99 (thunderstorm with heavy hail). At most one
thunderstorm alert is produced, reported by that day's date.

The alert persists so the card does not fall off: once generated, the thunderstorm
card remains visible until 24 hours after its expected date. It is not removed by
a later refresh that no longer shows a thunderstorm, and a failed or unavailable
forecast fetch does not clear an existing unexpired card. The weather store merges
newly generated alerts with previously displayed, still-unexpired alerts rather
than replacing the list. (Same persistence and expiry behavior as ALERT-R-006.)

This is subject to the same Weather Alerts on/off setting, GPS-based location,
and refresh behavior as ALERT-R-001.

Expected result
When the daily weathercode at index 2 is 95, 96, or 99, the function returns a
thunderstorm alert carrying the index-2 date. When index 2 is not 95, 96, or 99,
no thunderstorm alert is produced, even if index 0 or index 1 shows a
thunderstorm. An empty or too-short forecast (no index 2) produces no alert. Once
generated, the card remains until 24 hours after its expected date and is not
removed by a refresh that no longer shows a thunderstorm or by a failed fetch.

RED Test
The function does not alert when index 2's weathercode is 95, 96, or 99; or it
alerts when index 2 is not a thunderstorm; or it alerts from index 0 or index 1
instead of index 2; or a generated card disappears before 24 hours after its
expected date when a later refresh no longer shows a thunderstorm or the fetch
fails.

GREEN Test
The function flags a thunderstorm only from the index-2 daily entry (codes 95, 96,
or 99), returns that day's date, produces no alert when index 2 does not qualify,
and the card persists until 24 hours past its expected date across refreshes and
failed fetches.

# 16. Provider Alerts and Community Intelligence
ALERT-P-001 — Live Provider alerts

Provider Alerts subscribe to approved live data. Provider weather alerts use the Open-Meteo API and the Provider’s current ZIP code or defined forecast region, applying the same supported regional weather conditions and thresholds as Reader Alerts.

The Provider setting is labeled Weather Alerts and controls only Open-Meteo weather alerts. Provider weather alerts are delivered and displayed only when Weather Alerts is on. When Weather Alerts is off, weather alerts do not appear on the Provider Alerts page and no new weather alert notification is delivered. The setting does not control Reader reports, OpenAI verification reports, or other non-weather alerts. The test must verify both states and confirm that the saved setting is honored after the app restarts.

Required V3 correction

Version 2 Provider Alerts is a placeholder.

ALERT-P-002 — Report alerts

A new Reader report creates a Provider review item.

ALERT-P-003 — AI alerts

Every completed OpenAI verification report appears on the Provider Alerts page regardless of the Weather Alerts setting. AI report alerts do not require notification permission and have no separate preference or toggle. Each alert displays its confidence score, and low-confidence or uncertain results remain visible with their uncertainty clearly labeled.

ALERT-P-004 — Resource link

Tapping an alert opens the related resource or review item.

ALERT-P-005 — Resolved state

Resolved alerts leave the active queue but remain auditable if required.

ALERT-P-006 — Alert count

The Provider Alerts tab icon displays a numeric badge showing the current number of active alerts. The badge count matches the number of active alerts listed on the Provider Alerts page. The count includes active Reader report and OpenAI verification alerts regardless of the Weather Alerts setting, and includes weather alerts only when Weather Alerts is on.

ALERT-P-007 — Provider resolution and alert deletion

A Provider may independently verify the reported discrepancy and resolve after receiving the alert. The Provider may delete the alert at their own discretion. Deleting an alert requires a confirmation dialog: Cancel preserves the alert and Confirm removes it from the Provider Alerts page. Deleting the alert does not delete or modify the resource, original report, OpenAI verification result, or persistent audit history.

ALERT-P-008 — AI confidence is explained to providers
On the provider Alerts screen, the confidence value on an AI-verified report card is accompanied by a tappable explanation of what high, medium, and low mean, so a provider can interpret the finding correctly. The explanation reads:

HIGH — Evidence was clear, or the answer is known without searching.
MEDIUM — Some evidence, not decisive.
LOW — Evidence conflicts, or couldn't be verified.

The explanation is reachable by tap (not hover, which does not exist on touch devices), has an accessible label, and does not obscure the report beneath it.

ALERT-R-006 (persistence, both apps) — Temperature alerts persist for their full 24-hour lifetime in BOTH the reader and provider apps: In each app, a heat or cold alert, once generated, must remain visible until it expires per its 24-hour lifetime, regardless of whether subsequent forecast refreshes still meet the threshold. Each app's weather store must merge newly generated alerts with previously displayed, still-unexpired alerts rather than replacing the list, and a failed or unavailable forecast fetch must not clear existing unexpired alerts.

REPORT-001 — Structured reasons
Readers may select only approved report reasons. They may not enter free text.
The approved reasons are:

Closed / no longer operating
Wrong hours
Wrong address / location
No more resources available
Phone disconnected / no longer working
Wrong website or website not working

REPORT-P-001: "Providers may enter a written message explaining in up to 500 words, complete address and resource of pin is required, as well as the provider name and email in the report." 

A report includes the resource, its address, and the selected reason.

REPORT-000 — Website reports are verified by the server, not by search
When a reader reports "Wrong website or website not working," the server requests the resource's stored website URL before calling the AI, and reports the observed result to the AI. Web search cannot determine whether a URL resolves; only a request can.
If the request returns 404, the AI reports that verified observation.
If the request does not return 404, the AI must state that the server received no 404, advise the provider to check whether the pinned website is the one they intended (a typo can still load a working page), and suggest that if the URL is correct they consider adding a note to the card for readers — for example, recommending readers copy and paste the address.
A resource with no stored website has nothing to fetch.

REPORT-A-000 — Address reports are not investigated
When a reader reports "Wrong address / location," the AI does not search to verify the address. Organizations appear at multiple addresses across listings, including ones they vacated years ago, and search cannot determine which is current. A wrong pin may also be a provider typo. Only a human can confirm an address by calling or visiting.
The AI returns a fixed response advising human verification, with high confidence that only a human can verify this.

REPORT-C-000 — Stale records are not evidence of operation
When a reader reports "Closed / no longer operating," the AI may never report that an organization is currently operating on the strength of records that persist without maintenance. Listings, directories, registries, profiles, and search results are not evidence of current operation — they persist for years after an organization ceases to exist, and their presence required no one to do anything.
Current operation may only be supported by evidence that someone acted recently: a dated report of active service delivery, a recent official statement from the organization, or other current-dated evidence of real operation.
If no such evidence exists, current operation is unverified. Unverified is not a conflict — it is low confidence, and the AI must state that current status could not be verified and recommend human verification.

REPORT-H-000 — Hours reports are not investigated
When a reader reports "Wrong hours," the AI does not search to verify the hours. The AI is not sent the resource's stored hours and cannot compare them to anything; published hours are frequently behind reality, and hours that changed recently exist nowhere online. A wrong pin may also be a provider typo. Only a human can confirm hours by calling or visiting.
The AI returns a fixed response advising human verification, with high confidence that only a human can verify this.

REPORT-R-000 — Resource-availability reports are not investigated
When a reader reports "No more resources available," the AI does not investigate the organization. Whether a resource is available at a given moment is not published anywhere on the web and cannot be determined by search; only the reader who was present and the provider who stocks it can know.
The AI reports that a reader has submitted a first-hand observation that no resources were available at this location, and presents the resource detail for the provider to act on. It does not search, does not comment on whether the organization is operating, and does not evaluate the truth of the report.

REPORT-002 — No direct edits

Submitting a report does not directly change the resource.

REPORT-003 — Confirmation

The Reader confirms report submission before it is sent.

REPORT-004 — Review queue

The report appears in the Provider review queue.

REPORT-005 — Provider decision

Only an authorized Provider may accept, reject, or act on a report.

REPORT-006 — Reader report and OpenAI verification flow

When a Reader taps Report on a resource card, selects an approved reason, enters supporting details, and confirms submission, the report is sent to OpenAI GPT-40-mini for verification. OpenAI GPT-40-mini evaluates the reported claim using available approved evidence sources. After verification, the system creates a Provider alert containing the original Reader report, the affected resource ID and address, the AI findings, a confidence score, and links or identifiers for every source used. The system also emails the original report, verification findings, confidence score, and evidence sources to the Narley admin.

Approved evidence sources include:

- The resource’s official website, including a verified 404, removed page, or closure notice.
- Reputable news sources reporting closure or changed operations.
- Official business, organization, or service-directory data showing hours or operating status.
- Official local, state, or federal government sources.
- Official government funding or grant records relevant to a reported loss of funding.
- Other approved APIs that return attributable, traceable source data.

If supporting evidence is unavailable, the result must be labeled uncertain and must not contain a fabricated conclusion or source. 

> OpenAI only verifies the reported claim and returns its findings, confidence score, and evidence sources. OpenAI does not request, receive, or act on

> Provider authorization, clearance, guidance, direction, or approval. OpenAI has no ability or permission to create, edit, close, archive, delete, or publish a resource.

# 17. AI Verification
AI-001 — Trigger

AI verification is performed by OpenAI GPT-40-mini and begins only after an approved trigger, such as:

Reader report
Provider request
Scheduled review
Stale-resource threshold
AI-002 — Evidence required

Every AI result includes supporting evidence or source summaries.

AI-003 — Confidence score

Each result includes an approved confidence representation.

AI-004 — Uncertainty

Low-confidence or conflicting evidence is labeled uncertain.

AI-005 — No direct modification

AI cannot directly:

Edit a resource
Close a resource
Archive a resource
Delete a resource
Publish a change


AI-007 — Audit history

> Each OpenAI verification result is stored in the application’s persistent audit-event data store and linked to the report and resource IDs. The record

> contains the AI findings, confidence score, evidence sources, timestamp, and verification status. OpenAI cannot modify the audit record after returning its result.

AI-008 — No fabricated evidence

The system must not display evidence that was not returned by an approved source.

# 18. Provider Profile
PROFILE-P-001 — Organization identity

The Profile displays the approved organization identity.

PROFILE-P-002 — Verification status

The Profile displays the actual authorization/verification state.

PROFILE-P-003 — Weather Alerts preference

The Provider Profile displays a toggle labeled Weather Alerts. Changing the toggle updates the approved persistence layer, and the saved setting controls only whether Open-Meteo weather alerts are displayed and delivered. It does not control Reader reports, OpenAI verification reports, or other non-weather alerts.

Required V3 correction

Version 2 preferences are component state only.

PROFILE-P-004 — Language

The selected language persists and updates supported interface labels.

PROFILE-P-005 — Account details

The Profile displays the signed-in account email.

PROFILE-P-006 — Log out

The Profile displays Log Out only when the user is authenticated.

Logging out requires confirmation and returns to authentication.

# 19. Reader Profile
PROFILE-R-001 — Identity

The Reader Profile displays the user identity and approved avatar behavior.

PROFILE-R-002 — Verified badge

The badge reflects the actual verification state.

PROFILE-R-003 — Emergency Mode

Toggling Emergency Mode updates supported Reader UI.

PROFILE-R-004 — Emergency Mode persistence

If Version 3 requires persistence, the selected setting survives app restart.

PROFILE-R-005 — Weather Alerts preference

The Reader Profile displays a toggle labeled Weather Alerts. Changing the toggle updates the approved persistence layer, and the saved setting controls only whether Open-Meteo weather alerts are displayed and delivered in the Reader app. The Reader setting does not control alerts in the Provider app.

Required V3 decision

Version 2 stores Emergency Mode only in memory.

PROFILE-R-006 — Saved count

The displayed count matches the current signed-in user’s saved resources.

PROFILE-R-007 — About modal

The About modal opens, displays approved content, and closes without navigating away.

PROFILE-R-008 — Feedback

The feedback action opens the approved destination.

PROFILE-R-009 — Logout

Logout returns the Reader to authentication.

# 20. Language Support
LANG-001 — Supported list

The Reader Profile exposes the approved Version 3 language list.

LANG-002 — Persistence

The selected language survives app restart.

LANG-003 — Translation coverage

Approved user-visible labels use translation keys.

Required V3 correction

Version 2 leaves many forms, alerts, details, and Provider labels untranslated.

LANG-004 — Fallback

Missing translations display English rather than raw translation keys.

LANG-005 — Long text

Long translated labels wrap or resize without clipping.

LANG-006 — RTL

Where enabled, right-to-left languages use the approved layout direction.

# 21. Accessibility
A11Y-001 — Accessible labels

Every interactive control has an accessible name.

A11Y-002 — Icon-only controls

Icon-only buttons include an explicit accessibility label.

A11Y-003 — Form association

Every input has an associated label.

For web-rendered controls:

Label uses htmlFor.
Input uses the matching id.

For React Native:

Use nativeID.
Use accessibilityLabel.
Use accessibilityLabelledBy where supported.

The UI must not produce form-node association violations.

A11Y-004 — Plain-text rendering

User-generated content is rendered as plain text.

Never use dangerouslySetInnerHTML.
Use textContent for direct DOM operations.
Use the framework’s safe text-rendering equivalent in React Native.
Never interpret user input as executable HTML.
A11Y-005 — No color-only meaning

Status, severity, and category are communicated using text and/or icons in addition to color.

A11Y-006 — Confirmation dialogs

Dialogs expose clear Cancel and Confirm actions.

A11Y-007 — Touch targets

Interactive controls meet the project’s minimum touch-target size.

A11Y-008 — Screen-reader order

Important content is announced in a logical order.

# 22. Security and Authorization
SEC-001 — Provider ownership

A Provider cannot update another Provider’s resource unless explicitly authorized by organization-level permissions.

SEC-002 — Verified Provider requirement

Resource writes require the approved verified Provider record.

SEC-003 — Query-rule alignment

Database queries must be structured so backend security rules can authorize them.

Required V3 correction

Version 2 performs some client-side filtering after broad queries that security rules may reject.

SEC-004 — Input validation

All persisted input is validated before write.

SEC-005 — No raw HTML

Untrusted user content is never inserted as raw HTML.

SEC-006 — No secrets

Tests confirm production code does not contain committed secret values.

SEC-007 — Denied actions

Authorization failures display a clear message and do not mutate local UI as though the action succeeded.

# 23. Data and Listener Behavior
DATA-001 — Resource listener

Accepted resource creation and updates appear without manual refresh.

DATA-002 — Listener loading state

The UI displays a loading state while initial data is loading.

DATA-003 — Listener error state

A listener failure produces an error state and retry action.

DATA-004 — Status-filtered queries

Visible-resource queries request only approved visible statuses.

DATA-005 — Invalid record safety

Malformed records do not crash the app.

They are excluded or displayed using an approved fallback.

DATA-006 — Audit events

Creation, update, lifecycle changes, and approved removal actions create audit events.

# 24. No Mock Production Data
MOCK-001 — Production imports

Production modules do not import fixture or sample data.

MOCK-002 — Test isolation

Test fixtures exist only under test-specific directories or configuration.

MOCK-003 — Public libraries

Public library records come from approved real data sources or approved seed files, not invented demo content.

MOCK-004 — Alerts

Hardcoded sample alerts are not used in production Reader or Provider screens.

# 25. Features Explicitly Not Tested for Version 3 and will not be added on Version 3

Unless later approved, do not create required implementation tests for:

Hamburger menu
Todo planner
Todo modal cards
Medical page
Narley Cash
Narley Cash Card
Work page
Training page
Insurance Card page
Documents page
Post-capstone features
Future Ideas
Features awaiting CPA approval

Tests may verify that these routes or features are absent from the Version 3 production build.

# 26. Initial RED Test Priorities

The first RED tests should target behavior that Version 2 currently lacks or handles inconsistently.

Priority 1 — Authentication and authorization
Provider tabs are hidden when signed out.
Verified Provider record is required.
Logout returns to authentication.
Unauthorized users cannot create or edit resources.
Priority 2 — Resource contract
One approved status contract exists.
Past expiration dates are rejected.
Coordinate ranges are validated.
Empty custom categories are rejected.
Resource writes create audit events.
Priority 3 — Map/card/modal behavior
Pin and card open the same resource.
Provider modal shows Provider actions.
Unauthorized Provider actions are hidden.
Reader-only actions do not appear in Provider mode.
Priority 4 — Editing
Existing resource data populates.
Changing a title updates the same record.
No duplicate is created.
Unsaved edits require confirmation.
Priority 5 — Alerts and reporting
Reader alerts use live data.
Provider alerts use live data.
Reader reports create review items.
AI cannot change live resources.
Priority 6 — Saved-resource isolation
Saved resources are isolated per user.
Logout does not expose another account’s saved data.
# 27. Test Naming Convention

Use behavior-based names.

Preferred:

it("shows the Provider login screen when no authenticated user exists", () => {
  // test
});

Preferred:

it("updates the existing resource instead of creating a duplicate", () => {
  // test
});

Avoid:

it("works", () => {
  // unclear
});
# 28. Required Verification Commands

Targeted Vitest test:

npx vitest run path/to/file.test.ts

Full Vitest suite:

npx vitest run

Watch mode during RED/GREEN:

npx vitest

TypeScript:

npx tsc --noEmit

Reader TypeScript:

npx tsc --noEmit -p apps/reader/tsconfig.json

Provider TypeScript:

npx tsc --noEmit -p apps/provider/tsconfig.json

Lint:

npm run lint

React Native component tests:

npm test -- --runInBand

Jacqueline runs all commands.

Codex must state the exact command and wait for the result when command output is needed.

# 29. Definition of Done for a Tested Behavior

A behavior is complete only when:

The requirement is approved for Version 3.
The behavior is documented here.
A test was written before implementation.
The test failed for the expected reason.
The implementation made the test pass.
Related tests pass.
The full suite passes.
TypeScript passes.
Lint passes.
Accessibility requirements are satisfied.
Security requirements are satisfied.
Documentation is updated if behavior changed.
# 30. Final Testing Principle

Version 2 code is not automatically trusted because it already exists.

Every behavior moved into Version 3 must be proven through tests.

The required workflow is:

Approved behavior
        ↓
Documented expected result
        ↓
Failing RED test
        ↓
Version 2 code ported or rewritten
        ↓
Passing GREEN test
        ↓
Safe refactor
        ↓
Full verification

Version 3 should inherit proven behavior, not unverified code.
