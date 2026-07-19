# Prompts

Read all the md files in docs/project-context

## Prompt 2

number all the red and green tests in chronilogical order do not change tests in the TESTING.md

## Prompt 3

in the agents md file in docs/project-context what line does it say minimal code

## Prompt 4

how do I install jest test and react native expo for the mobile app build?

## Prompt 5

add this to package.json

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:run": "jest --runInBand"
  },
  "jest": {
    "preset": "jest-expo"
  }
}
```

## Prompt 6

add it again

## Prompt 7

it asks: You are creating a project inside of an existing Git repository. Skip initializing a new git repository?

## Prompt 8

now I need the provider app

## Prompt 9

how do I cd to the root file?

## Prompt 10

Read AGENTS.md and TESTING.md, then follow their rules.
Make AUTH-P-002 go GREEN. The failing RED test is at apps/provider/src/navigation/__tests__/ProviderAuthGate.test.tsx. Write only the minimal code to pass it — create ProviderAuthGate and useAuth at the imported paths. Don't touch the test.

## Prompt 11

why didn't you write the code for the file to pass?

## Prompt 12

read the rile.

## Prompt 13

add this in apps/provider/package.json:

```json
"scripts": {
  ...existing scripts...,
  "test": "jest",
  "test:run": "jest --runInBand"
},
"jest": {
  "preset": "jest-expo"
}
```

## Prompt 14

in the apps/provider/package.json extend the jest:

```json
"jest": {
  "preset": "jest-expo",
  "setupFilesAfterEach": ["@testing-library/react-native/dont-cleanup-after-each"]
}
```

## Prompt 15

also add this to package.json same provider folder:

```json
"jest": {
  "preset": "jest-expo",
  "setupFilesAfterEach": ["@testing-library/react-native/dont-cleanup-after-each"]
}
```

## Prompt 16

Open apps/provider/package.json and make the jest block read exactly this — delete any setupFilesAfterEach line entirely:

```json
"jest": {
  "preset": "jest-expo",
  "setupFilesAfterEnv": ["@testing-library/react-native/extend-expect"]
}
```

## Prompt 17

So the one remaining action is to make the jest block in apps/provider/package.json read exactly this — no setupFilesAfterEach anywhere:

```json
"jest": {
  "preset": "jest-expo",
  "setupFilesAfterEnv": ["@testing-library/react-native/extend-expect"]
}
```

## Prompt 18

in the provider/package.json file So drop the setupFilesAfterEnv line entirely:

```json
"jest": {
  "preset": "jest-expo"
}
```

## Prompt 19

add this to the apps/provider/package.jsoon: "test:unit": "vitest run"

## Prompt 20

Read AGENTS.md and TESTING.md, then follow their RED → GREEN → REFACTOR rules.
AUTH-P-008 is at RED. The failing test is apps/provider/src/auth/passwordPolicy.vitest.test.ts (Cannot find module './passwordPolicy'). Write the minimal code to make it pass: create apps/provider/src/auth/passwordPolicy.ts exporting validatePassword, enforcing exactly the five rules in TESTING.md AUTH-P-008 — length ≥ 8, ≥ 1 uppercase, ≥ 1 lowercase, ≥ 2 digits, ≥ 2 of !@#$%&*. Return an object with a valid boolean. Don't touch the test. Obey the AGENTS.md constraints (TS strict, no any, const, arrow functions).

## Prompt 21

Read AGENTS.md and TESTING.md, then follow their RED → GREEN → REFACTOR rules.
AUTH-P-008 is at RED. The failing test is apps/provider/src/auth/passwordPolicy.vitest.test.ts (Cannot find module './passwordPolicy'). Write the minimal code to make it pass: create apps/provider/src/auth/passwordPolicy.ts exporting validatePassword, enforcing exactly the five rules in TESTING.md AUTH-P-008 — length ≥ 8, ≥ 1 uppercase, ≥ 1 lowercase, ≥ 2 digits, ≥ 2 of !@#$%&*. Return an object with a valid boolean. Don't touch the test. Obey the AGENTS.md constraints (TS strict, no any, const, arrow functions).

## Prompt 22

Read TESTING.md and AGENTS.md, then follow their rules.
Make the new AUTH-P-008 error-message tests pass GREEN. The failing tests are in apps/provider/src/auth/passwordPolicy.vitest.test.ts (the error messages block). Update validatePassword in apps/provider/src/auth/passwordPolicy.ts to also return errors: string[] — one message identifying each unmet rule, empty when valid. Keep the existing 6 tests passing. Don't touch the tests.

## Prompt 23

does the testing md file say anything that the map must have a walking, bike, bus, and car route navigation?

## Prompt 24

Read TESTING.md and AGENTS.md, then follow their rules.
Make AUTH-P-005 (GREEN Test 4) pass. The failing RED test is apps/provider/src/auth/canWritePin.vitest.test.ts. Create apps/provider/src/auth/canWritePin.ts exporting canWritePin, returning true only when a user is present and there's an ACTIVE membership in a verified, active org — deny every other case. Don't touch the test.

## Prompt 25

Read TESTING.md and AGENTS.md, then follow their rules.
Make AUTH-P-006 (GREEN Test 5) pass. The failing RED test is app/provider/src/auth/login.vitest.test.ts. Create app/provider/src/auth/login.ts exporting login(credentials, { findUserByEmail }) — return a session only when the email matches an existing User and bcrypt confirms the password; every other case (no user, wrong password) returns the same generic error and no session. Don't touch the test.

## Prompt 26

Read TESTING.md and AGENTS.md, then follow their rules.
Make AUTH-P-007 (GREEN Test 6) pass. The failing RED test is app/provider/src/auth/passwordReset.vitest.test.ts. Create app/provider/src/auth/passwordReset.ts exporting requestPasswordReset(email, deps) and confirmPasswordReset({ token, newPassword }, deps). Request-reset must return an identical response whether or not the email exists (no enumeration). Confirm-reset must succeed only for a valid, unexpired, unused token — hashing the new password, consuming the token, and invalidating the user's sessions — and reject used, expired, or unknown tokens without changing the password. Don't touch the test.

## Prompt 27

Read TESTING.md and AGENTS.md, then follow their rules.
Still on AUTH-P-007 (GREEN Test 6). The package was switched from bcrypt to bcryptjs. In apps/provider/src/auth/passwordReset.ts, change the import from bcrypt to bcryptjs (keep the same bcrypt local name and .hash usage). Do not change any logic.
The test file also mocks the old package and is missing a hash mock. Update apps/provider/src/auth/passwordReset.vitest.test.ts so it mocks bcryptjs (not bcrypt) and the mock provides a hash function returning a resolved hash string. This is a dependency-mock fix, not a behavior change — do not weaken or alter any assertions.

## Prompt 28

Read TESTING.md and AGENTS.md, then follow their rules.
Make POST-002 (Required title) pass GREEN. The failing RED test is apps/provider/src/resources/validateResource.vitest.test.ts. Create apps/provider/src/resources/validateResource.ts exporting validateResource(resource), returning { valid, errors } — reject when the title is missing, empty, or whitespace-only, with an error identifying the title; valid otherwise. Don't touch the test.

## Prompt 29

Read TESTING.md and AGENTS.md, then follow their rules.
Make POST-003 (Required category) pass GREEN. The failing RED test is apps/provider/src/resources/validateResourceCategory.vitest.test.ts. Update validateResource in apps/provider/src/resources/validateResource.ts to also require a category — reject when it's missing, empty, or whitespace-only, with an error identifying the category. Keep all existing tests (POST-002 and the rest) passing. Don't touch the tests.

## Prompt 30

how do I use vitest to add the pass fail md file as I am running the tests?

## Prompt 31

please add it to the provider scripts and then run npm run test:report

## Prompt 32

will it continue reporting as I continue testing?

## Prompt 33

add all remaining prompts in prompts.md file please

## Prompt 34

Read TESTING.md and AGENTS.md, then follow their rules.
Make POST-003 (Required category) pass GREEN. The failing test is apps/provider/src/resources/validateResourceCategory.vitest.test.ts. The POST-002 fixture has been corrected to include a category. Update validateResource in apps/provider/src/resources/validateResource.ts to require a category — add category?: string, reject missing/empty/whitespace with an error naming the category. Category is a plain string (typed custom category is just a normal string — no special "Custom" handling). Keep all tests passing. Don't touch the tests.

## Prompt 35

Read TESTING.md and AGENTS.md, then follow their rules.
Make POST-005 (Required location) pass GREEN. The failing test is apps/provider/src/resources/validateResourceLocation.vitest.test.ts. Update validateResource in apps/provider/src/resources/validateResource.ts to require a location — add latitude?: number and longitude?: number to the input type, and reject when either is missing, with an error identifying the location. Only check presence here, not coordinate ranges (that's POST-006). Keep all existing tests passing. Don't touch the tests.

## Prompt 36

Read TESTING.md and AGENTS.md, then follow their rules.
Make POST-005 (Required location) pass GREEN. The failing test is apps/provider/src/resources/validateResourceLocation.vitest.test.ts. Earlier valid fixtures have been corrected to include coordinates. Update validateResource in apps/provider/src/resources/validateResource.ts to require location — add latitude?: number and longitude?: number, reject when either is missing, with an error naming the location. Presence only, not ranges (that's POST-006). Keep all tests passing. Don't touch the tests.

## Prompt 37

I don't see the reporter added the remaining tests

## Prompt 38

No what I mean is that the reporter added tests up to 36 tests but I am at 40 passed now and the reporter is not updating the md file

## Prompt 39

go ahead and npm run test:report

## Prompt 40

it went from 106 lines to 48 lines, is that right? isn't it supposed to continue to log? not omit?

## Prompt 41

can you add append to the script

## Prompt 42

the reporter didn't append the remaining tests

## Prompt 43

go ahead and run test:report

## Prompt 44

Read TESTING.md and AGENTS.md, then follow their rules.
Make POST-006 (Coordinate validation) pass GREEN. The failing test is apps/provider/src/resources/validateResourceCoordinates.vitest.test.ts. Update validateResource in apps/provider/src/resources/validateResource.ts so that, when latitude and longitude are present, they must be finite numbers in range — latitude between -90 and 90 inclusive, longitude between -180 and 180 inclusive — rejecting NaN and Infinity, with an error naming latitude or longitude. Keep the POST-005 presence checks and all existing tests passing. Don't touch the tests.

## Prompt 45

Read TESTING.md and AGENTS.md, then follow their rules.
Make POST-007 (required address) pass GREEN. The failing test is apps/provider/src/resources/validateResourceAddress.vitest.test.ts. Update validateResource in apps/provider/src/resources/validateResource.ts to require an address — add address?: string, reject when missing, empty, or whitespace-only, with an error naming the address. Keep all existing tests passing. Don't touch the tests.

## Prompt 46

Read TESTING.md and AGENTS.md, then follow their rules.
Make POST-007 (geocodeAddress) pass GREEN. The failing test is apps/provider/src/resources/geocodeAddress.vitest.test.ts. Create apps/provider/src/resources/geocodeAddress.ts exporting async geocodeAddress(address, { geocode }). Call the injected geocode service: if it resolves to coordinates, return { ok: true, latitude, longitude }; if it resolves to no match, return { ok: false, error: "Invalid address" } with no coordinates; if it throws, return { ok: false } with no coordinates. Never return coordinates on failure. Don't touch the test.

## Prompt 47

Read TESTING.md and AGENTS.md, then follow their rules.
Make POST-009 (expiration date) pass GREEN. The failing test is apps/provider/src/resources/validateResourceExpiration.vitest.test.ts. Update validateResource in apps/provider/src/resources/validateResource.ts to require a valid expiresAt date: add expiresAt?: Date, reject when missing, an invalid date, in the past, or more than one year from now — with an error naming the expiration (and mentioning "year" for the over-one-year case). Keep all existing tests passing. Don't touch the tests.

## Prompt 48

is report on the resource card mentioned in the testing md if so what line?

## Prompt 49

for lines 571 - 662 in TESTING.md are these behaviors clear: paused and archive is made up by ai that is not the way it works, it is only active, expired or delete. pins that are active appear on the map for both the provider and reader app as well as their corrolating cards below the map, if the user taps on the pin they can see the resource, if they tap the resource the card modal opens and shows the details, pins that expire disappear from both the reader and provider apps as if they were deleted. delete a pin, only providers can delete a pin, with confirmation dialogue, once deleted, the pin and correlating card dissapears from the provider and reader apps.

## Prompt 50

what line is post 10 available again in the testing md file?

## Prompt 51

is availableAgainAt in the code in the testing files and their tested counter parts?

## Prompt 52

Read TESTING.md and AGENTS.md, then follow their rules.
Make POST-011 (status contract) pass GREEN. The failing test is apps/provider/src/resources/resourceStatus.vitest.test.ts. Create apps/provider/src/resources/resourceStatus.ts as the single source of truth for resource statuses: export RESOURCE_STATUSES containing exactly ACTIVE and EXPIRED, a ResourceStatus type derived from it, and isValidResourceStatus(value) returning true only for an approved status. Don't touch the test.

## Prompt 53

Read TESTING.md and AGENTS.md, then follow their rules.
Make POST-012 (phone formatting) pass GREEN. The failing test is apps/provider/src/resources/normalizePhone.vitest.test.ts. Create apps/provider/src/resources/normalizePhone.ts exporting normalizePhone(input) — accept exactly 10 digits and return { ok: true, value: "(XXX)XXX-XXXX" }; reject anything else (fewer or more than 10 digits, letters, empty) with { ok: false } and no value. Don't touch the test.

## Prompt 54

add all remaining prompts in prompts md file

## Prompt 55

Read TESTING.md and AGENTS.md, then follow their rules.
Make POST-013 (successful post) pass GREEN. The failing test is apps/provider/src/resources/createResource.vitest.test.ts. Create apps/provider/src/resources/createResource.ts exporting async createResource(resource, provider, { findActiveByTitleAndAddress, insert }). If findActiveByTitleAndAddress returns an existing ACTIVE resource, return { ok: false, error: "Duplicate resource, unable to process" } and do not insert. Otherwise insert exactly one resource stamped with providerId from the signed-in provider, and return { ok: true }. Don't touch the test.

## Prompt 56

Read TESTING.md and AGENTS.md, then follow their rules.
Make POST-014 and POST-015 pass GREEN. The failing test is apps/provider/src/resources/createResourceAudit.vitest.test.ts. Update createResource in apps/provider/src/resources/createResource.ts to accept an injected recordAuditEvent dependency and, only after a successful insert, call it with { resourceId, providerId, event: "created", timestamp } where timestamp is a Date set at creation time. Do not record an audit event on a duplicate or a failed insert. If adding this dependency makes the existing POST-013 tests fail because their deps object lacks recordAuditEvent, add recordAuditEvent: vi.fn() to those test deps — this is a mock-dependency fixture update only, do not change any assertions. Keep all tests passing.

## Prompt 57

run reporter for vitest so that I can see the updated in the md file

## Prompt 58

Read TESTING.md and AGENTS.md, then follow their rules.
Make EDIT-008 (ownership) pass GREEN. The failing test is apps/provider/src/resources/canEditResource.vitest.test.ts. Create apps/provider/src/resources/canEditResource.ts exporting canEditResource(user, membership, resource), returning true only when a user is present, the membership is ACTIVE, and the membership's organizationId matches the resource's organizationId — deny every other case. Don't touch the test.

## Prompt 59

add remaining prompts to prompts md please

## Prompt 60

Read TESTING.md and AGENTS.md, then follow their rules.
Make EDIT-002 (title can change) pass GREEN. The failing test is apps/provider/src/resources/updateResourceRename.vitest.test.ts. Create apps/provider/src/resources/updateResource.ts exporting async updateResource(resourceId, changes, deps). When the title changes, use the injected findActiveByTitleAndAddress dependency to check for an ACTIVE duplicate. Reject a match with a different resource ID using the exact error "Duplicate resource — edit, report, or use Custom", without updating or recording an audit event. A match with the same ID is the resource being edited and must be allowed. Keep all existing tests passing. Don't touch the test.

## Prompt 61

Read TESTING.md and AGENTS.md, then follow their rules.
Make EDIT-007 (expiration date validation) pass GREEN. The failing test is apps/provider/src/resources/updateResourceExpiration.vitest.test.ts. Update updateResource in apps/provider/src/resources/updateResource.ts so that when expiresAt is included in the changes, it must be a present, valid future Date. Reject a missing, invalid, or past expiration with an error identifying the expiration, and do not update or record an audit event. Allow a valid future expiration. Keep all existing tests passing. Don't touch the test.

## Prompt 62

Read TESTING.md and AGENTS.md, then follow their rules.
Make EDIT-009 (save updates existing record) pass GREEN. The failing test is apps/provider/src/resources/updateResource.vitest.test.ts. Update updateResource in apps/provider/src/resources/updateResource.ts to call the injected update dependency exactly once with the existing resource ID and all supplied changes, return { ok: true } on success, and never call insert. It must support updating multiple fields in one call. Keep the duplicate and expiration validation behavior and all existing tests passing. Don't touch the test.

## Prompt 63

Read TESTING.md and AGENTS.md, then follow their rules.
Make EDIT-010 (audit event) pass GREEN. The failing test is apps/provider/src/resources/updateResourceAudit.vitest.test.ts. Update updateResource in apps/provider/src/resources/updateResource.ts so that after a successful update it calls the injected recordAuditEvent dependency exactly once with an object containing resourceId, event: "updated", and a Date timestamp. If the update throws or validation rejects the edit, do not record an audit event. Keep all existing tests passing. Don't touch the test.

## Prompt 64

Read TESTING.md and AGENTS.md, then follow their rules.
Make LIFE-001, LIFE-002, and LIFE-007 pass GREEN. The failing test is apps/provider/src/resources/isResourceVisible.vitest.test.ts. Create apps/provider/src/resources/isResourceVisible.ts exporting isResourceVisible(resource, now). Return true only when the resource status is ACTIVE and expiresAt is strictly later than now. Return false for EXPIRED resources and for resources whose expiration is before or exactly equal to now. Don't touch the test.

## Prompt 65

Read TESTING.md and AGENTS.md, then follow their rules.
Make RMAP-004 (Reader-visible resource rules) pass GREEN. The failing test is apps/provider/src/resources/getReaderVisibleResources.vitest.test.ts. Create apps/provider/src/resources/getReaderVisibleResources.ts exporting getReaderVisibleResources(resources, now). Return only ACTIVE resources whose expiresAt is strictly in the future, preserving their input order. Exclude expired dates and EXPIRED statuses, and return an empty array when the input is empty or nothing is visible. Reuse isResourceVisible if appropriate. Don't touch the test.

## Prompt 66

Read TESTING.md and AGENTS.md, then follow their rules.
Make the RMAP ZIP-search address parsing tests pass GREEN. The failing test is apps/provider/src/resources/extractZip.vitest.test.ts. Create apps/provider/src/resources/extractZip.ts exporting extractZip(address). Return the five-digit ZIP from a valid address, including when it appears before an optional ZIP+4 suffix, and return null when the address is empty or has no extractable five-digit ZIP. Don't touch the test.

## Prompt 67

Read TESTING.md and AGENTS.md, then follow their rules.
Make the RMAP ZIP filtering tests pass GREEN. The failing test is apps/provider/src/resources/filterResourcesByZip.vitest.test.ts. Create apps/provider/src/resources/filterResourcesByZip.ts exporting filterResourcesByZip(resources, zip). Return only resources whose address contains the searched five-digit ZIP, including ZIP+4 addresses, while preserving input order. Exclude resources without an extractable ZIP and return an empty array for no matches or an empty resource list. Reuse extractZip. Don't touch the test.

## Prompt 68

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make SAVE-002 (no duplicate save) pass GREEN. The failing test is apps/reader/src/resources/saveResource.vitest.test.ts. Create apps/reader/src/resources/saveResource.ts exporting saveResource(savedList, resource) — return a new list with the resource added, but if a resource with the same id is already in the list, return the list unchanged (no duplicate). Don't touch the test.

## Prompt 69

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make SAVE-005 (user isolation) pass GREEN. The failing test is apps/reader/src/resources/getSavedResourcesForUser.vitest.test.ts. Create apps/reader/src/resources/getSavedResourcesForUser.ts exporting getSavedResourcesForUser(allSaved, userId) — return only the saved records whose userId matches the given userId, and an empty list when the user has none. Don't touch the test.

## Prompt 70

Read the root AGENTS.md and TESTING.md, then follow their rules.
Fix SAVE-003 (snapshot independence). The failing test is apps/reader/src/resources/saveResourceSnapshot.vitest.test.ts — "keeps the saved snapshot unchanged when the live resource is later edited." The bug: saveResource in apps/reader/src/resources/saveResource.ts stores the resource by reference, so later edits to the live object mutate the saved copy. Fix saveResource to store an independent copy (snapshot) of the resource so the saved record does not change when the live resource is later edited. Keep all other tests passing. Don't touch the tests.

## Prompt 71

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make SAVE-008 (live resource unaffected) pass GREEN. The failing test is apps/reader/src/resources/removeSavedResource.vitest.test.ts. Create apps/reader/src/resources/removeSavedResource.ts exporting removeSavedResource(savedList, id) — return a new list with the entry matching that id removed, leaving other entries intact, returning the list unchanged when the id isn't present, and never mutating the original list. Don't touch the test.

## Prompt 72

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make REM-002 (custom reminder validation) pass GREEN. The failing test is apps/reader/src/reminders/validateReminder.vitest.test.ts. Create apps/reader/src/reminders/validateReminder.ts exporting validateReminder(date, time, now) — reject a missing date, a missing time, a date/time that is not a real moment (including calendar rollovers like Feb 30), and any date/time at or before now; accept only a valid date and time strictly in the future. Return { ok, error }. Don't touch the test.

## Prompt 73

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make REM-004 (notification schedule) pass GREEN. The failing test is apps/reader/src/reminders/scheduleReminder.vitest.test.ts. Create apps/reader/src/reminders/scheduleReminder.ts exporting async scheduleReminder(date, time, now, { scheduleNotification }). First validate using the existing validateReminder; if invalid, do not call scheduleNotification and return { ok: false, error }. If valid, call scheduleNotification exactly once for that date/time and return { ok: true, message } where message confirms the reminder was scheduled. Reuse validateReminder, do not reimplement the validation. Don't touch the test.

## Prompt 74

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make ALERT-R-001 temperature thresholds pass GREEN. The failing test is apps/reader/src/alerts/temperatureAlert.vitest.test.ts. Create apps/reader/src/alerts/temperatureAlert.ts exporting temperatureAlert(fahrenheit) — return { alert: true, type: "HEAT" } when the temperature is 91°F or above, { alert: true, type: "COLD" } when it is 32°F or below, and { alert: false } otherwise. Don't touch the test.

## Prompt 75

Make ALERT-R-001 NWS warnings pass GREEN. The failing test is apps/reader/src/alerts/nwsAlerts.vitest.test.ts. Create apps/reader/src/alerts/nwsAlerts.ts exporting nwsAlerts(features) — from an array of NWS features (each with properties.event), return only the alerts whose event is a named disaster Warning: Tornado Warning, Hurricane Warning, Flood Warning, Flash Flood Warning, Winter Storm Warning, Blizzard Warning, or Severe Thunderstorm Warning. Filter out Watches and any event not on that list. Each returned alert should carry its event. Don't touch the test.

## Prompt 76

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make ALERT-R-001 combine + graceful failure pass GREEN. The failing test is apps/reader/src/alerts/getAlertsForLocation.vitest.test.ts. Create apps/reader/src/alerts/getAlertsForLocation.ts exporting async getAlertsForLocation(location, { fetchWeather, fetchNws }). Call both fetchWeather(location) and fetchNws(location). From the weather result, use the existing temperatureAlert on temperature_2m and include it when it flags an alert. From the NWS result, use the existing nwsAlerts to get named warnings. Combine both into result.alerts. If a source throws, catch it, skip that source's alerts, and add its name ("weather" or "nws") to result.failures — the other source's alerts must still be returned. Return { alerts, failures }. Reuse temperatureAlert and nwsAlerts; do not reimplement them. Don't touch the test.

## Prompt 77

run the command to append the reporter vitest in PASS-FAIL.md file please

## Prompt 78

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make ALERT-R-001 Weather Alerts toggle pass GREEN. The failing test is apps/reader/src/alerts/getAlertsWithSetting.vitest.test.ts. Create apps/reader/src/alerts/getAlertsWithSetting.ts exporting async getAlertsWithSetting(location, weatherAlertsOn, deps). When weatherAlertsOn is false, return { alerts: [] } without calling either API. When true, delegate to the existing getAlertsForLocation(location, deps) and return its result. Reuse getAlertsForLocation; do not reimplement the fetching or combining. Don't touch the test.

## Prompt 79

add remaining prompts to prompts md file please

## Prompt 80

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make ALERT-R-001 forecast thresholds pass GREEN. The failing test is apps/reader/src/alerts/forecastTemperatureAlert.vitest.test.ts. Create apps/reader/src/alerts/forecastTemperatureAlert.ts exporting forecastTemperatureAlert(hourly) where hourly has parallel time and temperature_2m arrays. Scan the hours in order and return the first hour that reaches a threshold: { alert: true, type: "HEAT", expectedAt } when a temperature is 91°F or above, { alert: true, type: "COLD", expectedAt } when 32°F or below, where expectedAt is that hour's time. Return { alert: false } when no hour crosses a threshold or the forecast is empty. Don't touch the test.

## Prompt 81

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make ALERT-R-001 getAlertsForLocation pass GREEN after the temperature rewire. The failing test is apps/reader/src/alerts/getAlertsForLocation.vitest.test.ts. Update apps/reader/src/alerts/getAlertsForLocation.ts to use forecastTemperatureAlert instead of the removed temperatureAlert. fetchWeather(location) now returns hourly forecast data ({ time, temperature_2m } arrays); pass that to forecastTemperatureAlert, and when it flags an alert, include it (with its type and expectedAt) in result.alerts. Keep the NWS handling via nwsAlerts and the graceful per-source failure (catch a failing source, skip its alerts, add "weather" or "nws" to result.failures). Remove any remaining reference to the deleted temperatureAlert. Don't touch the test.

## Prompt 82

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make ALERT-R-002 (common alert fields) pass GREEN. The failing test is apps/reader/src/alerts/normalizeAlert.vitest.test.ts. Create apps/reader/src/alerts/normalizeAlert.ts exporting normalizeAlert(alert, zip) that returns a common shape with fields title, message, location, time, severity, advice. For a temperature alert (has type HEAT/COLD and expectedAt): title is "Extreme Heat"/"Extreme Cold", message is "Extreme heat expected at [expectedAt]" / "Extreme cold expected at [expectedAt]", location is zip, time is expectedAt, advice is "keep cool"/"bundle up", severity is null. For an NWS alert (has event, headline, expires, severity): title is event, message is headline, location is zip, time is expires, severity is the NWS severity, advice is null. Don't touch the test.

## Prompt 83

Read the root AGENTS.md and TESTING.md, then follow their rules.Make ALERT-R-002 normalized-alerts wiring pass GREEN. The failing test is apps/reader/src/alerts/getAlertsForLocation.vitest.test.ts. Update apps/reader/src/alerts/getAlertsForLocation.ts to take (location, zip, deps) and run every alert (forecast temperature alerts and NWS alerts) through the existing normalizeAlert(alert, zip) so result.alerts contains normalized alerts with the common shape. Preserve the graceful per-source failure behavior and the failures array. Then update apps/reader/src/alerts/getAlertsWithSetting.ts so it accepts and passes zip through to getAlertsForLocation. If the getAlertsWithSetting test fails because its call signature changed, update that test's calls to pass a zip — mock/call-signature update only, do not change its assertions. Reuse normalizeAlert; don't reimplement it. Don't touch assertions.

## Prompt 84

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make REPORT-001 (structured reasons) pass GREEN. The failing test is apps/reader/src/reports/reportReason.vitest.test.ts. Create apps/reader/src/reports/reportReason.ts as the single source of truth for reader report reasons: export REPORT_REASONS containing exactly "Closed / no longer operating", "Wrong hours", "Wrong address / location", and "No more resources available", a ReportReason type derived from it, and isValidReportReason(value) returning true only for an approved reason. Don't touch the test.

## Prompt 85

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make REPORT-002 (no direct edits) pass GREEN. The failing test is apps/reader/src/reports/createReport.vitest.test.ts. Create apps/reader/src/reports/createReport.ts exporting createReport({ resourceId, address, reason }) — when a reason is present, return { ok: true, report: { resourceId, address, reason } }; when the reason is missing or empty, return { ok: false, error: "must select a reason to send report" } with no report. The function must only take and return report data — it has no access to and never touches the live resource. Don't touch the test.

## Prompt 86

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make REPORT-003 (confirmation) pass GREEN. The failing test is apps/reader/src/reports/submitReport.vitest.test.ts. Create apps/reader/src/reports/submitReport.ts exporting async submitReport(report, { submit }). Require all fields complete — resourceId, address, and reason. If the reason is missing, return { ok: false, error: "must select a reason to send report" } without calling submit. If resourceId or address is missing, return { ok: false, error } without calling submit. When the report is complete, call submit once and return { ok: true, message: "report submitted" }. Don't touch the test.

## Prompt 87

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make REPORT-001 pass GREEN with the added fifth reason. The failing test is apps/reader/src/reports/reportReason.vitest.test.ts. Update apps/reader/src/reports/reportReason.ts to add "Phone disconnected / no longer working" to REPORT_REASONS, so the approved set is exactly those five reasons. Keep isValidReportReason accepting only approved reasons. Don't touch the test.

## Prompt 88

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make AI-002/003/004/008 pass GREEN. The failing test is apps/provider/src/reports/validateAiResult.vitest.test.ts. Create apps/provider/src/reports/validateAiResult.ts exporting validateAiResult(result). Reject (ok: false) when findings are empty, or the confidence label is missing or not one of high/medium/low. Otherwise ok: true. Strip any source lacking a traceable url, and cap sources at 3. Set uncertain: true when confidence is "low" or there are no valid sources, otherwise uncertain: false. Return { ok, uncertain, sources }. Don't touch the test.

## Prompt 89

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make REPORT-006 flow pass GREEN. The failing test is apps/provider/src/reports/verifyReaderReport.vitest.test.ts. Create apps/provider/src/reports/verifyReaderReport.ts exporting async verifyReaderReport(report, { callOpenAI, createProviderAlert }). Call callOpenAI(report) to get the AI result. Validate it with the existing validateAiResult. If the result is not ok (e.g. no findings), do not create an alert. Otherwise call createProviderAlert once with an alert containing: report (the full reader report), resourceId and address (from the report), findings, confidence, sources (from the validated result), and uncertain (from validateAiResult). Reuse validateAiResult; do not reimplement it. Don't touch the test.

## Prompt 90

Open src/reports/verifyReaderReport.ts (the implementation, not the test).
Temporarily add, inside the function: deps.deleteResource?.();

## Prompt 91

Open src/reports/verifyReaderReport.ts
Delete the temporary deps.deleteResource?.(); line you added

## Prompt 92

In src/resources/getReaderVisibleResources.ts, temporarily add an owner filter so it only returns one org's resources. For example, if the function currently filters like resources.filter(r => isResourceVisible(r, now)), change it temporarily to:
resources.filter(r => isResourceVisible(r, now) && r.organizationId === "org_A"

## Prompt 93

revert — remove the && r.organizationId === "org_A" so it's back to owner-blind:
resources.filter(r => isResourceVisible(r, now))

## Prompt 94

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make Flow 2 (provider report to Narley admin) pass GREEN. The failing test is apps/provider/src/reports/submitProviderReport.vitest.test.ts. Create apps/provider/src/reports/submitProviderReport.ts exporting async submitProviderReport(report, { sendToNarleyAdmin }). Require all fields present: address, providerName, providerEmail, providerPhone, and details — if any is missing/empty, return { ok: false, error } without sending. Reject details longer than 500 words with an error message mentioning "500 words", without sending. When everything is valid, call sendToNarleyAdmin once with the report and return { ok: true }. Don't touch the test.

## Prompt 95

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make ALERT-P-006 (alert count) pass GREEN. The failing test is apps/provider/src/reports/activeAlertCount.vitest.test.ts. Create apps/provider/src/reports/activeAlertCount.ts exporting activeAlertCount(alerts, weatherAlertsOn) — count every alert with kind: "report" always, and count alerts with kind: "weather" only when weatherAlertsOn is true. Return the total. Don't touch the test.

## Prompt 96

Read the root AGENTS.md and TESTING.md, then follow their rules.Make SEC-001 (ownership guard on update) pass GREEN. The failing test is apps/provider/src/resources/updateResourceOwnership.vitest.test.ts. Update apps/provider/src/resources/updateResource.ts so its dependencies also accept resource (with organizationId) and membership. Before any update, call the existing canEditResource(membership && { id: "editor" }, membership, resource) — or however canEditResource is signed — to check the editor is an active member of the resource's owning organization. If not authorized, return { ok: false, error } with an authorization message, without calling update and without recording an audit event. If authorized, proceed with the existing expiration/duplicate checks and update. Reuse canEditResource; do not reimplement the ownership logic. If existing updateResource tests fail because their deps lack resource/membership, add an authorized membership and matching resource to those test deps so they still represent an authorized edit — deps/fixture update only, do not change their assertions. Don't touch assertions.

## Prompt 97

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make SEC-002 (verified-provider guard on create) pass GREEN. The failing test is apps/provider/src/resources/createResourceVerified.vitest.test.ts. Update apps/provider/src/resources/createResource.ts so its dependencies also accept membership. Before checking duplicates or inserting, call the existing canWritePin(provider, membership) — using the provider as the user. If it returns false, return { ok: false, error } with a verified/authorization message, without calling insert and without recording an audit event. If it returns true, proceed with the existing duplicate check, insert, and audit. Reuse canWritePin; do not reimplement the verification logic. If existing createResource tests fail because their deps lack membership, add a verified active membership ({ status: "ACTIVE", org: { status: "VERIFIED", active: true } }) to those test deps so they represent an authorized create — deps/fixture update only, do not change their assertions. Don't touch assertions.

## Prompt 98

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make SEC-004 (validate input before write) pass GREEN. The failing test is apps/provider/src/resources/createResourceValidation.vitest.test.ts. Update apps/provider/src/resources/createResource.ts so that, after the verified-provider check and before the duplicate check and insert, it calls the existing validateResource(resource). If the result's valid is false, return { ok: false, error } using the validation errors (e.g. the joined errors or the first error), without calling insert and without recording an audit event. If valid, proceed as now. Reuse validateResource; do not reimplement validation. Keep all existing tests passing — if any existing createResource test uses a resource missing required fields (title, category, address, latitude, longitude, expiresAt), update that test's fixture to a complete valid resource — fixture update only, do not change assertions. Don't touch assertions.

## Prompt 99

is .env being tracked or is node_modules being tracked?

## Prompt 100

.env should be tracked please run commands to untrack .env

## Prompt 101

check the .gitignore and learn why .env is being tracked and fix, I don't want my .env in git logs

## Prompt 102

(base) jacquelinedelgado@Jacquelines-MacBook-Pro Narley % git rm
 --cached -- .env
rm '.env'
(base) jacquelinedelgado@Ja

## Prompt 103

I rotated the key, is .env being tracked

## Prompt 104

run command to append test results for vitest reporter

## Prompt 105

add remaining prompts in prompts md file please

## Prompt 106

why did I get this for the reader app?

```text
(base) jacquelinedelgado@Jacquelines-MacBook-Pro reader % react-native-maps
zsh: command not found: react-native-maps
```

## Prompt 107

```text
(base) jacquelinedelgado@Jacquelines-MacBook-Pro reader % npx expo install react-native-
  maps
