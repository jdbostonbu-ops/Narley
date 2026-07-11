
 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/provider

 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > accepts a resource with a non-empty title 1ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects an empty title 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects a whitespace-only title 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects a missing title 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > accepts a resource with latitude and longitude 1ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects a missing latitude 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects a missing longitude 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects when both coordinates are missing 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > accepts a resource with a category selected 1ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects a missing category 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects an empty category 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects a whitespace-only category 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > accepts a password meeting all five rules 1ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > rejects a password shorter than 8 characters 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > rejects a password with no uppercase 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > rejects a password with no lowercase 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > rejects a password with fewer than 2 digits 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > rejects a password with fewer than 2 special characters 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > a valid password returns no errors 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > identifies a too-short password 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > identifies a missing uppercase 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > identifies a missing lowercase 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > identifies too few digits 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > identifies too few special characters 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > requestPasswordReset (AUTH-P-007) — no enumeration > returns the SAME response for an existing and a non-existing email 2ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > sets a new password with a valid, unexpired, unused token 1ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an already-used token (single-use) 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an expired token 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an unknown/tampered token 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > invalidates old sessions on a successful reset 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > permits an ACTIVE membership in a verified, active org 1ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when membership is not ACTIVE 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when there is no membership 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when the org is not verified 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when the org is not active 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when there is no user 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > returns a session for correct email + password 1ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > denies wrong password with a generic error and no session 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > denies a removed/absent user with the SAME generic error 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > does not reveal which factor failed (wrong password vs no user match) 0ms

 Test Files  7 passed (7)
      Tests  40 passed (40)
   Start at  09:48:56
   Duration  181ms (transform 118ms, setup 0ms, import 187ms, tests 15ms, environment 0ms)


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/provider

 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > permits an ACTIVE membership in a verified, active org 1ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when membership is not ACTIVE 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when there is no membership 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when the org is not verified 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when the org is not active 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when there is no user 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > accepts a resource with latitude and longitude 1ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects a missing latitude 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects a missing longitude 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects when both coordinates are missing 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > accepts a resource with a non-empty title 1ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects an empty title 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects a whitespace-only title 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects a missing title 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > accepts a resource with a category selected 1ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects a missing category 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects an empty category 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects a whitespace-only category 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > accepts a password meeting all five rules 2ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > rejects a password shorter than 8 characters 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > rejects a password with no uppercase 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > rejects a password with no lowercase 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > rejects a password with fewer than 2 digits 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > rejects a password with fewer than 2 special characters 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > a valid password returns no errors 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > identifies a too-short password 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > identifies a missing uppercase 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > identifies a missing lowercase 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > identifies too few digits 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > identifies too few special characters 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > requestPasswordReset (AUTH-P-007) — no enumeration > returns the SAME response for an existing and a non-existing email 1ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > sets a new password with a valid, unexpired, unused token 1ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an already-used token (single-use) 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an expired token 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an unknown/tampered token 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > invalidates old sessions on a successful reset 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > accepts coordinates within valid ranges 1ms
 × src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects latitude below -90 2ms
   → expected true to be false // Object.is equality
 × src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects latitude above 90 0ms
   → expected true to be false // Object.is equality
 × src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects longitude below -180 0ms
   → expected true to be false // Object.is equality
 × src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects longitude above 180 0ms
   → expected true to be false // Object.is equality
 × src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects NaN latitude 0ms
   → expected true to be false // Object.is equality
 × src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects infinite longitude 0ms
   → expected true to be false // Object.is equality
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > accepts boundary values (-90, 90, -180, 180) 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > returns a session for correct email + password 1ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > denies wrong password with a generic error and no session 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > denies a removed/absent user with the SAME generic error 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > does not reveal which factor failed (wrong password vs no user match) 0ms

⎯⎯⎯⎯⎯⎯⎯ Failed Tests 6 ⎯⎯⎯⎯⎯⎯⎯

 FAIL  src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects latitude below -90
