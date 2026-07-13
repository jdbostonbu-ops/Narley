
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


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/provider

 ✓ src/resources/updateResource.vitest.test.ts > updateResource (EDIT-009) > saves changes to the existing resource 2ms
 ✓ src/resources/updateResource.vitest.test.ts > updateResource (EDIT-009) > updates the existing record and does not create a second resource 0ms
 ✓ src/resources/updateResource.vitest.test.ts > updateResource (EDIT-009) > can update multiple fields at once 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > allows a verified provider to create a resource 1ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > blocks a provider whose organization is not verified 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > blocks when the membership is not ACTIVE 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > blocks when the organization is inactive 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > does not record an audit event when the write is blocked 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > accepts a resource with a non-empty title 1ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects an empty title 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects a whitespace-only title 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects a missing title 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > accepts coordinates within valid ranges 1ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects latitude below -90 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects latitude above 90 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects longitude below -180 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects longitude above 180 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects NaN latitude 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects infinite longitude 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > accepts boundary values (-90, 90, -180, 180) 0ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > sends the reader report to OpenAI for verification 3ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > creates a provider alert carrying the reader report fields and AI findings 1ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > creates the alert labeled uncertain when the AI result is uncertain 0ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > still surfaces an uncertain result (does not suppress the alert) 0ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > does not create an alert when the AI result is invalid (no findings) 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > requestPasswordReset (AUTH-P-007) — no enumeration > returns the SAME response for an existing and a non-existing email 2ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > sets a new password with a valid, unexpired, unused token 1ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an already-used token (single-use) 1ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an expired token 1ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an unknown/tampered token 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > invalidates old sessions on a successful reset 0ms
 ✓ src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > never edits, closes, archives, deletes, or publishes a resource, even when AI says 'closed' 2ms
 ✓ src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > does not mutate a resource even when the AI result is uncertain 1ms
 ✓ src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > its only resource-facing side effect is creating an alert 0ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > creates one resource and stamps the signed-in providerId 3ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > rejects a duplicate: an ACTIVE resource with same title + address exists (any provider) 0ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > allows re-posting when no ACTIVE match exists (previous pin expired or deleted) 0ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > allows a different title at the same address (not a duplicate) 0ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > records a 'created' audit event on successful creation 3ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > does NOT record an audit event when creation is blocked as a duplicate 0ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > does NOT record an audit event when the insert fails 1ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > accepts a resource with a category selected 1ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects a missing category 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects an empty category 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects a whitespace-only category 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > accepts a resource with latitude and longitude 1ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects a missing latitude 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects a missing longitude 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects when both coordinates are missing 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > accepts a result with findings, confidence, and traceable sources 1ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > labels a low-confidence result as uncertain 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > labels a result with no sources as uncertain 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects a result with no findings 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects a result with no confidence label 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects an unrecognized confidence label 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > strips fabricated evidence with no traceable source 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > caps evidence at 3 primary sources 0ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > allows an active member of the owning organization to update 1ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > blocks a member of a different organization from updating 0ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > does not write or record an audit event when the editor is unauthorized 0ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > blocks an inactive member of the owning organization 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > writes a valid resource 2ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > blocks a resource with no title 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > blocks a resource with out-of-range coordinates 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > blocks a resource with a past expiration date 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > does not record an audit event when validation blocks the write 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > returns the validation errors when blocked 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > includes only resources whose address ZIP matches the searched ZIP 2ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > matches a resource with a ZIP+4 address against a 5-digit search 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > returns an empty array when no resource matches the ZIP 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > excludes resources with no extractable ZIP 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > returns an empty array for an empty resource list 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts report alerts regardless of the Weather Alerts setting 1ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts weather alerts only when Weather Alerts is on 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts report alerts plus weather alerts when the setting is on 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts only report alerts when the setting is off 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > returns zero for an empty alert list 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > returns zero when only weather alerts exist and the setting is off 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > sends a complete report to Narley admin 3ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the address is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the provider name is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the provider email is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the provider phone is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when supporting details are missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > accepts details up to 500 words 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects details over 500 words 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > includes ACTIVE, unexpired resources 2ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > excludes expired resources 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > excludes EXPIRED-status resources 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > returns an empty array when nothing is visible 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > returns an empty array for an empty input 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > saves a valid future expiration date (extend the pin) 1ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > rejects a past expiration date and does not save 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > rejects an invalid date and does not save 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > rejects a missing expiration when expiration is being edited and does not save 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > does not record an audit event when the expiration edit is rejected 0ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > an active resource is visible regardless of which organization owns it 1ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > isResourceVisible gives the same answer no matter the owner (owner does not change visibility) 0ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > the reader-visible set includes resources from every organization, not just one 1ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > does not filter resources by any viewer or owner identity 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > accepts a resource with an address 1ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects a missing address 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects an empty address 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects a whitespace-only address 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > accepts a valid future expiration within one year 2ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects a missing expiration date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects an invalid date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects a past date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects an expiration more than one year out 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > permits an ACTIVE membership in a verified, active org 1ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when membership is not ACTIVE 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when there is no membership 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when the org is not verified 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when the org is not active 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when there is no user 0ms
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
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > returns a session for correct email + password 1ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > denies wrong password with a generic error and no session 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > denies a removed/absent user with the SAME generic error 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > does not reveal which factor failed (wrong password vs no user match) 0ms
 ✓ src/resources/updateResourceAudit.vitest.test.ts > updateResource audit event (EDIT-010) > records one 'updated' audit event on a successful update 4ms
 ✓ src/resources/updateResourceAudit.vitest.test.ts > updateResource audit event (EDIT-010) > does NOT record an audit event when the update fails 1ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > returns coordinates for an address the geocoder resolves 1ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > returns an invalid-address error when the geocoder finds no match 0ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > does not preserve coordinates when the geocoder throws 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > the approved status set is exactly ACTIVE and EXPIRED 1ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > accepts ACTIVE 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > accepts EXPIRED 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > rejects any value outside the approved set 0ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > extracts the 5-digit ZIP from a complete address 1ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > extracts the ZIP when it is at the end with no trailing text 0ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > returns null when there is no 5-digit ZIP 0ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > returns null for an empty address 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > shows an ACTIVE resource whose expiration is in the future 1ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > hides an ACTIVE resource whose expiration has passed 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > hides a resource explicitly marked EXPIRED 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > hides a resource at the exact expiration moment 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > shows an ACTIVE resource one second before expiration 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > formats 10 digits as (XXX)XXX-XXXX 1ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects fewer than 10 digits 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects more than 10 digits 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects input containing letters 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects an empty string 0ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > renames the resource when no active duplicate exists 1ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > rejects a rename that collides with a DIFFERENT active resource 0ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > does not flag the resource being edited as its own duplicate 0ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > does not record an audit event when a rename is rejected as a duplicate 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > allows an active member of the resource's organization 1ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > allows a different member of the same organization (coworker edits A's pin) 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies a member of a different organization 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies when the membership is not ACTIVE 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies when there is no membership 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies when there is no user 0ms

 Test Files  33 passed (33)
      Tests  164 passed (164)
   Start at  19:33:15
   Duration  620ms (transform 417ms, setup 0ms, import 735ms, tests 96ms, environment 2ms)


> reader@1.0.0 test:unit
> vitest run --config vitest.config.js --reporter=verbose


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/reader

 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns only the signed-in user's saved resources 1ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > does not return another user's saved resources 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns a different set for a different user 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns an empty list for a user with no saved resources 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > creates a report from resourceId, address, and selected reason 1ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects a missing reason with a clear message 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects when no reason is provided at all 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > does not include or touch the resource itself, only report data 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a HEAT forecast alert with advice, no severity 1ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a COLD forecast alert with advice, no severity 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes an NWS alert with severity, no advice 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > gives every normalized alert the same fields 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > submits a complete report and returns the confirmation message 1ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the reason is missing, and prompts to complete 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the resourceId is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the address is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not return a success message when the report is incomplete 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > removes the saved card with the given id 2ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > leaves other saved cards intact 1ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns the list unchanged when the id is not saved 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > does not mutate or return the original saved list 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns an empty list when the last saved card is removed 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > the approved set is exactly the five reader reasons 2ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Closed / no longer operating' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong hours' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong address / location' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'No more resources available' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Phone disconnected / no longer working' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects a reason outside the approved set 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects an empty reason 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns normalized alerts from both sources 2ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > normalizes the forecast alert with advice and expected time 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns NWS warnings when the weather API fails 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns forecast temperature alerts when the NWS API fails 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts but flags both failures when both APIs fail 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts when the forecast is mild and NWS is empty 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns alerts from both sources when Weather Alerts is ON 2ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns no alerts when Weather Alerts is OFF 1ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > does not call either API when Weather Alerts is OFF 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > fetches from both sources when Weather Alerts is ON 1ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules exactly one notification for a valid future reminder 1ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is invalid, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is in the past, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the date is missing, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules only one notification, never duplicates 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > accepts a valid future date and time 1ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing date 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing time 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects an invalid date that is not a real day 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a non-date value 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a date and time in the past 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects the exact current moment (must be in the future) 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a resource to an empty saved list 1ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a different resource to an existing saved list 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not create a second card when the same resource is saved twice 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not duplicate when the same resource id is already in a longer list 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags heat at the first hour that reaches 91F, with its time 1ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags cold at the first hour that reaches 32F, with its time 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > reports the earliest crossing when several hours exceed the threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag when no hour crosses a threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag just inside the thresholds (90F and 33F) 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > returns no alert for an empty forecast 0ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > preserves the full resource detail in the saved record 1ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > keeps the saved snapshot unchanged when the live resource is later edited 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces a Tornado Warning 1ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces hurricane, flood, winter storm, and severe thunderstorm warnings 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out a Watch (not a Warning) 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out events not on the named list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > keeps only the warnings from a mixed list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > returns an empty list when there are no features 0ms
 ✓ src/theme/sharedThemeImport.vitest.test.ts > shared UI theme import > resolves the shared theme through the monorepo alias 1ms

 Test Files  15 passed (15)
      Tests  71 passed (71)
   Start at  20:12:33
   Duration  307ms (transform 173ms, setup 0ms, import 316ms, tests 40ms, environment 1ms)