› Installing 1 other package using npm
> npm install --save react-native-
npm error code E404
npm error 404 Not Found - GET https://registry.npmjs.org/react-native- - Not found
zsh: command not found: maps
```

## Prompt 108

do I use the same for the provider app?

## Prompt 109

Read the theme token files in /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Hayn Mobile/packages/shared-ui/theme/ (colors.ts, theme.ts, spacing.ts, typography.ts, shadows.ts). Port them into the Narley v3 repo under packages/shared-ui/theme/, creating the packages/shared-ui structure if it doesn't exist. Keep the token values exactly as they are in v2. Report what you created.

## Prompt 110

Verify the Narley v3 monorepo workspace is set up so apps/reader and apps/provider can import from packages/shared-ui. Check the root package.json for a workspaces field including packages/*, and confirm TypeScript/Metro can resolve an import like import { getTheme } from "@shared-ui/theme/theme" (or the correct path) from within apps/reader. If the workspace or path aliases aren't set up, set them up. Then add a tiny test import in apps/reader to confirm it resolves, and report whether it works.

## Prompt 111

In the Narley v3 provider app (apps/provider), report the current screen/navigation structure — is there an Expo Router app/ folder with screens, or is it the default Expo starter? Then, referencing the v2 provider app at /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Hayn Mobile/apps/provider for the intended structure and the design-theme-layout doc for the visual direction, report what navigation/tab shell v3's provider app needs (e.g. bottom tabs for Map, Post, Alerts, Profile). Don't build screens yet — just report the current state and the proposed navigation structure so we can confirm the plan.

## Prompt 112

run the reporter vitest for the reader app, the 71 tests are not in the md file

## Prompt 113

In the Narley v3 provider app (apps/provider), build the navigation tab shell only — no feature screens yet, just a navigable skeleton I can run and tap through.

Structure (Expo Router, under src/app/):

```text
src/app/
├── _layout.tsx
└── (tabs)/
    ├── _layout.tsx
    ├── map.tsx
    ├── post.tsx
    ├── my-posts.tsx
    ├── alerts.tsx
    └── profile.tsx
