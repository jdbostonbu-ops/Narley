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