> reader@1.0.0 test:unit
> vitest run --config vitest.config.js --reporter=verbose


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/reader

 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a HEAT forecast alert with advice, no severity 1ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a COLD forecast alert with advice, no severity 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes an NWS alert with severity, no advice 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > gives every normalized alert the same fields 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > submits a complete report and returns the confirmation message 1ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the reason is missing, and prompts to complete 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the resourceId is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the address is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not return a success message when the report is incomplete 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > removes the saved card with the given id 1ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > leaves other saved cards intact 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns the list unchanged when the id is not saved 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > does not mutate or return the original saved list 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns an empty list when the last saved card is removed 0ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns a 6-character code 1ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns only allowed alphanumeric characters (A-Z, 0-9) 0ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > produces varying codes (not a constant value) 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > the approved set is exactly the five reader reasons 2ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Closed / no longer operating' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong hours' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong address / location' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'No more resources available' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Phone disconnected / no longer working' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects a reason outside the approved set 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects an empty reason 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > creates a report from resourceId, address, and selected reason 2ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects a missing reason with a clear message 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects when no reason is provided at all 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > does not include or touch the resource itself, only report data 1ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates an unverified user for a valid new email + policy-compliant password 2ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > hashes the password before creating the user (never stores plaintext) 1ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects a password that fails the strength policy, without creating a user (AUTH-R-008) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects signup when the email is already registered, without creating a user 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates the user as unverified (email verification required next per AUTH-R-003) 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns alerts from both sources when Weather Alerts is ON 1ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns no alerts when Weather Alerts is OFF 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > does not call either API when Weather Alerts is OFF 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > fetches from both sources when Weather Alerts is ON 1ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns normalized alerts from both sources 3ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > normalizes the forecast alert with advice and expected time 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns NWS warnings when the weather API fails 1ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns forecast temperature alerts when the NWS API fails 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts but flags both failures when both APIs fail 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts when the forecast is mild and NWS is empty 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > verifies the email for a matching, unexpired, unused code 1ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects when no matching code is found, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an expired code, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an already-used code (single-use), without verifying 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces a Tornado Warning 2ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces hurricane, flood, winter storm, and severe thunderstorm warnings 1ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out a Watch (not a Warning) 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out events not on the named list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > keeps only the warnings from a mixed list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > returns an empty list when there are no features 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'loading' while auth state is resolving (AUTH-R-001) 1ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'auth' when there is no user (AUTH-R-002 — logged-out sees login/signup) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'verify' when the user is logged in but email is unverified (AUTH-R-003) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'tabs' when the user is logged in and email is verified (AUTH-R-004) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for a logged-out user (AUTH-R-002 — tabs hidden) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for an unverified user (AUTH-R-004 requires verification) 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > returns a session for a correct email + password 2ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > includes the user's emailVerified status in the session result 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies a wrong password with a generic error and no session 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies an unknown email with the SAME generic error (no enumeration) 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > does not reveal which factor failed (wrong password vs no user) 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > accepts a valid future date and time 1ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing date 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing time 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects an invalid date that is not a real day 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a non-date value 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a date and time in the past 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects the exact current moment (must be in the future) 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules exactly one notification for a valid future reminder 1ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is invalid, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is in the past, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the date is missing, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules only one notification, never duplicates 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a resource to an empty saved list 2ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a different resource to an existing saved list 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not create a second card when the same resource is saved twice 1ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not duplicate when the same resource id is already in a longer list 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns only the signed-in user's saved resources 1ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > does not return another user's saved resources 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns a different set for a different user 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns an empty list for a user with no saved resources 0ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > preserves the full resource detail in the saved record 1ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > keeps the saved snapshot unchanged when the live resource is later edited 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags heat at the first hour that reaches 91F, with its time 1ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags cold at the first hour that reaches 32F, with its time 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > reports the earliest crossing when several hours exceed the threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag when no hour crosses a threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag just inside the thresholds (90F and 33F) 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > returns no alert for an empty forecast 0ms
 ✓ src/theme/sharedThemeImport.vitest.test.ts > shared UI theme import > resolves the shared theme through the monorepo alias 1ms

 Test Files  20 passed (20)
      Tests  94 passed (94)
   Start at  21:13:42
   Duration  407ms (transform 273ms, setup 0ms, import 456ms, tests 59ms, environment 1ms)


> reader@1.0.0 test:unit
> vitest run --config vitest.config.js --reporter=verbose


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/reader

 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces a Tornado Warning 1ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces hurricane, flood, winter storm, and severe thunderstorm warnings 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out a Watch (not a Warning) 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out events not on the named list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > keeps only the warnings from a mixed list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > returns an empty list when there are no features 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > returns a session for a correct email + password 1ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > includes the user's emailVerified status in the session result 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies a wrong password with a generic error and no session 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies an unknown email with the SAME generic error (no enumeration) 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > does not reveal which factor failed (wrong password vs no user) 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > creates a report from resourceId, address, and selected reason 1ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects a missing reason with a clear message 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects when no reason is provided at all 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > does not include or touch the resource itself, only report data 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates an unverified user for a valid new email + policy-compliant password 1ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > hashes the password before creating the user (never stores plaintext) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects a password that fails the strength policy, without creating a user (AUTH-R-008) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects signup when the email is already registered, without creating a user 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates the user as unverified (email verification required next per AUTH-R-003) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'loading' while auth state is resolving (AUTH-R-001) 1ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'auth' when there is no user (AUTH-R-002 — logged-out sees login/signup) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'verify' when the user is logged in but email is unverified (AUTH-R-003) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'tabs' when the user is logged in and email is verified (AUTH-R-004) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for a logged-out user (AUTH-R-002 — tabs hidden) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for an unverified user (AUTH-R-004 requires verification) 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > the approved set is exactly the five reader reasons 1ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Closed / no longer operating' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong hours' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong address / location' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'No more resources available' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Phone disconnected / no longer working' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects a reason outside the approved set 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects an empty reason 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a resource to an empty saved list 2ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a different resource to an existing saved list 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not create a second card when the same resource is saved twice 1ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not duplicate when the same resource id is already in a longer list 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns alerts from both sources when Weather Alerts is ON 1ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns no alerts when Weather Alerts is OFF 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > does not call either API when Weather Alerts is OFF 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > fetches from both sources when Weather Alerts is ON 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns normalized alerts from both sources 4ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > normalizes the forecast alert with advice and expected time 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns NWS warnings when the weather API fails 1ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns forecast temperature alerts when the NWS API fails 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts but flags both failures when both APIs fail 1ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts when the forecast is mild and NWS is empty 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > submits a complete report and returns the confirmation message 1ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the reason is missing, and prompts to complete 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the resourceId is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the address is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not return a success message when the report is incomplete 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a HEAT forecast alert with advice, no severity 1ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a COLD forecast alert with advice, no severity 1ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes an NWS alert with severity, no advice 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > gives every normalized alert the same fields 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > removes the saved card with the given id 2ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > leaves other saved cards intact 1ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns the list unchanged when the id is not saved 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > does not mutate or return the original saved list 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns an empty list when the last saved card is removed 0ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns a 6-character code 1ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns only allowed alphanumeric characters (A-Z, 0-9) 1ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > produces varying codes (not a constant value) 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > accepts a valid future date and time 1ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing date 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing time 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects an invalid date that is not a real day 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a non-date value 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a date and time in the past 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects the exact current moment (must be in the future) 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns only the signed-in user's saved resources 2ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > does not return another user's saved resources 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns a different set for a different user 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns an empty list for a user with no saved resources 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules exactly one notification for a valid future reminder 1ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is invalid, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is in the past, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the date is missing, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules only one notification, never duplicates 0ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > preserves the full resource detail in the saved record 1ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > keeps the saved snapshot unchanged when the live resource is later edited 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > verifies the email for a matching, unexpired, unused code 2ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects when no matching code is found, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an expired code, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an already-used code (single-use), without verifying 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags heat at the first hour that reaches 91F, with its time 1ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags cold at the first hour that reaches 32F, with its time 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > reports the earliest crossing when several hours exceed the threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag when no hour crosses a threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag just inside the thresholds (90F and 33F) 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > returns no alert for an empty forecast 0ms
 ✓ src/theme/sharedThemeImport.vitest.test.ts > shared UI theme import > resolves the shared theme through the monorepo alias 1ms

 Test Files  20 passed (20)
      Tests  94 passed (94)
   Start at  21:18:04
   Duration  411ms (transform 253ms, setup 0ms, import 435ms, tests 56ms, environment 1ms)


> provider@1.0.0 test:unit
> vitest run --reporter=verbose


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/provider

 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > returns 'loading' while auth state is still loading (AUTH-P-001) 1ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > returns 'login' when there is no user (AUTH-P-002 — logged-out sees login) 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > returns 'tabs' when a user has an ACTIVE membership (AUTH-P-003 — logged-in sees tabs) 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > does NOT return 'tabs' for a logged-in user without an ACTIVE membership (AUTH-P-003 gate) 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > does NOT return 'tabs' for a logged-in user with no membership at all 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > never shows tabs to a logged-out user (AUTH-P-002 — tabs hidden when user === null) 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > returns a session for correct email + password 1ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > denies wrong password with a generic error and no session 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > denies a removed/absent user with the SAME generic error 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > does not reveal which factor failed (wrong password vs no user match) 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > requestPasswordReset (AUTH-P-007) — no enumeration > returns the SAME response for an existing and a non-existing email 1ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > sets a new password with a valid, unexpired, unused token 1ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an already-used token (single-use) 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an expired token 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an unknown/tampered token 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > invalidates old sessions on a successful reset 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > accepts coordinates within valid ranges 2ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects latitude below -90 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects latitude above 90 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects longitude below -180 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects longitude above 180 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects NaN latitude 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects infinite longitude 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > accepts boundary values (-90, 90, -180, 180) 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > writes a valid resource 3ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > blocks a resource with no title 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > blocks a resource with out-of-range coordinates 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > blocks a resource with a past expiration date 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > does not record an audit event when validation blocks the write 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > returns the validation errors when blocked 0ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > records a 'created' audit event on successful creation 4ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > does NOT record an audit event when creation is blocked as a duplicate 0ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > does NOT record an audit event when the insert fails 1ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > creates one resource and stamps the signed-in providerId 5ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > rejects a duplicate: an ACTIVE resource with same title + address exists (any provider) 0ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > allows re-posting when no ACTIVE match exists (previous pin expired or deleted) 0ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > allows a different title at the same address (not a duplicate) 0ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > returns coordinates for an address the geocoder resolves 2ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > returns an invalid-address error when the geocoder finds no match 0ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > does not preserve coordinates when the geocoder throws 0ms
 ✓ src/resources/updateResource.vitest.test.ts > updateResource (EDIT-009) > saves changes to the existing resource 3ms
 ✓ src/resources/updateResource.vitest.test.ts > updateResource (EDIT-009) > updates the existing record and does not create a second resource 0ms
 ✓ src/resources/updateResource.vitest.test.ts > updateResource (EDIT-009) > can update multiple fields at once 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > allows an active member of the resource's organization 1ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > allows a different member of the same organization (coworker edits A's pin) 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies a member of a different organization 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies when the membership is not ACTIVE 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies when there is no membership 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies when there is no user 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > accepts a resource with an address 2ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects a missing address 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects an empty address 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects a whitespace-only address 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > accepts a resource with a category selected 2ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects a missing category 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects an empty category 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects a whitespace-only category 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > allows a verified provider to create a resource 3ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > blocks a provider whose organization is not verified 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > blocks when the membership is not ACTIVE 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > blocks when the organization is inactive 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > does not record an audit event when the write is blocked 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > accepts a resource with latitude and longitude 2ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects a missing latitude 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects a missing longitude 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects when both coordinates are missing 0ms
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
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > sends the reader report to OpenAI for verification 2ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > creates a provider alert carrying the reader report fields and AI findings 0ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > creates the alert labeled uncertain when the AI result is uncertain 0ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > still surfaces an uncertain result (does not suppress the alert) 0ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > does not create an alert when the AI result is invalid (no findings) 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > sends a complete report to Narley admin 3ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the address is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the provider name is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the provider email is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the provider phone is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when supporting details are missing 1ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > accepts details up to 500 words 1ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects details over 500 words 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > includes only resources whose address ZIP matches the searched ZIP 2ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > matches a resource with a ZIP+4 address against a 5-digit search 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > returns an empty array when no resource matches the ZIP 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > excludes resources with no extractable ZIP 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > returns an empty array for an empty resource list 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > accepts a resource with a non-empty title 14ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects an empty title 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects a whitespace-only title 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects a missing title 0ms
 ✓ src/resources/updateResourceAudit.vitest.test.ts > updateResource audit event (EDIT-010) > records one 'updated' audit event on a successful update 6ms
 ✓ src/resources/updateResourceAudit.vitest.test.ts > updateResource audit event (EDIT-010) > does NOT record an audit event when the update fails 2ms
 ✓ src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > never edits, closes, archives, deletes, or publishes a resource, even when AI says 'closed' 6ms
 ✓ src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > does not mutate a resource even when the AI result is uncertain 0ms
 ✓ src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > its only resource-facing side effect is creating an alert 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > accepts a valid future expiration within one year 2ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects a missing expiration date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects an invalid date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects a past date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects an expiration more than one year out 0ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > allows an active member of the owning organization to update 2ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > blocks a member of a different organization from updating 0ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > does not write or record an audit event when the editor is unauthorized 0ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > blocks an inactive member of the owning organization 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > saves a valid future expiration date (extend the pin) 1ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > rejects a past expiration date and does not save 1ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > rejects an invalid date and does not save 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > rejects a missing expiration when expiration is being edited and does not save 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > does not record an audit event when the expiration edit is rejected 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > includes ACTIVE, unexpired resources 1ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > excludes expired resources 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > excludes EXPIRED-status resources 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > returns an empty array when nothing is visible 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > returns an empty array for an empty input 0ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > an active resource is visible regardless of which organization owns it 2ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > isResourceVisible gives the same answer no matter the owner (owner does not change visibility) 0ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > the reader-visible set includes resources from every organization, not just one 1ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > does not filter resources by any viewer or owner identity 0ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > renames the resource when no active duplicate exists 2ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > rejects a rename that collides with a DIFFERENT active resource 0ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > does not flag the resource being edited as its own duplicate 0ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > does not record an audit event when a rename is rejected as a duplicate 0ms
 ✓ src/pins/resourceCategories.vitest.test.ts > resource category pin configuration > defines the approved visual identity for each preset category 1ms
 ✓ src/pins/resourceCategories.vitest.test.ts > resource category pin configuration > resolves ids and labels while safely falling back for custom categories 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > accepts a result with findings, confidence, and traceable sources 2ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > labels a low-confidence result as uncertain 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > labels a result with no sources as uncertain 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects a result with no findings 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects a result with no confidence label 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects an unrecognized confidence label 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > strips fabricated evidence with no traceable source 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > caps evidence at 3 primary sources 0ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > starts logged out with no user and not loading 1ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > marks loading true while a login is in progress 0ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > sets the user and clears loading on a successful login (AUTH-P-003) 1ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > clears loading and keeps no user on a failed login (AUTH-P-002) 0ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > clears the user on logout (AUTH-P-002 — logged-out returns to no user) 0ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > extracts the 5-digit ZIP from a complete address 1ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > extracts the ZIP when it is at the end with no trailing text 0ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > returns null when there is no 5-digit ZIP 0ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > returns null for an empty address 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > permits an ACTIVE membership in a verified, active org 1ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when membership is not ACTIVE 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when there is no membership 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when the org is not verified 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when the org is not active 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when there is no user 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > the approved status set is exactly ACTIVE and EXPIRED 1ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > accepts ACTIVE 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > accepts EXPIRED 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > rejects any value outside the approved set 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > formats 10 digits as (XXX)XXX-XXXX 1ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects fewer than 10 digits 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects more than 10 digits 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects input containing letters 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects an empty string 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > shows an ACTIVE resource whose expiration is in the future 1ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > hides an ACTIVE resource whose expiration has passed 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > hides a resource explicitly marked EXPIRED 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > hides a resource at the exact expiration moment 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > shows an ACTIVE resource one second before expiration 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts report alerts regardless of the Weather Alerts setting 1ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts weather alerts only when Weather Alerts is on 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts report alerts plus weather alerts when the setting is on 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts only report alerts when the setting is off 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > returns zero for an empty alert list 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > returns zero when only weather alerts exist and the setting is off 0ms
 ✓ src/weather/mapOpenMeteoForecast.vitest.test.ts > mapOpenMeteoForecast > maps daily Open-Meteo maximum temperatures to the tested forecast shape 1ms
 ✓ src/weather/mapOpenMeteoForecast.vitest.test.ts > mapOpenMeteoForecast > rejects malformed or mismatched forecast arrays 0ms

 Test Files  37 passed (37)
      Tests  179 passed (179)
   Start at  21:18:09
   Duration  841ms (transform 618ms, setup 0ms, import 1.09s, tests 150ms, environment 2ms)