```

Five bottom tabs: Map, Post, My Posts, Alerts, Profile. Initial tab = Map. Each tab screen for now is just a themed placeholder showing its name. Use the shared theme tokens from @shared-ui/theme/theme (getTheme). Provider visual direction per the design doc: dark operational background, white/inverse text, teal for the selected tab, gray for inactive tabs, shared spacing/typography/radius tokens. No hardcoded colors. Temporarily bypass auth. Reference the v2 provider app for tab styling/layout, but match v3's shared theme. Do not modify files under src/resources, src/reports, src/alerts, or src/auth. Report the files created and confirm the app builds.

## Prompt 114

expo start doesn't work npm start doesn't work if I enter npx expo start the terminal stops with Cannot find module 'expo-router/_ctx-shared' from the cached ~/.npm/_npx Expo CLI.

## Prompt 115

how do I open expo go?

## Prompt 116

how do I install expo go?

## Prompt 117

In apps/provider, the app.json references image paths under ./assets/images/ but that folder doesn't exist — the only assets are at the repo root assets/ folder (narley-icon-1024.png, narley-logo.png, and several SVGs). Fix the provider app.json so it only references image files that actually exist. Create apps/provider/assets/ and copy narley-icon-1024.png and narley-logo.png into it from the root assets folder. Then update app.json: set the main icon to the narley icon PNG, set the splash-screen image to a real PNG, remove the broken ios.icon override and the android adaptiveIcon references to files that don't exist (or replace with the narley icon). Only reference PNG files that exist. Report the changes and confirm the app bundles.

## Prompt 118

if there is node_modules in reader app does that path have to show in the .gitignore?

## Prompt 119

I believe node_modules is being tracked, can you add the path to .gitignore and stop the tracking

## Prompt 120

same thing with provider app

## Prompt 121

how do I cd into my root folder

## Prompt 122

no I want to cd in the root folder

## Prompt 123

can you do this please: Codex does this with Expo's official tooling, per the search — there's an expo-upgrade skill and the npx expo install --fix command that aligns all versions correctly).

## Prompt 124

In apps/provider/app.json, the plugins array contains entries that are not valid config plugins in Expo SDK 54, causing PluginError. Keep "expo-router" and the "expo-splash-screen" entry (with its config) intact. Remove "expo-status-bar", "expo-image", and "expo-web-browser" from the plugins array, since these are runtime packages, not config plugins in SDK 54. For "expo-font", check whether it's a valid config plugin in SDK 54 — if it causes the same error, remove it too; otherwise keep it. The goal is for npx expo start to launch without a PluginError. Report the final plugins array.

## Prompt 125

Edit /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/package.json to add:

```json
{
  "name": "narley-v3",
  "private": true,
  "workspaces": ["apps/*", "packages/*"],
  "overrides": {
    "react-native": "0.81.5",
    "react": "19.1.0",
    "react-dom": "19.1.0"
  },
  "scripts": { "...": "keep existing" },
  "jest": { "...": "keep existing" },
  "dependencies": { "vitest": "^4.1.10" }
}
```

Fix the reader app — it still has Expo 57 installed despite saying 54. In the reader run npx expo install expo@~54.0.0 --fix.

## Prompt 126

Then force its react-native down like we did the provider:

```bash
npm install react@19.1.0 react-native@0.81.5 react-dom@19.1.0 --save-exact
```

Clean reinstall from root so overrides take effect everywhere:

```bash
cd "/Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley"
rm -rf node_modules apps/provider/node_modules apps/reader/node_modules
npm install
```

## Prompt 127

In the Narley v3 provider app (apps/provider), replace the expo-router navigation with the same react-navigation + App.tsx architecture that v2 uses, because v2 runs correctly in Expo Go and v3's expo-router setup does not.

First, study v2's working structure at /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Hayn Mobile/apps/provider/ — specifically index.js, App.tsx, the screens/ folder, package.json (note main), and metro.config.js. Understand how v2 sets up registerRootComponent, NavigationContainer, and createBottomTabNavigator with the five tabs (Map, Post, My Posts, Alerts, Profile).

Then convert v3's provider to match: remove the expo-router setup and src/app; change main to index.js; create index.js, App.tsx, and five themed placeholder screens; use React Navigation and the v3 shared theme; keep auth bypassed; install required navigation packages; remove EXPO_ROUTER_APP_ROOT while keeping OPENAI_API_KEY; and do not modify resources, reports, alerts, auth, or shared theme files. Report all changes and packages.

## Prompt 128

add remaining prompts in prompts md file please

## Prompt 129

In the Narley v3 provider app (apps/provider), the app crashes at runtime with a React Native New Architecture (Fabric) render error: "Exception in HostFunction: TypeError: expected dynamic type 'boolean', but had type 'string'". It occurs when the ProviderTabs / Tab.Navigator renders (App.tsx), on the initial Map screen. Search App.tsx, all files in screens/, and the shared theme files for a string value being passed where a native boolean is expected. Identify the exact file, line, and value, explain why it triggers the Fabric error, and propose the minimal fix before applying it. Do not modify src/resources, src/reports, src/alerts, or src/auth.

## Prompt 130

In the Narley v3 provider app (apps/provider), add a themed header bar with the Narley logo to the bottom-tab navigator in App.tsx. Enable a shared header across the tabs, show ./assets/narley-logo.png at a small size, and use the shared theme's primary background and inverse text/tint. Keep the right side empty, do not change the tabs or screens, and do not modify src/resources, src/reports, src/alerts, or src/auth. Report the changes.

## Prompt 131

In the Narley v3 provider app (apps/provider), rebuild the AppHeader component to match the Narley v2 header exactly: a deep-green rounded horizontal container, a darker rounded square with a white Ionicons home icon, and a text column containing "NARLEY" and "Community resource navigation". Use only shared theme tokens, reference design-theme-layout.md, leave the top-right empty, and do not modify src/resources, src/reports, src/alerts, or src/auth. Report the changes.

## Prompt 132

codex the app header tsx file is filled with red editor errors

## Prompt 133

where is the width and height for the logo on the map screen?

## Prompt 134

I need some thing more exact than lg, because I need to move it and see it move on the app. can you change it to numbers I need to adjust the width and heigh visually and manually

## Prompt 135

how do I refresh the expo in the terminal do I have to start all over?

## Prompt 136

the header height , width and size was changed but it didn't make a difference what am I doing wrong, does this have to be in global css instead?

## Prompt 137

no this is I asked you to do is to change it to numerical

## Prompt 138

no codex revert I didnt ask you to change or add variables I asked for the container to be numerical

## Prompt 139

In the Narley v3 provider app (apps/provider), replace the Map screen placeholder with a real map. Build screens/MapScreen.tsx to render a react-native-maps map (react-native-maps@1.20.1 is installed; on iOS it uses Apple Maps, no API key needed). Render a full-screen MapView below the header, centered initially on New London, CT at approximately 41.3557, -72.0995 with deltas around 0.05. Add two or three hardcoded sample resource Marker pins. Use the shared theme where applicable, reference design-theme-layout.md and the v2 map layout, and do not modify src/resources, src/reports, src/alerts, or src/auth. Report the changes.

## Prompt 140

where is the map width and height?

## Prompt 141

In the Narley v3 provider app (apps/provider), add a search row to the Map screen between the header and map, matching the v2 layout and design-theme-layout.md. Include a themed "City or ZIP code" input and blue Search button. For a five-digit ZIP, filter the sample pins using the existing filterResourcesByZip from src/resources; accept non-ZIP city searches for now with a TODO for geocoding. Keep the sample resources, use shared theme tokens, do not modify protected src logic, report the changes, and run npm run test:unit to confirm 164 tests pass.

## Prompt 142

where are the the fields I need the width of that row to be 400

## Prompt 143

okay the height of the search button must be the same height as the search field

## Prompt 144

if I extend the width of the search row it moves to the right I need the search field and search button to equal the width of 400 on the screen. to match the logo

## Prompt 145

all the border radius must match the border radius of the logo, can you please change that

## Prompt 146

The v3 provider app's layout doesn't match v2 — the border radius, height, and width of the header, search field, search button, and map are wrong because they were approximated from a description instead of copied from v2's real code. Read the actual v2 component code under Hayn Mobile, first report which v2 files render each element, then reproduce v2's exact StyleSheet values in v3 for radii, dimensions, padding, margins, flex layout, typography, and colors mapped to v3 theme tokens. Do not modify protected src logic. Report each exact value and run npm run test:unit to confirm 164 tests pass.

## Prompt 147

the only problem is that search field with search button is not matching the width as the map and the logo looks like its wider than the map

## Prompt 148

I want to nudge all of them a little wider, where do I do that?

## Prompt 149

okay so I chaged the width of the logo but it doesn't budge, in logo in app header, so where do you have the logo width? because it needs to match the map

## Prompt 150

the map and the search row move together but the logo doesn't move with it.

## Prompt 151

are you sure that the border radius is for the search row is the same as version 2 because it looks different

## Prompt 152

make the search row match like version 2 version 2 layout looks way better

## Prompt 153

so here is the caveat screen is not at 100% and I like the width, the logo, is at 100% and padding horizaontal 8 and doesn't match the map

## Prompt 154

why aren't package json and config being committed when I try to commit?

## Prompt 155

I tried to add them and commit them but it isn't working can you do it for me

## Prompt 156

commit the prompts.md too please

## Prompt 157

if you read the docs/design-theme-layout.md can you see how the cards associated to the pins should be designed?

## Prompt 158

add all remaining prompts in prompts.md please

## Prompt 159

we are working on the ui of the provider app, the theme, height and width, color balance, frame, tabs, labels, modal cards, font, style are in the design-theme-layout.md to help guide you as you build each screen, we are making sure that design, cards, chips, screens font, tiles have the same dimensions and are places in their appropriate place, go ahead and read the file and begin building each screen in the provider app. if the map and the logo, search row doesn't match, fix it to the dimensions stated in the design-theme-layout.md if it is stated there, if it isn't stated don't invent and leave the map, search row, and logo the way it is. we are only working on the provider app. the provider app. I will also need a hamburger on the upper right hand corner of the map screen which will have profile. remove the profile icon from the bottom nav and move it to the hamburger, all five icons on the bottom nav are too crammed. the alert screen is supposed to have cards that look like the map screen cards, and the modal cards on the alert screen are suppose to open and hover over the alert card on the alert screen with the same width, height and scroll as the modal cards shown on the map screen for the alert screen, we need all the cards to be uniform on all the screens, so that the style is not changing screen to screen, the alert screen modal cards will have different data, so don't invent chips, just create the style, layout, fonts, color balance for the alert cards, and we will continue as we test, the alert cards will need a font though because ai will need to report in the alert cards

## Prompt 160

what do I run to run expo?

## Prompt 161

the height of the logo should be all the same on every screen

## Prompt 162

no the height of the logo on the other screens do not match the map screen and the change you made is causing a flash

## Prompt 163

no you changed the the logo in the map screen, that is not what I was asking, I want the other screens to have the same width and height as the logo in the map screen, but you changed the logo height and in the map screen

## Prompt 164

no you moved the logo on the map screen up and I can see the logo, you did the same thing with all the screens

## Prompt 165

on the map screen you have your map listings row with a number make the row in the alerts screen match the font size and have a count for alerts just like the row on the map screen

## Prompt 166

on the alerts screen, remove the top row where it says Alerts. I only need your alerts

## Prompt 167

no you removed the sentence that was under alerts, I need that sentence

## Prompt 168

now add the screens, cards, map, chips, labels, fonts, logo, layout, color balance, and theme-balance for the reader app and use the design-theme-layout.md as your guid for the reader app

## Prompt 169

on the provider app on the map screen after you tap on the card, a modal card opens, that modal card is supposed to have a report button

## Prompt 170

the same thing for the reader app, on the map screen, when you tap on the card, the modal card that opens is supposed to have a report button

## Prompt 171

are the widths on the screens for the provider app one number one class or container? meaning are the width for the logo and the map and cards for all the screens pointing to one number?

## Prompt 172

the cards on the My Posts screen should have the same width as the logo on the provider app

## Prompt 173

on the Post screen the width of the fields and rows should match the width of the logo, they look narrower than the logo width so the screen is not uniform

## Prompt 174

make sure the screens are uniform by width as well on the reader app to match the logo width please

## Prompt 175

add all remaining prompts in prompts.md please

## Prompt 176

can you tell me the the 2 weather api's used in these apps?

## Prompt 177

In provider app (apps/provider), wire the Post/Create Resource form to the app's existing tested logic. Import logic from src/resources; do NOT modify any files in src/resources, src/reports, src/alerts, src/auth.
Form field fixes:

Rename the "Geocode" button to "Pin Address".
Add a "+ Custom" chip to the category picker that reveals a text input for a custom category; the entered custom value becomes the category string.
Add an optional "Phone" field. When provided, normalize it for display using the existing normalizePhone from src/resources.
Add an optional "Website" field — a plain optional string, no validation.

Wire "Pin Address" button to the existing geocodeAddress(address, { geocode }) from src/resources/geocodeAddress.ts:

Use expo-location's Location.geocodeAsync(address) as the geocode dependency (request location permission if needed; geocodeAsync returns an array — map the first result to { latitude, longitude }, or null if empty).
On success ({ ok: true, latitude, longitude }): store the coordinates in form state and drop/update a preview pin on the map at those coordinates.
On failure ({ ok: false }): show the error ("Invalid address") to the user.

Wire "Submit Resource" button to the existing createResource(resource, provider, deps) from src/resources/createResource.ts:

Build the resource object from the form: title, category, address, latitude, longitude (from Pin Address), expiresAt (from the expiration field, as a Date), plus optional phone and website.
provider: a temporary stub { id: "provider_dev" } (auth is bypassed for now).
deps.membership: a temporary stub verified membership { status: "ACTIVE", org: { status: "VERIFIED", active: true } }.
deps.findActiveByTitleAndAddress: a temporary stub returning null (no dupe check yet).
deps.insert: a TEMPORARY local insert that adds the new resource to the app's in-memory resource list (the same list that drives the map pins and Nearby Resources cards) and returns { id } — so the new pin appears on the map immediately. This is a placeholder for a real backend insert later.
deps.recordAuditEvent: a temporary stub returning resolved.
createResource already runs canWritePin → validateResource → dupe check → insert → audit internally. So Submit just calls createResource and handles the result: on { ok: true }, show success and add the pin; on { ok: false }, show the error string to the user.

Coding constraints (must follow):

No any, no var. Use arrow/closure-based functions.
Every input has an accessible label associated via accessibilityLabel or a stable id.
Render all user-entered strings only as plain React Native <Text> children — do not bypass RN's default text escaping.
Minimal code, but do not sacrifice quality or readability.
Use shared theme tokens (@shared-ui/theme/theme), no hardcoded colors.

After wiring, run npm run test:unit and confirm all 164 tests still pass. Report all changes.

## Prompt 178

In apps/provider/screens/PostResourceScreen.tsx, improve the expiration date input with an auto-formatting mask and fix the date parsing.
Input mask behavior (as the user types):

Accept only digit characters; ignore/strip any non-digits from input.
Auto-insert "/" separators: after 2 digits (MM/), and after 4 digits (MM/DD/), producing the display format MM/DD/YYYY.
Limit to 8 digits maximum (so the field can only ever hold a complete MM/DD/YYYY like "07/14/2026").
Backspace/delete should work naturally (removing digits, with slashes recomputed).
Set the TextInput keyboardType to "number-pad" or "numeric" so users get a numeric keypad.
Update the placeholder/label to show the format, e.g. "MM/DD/YYYY".
Implement the mask as a controlled onChangeText handler: strip non-digits, cap at 8 digits, then re-insert the "/" at positions 2 and 4 for display.

Date parsing on submit:

From the masked value, extract the 8 digits and parse month (first 2), day (next 2), year (last 4).
Construct new Date(Number(year), Number(month) - 1, Number(day), 23, 59, 59).
If fewer than 8 digits or the resulting Date is NaN, let the existing validateResource validation handle it (show the error) — don't crash.
Pass this valid Date as expiresAt to createResource (replace the current new Date(\${expiresAt}T23:59:59`)` on line 142, used at lines 149 and 172).

Do NOT modify validateResource or anything in src/. UI-only change. Constraints: no any/var, arrow functions, accessible labels (the input keeps its id/accessibilityLabel), theme tokens. After, run npm run test:unit (expect 164 passing) and report changes.

## Prompt 179

In apps/provider/screens/PostResourceScreen.tsx, update the category chip list on line 21. Change the categories from ["Food", "Shelter", "Healthcare", "Transportation"] to ["Food Bank", "Soup Kitchen", "Charging Station", "Shelter"]. Rationale: "Healthcare" and "Transportation" are too broad; replace with specific, actionable community-resource categories. Keep the existing "+ Custom" chip (CUSTOM_CATEGORY) unchanged — it handles anything not in the presets (tents, bus passes, career fairs, etc.).
Also update the mock category in screens/MyPostsScreen.tsx line 9 from "Food" to "Food Bank" for consistency (it's placeholder data).
Do NOT modify anything in src/. UI/data-label change only. Keep constraints: no any/var, arrow functions, theme tokens. After, run npm run test:unit (expect 164 passing) and report changes.

## Prompt 180

In the Narley v3 provider app (apps/provider), remove the mock/sample resource pins now that real pinning via the Post form works. The map and "Nearby Resources" cards should start empty and only show resources the user actually creates.

Find the hardcoded mock/sample resources array (used to seed the map markers and Nearby Resources cards) and remove the sample entries, replacing it with an empty initial list.
Ensure the map and cards handle the empty state gracefully: an empty map (no markers) and an appropriate empty state for the Nearby Resources section (e.g. a message like "No resources yet" or just an empty list with the count showing 0).
Keep the pin-creation flow intact: resources created via the Post form still get added to this (now initially empty) list and appear on the map and in the cards.
Also remove or empty any mock data in MyPostsScreen if it uses hardcoded sample posts, so My Posts also starts empty (showing its empty state).

Do NOT modify anything in src/. UI/data change only. Keep constraints: no any/var, arrow functions, theme tokens. After, run npm run test:unit (expect 164 passing) and report changes.

## Prompt 181

add all remaining prompts in prompts.md

## Prompt 182

Read the root AGENTS.md and TESTING.md, then follow their rules.
Make the auth-state reducer pass GREEN. The failing test is apps/provider/src/auth/authState.vitest.test.ts. Create apps/provider/src/auth/authState.ts exporting:

initialAuthState — { user: null, loading: false }
authReducer(state, action) — a pure reducer returning a new state, handling these action types:

LOGIN_START → { ...state, loading: true } (keeps user null)
LOGIN_SUCCESS (action carries user) → { user: action.user, loading: false }
LOGIN_FAILURE → { user: null, loading: false }
LOGOUT → { user: null, loading: false }

Define proper TypeScript types: a ProviderUser type { id: string }, an AuthState type { user: ProviderUser | null; loading: boolean }, and a discriminated union AuthAction for the four action types (LOGIN_SUCCESS carries user: ProviderUser; the others carry no payload).
Constraints from AGENTS.md: no any, no var, arrow/closure-based function, pure reducer (no side effects). Do not weaken or modify the test. Do not modify other files.
Then state the command; I will run it and paste the output: npm run test:unit

## Prompt 183

did I give you this prompt? Read the root AGENTS.md and TESTING.md, then follow their rules.
Make the auth-state reducer pass GREEN. The failing test is apps/provider/src/auth/authState.vitest.test.ts. Create apps/provider/src/auth/authState.ts exporting:

initialAuthState — { user: null, loading: false }
authReducer(state, action) — a pure reducer returning a new state, handling these action types:

LOGIN_START → { ...state, loading: true } (keeps user null)
LOGIN_SUCCESS (action carries user) → { user: action.user, loading: false }
LOGIN_FAILURE → { user: null, loading: false }
LOGOUT → { user: null, loading: false }

Define proper TypeScript types: a ProviderUser type { id: string }, an AuthState type { user: ProviderUser | null; loading: boolean }, and a discriminated union AuthAction for the four action types (LOGIN_SUCCESS carries user: ProviderUser; the others carry no payload).
Constraints from AGENTS.md: no any, no var, arrow/closure-based function, pure reducer (no side effects). Do not weaken or modify the test. Do not modify other files.
Then state the command; I will run it and paste the output: npm run test:unit

## Prompt 184

In the Narley v3 provider app (apps/provider), build the real useAuth hook and a small API client, wiring the already-tested auth logic to the backend login endpoint. Do NOT modify anything in src/ that has tests (authState.ts, login.ts, resolveAuthView.ts, etc.) — import and use them.

Create apps/provider/src/api/client.ts — a tiny fetch client with a configurable base URL. Read the base URL from process.env.EXPO_PUBLIC_API_URL if set, otherwise default to http://localhost:4000. Export an async postLogin(email, password) that POSTs to /login with a JSON body { email, password } and returns the parsed JSON ({ session?: { userId } , error?: string }). Handle network/parse errors by returning { error: "..." }.
Rewrite apps/provider/src/auth/useAuth.ts as a real hook using React's useReducer with the existing authReducer and initialAuthState from ./authState. Expose:

user and loading from state
login(email, password): dispatch LOGIN_START, call postLogin, then on a returned session dispatch LOGIN_SUCCESS with { id: session.userId } and return { ok: true }; on error dispatch LOGIN_FAILURE and return { ok: false, error }.
logout(): dispatch LOGOUT.

Constraints: no any, no var, arrow/closure functions, typed. Use the existing authReducer (do not reimplement state logic). After, run npm run test:unit (expect 175 passing — no tests should break since existing tested files are untouched). Report the files created/changed.

## Prompt 185

In the Narley v3 provider app (apps/provider), build the Login screen and wire the auth gate so the app shows login when logged out and the tabs when logged in. Trace to AUTH-P-002 and AUTH-P-006 in TESTING.md.

Create apps/provider/screens/LoginScreen.tsx:

Email field (keyboardType email, accessible label/id)
Password field: masked by default, with an eye-toggle button to show/hide (AUTH-P-006 — password stays masked unless intentionally toggled)
A "Log In" button
An error message area that shows the generic error returned from login (never revealing which factor failed)
On submit: call useAuth().login(email, password). While loading, disable the button / show a spinner. On { ok: false }, show the returned error. On { ok: true }, do nothing here — the auth gate will switch to tabs automatically.
Account creation is NOT offered on this screen (AUTH-P-002 — that's only reached via the QR flow, which we're deferring).
Style with the shared theme (@shared-ui/theme/theme, getTheme) — match the app's look, deep green / dark shell, CTA blue button. Render user-entered text only as plain <Text>/<TextInput> (no raw HTML).

Wire the auth gate in App.tsx (or wherever the navigator root is): use useAuth() to get { user, loading }, compute the view with the tested resolveAuthView({ loading, user, membership }) from src/auth/resolveAuthView. For now, since membership isn't fetched yet, pass membership as an ACTIVE stub when a user is present (user ? { status: "ACTIVE" } : null) — we'll fetch real membership later. Render:

"loading" → a loading indicator
"login" → the LoginScreen
"tabs" → the existing bottom-tab navigator
Remove the current auth-bypass (the app should now start on the LoginScreen when logged out, not jump straight to tabs).

Constraints: no any, no var, arrow/closure functions, accessible labels, theme tokens, minimal-but-quality. Do NOT modify tested files in src/ (import them). After, run npm run test:unit (expect 175 passing — no logic changed). Report changes.

## Prompt 186

how do I run a command to get into the provider app again?

## Prompt 187

do I need the postgresql server running or can I exit out of it to run expo for the provider app?

## Prompt 188

In the Narley v3 provider app (apps/provider), the login screen is not appearing when the app launches. It should: on launch with no logged-in user, show the LoginScreen (per the auth gate in App.tsx using useAuth + resolveAuthView); after a successful login it should show the bottom tabs.
The auth gate in App.tsx looks correct: AuthenticatedApp reads useAuth(), computes resolveAuthView({ loading, user, membership }), and renders <LoginScreen /> when the view is not "tabs". initialAuthState is { user: null, loading: false }, so resolveAuthView should return "login" on launch — but the LoginScreen is not showing.
Investigate and report the root cause. Check specifically:

src/auth/useAuth.ts — does it correctly export both AuthProvider and useAuth? Does useAuth consume the context that AuthProvider provides? Is there a context mismatch or a hook that returns unexpected values (e.g. useAuth used outside the provider, or returning a non-null user)?
screens/LoginScreen.tsx — does it actually render visible content, or could it be rendering blank/invisible (e.g. a styling issue, a crash, missing return, or an error boundary swallowing it)?
App.tsx — is the AuthProvider wrapping correctly? Is there any runtime error when useAuth is called?
Are there any TypeScript or runtime errors in these files that would cause a blank screen or a fallback render?

Report the specific root cause and the minimal fix. Do NOT modify any tested files in src/ that have vitest tests (authState.ts, resolveAuthView.ts, login.ts, etc.) — only fix the wiring/UI files (useAuth.ts, LoginScreen.tsx, App.tsx) as needed. After proposing the fix, apply it, then run npm run test:unit and confirm all tests still pass. Report what was wrong and what you changed.

## Prompt 189

why is the provder app login saying network request failed?

## Prompt 190

how do I run the back en?

## Prompt 191

In the Narley v3 provider app (apps/provider), the My Posts screen's Edit and Delete buttons (and the resource detail/modal card) don't work. Wire them to the app's existing tested logic. Import from src/resources; do NOT modify any tested files in src/.
Investigate first: read screens/MyPostsScreen.tsx, the detail/modal card component it uses, and state/ResourceStore.tsx. Report why the Edit button currently does nothing (no handler, no navigation, missing wiring, etc.).
Then implement:

View / modal card — tapping a post in My Posts opens its detail card/modal showing the resource's fields (title, category, address, phone, website, details, expiration, status).
Edit — from the detail card, an Edit action opens an editable form pre-filled with the resource's current values (reuse the Post form fields where possible). On save:

Call the existing tested updateResource(resourceId, changes, deps) from src/resources/updateResource.ts. It internally checks ownership (canEditResource), validates the expiration (EDIT-007), and rejects rename collisions (EDIT-002).
Provide deps: resource (the current resource with organizationId), membership (the temporary ACTIVE stub { organizationId: "org_hum", status: "ACTIVE" } for now, matching the logged-in provider's org), update (a function that updates the resource in the ResourceStore — updating the same in-memory list that drives the map pins and cards), recordAuditEvent (stub returning resolved), and findActiveByTitleAndAddress (stub returning null for now).
On { ok: true }: apply the change to the ResourceStore so the map pin and card reflect the edit; close the form. On { ok: false }: show the returned error to the user.
Edit must save in place (EDIT-009) — same resource id, not a new pin.

Delete — from the detail card, a Delete action requires a confirmation dialog (Cancel preserves it, Confirm removes it — per the ALERT-P-007 confirmation pattern). On Confirm: call the ResourceStore's removeResource(resourceId) so the resource is removed from BOTH the My Posts list AND the map pins/cards (one source of truth). Deleting must not affect other resources.

Constraints (AGENTS.md): no any, no var, arrow/closure functions, accessible labels/ids on inputs and buttons, render user input only as plain <Text> (no raw HTML), theme tokens (@shared-ui/theme/theme), minimal-but-quality. Do NOT modify tested files in src/ — import and call them. After, run npm run test:unit (expect 175 passing — no logic changed) and report changes.

## Prompt 192

I need to cd for a terminal and go into reader app, can you give me the command

## Prompt 193

In the Narley v3 provider app, when the Expo app is refreshed, the user is logged out AND their created pins disappear. Investigate and confirm the cause for BOTH:

Why does refreshing log the user out? Check how src/auth/useAuth.ts stores auth state — is the session persisted to any device storage (e.g. AsyncStorage/SecureStore), or is it only in-memory React state that resets on reload?
Why do created pins disappear on refresh? Check state/ResourceStore.tsx — are resources persisted to the backend/database or device storage, or are they only in-memory React state? Is there any GET call to the backend to load saved resources on startup?
Report specifically: is either the session or the resource list persisted anywhere durable, or do both live only in memory? Do NOT change anything — investigation only. Report findings.

## Prompt 194

In the Narley v3 project, add resource persistence so created pins survive an app refresh by saving to the Neon Postgres database via the existing API server (server/index.ts, which already runs Express + Prisma and has a working /login endpoint).
Backend (server/index.ts): Add two endpoints, wiring the app's existing tested logic — do NOT reimplement business logic:

POST /resources — receives a resource JSON body. Call the tested createResource(resource, provider, deps) from apps/provider/src/resources/createResource.ts with real Prisma dependencies:

insert = (r) => prisma.resource.create({ data: r }) returning { id }
findActiveByTitleAndAddress = a real prisma.resource.findFirst({ where: { title, address, status: "ACTIVE" } })
recordAuditEvent = (e) => prisma.auditEvent.create({ data: e })
membership = for now, a stub ACTIVE membership { status: "ACTIVE", org: { status: "VERIFIED", active: true } } (real membership fetch comes later)
provider = { id } from the request (for now the seeded user_jacq; real session-based provider comes later)
On { ok: true } return the created resource; on { ok: false } return the error with an appropriate status code. Ensure the resource has the required fields the schema needs (providerId, organizationId — use the seeded org_hum for now).

GET /resources — return all ACTIVE resources from Postgres via prisma.resource.findMany(...), shaped to match the StoredResource type the app uses.

App (apps/provider/state/ResourceStore.tsx):

On mount (startup), call GET /resources (via a new function in src/api/client.ts) to hydrate the store from the database, so pins load after a refresh. Show a loading state while fetching.
Change addResource so that creating a resource calls POST /resources (persisting to the DB) and, on success, adds the returned resource to the store. Keep the map pins and cards reading from the store.

Constraints (AGENTS.md): no any, no var, arrow/closure functions, no changes to tested files in src/ (import them), render user text as plain <Text>, theme tokens. After, run npm run test:unit in apps/provider (expect 175 passing — no tested logic changed). Report changes and the exact commands to run/test.
Note: the server is at server/index.ts in the repo ROOT (not apps/api), run with npx tsx server/index.ts. The Prisma client is imported in server/prisma.ts.

## Prompt 195

codex commit all the changes for each file please, then add all remaining prompts in prompts.md, In the Narley v3 provider app, submitting a resource from the Post screen fails with: "JSON Parse error: Unexpected character: <". This means the app's POST /resources call received an HTML response (starting with <) instead of JSON — typically a 404/error HTML page, which happens when the endpoint isn't found or the server returned an error page.
Investigate and fix the root cause. Check specifically:

Confirm the POST /resources and GET /resources endpoints actually exist in server/index.ts and are correctly registered (correct method, path, and that express.json() middleware is applied before them).
Check the app's API base URL: in apps/provider/src/api/client.ts and the .env (EXPO_PUBLIC_API_URL). Confirm the app is calling the right host/port where the server actually runs (the server runs on port 4000 at server/index.ts in the repo ROOT — not apps/api). When testing on a physical phone, the URL must be the Mac's LAN IP (e.g. http://10.0.0.6:4000), not localhost.
Determine whether the error is because: (a) the running server is stale and doesn't have the new /resources routes (needs restart), (b) the app is hitting a wrong/unreachable URL that returns HTML, or (c) the endpoint throws and returns an HTML error page.
Verify the request body the app sends matches what the endpoint expects, and that the endpoint returns JSON in all paths (success AND error) — never HTML.

Report the exact root cause. If the fix is code (wrong URL handling, missing route, non-JSON error response, missing express.json), apply the minimal fix. If the fix is operational (server must be restarted to load new routes, or the .env URL must change), state the exact commands I need to run. Do NOT modify tested files in src/. After any code change, run npm run test:unit in apps/provider (expect 175 passing) and report.

Note: the API server is started with npx tsx server/index.ts from the repo root and must be restarted to pick up route changes. The Neon DATABASE_URL is set in the root .env and is valid.

## Prompt 196

In the Narley v3 provider app, the My Posts screen's Edit and Delete buttons don't work. Wire them to work AND persist to the Neon database (matching the resource persistence already built for create/load). Use the app's existing tested logic — do NOT reimplement or modify tested files in src/.

First, investigate screens/MyPostsScreen.tsx, the detail/modal card component, state/ResourceStore.tsx, src/api/client.ts, and server/index.ts. Report why Edit currently does nothing.

Backend — add two persistence endpoints to server/index.ts:

PATCH /resources/:id (edit) — call the tested updateResource(resourceId, changes, deps) from apps/provider/src/resources/updateResource.ts with real Prisma deps: resource = the current resource fetched via prisma.resource.findUnique; membership = temporary ACTIVE stub { status: "ACTIVE", org: { status: "VERIFIED", active: true }, organizationId: "org_hum" }; update = prisma.resource.update; recordAuditEvent = prisma.auditEvent.create; findActiveByTitleAndAddress = real Prisma query. On success return the updated resource; on failure return JSON with a proper status code.

DELETE /resources/:id (delete) — remove the resource from Postgres and return JSON { ok: true }, handling not-found with JSON.

Add typed patchResource and deleteResource client functions, wire ResourceStore updateStoredResource/removeResource to persistence, and make My Posts support detail, pre-filled edit/save in place, and confirmed delete. Keep map pins/cards driven by the same store. Follow AGENTS.md constraints, do not modify tested src files, run provider unit tests, and report commands including the required server restart.

## Prompt 197

I am able to edit but I can't save, the message says API endppoint not found.

## Prompt 198

(base) jacquelinedelgado@Jacquelines-MacBook-Pro Narley % kill 27862
kill: kill 27862 failed: no such process
(base) jacquelinedelgado@Jacquelines-MacBook-Pro Narley %

## Prompt 199

In the Narley v3 provider app, screens/PostResourceScreen.tsx has a bug: after successfully submitting a resource, the form fields stay populated with the previous resource's values. When the user returns to the Post tab to create another resource, they see the old data pre-filled instead of empty fields.

Fix it: after a successful submit (when addResource returns { ok: true }), reset ALL form fields to their empty/initial state — title, category (back to the default first chip or empty), custom category input, address, pinned coordinates, expiration date, phone, website, details, and clear any pinned map preview and error message. The form should be blank and ready for a new resource.

Only reset on SUCCESS — if the submit fails ({ ok: false }), keep the entered values so the user can correct and retry. Follow AGENTS.md constraints, do not modify tested files in src/, run provider unit tests, and report changes.

## Prompt 200

On the My Posts screen while I am trying to enter information on the Details field, the keyboard hides the field while I am typing and I can't see the details field, I believe I need more scroll space.

## Prompt 201

I need a little more scroll space.

## Prompt 202

I need more scroll space on the My Posts screen as well.

## Prompt 203

I need a little more scroll space on the My Posts screen.

## Prompt 204

On the Resource card, the categories should be Red.

## Prompt 205

On the profile screen the labels are not the same width as the Logo, but it should be so that it looks uniform.

## Prompt 206

Is the weather alerts toggle wired up?

## Prompt 207

In the Narley v3 provider app, wire the "Weather alerts" toggle (currently UI-only, in the Profile screen) so it actually produces weather alerts, using the app's existing tested logic. Do NOT modify or reimplement tested files in src/ — import and use them.

First, investigate and report the tested weather/alert logic in apps/provider/src/reports — specifically forecastTemperatureAlert, getAlertsWithSetting, and activeAlertCount — and TESTING.md's approved weather-alert spec. Then fetch Open-Meteo daily maximum Fahrenheit forecasts for New London, CT (41.3557, -72.0995), map them to the tested logic, gate and count alerts using the tested toggle behavior, display the alert on the Alerts tab and badge, and persist the toggle with device storage. If mapping is non-trivial, implement it test-first. Follow AGENTS.md constraints, do not change tested files, run provider unit tests, and report all changes and commands.

## Prompt 208

1. commit all changes please, 2. In the Narley v3 apps, replace the current map markers with a custom, config-driven category pin system so pins stand out from the map's default POI markers. Follow the architecture in PIN-SYSTEM.md (approved by the project owner — build it). The pin design is confirmed: a colored teardrop/map-pin shape with a white inner circle containing a colored category icon and a subtle shadow — matching the "Narley Map Pin Legend" style (bold colored pins, not the small default map dots).

Create a shared resourceCategories.ts where each category defines { id, label, icon, iconColor, accessibilityLabel }: Food Bank/basket/green #22C55E; Soup Kitchen/restaurant/orange #F59E0B; Charging Station/battery-charging/blue #2563EB; Shelter/bed/purple #6B21A8; plus a default/custom star in deep green #0F4D35 labeled "Community resource". The UI must always read pin values from config and safely fall back to the default.

Create reusable MapPin.tsx with the approved shape, inner circle, icon, shadow, and accessible label. Use it as a custom react-native-maps Marker child in the provider MapScreen. Synchronize cards and detail modals to the same category icon/color config. Pins must not rely on color alone. Follow AGENTS.md constraints, do not modify tested src files, run provider unit tests, report changes. 3. add all remaining prompts to prompts.md please.

## Prompt 209

Read the root AGENTS.md and TESTING.md, then follow their rules. Make the reader auth-view resolver pass GREEN by creating apps/reader/src/auth/resolveReaderAuthView.ts with typed loading/auth/verify/tabs precedence. Do not modify the test or other files. State npm run test:unit.

## Prompt 210

Why am I getting the npm lifecycle test:unit failure errors from the reader workspace and Vitest command?

## Prompt 211

Read the root rules and make readerLogin.vitest.test.ts GREEN. Create typed readerLogin with injected user lookup/password verification, generic invalid-credential errors, and a session containing userId and emailVerified. Do not modify tests or other files.

## Prompt 212

Read the root rules and make readerSignup.vitest.test.ts GREEN. Validate the password before hashing, reject existing accounts, hash/create an unverified reader, and return a discriminated result. Do not modify tests or other files.

## Prompt 213

Check the logo assets: the Reader Expo app shows the Expo logo instead of the Narley house logo. Find which house-logo asset should replace it.

## Prompt 214

The Provider app does not have that logo problem, which is why I mentioned it.

## Prompt 215

Make verifyReaderEmailCode.vitest.test.ts GREEN with typed, single-use, unexpired code verification that marks the email verified and consumes the code only on success.

## Prompt 216

Run the Vitest reporter so it appends results, then make generateVerificationCode.vitest.test.ts GREEN with a random six-character uppercase-letter/digit code. Do not modify tests or other files.

## Prompt 217

Run the Vitest reporter to append the test results.

## Prompt 218

The report only shows 71 tests, but I have 91 passing.

## Prompt 219

The file did not change; test results are supposed to append to PASS-FAIL.md.

## Prompt 220

What destination did you append to before appending to the correct destination?

## Prompt 221

Did you remove that incorrectly created file?

## Prompt 222

Remove that log. All results must stay in PASS-FAIL.md.

## Prompt 223

Add reader signup, verify, and login endpoints to server/index.ts using the tested Reader auth logic, Prisma, bcrypt, VerificationCode, and Resend. Create server/email.ts, return JSON on every path, run both app suites, and provide curl commands plus restart instructions.

## Prompt 224

Repoint all three reader-auth endpoints from prisma.user to the separate prisma.reader table. Do not touch Provider endpoints or tested src files. Run both suites and remind me to restart the server.

## Prompt 225

Replace the Reader Map screen's hardcoded resources with GET /resources data, shared visibility filtering, real pins/cards, loading and empty states, and tested ZIP filtering when available. Add a typed Reader API client and root-server URL handling.

## Prompt 226

Bridge the single root .env API URL into both Expo apps with app.config.js. Update Provider and Reader API clients to read Constants.expoConfig.extra.apiUrl with localhost fallback. Do not create per-app .env files.

## Prompt 227

Do I need to install expo-constants?

## Prompt 228

Remove the Tomorrow, 3 Days, 1 Week, and Custom reminder chips from the Reader resource modal. Custom reminder should use separate date and time inputs rather than a free-form string.

## Prompt 229

Make the reminder modal scroll so the keyboard does not cover date/time fields. Use conventional MM/DD/YYYY and prepopulate/automatically format slashes and the time colon so users enter only digits.

## Prompt 230

Commit all changes.

## Prompt 231

Investigate only: determine whether Save and Remind in the Reader resource modal are combined or separate, what each action does, whether tested save/reminder logic is wired, whether actions are independent, and where data persists.

## Prompt 232

Investigate prerequisites for database-backed saved resources and device notifications: Prisma SavedResource, expo-notifications installation, Reader auth session/UI, exact tested save/reminder signatures, and Reader API-client endpoints/base URL. Report only.

## Prompt 233

Build Reader authentication screens and a persisted useReaderAuth session, add typed signup/verify/login API calls, gate App.tsx with resolveReaderAuthView, keep one navigation root, and wire Profile logout. Run Reader tests and explain testing.

## Prompt 234

Wire per-user saved resources to the SavedResource Prisma table and logged-in Reader. Add POST/GET/DELETE endpoints, typed client calls, independent Save and Remind buttons, tested local list transforms, and a database-backed Saved screen.

## Prompt 235

Investigate only why Save reports success but does not persist/show: inspect server route, readerId, client request/base URL, response handling, and Saved screen loading. Report the exact root cause.

## Prompt 236

If a card is saved, its label is supposed to appear on the Saved screen, correct?

## Prompt 237

Correct: it says resource saved, but the Saved screen is empty.

## Prompt 238

Fix SavedScreen.tsx to fetch database records on mount and every tab focus with useFocusEffect, use the logged-in readerId, persist deletion, and show loading/empty states.

## Prompt 239

Commit all changes.

## Prompt 240

The reminder time input does not indicate AM or PM.

## Prompt 241

Wire the independent Remind button to real expo-notifications using tested validateReminder/scheduleReminder logic. Convert MM/DD/YYYY and displayed time to tested YYYY-MM-DD/24-hour formats, handle permissions/errors, configure Expo, run tests, and explain device testing limitations.

## Prompt 242

Investigate only whether Reader and Provider weather/NWS cards disappear on expiry: trace sources, expiry fields/filtering, refresh behavior, and exact current disappearance conditions in both apps.

## Prompt 243

Is the Provider app wired to live NWS fetching?

## Prompt 244

What line would I add ALERT-R-006 to in TESTING.md?

## Prompt 245

I need the exact line number.

## Prompt 246

Make isAlertExpired.vitest.test.ts GREEN for temperature and NWS alert shapes per ALERT-R-006, with typed arrow functions and no test changes.

## Prompt 247

Make filterActiveAlerts.vitest.test.ts GREEN by importing isAlertExpired and non-mutatingly filtering a readonly alert union. Do not reimplement expiry logic or modify tests.

## Prompt 248

Wire tested filterActiveAlerts into the Reader Alerts pipeline before normalization, refresh/re-evaluate on focus, preserve the empty state, and run Reader tests.

## Prompt 249

Make Reader weather alerts use actual device location. Add expo-location helper, coordinate-aware Open-Meteo, live NWS fetch through tested nwsAlerts, toggle gating, expiry filtering, refresh-on-focus, and permission-denied state.

## Prompt 250

Did you install expo-location?

## Prompt 251

Is the Reader Weather Alerts toggle wired to the weather-alert APIs?

## Prompt 252

Are both weather APIs wired to the Reader app?

## Prompt 253

Investigate only why Provider shows a New London Open-Meteo heat alert while Reader shows none. Compare coordinates/location permission, exact forecast parameters/data shape, threshold logic, toggle gating, and swallowed errors.

## Prompt 254

Fix the date-only timezone bug in tested isAlertExpired. Date-only temperature alerts remain active through their date and following Eastern day, expiring at the start of day +2; full timestamps retain +24h behavior and NWS remains unchanged.

## Prompt 255

Is Open-Meteo wired to the Reader app?

## Prompt 256

Investigate why Provider shows a weather alert at the same physical location but Reader does not.

## Prompt 257

What location is the Provider app using to produce the alert?

## Prompt 258

Add temporary [Narley] diagnostic logs to Reader location acquisition, WeatherAlertsStore refresh/results/failures, and Open-Meteo request/response/errors. Explain how to view them in Metro.

## Prompt 259

Remove every temporary [Narley] diagnostic log from apps/reader without changing alert behavior. Confirm none remain and run Reader tests.

## Prompt 260

Investigate only the Provider weather-alert system: independent tested logic, expiry, focus refresh, hardcoded location and expo-location config, NWS wiring, Open-Meteo parameters/cache, swallowed errors, store assembly, and Alerts consumption.

## Prompt 261

Read codex.md, then add Provider weather refresh-on-focus using useFocusEffect and the store's existing refresh function, gated by the Weather Alerts toggle. Run Provider tests and explain testing.

## Prompt 262

Add Provider weather expiry filtering by importing Reader filterActiveAlerts before normalization. Keep focus refresh and make badge counts reflect only active alerts.

## Prompt 263

Replace Provider's hardcoded New London weather coordinates with expo-location device coordinates, make fetchForecast coordinate-aware, handle denied location, add the app plugin, and preserve toggle/expiry/focus behavior.

## Prompt 264

Investigate and fix why a valid future date-only heat alert for 2026-07-15 disappears on 2026-07-13 after Provider expiry filtering. Check import version, raw shape, ordering, and add a RED test first if isAlertExpired is wrong.

## Prompt 265

What file did you change?

## Prompt 266

Replace Provider's hardcoded weather location with real device location, without modifying tested files or breaking fetchForecast tests. Update store and expo-location plugin, then run tests.

## Prompt 267

Wire live Provider NWS alerts using the Reader fetchNwsAlerts and device coordinates. Feed results through existing expiry/normalization/badge flow, gate by the toggle, and handle empty/error cases correctly.

## Prompt 268

Fix Provider's swallowed weather-fetch failures: consume the failures array, distinguish real empty results from errors, expose an ALERT-R-005-style error/retry state, and preserve toggle/expiry/focus behavior.

## Prompt 269

Do you have an image of the teardrop category pins used by the Provider app?

## Prompt 270

Generate one PNG showing all category pins so I can see them together.

## Prompt 271

How are the pins made? I need to show Claude.

## Prompt 272

Update the shared map-pin system: refine the rotated-square geometry into a clean teardrop and add Employment, Housing, Recovery, Mental Health, and Medical Clinic with exact colors/icons. Add an iconSet discriminator for Ionicons/MaterialCommunityIcons and ensure both apps render the shared config/component. Do not use PNGs.

## Prompt 273

Fix the Provider Map screen's non-working City/ZIP search. Report the root cause first, reuse tested geocoding/filter logic, geocode city or ZIP input, move the MapView, apply ZIP filtering, handle errors accessibly, run Provider tests, append all remaining prompts to prompts.md, and commit all changes.

## Prompt 274

Do I have both weather APIs wired to the Reader and Provider apps now?

## Prompt 275

Is OpenAI wired up in the apps? If so, which app uses it?

## Prompt 276

Wire the Provider app to display database-backed AI-verified report alerts. Add JSON GET /provider/alerts, a safely parsed typed getProviderAlerts client, real report cards refreshed on mount/focus, separate report and weather sections, loading and “No reports yet” states, and a combined report/weather badge count. Run Provider tests and note that the server must restart.

## Prompt 277

The Provider ZIP search works. Investigate and report whether the Reader app needs the same city/ZIP geocoding and map-recentering attention. Do not change code.

## Prompt 278

Give me the command to restart the server.

## Prompt 279

On the Provider +Post screen, add more scroll space because the map preview makes the form longer and the phone keyboard slightly hides the Details field.

## Prompt 280

Wire the Reader Profile feedback button to https://tally.so/r/yP1q28. Add a slight click animation that briefly expands the button before navigating to the link.

## Prompt 281

Complete Reader Map city/ZIP search. Add tested geocoding, recenter the MapView, retain tested ZIP filtering, support city/state and city-name queries, and show searching, empty-input, and location-not-found states. Run Reader tests and explain testing.

## Prompt 282

Build the Reader resource Report card. Map the five tested REPORT_REASONS into accessible single-select options, validate through createReport, submit through submitReport and a typed POST /reports client call, show success/errors, and keep failures open for retry. Run Reader tests and note the server requirement.

## Prompt 283

Give me a command to restart the server.

## Prompt 284

Fix Reader map geocoding returning “Location not found” for New Haven, CT, New London, CT, and ZIP codes. Add temporary [Narley] diagnostics for URL/raw response/failure branch, identify and fix encoding/query/parsing or provider limitations, retain visible resources, remove diagnostics afterward, and run Reader tests.

## Prompt 285

Add the same animated Tally feedback button to the Provider Profile, approximately where it appears on the Reader Profile, using the same link and expansion animation.

## Prompt 286

While a Reader report is submitting, add a separate message below the Submitting button: “This may take up to 38 seconds, please wait”.

## Prompt 287

Add all remaining prompts to prompts.md and run the Vitest reporter for both apps so both results append to PASS-FAIL.md.

## Prompt 288

Investigate and explain what callOpenAI currently does: which model it uses, whether web search is enabled or model-decided, the exact verification instructions/input, and whether OpenAI selects report categories or receives the Reader’s selected reason.

## Prompt 289

Improve server/openai.ts so AI report verification investigates the organization’s root cause and overall current status instead of only the surface symptom. Increase web-search context to high, research closure/merger/relocation/funding loss, keep confidence honest and the strict JSON contract, log OpenAI errors, and explain live testing after a server restart.

## Prompt 290

Include the reported resource title in the OpenAI verification input. Look up the Resource by resourceId in /reports, preserve the tested verifyReaderReport contract through dependency injection, center the prompt on the named organization and address, retain high search context and strict JSON, run tests, and note restart requirements.

## Prompt 291

Add Provider password reset end to end using the tested requestPasswordReset, confirmPasswordReset, and password policy. Add JSON request/confirm endpoints with Prisma ResetToken and Resend dependencies, typed Provider API methods, accessible request/confirm screens, masked password eye toggle, policy hints, generic anti-enumeration response, and login-flow navigation. Run Provider tests and note the server restart.

## Prompt 292

Implement ALERT-P-007 so providers can delete AI-verified report alerts. Add DELETE /provider/alerts/:id, a typed client method, an accessible confirmed destructive action on report cards, immediate shared-state and badge updates, graceful failure behavior, and no manual deletion for weather alerts. Run Provider tests and note restart requirements.

## Prompt 293

Strengthen AI report verification against stale authoritative evidence. Make the prompt date-aware for 2026, require source/event dates and post-evidence closure searches, prevent old 2022–2023 directories and press releases from proving current operation, tie confidence strictly to recent evidence, retain title/high search/strict JSON/error logging, and test after restart.

## Prompt 294

Add Reader password reset using a separate ReaderResetToken Prisma model and Reader relation while reusing the Provider’s tested dependency-injected reset logic and password policy. Add Reader-table endpoints, Resend email, typed API methods, accessible request/confirm screens, masked password toggle, policy hints, migration instructions, Reader tests, and restart instructions.

## Prompt 295

Add temporary [Narley] diagnostics for undelivered Reader password-reset email without changing logic. Log the received email, Reader lookup result, Resend recipient/from address, full success response, and full error; then explain restarting and reproducing so logs can be pasted.

## Prompt 296

Replace raw resource IDs in Provider report-alert headings with the human-readable resource title. Add ProviderAlert.resourceTitle with migration instructions, persist it during /reports creation, return/enrich it through GET /provider/alerts, update typed parsing and UI fallbacks, continue passing title to OpenAI, run Provider tests, and note restart requirements.

## Prompt 297

Reframe AI report verification at the organization level rather than the address/building level. Use the resource title as the primary identity, research agency-wide dissolution and operational status across all programs/locations, treat property sales and phone listings as supporting signals, prioritize recent organization-level evidence, preserve strict JSON/high search/error logging, and test after restart.

## Prompt 298

Add [Narley] diagnostics for report verification rejection without changing behavior. Log raw OpenAI output, full OpenAI errors, parse success/failure with specific schema/JSON reasons and raw content, and validateAiResult success/failure details so a restarted server reveals exactly where a report is rejected.

## Prompt 299

Fix the Reader report card showing “Unable to verify report” after a successful submission. Correct success-response interpretation, clear stale errors, use independent error/success state, show a success confirmation, close the form only on success, keep failures open, and run Reader tests without modifying tested logic.

## Prompt 300

Strengthen AI verification to distinguish persistent records from active operation. Treat ProPublica, Charity Navigator, LinkedIn, procurement plans, directories, phone listings, and re-indexed timestamps as weak historical evidence; require explicit closure searches and genuine recent operational proof; let credible closure evidence override persistent listings; keep high search and strict JSON; restart afterward.

## Prompt 301

Teach AI verification to combine multiple independent closure signals. A closed map listing, employee/forum shutdown report, and sold/vacated property can jointly support medium/high-confidence closure even without indexed formal news or dissolution filings; absence of formal coverage must not imply operation. Preserve strict JSON.

## Prompt 302

Investigate whether report reasons receive different verification behavior. Trace the reason from Reader selection through /reports and callOpenAI, determine whether any reason-specific branching exists, explain model-decided web search without tool_choice, and conclude whether differing sources result from explicit handling or the same prompt being steered differently. Report only.

## Prompt 303

Make AI verification consistent regardless of report reason. Replace the prompt with the same mandatory full investigation every time: closure news/filings, employee and community shutdown mentions, real-estate evidence, closed map listings, phone status, and genuine current service evidence. Apply fixed persistent-record, recency, closure-signal, confidence, and conflict rules while retaining strict JSON and restart instructions.

## Prompt 304

Make AI verification honest about its search limitations. When a closure report has any independent closure signal, prohibit high-confidence operating; unless clear closure evidence exists, require low-confidence conflicting-evidence findings, current-status uncertainty, explicit web-search limitations, dated closure/operating signals, and human review. Persistent-listing volume must never outweigh first-hand shutdown evidence.

## Prompt 305

Treat the Reader’s community report as the primary first-hand real-time evidence and web research only as supporting context. Prevent stale internet records from confidently contradicting closure reports, require exact low-confidence conflict framing and provider-review guidance when closure signals exist, reserve high confidence for clear recent evidence, keep strict JSON, run tests, and restart.

## Prompt 306

Investigate who currently receives Provider report alerts. Examine ProviderAlert recipient fields, Resource ownership, /reports creation, GET /provider/alerts filtering and authentication, the Provider client request, and conclude whether alerts are global or pin-owner scoped. Report the exact missing authentication, recipient, filtering, authorization, migration, and backfill work needed for owner-only alerts. Do not modify files.

## Prompt 307

Add all remaining prompts to prompts.md and commit all current project changes.

## Prompt 308

Give me the command to start the Narley API server.

## Prompt 309

Wire Provider Flow 2 using the original tested contact-field report shape. Add an authenticated POST /provider/report endpoint, send the report to jdboston.bu@gmail.com through Resend, add an accessible Provider report form, attach the Bearer token, show success or validation errors, preserve tested files, run the full suite, and explain manual testing.

## Prompt 310

Read AGENTS.md and TESTING.md, then make submitProviderReportShape.vitest.test.ts pass by replacing the invented provider contact fields with real resource fields: resourceTitle, address, optional phone and website, details, and reportedBy. Update or remove the stale old-shape test, preserve the 500-word rule, follow the typed coding constraints, and provide the Provider unit-test command for me to run.

## Prompt 311

What line in AGENTS.md contains the Expo SDK 57 documentation instruction?

## Prompt 312

How do I change directories to the Provider app?

## Prompt 313

Wire Provider Flow 2 using the tested real-resource report shape. Add authenticated POST /provider/report with reportedBy derived only from req.auth.userId, email all report fields to the Narley admin through Resend, add a Report to Narley action and prefilled form to resource cards, attach the Provider Bearer token, preserve tested files, run the full suite, and explain restart and manual testing.

## Prompt 314

What did you learn from reading the Expo SDK 57 documentation?

## Prompt 315

Stage the three submitProviderReport logic/test files and commit them with the message: feat(provider): GREEN Flow 2 report uses real resource fields + auto reporter (removes invented email).

## Prompt 316

Wire Provider Flow 2 using the tested real-resource report shape. Protect POST /provider/report with Provider authentication, derive reportedBy from the token, send the complete report to jdboston.bu@gmail.com through Resend, add a Report to Narley button and prefilled report form to every resource card, attach the Bearer token, keep errors open, preserve tested files, run all tests, and explain manual testing.

## Prompt 317

Add all remaining prompts to prompts.md, and ensure Provider Flow 2 is wired with the tested real-resource report shape, token-derived reporter identity, Resend admin email, resource-card report form, authenticated client request, success/error handling, unchanged tests, restart instructions, full-suite verification, and manual testing steps.

## Prompt 318

Add more scroll space to the Provider “Report a problem resource” card because the phone keyboard hides the “What is wrong?” field and prevents the Provider from seeing what they are typing.

## Prompt 319

Investigate why the Provider app shows the Narley house icon while the Reader app still shows the default Expo icon even though both app.json files reference `./assets/narley-icon-1024.png`. Compare all icon, splash, adaptive-icon, and favicon settings; verify asset hashes and paths; inspect dynamic config, icon-generator folders, native artifacts, EAS configuration, and build workflows; identify the exact cause and required rebuild steps. Report only.

## Prompt 320

Commit all current changes.

## Prompt 321

Report the exact workflow for installing the Reader app as a native development build on the same physical iPhone as Provider, without using the simulator. Inspect Provider scripts, native directories, EAS configuration, device targeting, signing, provisioning, Developer Mode, networking, and the physical-device command. Report only.

## Prompt 322

Investigate why Provider resource edits appear saved but Reader still shows old data. Trace the Provider PATCH request, authentication token, ownership checks, Prisma update, Reader GET `/resources`, focus refresh, and caching. Determine whether the edit failed to persist or Reader failed to refresh, and report the exact root cause and fix without changing code.

## Prompt 323

In `TESTING.md`, what line contains the edit-a-resource tests?

## Prompt 324

Are you there?

## Prompt 325

Add `LIVE-010 — Provider edits propagate to the reader for all fields`, requiring all editable fields—including notes, phone, and website—to persist through the backend, be consumed by Reader, refresh automatically on foreground/Map focus, and reconcile an open detail view with new data.

## Prompt 326

Read `AGENTS.md` and `TESTING.md` (`LIVE-010`), then make `apps/reader/src/api/client.vitest.test.ts` pass by adding optional `phone` and `website` fields to `ApiResource` and conditionally mapping them in `parseResource` without weakening existing required-field validation. Do not modify the test; provide the Reader unit-test command.

## Prompt 327

Fix the Reader API parser test’s React Native Flow parsing failure by extracting pure resource parsing into `apps/reader/src/api/parseResource.ts`, moving the `ApiResource` type and `parseResource` function there, importing them from `client.ts`, and moving the test to a pure parser test that does not import Expo or React Native. Preserve `LIVE-010`, strict typing, and existing parsing behavior.

## Prompt 328

Remove or comment out the two conditional phone and website mappings in `apps/reader/src/api/parseResource.ts`.

## Prompt 329

Restore the two conditional phone and website mappings in `parseResource.ts` immediately after `notes: value.notes`.

## Prompt 330

How many total tests are there across the Reader and Provider apps?

## Prompt 331

Are there any component tests?

## Prompt 332

Investigate which files/assets produce the logo banner in both apps. The visible banner says “Community resource navigation,” while `narley-logo.png` says “Help nearby.” Determine whether the banner uses `narley-logo.png` and explain the source of the displayed text.

## Prompt 333

Where does “Community resource navigation” come from, and why does “Help nearby” not appear?

## Prompt 334

The app logo/banner is supposed to say “Help nearby,” not “Community resource navigation.”

## Prompt 335

Match the “Help nearby” tagline styling to `narley-logo.png`: use the lighter green color and a bold font matching the logo.

## Prompt 336

Investigate why Provider resource editing stopped persisting after adding `Resource.notes String @default("")` with Prisma migration/generation. Trace PATCH parsing, domain update, Prisma update, response echo, generated client/server restart, migration status, and existing data integrity. Report the exact root cause and fix without changing code.

## Prompt 337

Read `AGENTS.md` and `TESTING.md` (`LIVE-010`), make `server/toApiResource.vitest.test.ts` pass, and fully wire real notes persistence through create, PATCH, and GET resource endpoints. Use `toApiResource`, store and update notes in Prisma, remove misleading response echoes, do not modify the test, provide full test commands, and note the required API restart.

## Prompt 338

Wire Reader foreground resource refresh for `LIVE-010`. Refactor Map resource loading into one shared callback used by `useFocusEffect` and an `AppState` listener using `shouldReloadOnForeground`; preserve phone/website in Reader mapping; derive an open modal’s resource from current state by ID; do not modify tested helper/parser files; run the full test suite and explain physical-device verification.

## Prompt 339

Investigate why a Reader Open-Meteo heat alert disappeared before its expected 24-hour period. Determine whether behavior is time-based or condition-based; trace threshold, expiry, refresh timing, persistence, location changes, swallowed failures, and the `TESTING.md` duration specification. Report only.

## Prompt 340

What lines in `TESTING.md` contain the Reader and Provider alert requirements?

## Prompt 341

Read `AGENTS.md` and `TESTING.md` (`ALERT-R-006`), then make `apps/reader/src/alerts/mergeAlerts.vitest.test.ts` pass by creating a pure typed `mergeAlerts(previousAlerts, newAlerts, now)` function. Retain unexpired previous alerts, add new alerts, deduplicate temperature alerts by type/expectedAt and NWS alerts by event/expires, preserve ordering, and do not modify tested expiry code or the test.

## Prompt 342

Provide a behavior report for Claude covering the Provider’s separate `WeatherAlertsStore`, `constants/providerAlerts.ts`, Provider `AlertsScreen`, and `activeAlertCount` helper.

## Prompt 343

Was the pure `mergeAlerts` function implemented?

## Prompt 344

Read `AGENTS.md` and the `ALERT-R-006` persistence requirement, then wire tested `mergeAlerts` into both Reader and Provider weather stores. Retain raw alerts across loads, merge instead of replace, preserve unexpired alerts during transient source failures, keep toggle-off and unavailable-location clearing, do not modify tested files, run all tests, and describe on-device verification in both apps.

## Prompt 345

On the Reader app, add “Community Resources” before the search bar, followed on the next line by “Reader app” in a smaller font.

## Prompt 346

Document all Provider and Reader features, their communication flows, the complete technology stack, and Resend—including every way it is used—in `claude.md`.

## Prompt 347

Add all remaining prompts to `prompts.md`.

## Prompt 348

Commit all remaining project changes.

## Prompt 349

Check whether the `.env` file was being tracked by Git.

## Prompt 350

Update line 5 of the README by removing the icon and Narley text and using the `narley-logo.png` asset from the apps/assets location.

## Prompt 351

Make the Express API deployable as a Vercel serverless function without breaking local development. Export the configured app, guard `app.listen` for direct local execution, add `api/index.ts` and `vercel.json`, generate Prisma during Vercel installation, report required environment variables, and provide full verification commands.

## Prompt 352

Check whether TDD is mentioned in the README.

## Prompt 353

Check whether Vitest is mentioned in the README.

## Prompt 354

Check whether the README states the total number of app tests.

## Prompt 355

Add README badges showing the Reader and Provider app test counts.

## Prompt 356

Recreate `narley-logo.png` so the house, Narley wordmark, and “Help nearby.” tagline shift left, moving the excess left-side whitespace to the right.

## Prompt 357

Explain whether favicons must be PNG files or can use SVG.

## Prompt 358

Ensure both app configurations include `web.favicon` pointing to `./assets/narley-icon-1024.png`.

## Prompt 359

Fix Vercel’s Prisma `import.meta` CommonJS runtime crash by researching Prisma 7’s generator module format, configuring CommonJS-compatible generation without adding root `type: module`, preserving postinstall generation, and providing regeneration, startup, and full-suite verification commands.

## Prompt 360

Commit all remaining changes.

## Prompt 361

Fix the black knocked-out corners in `narley-logo-left.png` as displayed in the README, making the exterior corners transparent while preserving the logo.

## Prompt 362

Research and report the Prisma 7.8 solution for Vercel’s `Cannot find module './internal/class.ts'` crash. Determine whether deprecated `prisma-client-js` remains supported and emits compiled JavaScript, document exact schema/config/import changes, recommend the safest approach, and make no changes yet.

## Prompt 363

Implement the recommended `prisma-client-js` Vercel fix: use `provider = "prisma-client-js"` with `engineType = "client"`, import `PrismaClient` from `@prisma/client`, find other stale generated-client imports, verify the dependency, and report cleanup of the gitignored custom output.

## Prompt 364

Add a self-contained Narley API landing page at exact `GET /` using inline HTML, CSS, and house SVG. Follow the design theme, show a truthful API-online status, describe the Provider/Reader API, list public endpoints, preserve every existing route and JSON 404, and provide test/startup verification commands.

## Prompt 365

Add the Narley house favicon to the API landing page.

## Prompt 366

Report how every Reader report category is sent to OpenAI, including the complete shared prompt behavior and what AI investigates for a disconnected-phone report. Do not change code.

## Prompt 367

List the report-reason categories available to a Reader.

## Prompt 368

Explain when an OpenAI Provider report card is labeled uncertain and list the confidence values AI is allowed to return.

## Prompt 369

Fix the README Live Demo link so it opens the deployed Narley Vercel URL instead of linking to `#`.