AssertionError: expected true to be false // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ src/resources/validateResourceCoordinates.vitest.test.ts:12:19
     10|   it("rejects latitude below -90", () => {
     11|     const { valid, errors } = validateResource({ ...validResource, lat…
     12|     expect(valid).toBe(false);
       |                   ^
     13|     expect(errors.some((e) => /latitude/i.test(e))).toBe(true);
     14|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[1/6]⎯

 FAIL  src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects latitude above 90
AssertionError: expected true to be false // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ src/resources/validateResourceCoordinates.vitest.test.ts:18:19
     16|   it("rejects latitude above 90", () => {
     17|     const { valid, errors } = validateResource({ ...validResource, lat…
     18|     expect(valid).toBe(false);
       |                   ^
     19|     expect(errors.some((e) => /latitude/i.test(e))).toBe(true);
     20|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[2/6]⎯

 FAIL  src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects longitude below -180
AssertionError: expected true to be false // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ src/resources/validateResourceCoordinates.vitest.test.ts:24:19
     22|   it("rejects longitude below -180", () => {
     23|     const { valid, errors } = validateResource({ ...validResource, lon…
     24|     expect(valid).toBe(false);
       |                   ^
     25|     expect(errors.some((e) => /longitude/i.test(e))).toBe(true);
     26|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[3/6]⎯

 FAIL  src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects longitude above 180
AssertionError: expected true to be false // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ src/resources/validateResourceCoordinates.vitest.test.ts:30:19
     28|   it("rejects longitude above 180", () => {
     29|     const { valid, errors } = validateResource({ ...validResource, lon…
     30|     expect(valid).toBe(false);
       |                   ^
     31|     expect(errors.some((e) => /longitude/i.test(e))).toBe(true);
     32|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[4/6]⎯

 FAIL  src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects NaN latitude
AssertionError: expected true to be false // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ src/resources/validateResourceCoordinates.vitest.test.ts:36:19
     34|   it("rejects NaN latitude", () => {
     35|     const { valid, errors } = validateResource({ ...validResource, lat…
     36|     expect(valid).toBe(false);
       |                   ^
     37|     expect(errors.some((e) => /latitude/i.test(e))).toBe(true);
     38|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[5/6]⎯

 FAIL  src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects infinite longitude
AssertionError: expected true to be false // Object.is equality

- Expected
+ Received

- false
+ true

 ❯ src/resources/validateResourceCoordinates.vitest.test.ts:42:19
     40|   it("rejects infinite longitude", () => {
     41|     const { valid, errors } = validateResource({ ...validResource, lon…
     42|     expect(valid).toBe(false);
       |                   ^
     43|     expect(errors.some((e) => /longitude/i.test(e))).toBe(true);
     44|   });

⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯[6/6]⎯


 Test Files  1 failed | 7 passed (8)
      Tests  6 failed | 42 passed (48)
   Start at  10:00:31
   Duration  190ms (transform 222ms, setup 0ms, import 332ms, tests 22ms, environment 0ms)


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/provider

 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > accepts a resource with an address 1ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects a missing address 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects an empty address 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects a whitespace-only address 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > accepts a password meeting all five rules 2ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > rejects a password shorter than 8 characters 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > rejects a password with no uppercase 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > rejects a password with no lowercase 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > rejects a password with fewer than 2 digits 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword (AUTH-P-008) > rejects a password with fewer than 2 special characters 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > a valid password returns no errors 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > identifies a too-short password 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > identifies a missing uppercase 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > identifies a missing lowercase 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > identifies too few digits 0ms
 ✓ src/auth/passwordPolicy.vitest.test.ts > validatePassword error messages (AUTH-P-008) > identifies too few special characters 0ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > creates one resource and stamps the signed-in providerId 2ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > rejects a duplicate: an ACTIVE resource with same title + address exists (any provider) 0ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > allows re-posting when no ACTIVE match exists (previous pin expired or deleted) 0ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > allows a different title at the same address (not a duplicate) 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > accepts a resource with a category selected 1ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects a missing category 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects an empty category 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects a whitespace-only category 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > accepts coordinates within valid ranges 1ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects latitude below -90 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects latitude above 90 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects longitude below -180 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects longitude above 180 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects NaN latitude 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects infinite longitude 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > accepts boundary values (-90, 90, -180, 180) 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > accepts a resource with a non-empty title 3ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects an empty title 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects a whitespace-only title 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects a missing title 0ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > records a 'created' audit event on successful creation 2ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > does NOT record an audit event when creation is blocked as a duplicate 0ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > does NOT record an audit event when the insert fails 1ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > accepts a resource with latitude and longitude 2ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects a missing latitude 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects a missing longitude 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects when both coordinates are missing 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > requestPasswordReset (AUTH-P-007) — no enumeration > returns the SAME response for an existing and a non-existing email 2ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > sets a new password with a valid, unexpired, unused token 1ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an already-used token (single-use) 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an expired token 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an unknown/tampered token 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > invalidates old sessions on a successful reset 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > accepts a valid future expiration within one year 2ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects a missing expiration date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects an invalid date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects a past date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects an expiration more than one year out 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > formats 10 digits as (XXX)XXX-XXXX 1ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects fewer than 10 digits 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects more than 10 digits 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects input containing letters 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects an empty string 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > the approved status set is exactly ACTIVE and EXPIRED 1ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > accepts ACTIVE 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > accepts EXPIRED 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > rejects any value outside the approved set 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > permits an ACTIVE membership in a verified, active org 1ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when membership is not ACTIVE 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when there is no membership 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when the org is not verified 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when the org is not active 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when there is no user 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > returns a session for correct email + password 1ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > denies wrong password with a generic error and no session 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > denies a removed/absent user with the SAME generic error 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > does not reveal which factor failed (wrong password vs no user match) 0ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > returns coordinates for an address the geocoder resolves 1ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > returns an invalid-address error when the geocoder finds no match 0ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > does not preserve coordinates when the geocoder throws 0ms

 Test Files  15 passed (15)
      Tests  76 passed (76)
   Start at  11:40:22
   Duration  331ms (transform 247ms, setup 0ms, import 402ms, tests 44ms, environment 3ms)


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/reader

 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns only the signed-in user's saved resources 1ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > does not return another user's saved resources 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns a different set for a different user 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns an empty list for a user with no saved resources 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > removes the saved card with the given id 1ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > leaves other saved cards intact 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns the list unchanged when the id is not saved 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > does not mutate or return the original saved list 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns an empty list when the last saved card is removed 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces a Tornado Warning 1ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces hurricane, flood, winter storm, and severe thunderstorm warnings 1ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out a Watch (not a Warning) 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out events not on the named list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > keeps only the warnings from a mixed list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > returns an empty list when there are no features 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > accepts a valid future date and time 1ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing date 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing time 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects an invalid date that is not a real day 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a non-date value 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a date and time in the past 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects the exact current moment (must be in the future) 0ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > preserves the full resource detail in the saved record 1ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > keeps the saved snapshot unchanged when the live resource is later edited 0ms
 ✓ src/alerts/temperatureAlert.vitest.test.ts > temperatureAlert (ALERT-R-001 thresholds) > flags a hot alert at exactly 91°F 1ms
 ✓ src/alerts/temperatureAlert.vitest.test.ts > temperatureAlert (ALERT-R-001 thresholds) > flags a hot alert above 91°F 0ms
 ✓ src/alerts/temperatureAlert.vitest.test.ts > temperatureAlert (ALERT-R-001 thresholds) > flags a cold alert at exactly 32°F 0ms
 ✓ src/alerts/temperatureAlert.vitest.test.ts > temperatureAlert (ALERT-R-001 thresholds) > flags a cold alert below 32°F 0ms
 ✓ src/alerts/temperatureAlert.vitest.test.ts > temperatureAlert (ALERT-R-001 thresholds) > does not flag a temperature between the thresholds 0ms
 ✓ src/alerts/temperatureAlert.vitest.test.ts > temperatureAlert (ALERT-R-001 thresholds) > does not flag just above the cold threshold (33°F) 0ms
 ✓ src/alerts/temperatureAlert.vitest.test.ts > temperatureAlert (ALERT-R-001 thresholds) > does not flag just below the hot threshold (90°F) 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a resource to an empty saved list 2ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a different resource to an existing saved list 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not create a second card when the same resource is saved twice 1ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not duplicate when the same resource id is already in a longer list 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules exactly one notification for a valid future reminder 2ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is invalid, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is in the past, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the date is missing, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules only one notification, never duplicates 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001 combine + graceful failure) > combines temperature and NWS warnings for the location 3ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001 combine + graceful failure) > still returns NWS warnings when the weather API fails 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001 combine + graceful failure) > still returns temperature alerts when the NWS API fails 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001 combine + graceful failure) > returns no alerts but flags both failures when both APIs fail 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001 combine + graceful failure) > returns no alerts when conditions are normal and both APIs succeed 0ms

 Test Files  9 passed (9)
      Tests  45 passed (45)
   Start at  16:14:05
   Duration  185ms (transform 168ms, setup 0ms, import 260ms, tests 26ms, environment 0ms)