> reader@1.0.0 test:unit
> vitest run --config vitest.config.js --reporter=verbose


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/reader

 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns a 6-character code 1ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns only allowed alphanumeric characters (A-Z, 0-9) 1ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > produces varying codes (not a constant value) 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > removes the saved card with the given id 1ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > leaves other saved cards intact 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns the list unchanged when the id is not saved 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > does not mutate or return the original saved list 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns an empty list when the last saved card is removed 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > the approved set is exactly the five reader reasons 1ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Closed / no longer operating' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong hours' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong address / location' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'No more resources available' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Phone disconnected / no longer working' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects a reason outside the approved set 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects an empty reason 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'loading' while auth state is resolving (AUTH-R-001) 1ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'auth' when there is no user (AUTH-R-002 — logged-out sees login/signup) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'verify' when the user is logged in but email is unverified (AUTH-R-003) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'tabs' when the user is logged in and email is verified (AUTH-R-004) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for a logged-out user (AUTH-R-002 — tabs hidden) 1ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for an unverified user (AUTH-R-004 requires verification) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates an unverified user for a valid new email + policy-compliant password 2ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > hashes the password before creating the user (never stores plaintext) 1ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects a password that fails the strength policy, without creating a user (AUTH-R-008) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects signup when the email is already registered, without creating a user 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates the user as unverified (email verification required next per AUTH-R-003) 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces a Tornado Warning 1ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces hurricane, flood, winter storm, and severe thunderstorm warnings 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out a Watch (not a Warning) 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out events not on the named list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > keeps only the warnings from a mixed list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > returns an empty list when there are no features 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules exactly one notification for a valid future reminder 1ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is invalid, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is in the past, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the date is missing, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules only one notification, never duplicates 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns alerts from both sources when Weather Alerts is ON 1ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns no alerts when Weather Alerts is OFF 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > does not call either API when Weather Alerts is OFF 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > fetches from both sources when Weather Alerts is ON 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns normalized alerts from both sources 3ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > normalizes the forecast alert with advice and expected time 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns NWS warnings when the weather API fails 1ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns forecast temperature alerts when the NWS API fails 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts but flags both failures when both APIs fail 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts when the forecast is mild and NWS is empty 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > accepts a valid future date and time 1ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing date 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing time 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects an invalid date that is not a real day 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a non-date value 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a date and time in the past 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects the exact current moment (must be in the future) 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns only the signed-in user's saved resources 2ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > does not return another user's saved resources 1ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns a different set for a different user 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns an empty list for a user with no saved resources 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > submits a complete report and returns the confirmation message 2ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the reason is missing, and prompts to complete 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the resourceId is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the address is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not return a success message when the report is incomplete 1ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > preserves the full resource detail in the saved record 1ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > keeps the saved snapshot unchanged when the live resource is later edited 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a resource to an empty saved list 2ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a different resource to an existing saved list 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not create a second card when the same resource is saved twice 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not duplicate when the same resource id is already in a longer list 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > creates a report from resourceId, address, and selected reason 2ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects a missing reason with a clear message 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects when no reason is provided at all 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > does not include or touch the resource itself, only report data 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > verifies the email for a matching, unexpired, unused code 3ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects when no matching code is found, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an expired code, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an already-used code (single-use), without verifying 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > returns a session for a correct email + password 1ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > includes the user's emailVerified status in the session result 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies a wrong password with a generic error and no session 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies an unknown email with the SAME generic error (no enumeration) 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > does not reveal which factor failed (wrong password vs no user) 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a HEAT forecast alert with advice, no severity 1ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a COLD forecast alert with advice, no severity 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes an NWS alert with severity, no advice 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > gives every normalized alert the same fields 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags heat at the first hour that reaches 91F, with its time 1ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags cold at the first hour that reaches 32F, with its time 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > reports the earliest crossing when several hours exceed the threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag when no hour crosses a threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag just inside the thresholds (90F and 33F) 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > returns no alert for an empty forecast 0ms
 ✓ src/theme/sharedThemeImport.vitest.test.ts > shared UI theme import > resolves the shared theme through the monorepo alias 1ms

 Test Files  20 passed (20)
      Tests  94 passed (94)
   Start at  21:32:44
   Duration  430ms (transform 293ms, setup 0ms, import 481ms, tests 58ms, environment 1ms)


> provider@1.0.0 test:unit
> vitest run --reporter=verbose


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/provider

 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > accepts a resource with a non-empty title 1ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects an empty title 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects a whitespace-only title 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects a missing title 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > sends a complete report to Narley admin 2ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the address is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the provider name is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the provider email is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the provider phone is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when supporting details are missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > accepts details up to 500 words 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects details over 500 words 0ms
 ✓ src/resources/updateResource.vitest.test.ts > updateResource (EDIT-009) > saves changes to the existing resource 3ms
 ✓ src/resources/updateResource.vitest.test.ts > updateResource (EDIT-009) > updates the existing record and does not create a second resource 0ms
 ✓ src/resources/updateResource.vitest.test.ts > updateResource (EDIT-009) > can update multiple fields at once 0ms
 ✓ src/resources/updateResourceAudit.vitest.test.ts > updateResource audit event (EDIT-010) > records one 'updated' audit event on a successful update 2ms
 ✓ src/resources/updateResourceAudit.vitest.test.ts > updateResource audit event (EDIT-010) > does NOT record an audit event when the update fails 1ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > writes a valid resource 2ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > blocks a resource with no title 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > blocks a resource with out-of-range coordinates 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > blocks a resource with a past expiration date 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > does not record an audit event when validation blocks the write 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > returns the validation errors when blocked 0ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > creates one resource and stamps the signed-in providerId 3ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > rejects a duplicate: an ACTIVE resource with same title + address exists (any provider) 0ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > allows re-posting when no ACTIVE match exists (previous pin expired or deleted) 0ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > allows a different title at the same address (not a duplicate) 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > allows a verified provider to create a resource 3ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > blocks a provider whose organization is not verified 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > blocks when the membership is not ACTIVE 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > blocks when the organization is inactive 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > does not record an audit event when the write is blocked 0ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > records a 'created' audit event on successful creation 4ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > does NOT record an audit event when creation is blocked as a duplicate 0ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > does NOT record an audit event when the insert fails 1ms
 ✓ src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > never edits, closes, archives, deletes, or publishes a resource, even when AI says 'closed' 2ms
 ✓ src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > does not mutate a resource even when the AI result is uncertain 0ms
 ✓ src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > its only resource-facing side effect is creating an alert 0ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > sends the reader report to OpenAI for verification 1ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > creates a provider alert carrying the reader report fields and AI findings 1ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > creates the alert labeled uncertain when the AI result is uncertain 0ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > still surfaces an uncertain result (does not suppress the alert) 0ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > does not create an alert when the AI result is invalid (no findings) 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > accepts a resource with a category selected 2ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects a missing category 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects an empty category 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects a whitespace-only category 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > accepts coordinates within valid ranges 2ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects latitude below -90 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects latitude above 90 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects longitude below -180 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects longitude above 180 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects NaN latitude 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects infinite longitude 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > accepts boundary values (-90, 90, -180, 180) 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > accepts a result with findings, confidence, and traceable sources 1ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > labels a low-confidence result as uncertain 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > labels a result with no sources as uncertain 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects a result with no findings 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects a result with no confidence label 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects an unrecognized confidence label 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > strips fabricated evidence with no traceable source 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > caps evidence at 3 primary sources 0ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > returns coordinates for an address the geocoder resolves 1ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > returns an invalid-address error when the geocoder finds no match 0ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > does not preserve coordinates when the geocoder throws 0ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > allows an active member of the owning organization to update 1ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > blocks a member of a different organization from updating 0ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > does not write or record an audit event when the editor is unauthorized 0ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > blocks an inactive member of the owning organization 0ms
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
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > starts logged out with no user and not loading 1ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > marks loading true while a login is in progress 0ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > sets the user and clears loading on a successful login (AUTH-P-003) 0ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > clears loading and keeps no user on a failed login (AUTH-P-002) 0ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > clears the user on logout (AUTH-P-002 — logged-out returns to no user) 0ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > an active resource is visible regardless of which organization owns it 1ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > isResourceVisible gives the same answer no matter the owner (owner does not change visibility) 0ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > the reader-visible set includes resources from every organization, not just one 0ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > does not filter resources by any viewer or owner identity 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > allows an active member of the resource's organization 1ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > allows a different member of the same organization (coworker edits A's pin) 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies a member of a different organization 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies when the membership is not ACTIVE 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies when there is no membership 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies when there is no user 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > saves a valid future expiration date (extend the pin) 1ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > rejects a past expiration date and does not save 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > rejects an invalid date and does not save 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > rejects a missing expiration when expiration is being edited and does not save 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > does not record an audit event when the expiration edit is rejected 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > accepts a valid future expiration within one year 1ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects a missing expiration date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects an invalid date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects a past date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects an expiration more than one year out 0ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > renames the resource when no active duplicate exists 1ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > rejects a rename that collides with a DIFFERENT active resource 0ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > does not flag the resource being edited as its own duplicate 0ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > does not record an audit event when a rename is rejected as a duplicate 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > accepts a resource with latitude and longitude 2ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects a missing latitude 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects a missing longitude 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects when both coordinates are missing 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > accepts a resource with an address 1ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects a missing address 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects an empty address 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects a whitespace-only address 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > requestPasswordReset (AUTH-P-007) — no enumeration > returns the SAME response for an existing and a non-existing email 1ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > sets a new password with a valid, unexpired, unused token 2ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an already-used token (single-use) 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an expired token 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an unknown/tampered token 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > invalidates old sessions on a successful reset 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > includes only resources whose address ZIP matches the searched ZIP 2ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > matches a resource with a ZIP+4 address against a 5-digit search 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > returns an empty array when no resource matches the ZIP 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > excludes resources with no extractable ZIP 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > returns an empty array for an empty resource list 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > formats 10 digits as (XXX)XXX-XXXX 1ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects fewer than 10 digits 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects more than 10 digits 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects input containing letters 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects an empty string 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > shows an ACTIVE resource whose expiration is in the future 1ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > hides an ACTIVE resource whose expiration has passed 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > hides a resource explicitly marked EXPIRED 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > hides a resource at the exact expiration moment 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > shows an ACTIVE resource one second before expiration 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > returns a session for correct email + password 1ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > denies wrong password with a generic error and no session 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > denies a removed/absent user with the SAME generic error 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > does not reveal which factor failed (wrong password vs no user match) 1ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > includes ACTIVE, unexpired resources 2ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > excludes expired resources 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > excludes EXPIRED-status resources 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > returns an empty array when nothing is visible 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > returns an empty array for an empty input 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > returns 'loading' while auth state is still loading (AUTH-P-001) 1ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > returns 'login' when there is no user (AUTH-P-002 — logged-out sees login) 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > returns 'tabs' when a user has an ACTIVE membership (AUTH-P-003 — logged-in sees tabs) 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > does NOT return 'tabs' for a logged-in user without an ACTIVE membership (AUTH-P-003 gate) 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > does NOT return 'tabs' for a logged-in user with no membership at all 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > never shows tabs to a logged-out user (AUTH-P-002 — tabs hidden when user === null) 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > permits an ACTIVE membership in a verified, active org 1ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when membership is not ACTIVE 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when there is no membership 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when the org is not verified 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when the org is not active 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when there is no user 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > the approved status set is exactly ACTIVE and EXPIRED 2ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > accepts ACTIVE 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > accepts EXPIRED 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > rejects any value outside the approved set 0ms
 ✓ src/pins/resourceCategories.vitest.test.ts > resource category pin configuration > defines the approved visual identity for each preset category 1ms
 ✓ src/pins/resourceCategories.vitest.test.ts > resource category pin configuration > resolves ids and labels while safely falling back for custom categories 0ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > extracts the 5-digit ZIP from a complete address 2ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > extracts the ZIP when it is at the end with no trailing text 0ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > returns null when there is no 5-digit ZIP 0ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > returns null for an empty address 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts report alerts regardless of the Weather Alerts setting 1ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts weather alerts only when Weather Alerts is on 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts report alerts plus weather alerts when the setting is on 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts only report alerts when the setting is off 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > returns zero for an empty alert list 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > returns zero when only weather alerts exist and the setting is off 0ms
 ✓ src/weather/mapOpenMeteoForecast.vitest.test.ts > mapOpenMeteoForecast > maps daily Open-Meteo maximum temperatures to the tested forecast shape 1ms
 ✓ src/weather/mapOpenMeteoForecast.vitest.test.ts > mapOpenMeteoForecast > rejects malformed or mismatched forecast arrays 0ms

 Test Files  37 passed (37)
      Tests  179 passed (179)
   Start at  21:32:51
   Duration  711ms (transform 439ms, setup 0ms, import 827ms, tests 112ms, environment 2ms)