## Prompt 370

Before changing phone-report AI behavior, inspect `validateAiResult` and confirm whether the proposed exact findings, high confidence, and two sources pass validation and create a valid ProviderAlert. Report and stop before implementation.

## Prompt 371

Implement the approved phone-report changes: send optional stored phone and website fields to OpenAI, require an exact human-verification response for disconnected-phone reports, force high confidence and two specified sources, keep calling the model, and preserve the existing schema and other-category rules.

## Prompt 372

Explain how to switch from the Reader app to the Provider app on the physical iPhone and start the Provider Metro project without using the simulator.

## Prompt 373

Correct the failed directory command issued while already inside `apps/reader`; provide the sibling-path command for entering `apps/provider`.

## Prompt 374

Report how Reader report reasons work before adding a sixth value. Trace definitions, UI selection, API submission, server validation, tests, OpenAI reason branching, and every file needed for a new “Wrong website or website not working” reason. Do not change code.

## Prompt 375

Identify the line containing `REPORT-001` in `TESTING.md`.

## Prompt 376

Read `AGENTS.md` and `TESTING.md` (`REPORT-001`), then make the failing Reader reason test pass by adding “Wrong website or website not working” to `REPORT_REASONS` only. Do not modify the test or add server/AI behavior, and provide the Reader unit-test command.

