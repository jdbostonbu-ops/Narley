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