> reader@1.0.0 test:unit
> vitest run --config vitest.config.js --reporter=verbose


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/reader

 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates an unverified user for a valid new email + policy-compliant password 1ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > hashes the password before creating the user (never stores plaintext) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects a password that fails the strength policy, without creating a user (AUTH-R-008) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects signup when the email is already registered, without creating a user 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates the user as unverified (email verification required next per AUTH-R-003) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'loading' while auth state is resolving (AUTH-R-001) 1ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'auth' when there is no user (AUTH-R-002 — logged-out sees login/signup) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'verify' when the user is logged in but email is unverified (AUTH-R-003) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'tabs' when the user is logged in and email is verified (AUTH-R-004) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for a logged-out user (AUTH-R-002 — tabs hidden) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for an unverified user (AUTH-R-004 requires verification) 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > verifies the email for a matching, unexpired, unused code 2ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects when no matching code is found, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an expired code, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an already-used code (single-use), without verifying 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > creates a report from resourceId, address, and selected reason 1ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects a missing reason with a clear message 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects when no reason is provided at all 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > does not include or touch the resource itself, only report data 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a resource to an empty saved list 1ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a different resource to an existing saved list 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not create a second card when the same resource is saved twice 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not duplicate when the same resource id is already in a longer list 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > submits a complete report and returns the confirmation message 2ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the reason is missing, and prompts to complete 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the resourceId is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the address is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not return a success message when the report is incomplete 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns only the signed-in user's saved resources 2ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > does not return another user's saved resources 1ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns a different set for a different user 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns an empty list for a user with no saved resources 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns alerts from both sources when Weather Alerts is ON 2ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns no alerts when Weather Alerts is OFF 1ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > does not call either API when Weather Alerts is OFF 1ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > fetches from both sources when Weather Alerts is ON 1ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns normalized alerts from both sources 5ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > normalizes the forecast alert with advice and expected time 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns NWS warnings when the weather API fails 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns forecast temperature alerts when the NWS API fails 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts but flags both failures when both APIs fail 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts when the forecast is mild and NWS is empty 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a HEAT forecast alert with advice, no severity 1ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a COLD forecast alert with advice, no severity 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes an NWS alert with severity, no advice 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > gives every normalized alert the same fields 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > the approved set is exactly the five reader reasons 1ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Closed / no longer operating' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong hours' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong address / location' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'No more resources available' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Phone disconnected / no longer working' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects a reason outside the approved set 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects an empty reason 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > removes the saved card with the given id 1ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > leaves other saved cards intact 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns the list unchanged when the id is not saved 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > does not mutate or return the original saved list 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns an empty list when the last saved card is removed 0ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns a 6-character code 1ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns only allowed alphanumeric characters (A-Z, 0-9) 1ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > produces varying codes (not a constant value) 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces a Tornado Warning 1ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces hurricane, flood, winter storm, and severe thunderstorm warnings 0ms
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
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > returns a session for a correct email + password 1ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > includes the user's emailVerified status in the session result 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies a wrong password with a generic error and no session 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies an unknown email with the SAME generic error (no enumeration) 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > does not reveal which factor failed (wrong password vs no user) 0ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > preserves the full resource detail in the saved record 1ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > keeps the saved snapshot unchanged when the live resource is later edited 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules exactly one notification for a valid future reminder 1ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is invalid, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is in the past, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the date is missing, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules only one notification, never duplicates 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags heat at the first hour that reaches 91F, with its time 1ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags cold at the first hour that reaches 32F, with its time 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > reports the earliest crossing when several hours exceed the threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag when no hour crosses a threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag just inside the thresholds (90F and 33F) 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > returns no alert for an empty forecast 0ms
 ✓ src/theme/sharedThemeImport.vitest.test.ts > shared UI theme import > resolves the shared theme through the monorepo alias 1ms

 Test Files  20 passed (20)
      Tests  94 passed (94)
   Start at  21:40:24
   Duration  393ms (transform 193ms, setup 0ms, import 372ms, tests 53ms, environment 1ms)


> reader@1.0.0 test:unit
> vitest run --config vitest.config.js --reporter=verbose


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/reader

 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a resource to an empty saved list 1ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a different resource to an existing saved list 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not create a second card when the same resource is saved twice 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not duplicate when the same resource id is already in a longer list 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > submits a complete report and returns the confirmation message 1ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the reason is missing, and prompts to complete 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the resourceId is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the address is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not return a success message when the report is incomplete 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > verifies the email for a matching, unexpired, unused code 1ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects when no matching code is found, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an expired code, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an already-used code (single-use), without verifying 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces a Tornado Warning 2ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces hurricane, flood, winter storm, and severe thunderstorm warnings 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out a Watch (not a Warning) 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out events not on the named list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > keeps only the warnings from a mixed list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > returns an empty list when there are no features 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns only the signed-in user's saved resources 2ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > does not return another user's saved resources 1ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns a different set for a different user 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns an empty list for a user with no saved resources 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates an unverified user for a valid new email + policy-compliant password 1ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > hashes the password before creating the user (never stores plaintext) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects a password that fails the strength policy, without creating a user (AUTH-R-008) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects signup when the email is already registered, without creating a user 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates the user as unverified (email verification required next per AUTH-R-003) 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns alerts from both sources when Weather Alerts is ON 2ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns no alerts when Weather Alerts is OFF 1ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > does not call either API when Weather Alerts is OFF 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > fetches from both sources when Weather Alerts is ON 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules exactly one notification for a valid future reminder 1ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is invalid, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is in the past, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the date is missing, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules only one notification, never duplicates 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns normalized alerts from both sources 3ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > normalizes the forecast alert with advice and expected time 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns NWS warnings when the weather API fails 1ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns forecast temperature alerts when the NWS API fails 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts but flags both failures when both APIs fail 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts when the forecast is mild and NWS is empty 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a HEAT forecast alert with advice, no severity 1ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a COLD forecast alert with advice, no severity 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes an NWS alert with severity, no advice 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > gives every normalized alert the same fields 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > creates a report from resourceId, address, and selected reason 2ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects a missing reason with a clear message 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects when no reason is provided at all 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > does not include or touch the resource itself, only report data 0ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > preserves the full resource detail in the saved record 1ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > keeps the saved snapshot unchanged when the live resource is later edited 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'loading' while auth state is resolving (AUTH-R-001) 1ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'auth' when there is no user (AUTH-R-002 — logged-out sees login/signup) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'verify' when the user is logged in but email is unverified (AUTH-R-003) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'tabs' when the user is logged in and email is verified (AUTH-R-004) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for a logged-out user (AUTH-R-002 — tabs hidden) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for an unverified user (AUTH-R-004 requires verification) 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > the approved set is exactly the five reader reasons 1ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Closed / no longer operating' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong hours' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong address / location' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'No more resources available' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Phone disconnected / no longer working' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects a reason outside the approved set 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects an empty reason 0ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns a 6-character code 1ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns only allowed alphanumeric characters (A-Z, 0-9) 0ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > produces varying codes (not a constant value) 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > removes the saved card with the given id 1ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > leaves other saved cards intact 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns the list unchanged when the id is not saved 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > does not mutate or return the original saved list 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns an empty list when the last saved card is removed 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > accepts a valid future date and time 2ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing date 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing time 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects an invalid date that is not a real day 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a non-date value 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a date and time in the past 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects the exact current moment (must be in the future) 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags heat at the first hour that reaches 91F, with its time 1ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags cold at the first hour that reaches 32F, with its time 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > reports the earliest crossing when several hours exceed the threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag when no hour crosses a threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag just inside the thresholds (90F and 33F) 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > returns no alert for an empty forecast 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > returns a session for a correct email + password 1ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > includes the user's emailVerified status in the session result 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies a wrong password with a generic error and no session 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies an unknown email with the SAME generic error (no enumeration) 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > does not reveal which factor failed (wrong password vs no user) 0ms
 ✓ src/theme/sharedThemeImport.vitest.test.ts > shared UI theme import > resolves the shared theme through the monorepo alias 1ms

 Test Files  20 passed (20)
      Tests  94 passed (94)
   Start at  22:28:25
   Duration  403ms (transform 268ms, setup 0ms, import 451ms, tests 53ms, environment 1ms)