## Prompt 377

Fix the Reader report-reason option so the full “Phone disconnected / no longer working” label is visible instead of truncated.

## Prompt 378

Add all remaining prompts to `prompts.md`, then commit every remaining project change.

## Prompt 379

After pushing the latest changes, explain whether the local API server must be restarted and whether Vercel requires a manual restart.

## Prompt 380

Investigate why GitHub/Vercel still shows the last deployment at 8:54 PM and determine whether the latest local commits were pushed.

## Prompt 381

Read `AGENTS.md` and `TESTING.md` (`REPORT-R-000`), then add category-specific OpenAI handling for “No more resources available.” Do not search or investigate the organization, do not assess truth or operating status, convey the Reader’s first-hand availability observation and resource details, return no sources, let AI choose confidence, and preserve every other category and the JSON schema.

## Prompt 382

Read `AGENTS.md` and `TESTING.md` (`ALERT-P-008`), then make Provider AI confidence tappable. Show the exact HIGH, MEDIUM, and LOW explanations inline without obscuring the report card, dismiss on tap-away, add an accessible control label, use shared theme tokens, and do not add or modify tests.

## Prompt 383

Add every remaining prompt to `prompts.md`, update the README Reader and Provider test-count badges, commit all outstanding changes, and push them to GitHub.