> reader@1.0.0 test:unit
> vitest run --config vitest.config.js --reporter=verbose


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/reader

 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'loading' while auth state is resolving (AUTH-R-001) 1ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'auth' when there is no user (AUTH-R-002 — logged-out sees login/signup) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'verify' when the user is logged in but email is unverified (AUTH-R-003) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'tabs' when the user is logged in and email is verified (AUTH-R-004) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for a logged-out user (AUTH-R-002 — tabs hidden) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for an unverified user (AUTH-R-004 requires verification) 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns only the signed-in user's saved resources 2ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > does not return another user's saved resources 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns a different set for a different user 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns an empty list for a user with no saved resources 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > removes the saved card with the given id 1ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > leaves other saved cards intact 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns the list unchanged when the id is not saved 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > does not mutate or return the original saved list 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns an empty list when the last saved card is removed 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces a Tornado Warning 2ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces hurricane, flood, winter storm, and severe thunderstorm warnings 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out a Watch (not a Warning) 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out events not on the named list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > keeps only the warnings from a mixed list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > returns an empty list when there are no features 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > creates a report from resourceId, address, and selected reason 2ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects a missing reason with a clear message 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects when no reason is provided at all 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > does not include or touch the resource itself, only report data 1ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates an unverified user for a valid new email + policy-compliant password 1ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > hashes the password before creating the user (never stores plaintext) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects a password that fails the strength policy, without creating a user (AUTH-R-008) 1ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects signup when the email is already registered, without creating a user 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates the user as unverified (email verification required next per AUTH-R-003) 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > accepts a valid future date and time 2ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing date 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing time 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects an invalid date that is not a real day 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a non-date value 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a date and time in the past 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects the exact current moment (must be in the future) 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns alerts from both sources when Weather Alerts is ON 1ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns no alerts when Weather Alerts is OFF 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > does not call either API when Weather Alerts is OFF 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > fetches from both sources when Weather Alerts is ON 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns normalized alerts from both sources 2ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > normalizes the forecast alert with advice and expected time 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns NWS warnings when the weather API fails 1ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns forecast temperature alerts when the NWS API fails 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts but flags both failures when both APIs fail 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts when the forecast is mild and NWS is empty 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > verifies the email for a matching, unexpired, unused code 2ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects when no matching code is found, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an expired code, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an already-used code (single-use), without verifying 0ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > preserves the full resource detail in the saved record 3ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > keeps the saved snapshot unchanged when the live resource is later edited 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > submits a complete report and returns the confirmation message 1ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the reason is missing, and prompts to complete 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the resourceId is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the address is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not return a success message when the report is incomplete 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a resource to an empty saved list 2ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a different resource to an existing saved list 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not create a second card when the same resource is saved twice 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not duplicate when the same resource id is already in a longer list 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules exactly one notification for a valid future reminder 2ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is invalid, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is in the past, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the date is missing, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules only one notification, never duplicates 0ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns a 6-character code 2ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns only allowed alphanumeric characters (A-Z, 0-9) 1ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > produces varying codes (not a constant value) 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > the approved set is exactly the five reader reasons 1ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Closed / no longer operating' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong hours' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong address / location' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'No more resources available' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Phone disconnected / no longer working' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects a reason outside the approved set 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects an empty reason 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags heat at the first hour that reaches 91F, with its time 1ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags cold at the first hour that reaches 32F, with its time 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > reports the earliest crossing when several hours exceed the threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag when no hour crosses a threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag just inside the thresholds (90F and 33F) 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > returns no alert for an empty forecast 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a HEAT forecast alert with advice, no severity 1ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a COLD forecast alert with advice, no severity 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes an NWS alert with severity, no advice 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > gives every normalized alert the same fields 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > returns a session for a correct email + password 1ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > includes the user's emailVerified status in the session result 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies a wrong password with a generic error and no session 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies an unknown email with the SAME generic error (no enumeration) 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > does not reveal which factor failed (wrong password vs no user) 0ms
 ✓ src/theme/sharedThemeImport.vitest.test.ts > shared UI theme import > resolves the shared theme through the monorepo alias 1ms

 Test Files  20 passed (20)
      Tests  94 passed (94)
   Start at  22:38:37
   Duration  485ms (transform 331ms, setup 0ms, import 556ms, tests 61ms, environment 1ms)


> reader@1.0.0 test:unit
> vitest run --config vitest.config.js --reporter=verbose


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/reader

 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > preserves the full resource detail in the saved record 1ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > keeps the saved snapshot unchanged when the live resource is later edited 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a resource to an empty saved list 1ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a different resource to an existing saved list 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not create a second card when the same resource is saved twice 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not duplicate when the same resource id is already in a longer list 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns only the signed-in user's saved resources 1ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > does not return another user's saved resources 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns a different set for a different user 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns an empty list for a user with no saved resources 0ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns a 6-character code 1ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns only allowed alphanumeric characters (A-Z, 0-9) 0ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > produces varying codes (not a constant value) 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > accepts a valid future date and time 1ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing date 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing time 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects an invalid date that is not a real day 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a non-date value 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a date and time in the past 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects the exact current moment (must be in the future) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates an unverified user for a valid new email + policy-compliant password 1ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > hashes the password before creating the user (never stores plaintext) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects a password that fails the strength policy, without creating a user (AUTH-R-008) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects signup when the email is already registered, without creating a user 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates the user as unverified (email verification required next per AUTH-R-003) 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > creates a report from resourceId, address, and selected reason 1ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects a missing reason with a clear message 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects when no reason is provided at all 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > does not include or touch the resource itself, only report data 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules exactly one notification for a valid future reminder 1ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is invalid, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is in the past, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the date is missing, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules only one notification, never duplicates 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns normalized alerts from both sources 2ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > normalizes the forecast alert with advice and expected time 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns NWS warnings when the weather API fails 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns forecast temperature alerts when the NWS API fails 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts but flags both failures when both APIs fail 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts when the forecast is mild and NWS is empty 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags heat at the first hour that reaches 91F, with its time 1ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags cold at the first hour that reaches 32F, with its time 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > reports the earliest crossing when several hours exceed the threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag when no hour crosses a threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag just inside the thresholds (90F and 33F) 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > returns no alert for an empty forecast 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > verifies the email for a matching, unexpired, unused code 1ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects when no matching code is found, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an expired code, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an already-used code (single-use), without verifying 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > removes the saved card with the given id 2ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > leaves other saved cards intact 1ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns the list unchanged when the id is not saved 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > does not mutate or return the original saved list 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns an empty list when the last saved card is removed 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > submits a complete report and returns the confirmation message 2ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the reason is missing, and prompts to complete 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the resourceId is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the address is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not return a success message when the report is incomplete 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns alerts from both sources when Weather Alerts is ON 1ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns no alerts when Weather Alerts is OFF 1ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > does not call either API when Weather Alerts is OFF 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > fetches from both sources when Weather Alerts is ON 1ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > the approved set is exactly the five reader reasons 2ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Closed / no longer operating' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong hours' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong address / location' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'No more resources available' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Phone disconnected / no longer working' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects a reason outside the approved set 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects an empty reason 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'loading' while auth state is resolving (AUTH-R-001) 1ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'auth' when there is no user (AUTH-R-002 — logged-out sees login/signup) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'verify' when the user is logged in but email is unverified (AUTH-R-003) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'tabs' when the user is logged in and email is verified (AUTH-R-004) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for a logged-out user (AUTH-R-002 — tabs hidden) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for an unverified user (AUTH-R-004 requires verification) 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces a Tornado Warning 1ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces hurricane, flood, winter storm, and severe thunderstorm warnings 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out a Watch (not a Warning) 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out events not on the named list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > keeps only the warnings from a mixed list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > returns an empty list when there are no features 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a HEAT forecast alert with advice, no severity 1ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a COLD forecast alert with advice, no severity 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes an NWS alert with severity, no advice 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > gives every normalized alert the same fields 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > returns a session for a correct email + password 1ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > includes the user's emailVerified status in the session result 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies a wrong password with a generic error and no session 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies an unknown email with the SAME generic error (no enumeration) 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > does not reveal which factor failed (wrong password vs no user) 0ms
 ✓ src/theme/sharedThemeImport.vitest.test.ts > shared UI theme import > resolves the shared theme through the monorepo alias 1ms

 Test Files  20 passed (20)
      Tests  94 passed (94)
   Start at  22:50:04
   Duration  410ms (transform 271ms, setup 0ms, import 459ms, tests 51ms, environment 1ms)


> reader@1.0.0 test:unit
> vitest run --config vitest.config.js --reporter=verbose


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/reader

 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > removes the saved card with the given id 1ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > leaves other saved cards intact 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns the list unchanged when the id is not saved 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > does not mutate or return the original saved list 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns an empty list when the last saved card is removed 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > submits a complete report and returns the confirmation message 1ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the reason is missing, and prompts to complete 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the resourceId is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the address is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not return a success message when the report is incomplete 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates an unverified user for a valid new email + policy-compliant password 1ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > hashes the password before creating the user (never stores plaintext) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects a password that fails the strength policy, without creating a user (AUTH-R-008) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects signup when the email is already registered, without creating a user 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates the user as unverified (email verification required next per AUTH-R-003) 0ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns a 6-character code 1ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns only allowed alphanumeric characters (A-Z, 0-9) 0ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > produces varying codes (not a constant value) 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags heat at the first hour that reaches 91F, with its time 1ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags cold at the first hour that reaches 32F, with its time 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > reports the earliest crossing when several hours exceed the threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag when no hour crosses a threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag just inside the thresholds (90F and 33F) 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > returns no alert for an empty forecast 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'loading' while auth state is resolving (AUTH-R-001) 1ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'auth' when there is no user (AUTH-R-002 — logged-out sees login/signup) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'verify' when the user is logged in but email is unverified (AUTH-R-003) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'tabs' when the user is logged in and email is verified (AUTH-R-004) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for a logged-out user (AUTH-R-002 — tabs hidden) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for an unverified user (AUTH-R-004 requires verification) 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > the approved set is exactly the five reader reasons 1ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Closed / no longer operating' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong hours' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong address / location' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'No more resources available' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Phone disconnected / no longer working' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects a reason outside the approved set 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects an empty reason 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns alerts from both sources when Weather Alerts is ON 1ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns no alerts when Weather Alerts is OFF 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > does not call either API when Weather Alerts is OFF 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > fetches from both sources when Weather Alerts is ON 1ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns normalized alerts from both sources 3ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > normalizes the forecast alert with advice and expected time 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns NWS warnings when the weather API fails 1ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns forecast temperature alerts when the NWS API fails 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts but flags both failures when both APIs fail 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts when the forecast is mild and NWS is empty 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a resource to an empty saved list 1ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a different resource to an existing saved list 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not create a second card when the same resource is saved twice 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not duplicate when the same resource id is already in a longer list 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > accepts a valid future date and time 1ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing date 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing time 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects an invalid date that is not a real day 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a non-date value 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a date and time in the past 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects the exact current moment (must be in the future) 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns only the signed-in user's saved resources 2ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > does not return another user's saved resources 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns a different set for a different user 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns an empty list for a user with no saved resources 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules exactly one notification for a valid future reminder 1ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is invalid, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is in the past, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the date is missing, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules only one notification, never duplicates 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > creates a report from resourceId, address, and selected reason 2ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects a missing reason with a clear message 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects when no reason is provided at all 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > does not include or touch the resource itself, only report data 1ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > preserves the full resource detail in the saved record 1ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > keeps the saved snapshot unchanged when the live resource is later edited 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > verifies the email for a matching, unexpired, unused code 1ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects when no matching code is found, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an expired code, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an already-used code (single-use), without verifying 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces a Tornado Warning 1ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces hurricane, flood, winter storm, and severe thunderstorm warnings 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out a Watch (not a Warning) 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out events not on the named list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > keeps only the warnings from a mixed list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > returns an empty list when there are no features 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a HEAT forecast alert with advice, no severity 1ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a COLD forecast alert with advice, no severity 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes an NWS alert with severity, no advice 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > gives every normalized alert the same fields 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > returns a session for a correct email + password 1ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > includes the user's emailVerified status in the session result 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies a wrong password with a generic error and no session 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies an unknown email with the SAME generic error (no enumeration) 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > does not reveal which factor failed (wrong password vs no user) 0ms
 ✓ src/theme/sharedThemeImport.vitest.test.ts > shared UI theme import > resolves the shared theme through the monorepo alias 1ms

 Test Files  20 passed (20)
      Tests  94 passed (94)
   Start at  23:00:25
   Duration  408ms (transform 261ms, setup 0ms, import 446ms, tests 51ms, environment 1ms)


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/provider

 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > accepts a result with findings, confidence, and traceable sources 1ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > labels a low-confidence result as uncertain 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > labels a result with no sources as uncertain 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects a result with no findings 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects a result with no confidence label 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects an unrecognized confidence label 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > strips fabricated evidence with no traceable source 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > caps evidence at 3 primary sources 0ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > renames the resource when no active duplicate exists 1ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > rejects a rename that collides with a DIFFERENT active resource 0ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > does not flag the resource being edited as its own duplicate 0ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > does not record an audit event when a rename is rejected as a duplicate 0ms
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
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > accepts a resource with a category selected 1ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects a missing category 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects an empty category 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > rejects a whitespace-only category 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > returns a session for correct email + password 1ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > denies wrong password with a generic error and no session 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > denies a removed/absent user with the SAME generic error 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > does not reveal which factor failed (wrong password vs no user match) 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > accepts a resource with an address 2ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects a missing address 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects an empty address 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects a whitespace-only address 0ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > creates one resource and stamps the signed-in providerId 3ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > rejects a duplicate: an ACTIVE resource with same title + address exists (any provider) 0ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > allows re-posting when no ACTIVE match exists (previous pin expired or deleted) 0ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > allows a different title at the same address (not a duplicate) 0ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > records a 'created' audit event on successful creation 2ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > does NOT record an audit event when creation is blocked as a duplicate 0ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > does NOT record an audit event when the insert fails 1ms
 ✓ src/auth/passwordReset.vitest.test.ts > requestPasswordReset (AUTH-P-007) — no enumeration > returns the SAME response for an existing and a non-existing email 2ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > sets a new password with a valid, unexpired, unused token 2ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an already-used token (single-use) 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an expired token 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an unknown/tampered token 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > invalidates old sessions on a successful reset 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > accepts coordinates within valid ranges 3ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects latitude below -90 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects latitude above 90 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects longitude below -180 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects longitude above 180 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects NaN latitude 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > rejects infinite longitude 0ms
 ✓ src/resources/validateResourceCoordinates.vitest.test.ts > validateResource — coordinate ranges (POST-006) > accepts boundary values (-90, 90, -180, 180) 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > saves a valid future expiration date (extend the pin) 1ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > rejects a past expiration date and does not save 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > rejects an invalid date and does not save 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > rejects a missing expiration when expiration is being edited and does not save 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > does not record an audit event when the expiration edit is rejected 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > sends a complete report to Narley admin 4ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the address is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the provider name is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the provider email is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the provider phone is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when supporting details are missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > accepts details up to 500 words 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects details over 500 words 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > allows a verified provider to create a resource 2ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > blocks a provider whose organization is not verified 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > blocks when the membership is not ACTIVE 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > blocks when the organization is inactive 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > does not record an audit event when the write is blocked 0ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > sends the reader report to OpenAI for verification 1ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > creates a provider alert carrying the reader report fields and AI findings 0ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > creates the alert labeled uncertain when the AI result is uncertain 0ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > still surfaces an uncertain result (does not suppress the alert) 0ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > does not create an alert when the AI result is invalid (no findings) 0ms
 ✓ src/pins/resourceCategories.vitest.test.ts > resource category pin configuration > defines the approved visual identity for each preset category 2ms
 ✓ src/pins/resourceCategories.vitest.test.ts > resource category pin configuration > provides the Custom category as the default fallback 0ms
 ✓ src/pins/resourceCategories.vitest.test.ts > resource category pin configuration > resolves ids and labels while safely falling back for custom categories 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > accepts a resource with a non-empty title 2ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects an empty title 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects a whitespace-only title 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects a missing title 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > accepts a valid future expiration within one year 3ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects a missing expiration date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects an invalid date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects a past date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects an expiration more than one year out 0ms
 ✓ src/resources/updateResourceAudit.vitest.test.ts > updateResource audit event (EDIT-010) > records one 'updated' audit event on a successful update 2ms
 ✓ src/resources/updateResourceAudit.vitest.test.ts > updateResource audit event (EDIT-010) > does NOT record an audit event when the update fails 1ms
 ✓ src/weather/mapOpenMeteoForecast.vitest.test.ts > mapOpenMeteoForecast > maps daily Open-Meteo maximum temperatures to the tested forecast shape 2ms
 ✓ src/weather/mapOpenMeteoForecast.vitest.test.ts > mapOpenMeteoForecast > rejects malformed or mismatched forecast arrays 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > the approved status set is exactly ACTIVE and EXPIRED 2ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > accepts ACTIVE 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > accepts EXPIRED 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > rejects any value outside the approved set 0ms
 ✓ src/resources/updateResource.vitest.test.ts > updateResource (EDIT-009) > saves changes to the existing resource 3ms
 ✓ src/resources/updateResource.vitest.test.ts > updateResource (EDIT-009) > updates the existing record and does not create a second resource 0ms
 ✓ src/resources/updateResource.vitest.test.ts > updateResource (EDIT-009) > can update multiple fields at once 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > allows an active member of the resource's organization 1ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > allows a different member of the same organization (coworker edits A's pin) 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies a member of a different organization 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies when the membership is not ACTIVE 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies when there is no membership 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies when there is no user 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > writes a valid resource 3ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > blocks a resource with no title 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > blocks a resource with out-of-range coordinates 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > blocks a resource with a past expiration date 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > does not record an audit event when validation blocks the write 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > returns the validation errors when blocked 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > includes ACTIVE, unexpired resources 1ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > excludes expired resources 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > excludes EXPIRED-status resources 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > returns an empty array when nothing is visible 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > returns an empty array for an empty input 0ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > allows an active member of the owning organization to update 1ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > blocks a member of a different organization from updating 0ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > does not write or record an audit event when the editor is unauthorized 0ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > blocks an inactive member of the owning organization 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > accepts a resource with latitude and longitude 2ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects a missing latitude 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects a missing longitude 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects when both coordinates are missing 0ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > starts logged out with no user and not loading 2ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > marks loading true while a login is in progress 0ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > sets the user and clears loading on a successful login (AUTH-P-003) 0ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > clears loading and keeps no user on a failed login (AUTH-P-002) 0ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > clears the user on logout (AUTH-P-002 — logged-out returns to no user) 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > formats 10 digits as (XXX)XXX-XXXX 1ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects fewer than 10 digits 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects more than 10 digits 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects input containing letters 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects an empty string 0ms
 ✓ src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > never edits, closes, archives, deletes, or publishes a resource, even when AI says 'closed' 2ms
 ✓ src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > does not mutate a resource even when the AI result is uncertain 0ms
 ✓ src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > its only resource-facing side effect is creating an alert 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts report alerts regardless of the Weather Alerts setting 1ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts weather alerts only when Weather Alerts is on 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts report alerts plus weather alerts when the setting is on 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts only report alerts when the setting is off 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > returns zero for an empty alert list 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > returns zero when only weather alerts exist and the setting is off 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > includes only resources whose address ZIP matches the searched ZIP 1ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > matches a resource with a ZIP+4 address against a 5-digit search 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > returns an empty array when no resource matches the ZIP 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > excludes resources with no extractable ZIP 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > returns an empty array for an empty resource list 0ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > returns coordinates for an address the geocoder resolves 1ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > returns an invalid-address error when the geocoder finds no match 0ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > does not preserve coordinates when the geocoder throws 0ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > an active resource is visible regardless of which organization owns it 1ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > isResourceVisible gives the same answer no matter the owner (owner does not change visibility) 0ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > the reader-visible set includes resources from every organization, not just one 0ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > does not filter resources by any viewer or owner identity 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > shows an ACTIVE resource whose expiration is in the future 1ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > hides an ACTIVE resource whose expiration has passed 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > hides a resource explicitly marked EXPIRED 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > hides a resource at the exact expiration moment 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > shows an ACTIVE resource one second before expiration 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > returns 'loading' while auth state is still loading (AUTH-P-001) 1ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > returns 'login' when there is no user (AUTH-P-002 — logged-out sees login) 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > returns 'tabs' when a user has an ACTIVE membership (AUTH-P-003 — logged-in sees tabs) 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > does NOT return 'tabs' for a logged-in user without an ACTIVE membership (AUTH-P-003 gate) 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > does NOT return 'tabs' for a logged-in user with no membership at all 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > never shows tabs to a logged-out user (AUTH-P-002 — tabs hidden when user === null) 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > permits an ACTIVE membership in a verified, active org 1ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when membership is not ACTIVE 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when there is no membership 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when the org is not verified 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when the org is not active 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when there is no user 0ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > extracts the 5-digit ZIP from a complete address 1ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > extracts the ZIP when it is at the end with no trailing text 0ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > returns null when there is no 5-digit ZIP 0ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > returns null for an empty address 0ms

 Test Files  37 passed (37)
      Tests  180 passed (180)
   Start at  14:25:14
   Duration  726ms (transform 420ms, setup 0ms, import 798ms, tests 113ms, environment 2ms)


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/reader

 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'loading' while auth state is resolving (AUTH-R-001) 1ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'auth' when there is no user (AUTH-R-002 — logged-out sees login/signup) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'verify' when the user is logged in but email is unverified (AUTH-R-003) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > returns 'tabs' when the user is logged in and email is verified (AUTH-R-004) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for a logged-out user (AUTH-R-002 — tabs hidden) 0ms
 ✓ src/auth/resolveReaderAuthView.vitest.test.ts > resolveReaderAuthView (AUTH-R-001/002/003/004) > never returns 'tabs' for an unverified user (AUTH-R-004 requires verification) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates an unverified user for a valid new email + policy-compliant password 2ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > hashes the password before creating the user (never stores plaintext) 1ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects a password that fails the strength policy, without creating a user (AUTH-R-008) 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > rejects signup when the email is already registered, without creating a user 0ms
 ✓ src/auth/readerSignup.vitest.test.ts > readerSignup (AUTH-R-002 account creation, AUTH-R-008 password policy) > creates the user as unverified (email verification required next per AUTH-R-003) 0ms
 ✓ src/location/geocodeSearch.vitest.test.ts > geocodeSearch > returns coordinates for a city and encodes the query 2ms
 ✓ src/location/geocodeSearch.vitest.test.ts > geocodeSearch > returns coordinates for a five-digit ZIP code 0ms
 ✓ src/location/geocodeSearch.vitest.test.ts > geocodeSearch > returns Location not found when the geocoder has no results 0ms
 ✓ src/location/geocodeSearch.vitest.test.ts > geocodeSearch > rejects malformed coordinates 0ms
 ✓ src/location/geocodeSearch.vitest.test.ts > geocodeSearch > returns a gentle prompt for an empty query without fetching 0ms
 ✓ src/location/geocodeSearch.vitest.test.ts > geocodeSearch > returns an error when the geocoder request fails 0ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns a 6-character code 1ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > returns only allowed alphanumeric characters (A-Z, 0-9) 0ms
 ✓ src/auth/generateVerificationCode.vitest.test.ts > generateVerificationCode (AUTH-R-003 email verification code) > produces varying codes (not a constant value) 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > creates a report from resourceId, address, and selected reason 1ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects a missing reason with a clear message 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > rejects when no reason is provided at all 0ms
 ✓ src/reports/createReport.vitest.test.ts > createReport (REPORT-002) > does not include or touch the resource itself, only report data 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > returns a session for a correct email + password 1ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > includes the user's emailVerified status in the session result 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies a wrong password with a generic error and no session 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > denies an unknown email with the SAME generic error (no enumeration) 0ms
 ✓ src/auth/readerLogin.vitest.test.ts > readerLogin (AUTH-R-002) > does not reveal which factor failed (wrong password vs no user) 0ms
 ✓ src/alerts/filterActiveAlerts.vitest.test.ts > filterActiveAlerts (ALERT-R-006) > removes expired alerts and keeps active ones 1ms
 ✓ src/alerts/filterActiveAlerts.vitest.test.ts > filterActiveAlerts (ALERT-R-006) > returns an empty list when all alerts are expired 0ms
 ✓ src/alerts/filterActiveAlerts.vitest.test.ts > filterActiveAlerts (ALERT-R-006) > returns all alerts when none are expired 0ms
 ✓ src/alerts/filterActiveAlerts.vitest.test.ts > filterActiveAlerts (ALERT-R-006) > does not mutate the input list 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules exactly one notification for a valid future reminder 1ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is invalid, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the reminder is in the past, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > does not schedule when the date is missing, and reports it 0ms
 ✓ src/reminders/scheduleReminder.vitest.test.ts > scheduleReminder (REM-004) > schedules only one notification, never duplicates 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns normalized alerts from both sources 2ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > normalizes the forecast alert with advice and expected time 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns NWS warnings when the weather API fails 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > still returns forecast temperature alerts when the NWS API fails 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts but flags both failures when both APIs fail 0ms
 ✓ src/alerts/getAlertsForLocation.vitest.test.ts > getAlertsForLocation (ALERT-R-001/002 combine + normalize + graceful failure) > returns no alerts when the forecast is mild and NWS is empty 0ms
 ✓ src/location/geocodeSearchFallback.vitest.test.ts > geocodeSearch structured-query fallbacks > prefers an exact plain-city match over a similarly named result 2ms
 ✓ src/location/geocodeSearchFallback.vitest.test.ts > geocodeSearch structured-query fallbacks > uses the city and state fallback when Open-Meteo has no match 0ms
 ✓ src/location/geocodeSearchFallback.vitest.test.ts > geocodeSearch structured-query fallbacks > uses the ZIP fallback when Open-Meteo has no match 0ms
 ✓ src/location/geocodeSearchFallback.vitest.test.ts > geocodeSearch structured-query fallbacks > returns Location not found when the structured fallback is empty 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > accepts a valid future date and time 1ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing date 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a missing time 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects an invalid date that is not a real day 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a non-date value 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects a date and time in the past 0ms
 ✓ src/reminders/validateReminder.vitest.test.ts > validateReminder (REM-002) > rejects the exact current moment (must be in the future) 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > removes the saved card with the given id 1ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > leaves other saved cards intact 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns the list unchanged when the id is not saved 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > does not mutate or return the original saved list 0ms
 ✓ src/resources/removeSavedResource.vitest.test.ts > removeSavedResource (SAVE-008) > returns an empty list when the last saved card is removed 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > submits a complete report and returns the confirmation message 1ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the reason is missing, and prompts to complete 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the resourceId is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not submit when the address is missing 0ms
 ✓ src/reports/submitReport.vitest.test.ts > submitReport (REPORT-003) > does not return a success message when the report is incomplete 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns alerts from both sources when Weather Alerts is ON 1ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > returns no alerts when Weather Alerts is OFF 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > does not call either API when Weather Alerts is OFF 0ms
 ✓ src/alerts/getAlertsWithSetting.vitest.test.ts > getAlertsWithSetting (ALERT-R-001 Weather Alerts toggle) > fetches from both sources when Weather Alerts is ON 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces a Tornado Warning 1ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > surfaces hurricane, flood, winter storm, and severe thunderstorm warnings 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out a Watch (not a Warning) 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > filters out events not on the named list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > keeps only the warnings from a mixed list 0ms
 ✓ src/alerts/nwsAlerts.vitest.test.ts > nwsAlerts (ALERT-R-001 NWS warnings) > returns an empty list when there are no features 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns only the signed-in user's saved resources 2ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > does not return another user's saved resources 1ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns a different set for a different user 0ms
 ✓ src/resources/getSavedResourcesForUser.vitest.test.ts > getSavedResourcesForUser (SAVE-005) > returns an empty list for a user with no saved resources 0ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > preserves the full resource detail in the saved record 2ms
 ✓ src/resources/saveResourceSnapshot.vitest.test.ts > saveResource snapshot (SAVE-003) > keeps the saved snapshot unchanged when the live resource is later edited 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > verifies the email for a matching, unexpired, unused code 1ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects when no matching code is found, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an expired code, without verifying 0ms
 ✓ src/auth/verifyReaderEmailCode.vitest.test.ts > verifyReaderEmailCode (AUTH-R-003) > rejects an already-used code (single-use), without verifying 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a resource to an empty saved list 2ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > adds a different resource to an existing saved list 0ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not create a second card when the same resource is saved twice 1ms
 ✓ src/resources/saveResource.vitest.test.ts > saveResource (SAVE-002) > does not duplicate when the same resource id is already in a longer list 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a HEAT forecast alert with advice, no severity 1ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes a COLD forecast alert with advice, no severity 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > normalizes an NWS alert with severity, no advice 0ms
 ✓ src/alerts/normalizeAlert.vitest.test.ts > normalizeAlert (ALERT-R-002 common alert fields) > gives every normalized alert the same fields 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > the approved set is exactly the five reader reasons 1ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Closed / no longer operating' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong hours' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Wrong address / location' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'No more resources available' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > accepts 'Phone disconnected / no longer working' 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects a reason outside the approved set 0ms
 ✓ src/reports/reportReason.vitest.test.ts > report reasons (REPORT-001) > rejects an empty reason 0ms
 ✓ src/alerts/isAlertExpired.vitest.test.ts > isAlertExpired (ALERT-R-006) > temperature alert is NOT expired before expectedAt + 24h 2ms
 ✓ src/alerts/isAlertExpired.vitest.test.ts > isAlertExpired (ALERT-R-006) > temperature alert IS expired at more than 24h past expectedAt 0ms
 ✓ src/alerts/isAlertExpired.vitest.test.ts > isAlertExpired (ALERT-R-006) > temperature alert is NOT expired exactly at expectedAt (well within 24h) 0ms
 ✓ src/alerts/isAlertExpired.vitest.test.ts > isAlertExpired (ALERT-R-006) > NWS alert is NOT expired before its expires timestamp 0ms
 ✓ src/alerts/isAlertExpired.vitest.test.ts > isAlertExpired (ALERT-R-006) > NWS alert IS expired after its expires timestamp 0ms
 ✓ src/alerts/isAlertExpired.vitest.test.ts > isAlertExpired (ALERT-R-006) > uses the NWS expires field, NOT a 24h rule, for NWS alerts 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags heat at the first hour that reaches 91F, with its time 1ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > flags cold at the first hour that reaches 32F, with its time 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > reports the earliest crossing when several hours exceed the threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag when no hour crosses a threshold 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > does not flag just inside the thresholds (90F and 33F) 0ms
 ✓ src/alerts/forecastTemperatureAlert.vitest.test.ts > forecastTemperatureAlert (ALERT-R-001 forecast thresholds) > returns no alert for an empty forecast 0ms
 ✓ src/theme/sharedThemeImport.vitest.test.ts > shared UI theme import > resolves the shared theme through the monorepo alias 1ms
 ✓ src/alerts/isAlertExpiredDateOnly.vitest.test.ts > isAlertExpired with date-only expectedAt (ALERT-R-006) > stays active in the evening of the alert's own date (regression: UTC-midnight bug) 1ms
 ✓ src/alerts/isAlertExpiredDateOnly.vitest.test.ts > isAlertExpired with date-only expectedAt (ALERT-R-006) > stays active midday the following day (2026-07-14) 0ms
 ✓ src/alerts/isAlertExpiredDateOnly.vitest.test.ts > isAlertExpired with date-only expectedAt (ALERT-R-006) > IS expired midday two days later (2026-07-15) — clearly past the window 0ms
 ✓ src/alerts/isAlertExpiredDateOnly.vitest.test.ts > isAlertExpired with date-only expectedAt (ALERT-R-006) > IS expired several days later 0ms

 Test Files  25 passed (25)
      Tests  118 passed (118)
   Start at  14:25:28
   Duration  495ms (transform 339ms, setup 0ms, import 606ms, tests 62ms, environment 1ms)


 RUN  v4.1.10 /Users/jacquelinedelgado/Documents/Demo Projects Next Chapter/Narley/apps/provider