## Prompt 384

Read `AGENTS.md` and `TESTING.md` (`REPORT-000`) and, before changing code, report the plan for safely requesting a reported resource's stored website. Cover a bounded timeout and malformed or unsupported stored URLs, then stop before implementing the pure observation mapper, server request, and OpenAI category branch.

## Prompt 385

Provide the planned pure website-observation mapper's file path, exported function name, and three-value result type.

## Prompt 386

Read `AGENTS.md` and `TESTING.md` (`REPORT-000`), then make `server/websiteCheckObservation.vitest.test.ts` pass by creating the pure typed `server/websiteCheckObservation.ts` mapper. Map `404`, `reached-not-404`, and `could-not-reach` to the exact approved observation text; do not modify the test or implement network, route, or OpenAI wiring.

## Prompt 387

Wire the tested REPORT-000 mapper into the Narley API. Check the stored website with a five-second timeout, status-only GET and safe redirect handling; reject malformed, unsupported, local, and private destinations; convert failures to `could-not-reach`; pass the exact observation to a website-specific OpenAI branch that cannot search for or substitute another URL; preserve every other report category and the JSON schema; report confidence, sources, uncertainty, and verification commands.

## Prompt 388

Add all remaining prompts to `prompts.md`, update every Reader and Provider Vitest figure in the root README, and commit all remaining changes.