stdout | src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > accepts a result with findings, confidence, and traceable sources
[Narley] OpenAI report validation succeeded: { confidence: 'high', sourceCount: 2, uncertain: false }

stdout | src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > labels a low-confidence result as uncertain
[Narley] OpenAI report validation succeeded: { confidence: 'low', sourceCount: 2, uncertain: true }

stdout | src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > labels a result with no sources as uncertain
[Narley] OpenAI report validation succeeded: { confidence: 'high', sourceCount: 0, uncertain: true }

 ✓ src/auth/passwordReset.vitest.test.ts > requestPasswordReset (AUTH-P-007) — no enumeration > returns the SAME response for an existing and a non-existing email 1ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > sets a new password with a valid, unexpired, unused token 2ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an already-used token (single-use) 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an expired token 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > rejects an unknown/tampered token 0ms
 ✓ src/auth/passwordReset.vitest.test.ts > confirmPasswordReset (AUTH-P-007) > invalidates old sessions on a successful reset 0ms
stderr | src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects a result with no findings
[Narley] OpenAI report validation rejected the parsed result: {
  failures: [ 'findings is empty' ],
  result: { findings: '', confidence: 'high', sources: [ [Object], [Object] ] }
}

stderr | src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects a result with no confidence label
[Narley] OpenAI report validation rejected the parsed result: {
  failures: [ 'confidence must be high, medium, or low; received: ' ],
  result: {
    findings: 'Perception Programs closed in 2024.',
    confidence: '',
    sources: [ [Object], [Object] ]
  }
}

stderr | src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects an unrecognized confidence label
[Narley] OpenAI report validation rejected the parsed result: {
  failures: [ 'confidence must be high, medium, or low; received: very sure' ],
  result: {
    findings: 'Perception Programs closed in 2024.',
    confidence: 'very sure',
    sources: [ [Object], [Object] ]
  }
}

stdout | src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > strips fabricated evidence with no traceable source
[Narley] OpenAI report validation succeeded: { confidence: 'high', sourceCount: 1, uncertain: false }

stdout | src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > caps evidence at 3 primary sources
[Narley] OpenAI report validation succeeded: { confidence: 'high', sourceCount: 3, uncertain: false }

stdout | src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > sends the reader report to OpenAI for verification
[Narley] OpenAI report validation succeeded: { confidence: 'high', sourceCount: 1, uncertain: false }

stdout | src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > creates a provider alert carrying the reader report fields and AI findings
[Narley] OpenAI report validation succeeded: { confidence: 'high', sourceCount: 1, uncertain: false }

 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > accepts a result with findings, confidence, and traceable sources 3ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > labels a low-confidence result as uncertain 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > labels a result with no sources as uncertain 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects a result with no findings 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects a result with no confidence label 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > rejects an unrecognized confidence label 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > strips fabricated evidence with no traceable source 0ms
 ✓ src/reports/validateAiResult.vitest.test.ts > validateAiResult (AI-002/003/004/008) > caps evidence at 3 primary sources 0ms
stdout | src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > creates the alert labeled uncertain when the AI result is uncertain
[Narley] OpenAI report validation succeeded: { confidence: 'low', sourceCount: 1, uncertain: true }

stdout | src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > still surfaces an uncertain result (does not suppress the alert)
[Narley] OpenAI report validation succeeded: { confidence: 'high', sourceCount: 0, uncertain: true }