## Prompt 389

Read AGENTS.md and TESTING.md (REPORT-C-000). In server/openai.ts, add category-specific instructions for the reader report reason "Closed / no longer operating", following the same pattern already used for PHONE_REPORT_REASON (exact string match, instructions appended to the prompt).
The problem: the existing prompt tells the AI to compare closure evidence against current-operation evidence. That neutrality fails, because records that persist without maintenance — directories, listings, registries, profiles — are abundant and free, while closure evidence is scarce. The AI has reported organizations as operating on the strength of stale listings, and has treated those listings as a conflict that forces low confidence.
Per REPORT-C-000, add instructions that:

The AI may never report that an organization is currently operating on the strength of records that persist without maintenance. Listings, directories, registries, profiles, and search results are not evidence of current operation — they persist for years after an organization ceases to exist, and their presence required no one to do anything.
Current operation may only be supported by evidence that someone acted recently: a dated report of active service delivery, a recent official statement from the organization, or other current-dated evidence of real operation.
If no such evidence exists, current operation is unverified. Unverified is not a conflict between evidence — it is low confidence. The AI must state that current status could not be verified and recommend human verification.

This category keeps the AI's existing web research and its own confidence and sources — unlike the phone category, there is no fixed response. Do not change the JSON output schema, and do not change the rules for the phone, no-resources, or website categories.
Report the exact prompt wording you added, and flag any place it contradicts the existing shared instructions — particularly the existing rules about persistent record presence and conflicting cases, which may need reconciling rather than duplicating.

## Prompt 390

did you add a test to my vitest file? or did you create a new vitest file?

## Prompt 391

did you modify these files when you created the vitest file? M docs/project-context/SPRINT-USER-STORIES.md
 M docs/project-context/TESTING.md
 M server/openai.ts

## Prompt 392

did you modify this file when you created the vitest file? AI-PIN-VERIFICATION.md

## Prompt 393

undo these modifications: Edited 2 files (+2 -2)
  └ server/openai.ts (+1 -1)
    74          "Current operation may only be supported by evidence that someone acted recently: a dated report of active service delivery, a recent official statement from the organization, or other current-dated evidence of real operation.",
    75 -        "If no such evidence exists, current operation is unverified. Unverified is not a conflict between evidence — it is low confidence. State that current status could not be verified and recommend human verification.",
    75 +        "If no such evidence exists, current operation is unverified. Unverified is not a conflict between evidence — it is low confidence. The AI must state that current status could not be verified and recommend human verification.",
    76        ]

  └ server/openai.vitest.test.ts (+1 -1)
    31    "Unverified is not a conflict between evidence — it is low confidence",
    32 -  "state that current status could not be verified and recommend human verification",
    32 +  "The AI must state that current status could not be verified and recommend human verification",
    33  ] as const;

## Prompt 394

Read AGENTS.md and TESTING.md (REPORT-C-000), then make the failing test pass. Failing file: server/closedReportInstructions.vitest.test.ts.

Create server/closedReportInstructions.ts exporting closedReportInstructions, a pure function taking a report reason string and returning the closure-specific OpenAI prompt instructions — a non-empty array of strings when the reason is exactly "Closed / no longer operating", and an empty array for any other reason. This module is pure: it imports nothing from the network layer or the OpenAI client, matching the pattern used by server/toApiResource.ts and server/websiteCheckObservation.ts.
The instructions it returns, per REPORT-C-000:

This category overrides any conflicting shared instruction about evidence of current operation or conflicting evidence. The AI continues its existing web research and determines confidence and sources normally under these rules — there is no fixed response.
The AI may never report that an organization is currently operating on the strength of records that persist without maintenance. Listings, directories, registries, profiles, and search results are not evidence of current operation — they persist for years after an organization ceases to exist, and their presence required no one to do anything.
Current operation may only be supported by evidence that someone acted recently: a dated report of active service delivery, a recent official statement from the organization, or other current-dated evidence of real operation.
If no such evidence exists, current operation is unverified. Unverified is not a conflict between evidence — it is low confidence. The AI must state that current status could not be verified and recommend human verification.

Wire it into server/openai.ts the same way the phone, no-resources, and website instructions are wired — spread into the instruction array alongside them.
You previously flagged four places in the shared prompt that contradict REPORT-C-000 (persistent records as "weak evidence" at ~line 102, the high-confidence-only prohibition at ~104, the "evidence conflicts" requirement at ~107, and "weak operating signals" at ~108). Do NOT change them in this commit — report them again so I can decide separately.

Do NOT write, modify, or delete any test file. and tell me what command to run. Do not run commands.

## Prompt 395

add all remaining prompts in prompts.md and run vitest reporter to append in the PASS-FAIL.md please and commit all changes

## Prompt 396

how many total tests do I have?

## Prompt 397

Update the total vitest in the readme file it it is missing the 356 update

## Prompt 398

Read AGENTS.md and TESTING.md (REPORT-H-000, REPORT-A-000), then make the failing tests pass. Failing files: server/hoursReportInstructions.vitest.test.ts and server/addressReportInstructions.vitest.test.ts.
Follow the pattern already established by server/closedReportInstructions.ts and the phone category in server/openai.ts — a pure function taking a report reason string and returning category-specific OpenAI prompt instructions, importing nothing from the network layer or the OpenAI client.

Create server/hoursReportInstructions.ts exporting hoursReportInstructions. Non-empty array when the reason is exactly "Wrong hours", empty array otherwise. Instruct the AI that for this category it must NOT search to verify the hours and must NOT report what any website says the hours are. It must always return this exact response verbatim, regardless of what any search would find:
"I can't verify hours by searching. What's published online is often behind — hours change for holidays, weather, staffing, or just because, and the update reaches the internet later, if ever. If these hours changed recently, no website would know yet. It's also worth checking the pin for a typo. Only a human can confirm this — please call or visit."
Create server/addressReportInstructions.ts exporting addressReportInstructions. Non-empty array when the reason is exactly "Wrong address / location", empty array otherwise. Same constraints — no searching to verify the address, no reporting what listings say the address is. Exact response verbatim:
"I can't verify an address by searching. Organizations often appear at several addresses across listings, including ones they left years ago, and a search can't tell me which is current. It's also worth checking the pin for a typo. Only a human can confirm this — please call or visit."
For both categories: confidence is always high — high confidence that only a human can verify this. Sources for both are always exactly these two:

https://www.seerinteractive.com/insights/ai-models-provide-incorrect-phone-numbers-36-of-the-time-heres-what-you-can-do
https://www.dreamhost.com/blog/google-business-profile/

Wire both into server/openai.ts the same way the phone, no-resources, website, and closure instructions are wired — spread into the instruction array alongside them.

Reproduce both response texts EXACTLY as written above — do not reword, re-punctuate, or join sentences. Previous string edits in this file dropped spaces between sentences.
Do NOT write, modify, or delete any test file. Do not change the JSON output schema or the rules for the phone, no-resources, website, or closure categories.

## Prompt 399

Read AGENTS.md. The server/ folder has no TypeScript configuration — there is no server/tsconfig.json and no root tsconfig.json. As a result the editor doesn't know server code is Node code, so Node globals like process are reported as errors (Cannot find name 'process' ts(2591) at server/openai.ts:39). @types/node is already installed in the root node_modules.
This is also why 8 TypeScript errors in server/index.ts only surfaced during a Vercel build rather than locally: nothing typechecks this folder. tsx strips types at runtime and Vitest only exercises the pure modules.

Create a TypeScript configuration for the server/ folder that includes the Node type definitions so Node globals resolve, and that matches the strictness AGENTS.md requires (no implicit any, strict on) and the module/target settings the server actually runs under via tsx.
Report exactly what the config does and where you placed it, and whether it affects the apps in apps/, the Vitest runs, tsx server/index.ts, or the Vercel build in any way. It must not change any of them.
Report every TypeScript error the new config surfaces in server/ — do not fix them in this commit. I want to see the list first.

## Prompt 400

add all remaining prompts to prompts.md and update vitest count to 364 total tests in the readme and then commit all changes

## Prompt 401

Read AGENTS.md and TESTING.md (REPORT-000), then make the failing test pass. Failing file: server/websiteCheckObservation.vitest.test.ts.
In server/websiteCheckObservation.ts, the could-not-reach observation text has been updated. Copy the expected string EXACTLY from the test's assertion — character for character, including the em dash and all sentence spacing. Do not reword, re-punctuate, or join sentences.
Change nothing else — the 404 and reached-not-404 observations, the WebsiteCheckResult type, and every other file stay as they are.
Constraints (AGENTS.md): no any, no var, arrow/closure functions, typed. Do NOT modify the test file. State the exact commands for me to run.

## Prompt 402

Read AGENTS.md and TESTING.md (REPORT-000), then make the failing test pass. Failing file: server/toWebsiteCheckResult.vitest.test.ts.
Currently server/checkWebsite.ts maps any non-redirect HTTP response with return response.status === 404 ? "404" : "reached-not-404";. That sends a 403 to reached-not-404, so the card tells the provider the site "did not return a 404 — check whether the pinned website is the one you intended," when in fact the server was refused and learned nothing. A 403 can mean the site blocks automated checks, or that the site is genuinely broken.

Create server/toWebsiteCheckResult.ts exporting toWebsiteCheckResult, a pure function taking an HTTP status number and returning a WebsiteCheckResult (import the type from ./websiteCheckObservation). 404 → "404". 403 → "could-not-reach". Any other status → "reached-not-404". This module is pure — it imports nothing from the network layer, matching server/websiteCheckObservation.ts.
In server/checkWebsite.ts, replace that ternary with a call to toWebsiteCheckResult. Change nothing else in that file — the timeout, redirect handling, SSRF guard, and network-failure paths all stay exactly as they are.

Do not add a new WebsiteCheckResult value and do not change any observation text — a 403 reuses the existing could-not-reach observation. Read the AGENTS.md in the docs/project-content folder and the TESTING.md in the docs/project-context folder.

## Prompt 403

add all remaining prompts to the prompts.md folder, and update the total vitest count on the readme file then commit all the changes

## Prompt 404

Only Hum LLC's provider sees a ProviderAlert; other providers (testb / Test Org B) don't. Every provider is supposed to see alerts. Do not change any code yet. Trace and explain why: show me how ProviderAlert rows are created (what sets organizationId), and how GET /provider/alerts queries them. Tell me exactly where the filtering happens that causes only one org to see it. Report your findings first.

## Prompt 405

on the page where it says This URL is the API behind the Provider and Reader mobile apps. add these lines underneath it: How to try the apps

1. Install "Expo Go" — free from the App Store (iPhone) or Google Play (Android).
2. Open Expo Go and scan the QR code for the app you want to try:
   • Reader app — find and save community resources near you.
   • Provider app — publish and manage resources, review AI-verified reports.
3. Reader: create an account (check spam for the verification email).
   Provider demo login: testb@example.com  /  [your demo password]

## Prompt 406

Do not change code. Find the test(s) that assert all providers can see ProviderAlerts. For each: print the file and test name, show the exact code it calls (real GET /provider/alerts, a helper, or a mock), and show the seed data it sets up. Then explain in 3 lines why it passes while the live endpoint at index.ts:621–630 returns nothing for testb. Report only. and tell me if they are wired to do that, do not change code please

## Prompt 407

add all remaining prompts in prompts.md file please

## Prompt 408

did you make changes to index.ts?

## Prompt 409

codex I don't know what font size this is but it's too small to read, I can't read it? Install “Expo Go” — free from the App Store (iPhone) or Google Play (Android).
Open Expo Go and scan the QR code for the app you want to try:
Reader app — find and save community resources near you.
Provider app — publish and manage resources, review AI-verified reports.
Reader: create an account (check spam for the verification email).
Provider demo login: testb@example.com  /  [your demo password]

## Prompt 410

add all remaining prompts to prompts.md please

## Prompt 411

on the url page where it says your demo password change it to this: DemoPass123!

## Prompt 412

for the url page, change this sentence to the lighter color green that GET uses: Reader: create an account (check spam for the verification email).

## Prompt 413

on the url page, add a section called Expo Go  before Public endpoints and add this  under the Expo Go header section: Once installed, open Expo Go once to confirm it launches. No login or configuration is needed. Open the built-in Camera app and point it at the QR code — a notification pops up, tap it to open your app in Expo Go; on Android, open the Expo Go app and tap the "Scan QR Code" button to use the in-app scanner. No account needed for either.

## Prompt 414

add remaining prompts to prompts.md file please

## Prompt 415

on the url page on this lineOpen Expo Go and scan the QR code for the app you want to try: add in (I will give you the QR code)

## Prompt 416

widen the width on the page on the url page, the layout is too narrow

## Prompt 417

On the Narley landing page (the root page served at narley.vercel.app),
add two QR code images to the hero section, positioned to the left and
right of the "Narley" title:

- Left of the title: assets/Reader QR code image, with a header
  "READER APP" above it and the text "Install Expo Go" below it.
- Right of the title: assets/Provider QR code image, with a header
  "PROVIDER APP" above it and the text "Install Expo Go" below it.

Requirements:
- Use the existing image files in the assets/ folder (Reader and
  Provider QR codes). Reference them by their actual filenames.
- Keep the layout responsive: on mobile/narrow screens, the QR codes
  should stack vertically below the title instead of overflowing.
- Match the existing page styling (cream text on the dark green
  background, same fonts).
- Do not change any other content on the page. Do not use `var` or the `any` type. Use const/let and proper types
consistent with the existing codebase. Match the file's existing
style and conventions.

## Prompt 418

No — don't start the server. Just add the two QR images and labels
to the page markup. I'll verify the page renders myself. Only edit
the landing page file and confirm the image paths match the actual
filenames in assets/.

## Prompt 419

add all remaining prompts to prompts.md please

## Prompt 420

codex did I give you this prompt? Below both QR codes (spanning under both), add a single caption line
in a muted/lighter color that reads: "These codes go live during the
demo — please scan only when prompted." Keep it smaller than the
headers so it reads as a note.

## Prompt 421

okay thank you please follow the prompt: Below both QR codes (spanning under both), add a single caption line
in a muted/lighter color that reads: "These codes go live during the
demo — please scan only when prompted." Keep it smaller than the
headers so it reads as a note.

## Prompt 422

add all remaining prompts to prompts.md please

## Prompt 423

Make this a larger font I can't read it it's too small and make it the lighter green, same color as the Help Nearby color: These codes go live during the demo — please scan only when prompted.

## Prompt 424

add all remaining prompts to prompts.md please