stderr | src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > does not create an alert when the AI result is invalid (no findings)
[Narley] OpenAI report validation rejected the parsed result: {
  failures: [ 'findings is empty' ],
  result: { findings: '', confidence: 'high', sources: [ [Object] ] }
}

 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > sends the reader report to OpenAI for verification 3ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > creates a provider alert carrying the reader report fields and AI findings 1ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > creates the alert labeled uncertain when the AI result is uncertain 0ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > still surfaces an uncertain result (does not suppress the alert) 0ms
 ✓ src/reports/verifyReaderReport.vitest.test.ts > verifyReaderReport (REPORT-006 flow) > does not create an alert when the AI result is invalid (no findings) 0ms
 ✓ src/resources/validateResourceCategory.vitest.test.ts > validateResource — category (POST-003) > accepts a resource with a category selected 2ms
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
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > creates one resource and stamps the signed-in providerId 4ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > rejects a duplicate: an ACTIVE resource with same title + address exists (any provider) 0ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > allows re-posting when no ACTIVE match exists (previous pin expired or deleted) 0ms
 ✓ src/resources/createResource.vitest.test.ts > createResource (POST-013) > allows a different title at the same address (not a duplicate) 0ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > records a 'created' audit event on successful creation 4ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > does NOT record an audit event when creation is blocked as a duplicate 0ms
 ✓ src/resources/createResourceAudit.vitest.test.ts > createResource audit event (POST-014 / POST-015) > does NOT record an audit event when the insert fails 1ms
 ✓ src/resources/updateResource.vitest.test.ts > updateResource (EDIT-009) > saves changes to the existing resource 4ms
 ✓ src/resources/updateResource.vitest.test.ts > updateResource (EDIT-009) > updates the existing record and does not create a second resource 0ms
 ✓ src/resources/updateResource.vitest.test.ts > updateResource (EDIT-009) > can update multiple fields at once 0ms
 ✓ src/resources/updateResourceExpirationMaxYear.vitest.test.ts > updateResource — expiration cannot exceed one year (POST-010) > rejects an expiration more than one year away with the approved message and does not save 2ms
 ✓ src/resources/updateResourceExpirationMaxYear.vitest.test.ts > updateResource — expiration cannot exceed one year (POST-010) > rejects a far-future expiration (multiple years) the same way 1ms
 ✓ src/resources/updateResourceExpirationMaxYear.vitest.test.ts > updateResource — expiration cannot exceed one year (POST-010) > does not record an audit event when the over-a-year edit is rejected 0ms
 ✓ src/resources/updateResourceExpirationMaxYear.vitest.test.ts > updateResource — expiration cannot exceed one year (POST-010) > still accepts an expiration within one year (extend the pin) 0ms
stdout | src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > never edits, closes, archives, deletes, or publishes a resource, even when AI says 'closed'
[Narley] OpenAI report validation succeeded: { confidence: 'high', sourceCount: 1, uncertain: false }

stdout | src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > does not mutate a resource even when the AI result is uncertain
[Narley] OpenAI report validation succeeded: { confidence: 'low', sourceCount: 0, uncertain: true }

stdout | src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > its only resource-facing side effect is creating an alert
[Narley] OpenAI report validation succeeded: { confidence: 'high', sourceCount: 1, uncertain: false }

 ✓ src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > never edits, closes, archives, deletes, or publishes a resource, even when AI says 'closed' 3ms
 ✓ src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > does not mutate a resource even when the AI result is uncertain 0ms
 ✓ src/reports/verifyReaderReportNoMutation.vitest.test.ts > verifyReaderReport — AI cannot modify a resource (AI-005) > its only resource-facing side effect is creating an alert 0ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > renames the resource when no active duplicate exists 1ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > rejects a rename that collides with a DIFFERENT active resource 0ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > does not flag the resource being edited as its own duplicate 0ms
 ✓ src/resources/updateResourceRename.vitest.test.ts > updateResource — rename & duplicate (EDIT-002) > does not record an audit event when a rename is rejected as a duplicate 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > saves a valid future expiration date (extend the pin) 2ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > rejects a past expiration date and does not save 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > rejects an invalid date and does not save 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > rejects a missing expiration when expiration is being edited and does not save 0ms
 ✓ src/resources/updateResourceExpiration.vitest.test.ts > updateResource — expiration validation (EDIT-007) > does not record an audit event when the expiration edit is rejected 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > writes a valid resource 2ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > blocks a resource with no title 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > blocks a resource with out-of-range coordinates 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > blocks a resource with a past expiration date 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > does not record an audit event when validation blocks the write 0ms
 ✓ src/resources/createResourceValidation.vitest.test.ts > createResource validation guard (SEC-004) > returns the validation errors when blocked 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > shows an ACTIVE resource whose expiration is in the future 2ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > hides an ACTIVE resource whose expiration has passed 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > hides a resource explicitly marked EXPIRED 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > hides a resource at the exact expiration moment 0ms
 ✓ src/resources/isResourceVisible.vitest.test.ts > isResourceVisible (LIFE-001/002/007) > shows an ACTIVE resource one second before expiration 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > includes ACTIVE, unexpired resources 1ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > excludes expired resources 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > excludes EXPIRED-status resources 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > returns an empty array when nothing is visible 0ms
 ✓ src/resources/getReaderVisibleResources.vitest.test.ts > getReaderVisibleResources (RMAP-004) > returns an empty array for an empty input 0ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > an active resource is visible regardless of which organization owns it 2ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > isResourceVisible gives the same answer no matter the owner (owner does not change visibility) 0ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > the reader-visible set includes resources from every organization, not just one 0ms
 ✓ src/resources/visibilityOwnerBlind.vitest.test.ts > map sync invariant — visibility is owner-blind (all maps see the same pins) > does not filter resources by any viewer or owner identity 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > includes only resources whose address ZIP matches the searched ZIP 2ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > matches a resource with a ZIP+4 address against a 5-digit search 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > returns an empty array when no resource matches the ZIP 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > excludes resources with no extractable ZIP 0ms
 ✓ src/resources/filterResourcesByZip.vitest.test.ts > filterResourcesByZip (RMAP ZIP search) > returns an empty array for an empty resource list 0ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > returns coordinates for an address the geocoder resolves 2ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > returns an invalid-address error when the geocoder finds no match 0ms
 ✓ src/resources/geocodeAddress.vitest.test.ts > geocodeAddress (POST-007) > does not preserve coordinates when the geocoder throws 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > accepts a resource with latitude and longitude 4ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects a missing latitude 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects a missing longitude 0ms
 ✓ src/resources/validateResourceLocation.vitest.test.ts > validateResource — location (POST-005) > rejects when both coordinates are missing 0ms
 ✓ src/resources/updateResourceAudit.vitest.test.ts > updateResource audit event (EDIT-010) > records one 'updated' audit event on a successful update 3ms
 ✓ src/resources/updateResourceAudit.vitest.test.ts > updateResource audit event (EDIT-010) > does NOT record an audit event when the update fails 1ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > accepts a resource with a non-empty title 3ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects an empty title 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects a whitespace-only title 0ms
 ✓ src/resources/validateResource.vitest.test.ts > validateResource — title (POST-002) > rejects a missing title 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > sends a complete report to Narley admin 2ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the address is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the provider name is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the provider email is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when the provider phone is missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects when supporting details are missing 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > accepts details up to 500 words 0ms
 ✓ src/reports/submitProviderReport.vitest.test.ts > submitProviderReport (Flow 2 — provider reports to Narley admin) > rejects details over 500 words 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > allows a verified provider to create a resource 3ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > blocks a provider whose organization is not verified 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > blocks when the membership is not ACTIVE 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > blocks when the organization is inactive 0ms
 ✓ src/resources/createResourceVerified.vitest.test.ts > createResource verified-provider guard (SEC-002) > does not record an audit event when the write is blocked 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > accepts a resource with an address 2ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects a missing address 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects an empty address 0ms
 ✓ src/resources/validateResourceAddress.vitest.test.ts > validateResource — address (POST-007 required field) > rejects a whitespace-only address 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > accepts a valid future expiration within one year 2ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects a missing expiration date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects an invalid date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects a past date 0ms
 ✓ src/resources/validateResourceExpiration.vitest.test.ts > validateResource — expiration (POST-009) > rejects an expiration more than one year out 0ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > starts logged out with no user and not loading 2ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > marks loading true while a login is in progress 0ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > sets the user and clears loading on a successful login (AUTH-P-003) 1ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > clears loading and keeps no user on a failed login (AUTH-P-002) 0ms
 ✓ src/auth/authState.vitest.test.ts > authReducer (AUTH-P-002 / AUTH-P-003 auth state transitions) > clears the user on logout (AUTH-P-002 — logged-out returns to no user) 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > formats 10 digits as (XXX)XXX-XXXX 2ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects fewer than 10 digits 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects more than 10 digits 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects input containing letters 0ms
 ✓ src/resources/normalizePhone.vitest.test.ts > normalizePhone (POST-012) > rejects an empty string 0ms
 ✓ src/pins/resourceCategories.vitest.test.ts > resource category pin configuration > defines the approved visual identity for each preset category 2ms
 ✓ src/pins/resourceCategories.vitest.test.ts > resource category pin configuration > provides the Custom category as the default fallback 0ms
 ✓ src/pins/resourceCategories.vitest.test.ts > resource category pin configuration > resolves ids and labels while safely falling back for custom categories 0ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > allows an active member of the owning organization to update 1ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > blocks a member of a different organization from updating 0ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > does not write or record an audit event when the editor is unauthorized 0ms
 ✓ src/resources/updateResourceOwnership.vitest.test.ts > updateResource ownership guard (SEC-001) > blocks an inactive member of the owning organization 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts report alerts regardless of the Weather Alerts setting 1ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts weather alerts only when Weather Alerts is on 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts report alerts plus weather alerts when the setting is on 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > counts only report alerts when the setting is off 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > returns zero for an empty alert list 0ms
 ✓ src/reports/activeAlertCount.vitest.test.ts > activeAlertCount (ALERT-P-006) > returns zero when only weather alerts exist and the setting is off 0ms
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
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > permits an ACTIVE membership in a verified, active org 2ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when membership is not ACTIVE 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when there is no membership 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when the org is not verified 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when the org is not active 0ms
 ✓ src/auth/canWritePin.vitest.test.ts > canWritePin (AUTH-P-005) > denies when there is no user 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > returns a session for correct email + password 1ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > denies wrong password with a generic error and no session 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > denies a removed/absent user with the SAME generic error 0ms
 ✓ src/auth/login.vitest.test.ts > login (AUTH-P-006) > does not reveal which factor failed (wrong password vs no user match) 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > returns 'loading' while auth state is still loading (AUTH-P-001) 2ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > returns 'login' when there is no user (AUTH-P-002 — logged-out sees login) 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > returns 'tabs' when a user has an ACTIVE membership (AUTH-P-003 — logged-in sees tabs) 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > does NOT return 'tabs' for a logged-in user without an ACTIVE membership (AUTH-P-003 gate) 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > does NOT return 'tabs' for a logged-in user with no membership at all 0ms
 ✓ src/auth/resolveAuthView.vitest.test.ts > resolveAuthView (AUTH-P-001, AUTH-P-002, AUTH-P-003) > never shows tabs to a logged-out user (AUTH-P-002 — tabs hidden when user === null) 0ms
 ✓ src/weather/mapOpenMeteoForecast.vitest.test.ts > mapOpenMeteoForecast > maps daily Open-Meteo maximum temperatures to the tested forecast shape 1ms
 ✓ src/weather/mapOpenMeteoForecast.vitest.test.ts > mapOpenMeteoForecast > rejects malformed or mismatched forecast arrays 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > the approved status set is exactly ACTIVE and EXPIRED 2ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > accepts ACTIVE 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > accepts EXPIRED 0ms
 ✓ src/resources/resourceStatus.vitest.test.ts > resource status contract (POST-011) > rejects any value outside the approved set 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > allows an active member of the resource's organization 1ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > allows a different member of the same organization (coworker edits A's pin) 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies a member of a different organization 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies when the membership is not ACTIVE 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies when there is no membership 0ms
 ✓ src/resources/canEditResource.vitest.test.ts > canEditResource (EDIT-008) > denies when there is no user 0ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > extracts the 5-digit ZIP from a complete address 1ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > extracts the ZIP when it is at the end with no trailing text 0ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > returns null when there is no 5-digit ZIP 0ms
 ✓ src/resources/extractZip.vitest.test.ts > extractZip (RMAP ZIP search) > returns null for an empty address 0ms

 Test Files  38 passed (38)
      Tests  184 passed (184)
   Start at  19:01:41
   Duration  875ms (transform 561ms, setup 0ms, import 1.03s, tests 136ms, environment 2ms)

