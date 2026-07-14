## Root cause

  The migration did not damage
  the database or break Prisma.
  The immediate reason edits no
  longer persist is that the
  Narley API server is not
  currently running on port
  4000.

  A direct request to:

  http://127.0.0.1:4000/resources

  failed with “Couldn’t connect
  to server.” Therefore,
  Provider cannot reach PATCH /
  resources/:id at all. Running
  prisma migrate dev and prisma
  generate does not restart the
  long-running tsx server/
  index.ts process. The API must
  be started again after
  generating the client.

  There is also a separate code
  defect affecting notes: adding
  the database column did not
  wire that column into the
  create, PATCH, or GET Prisma
  paths. Once the server is
  restarted, normal fields
  should persist again, but
  notes will still not persist
  until that wiring is
  corrected.

  ## Migration and data
  verification

  The migration applied
  successfully:

  Migration:
  20260714165809_add_resource_no
  tes
  finished_at: 2026-07-
  14T16:58:10.368Z
  rolled_back_at: null

  It contains only:

  ALTER TABLE "Resource"
  ADD COLUMN "notes" TEXT NOT
  NULL DEFAULT '';

  This is additive. It did not
  drop, recreate, rename, or
  modify any existing columns or
  records.

  The database currently
  contains all 10 existing
  resources. A resource was also
  created after the migration at
  2026-07-14T17:22:42.430Z,
  confirming that the generated
  Prisma client and migrated
  database are compatible.

  All existing resources
  received the expected default:

  notes: ""

  ## PATCH path analysis

  The app path is correctly
  connected:

  EditResourceModal
  → updateStoredResource
  → patchResource
  → PATCH /resources/:id
  → parseResourceChanges
  → updateResource
  → prisma.resource.update

  ### Provider client

  patchResource() still:

  - Sends the PATCH request to
    the correct route.

  - Includes JSON.
  - Attaches the Provider bearer
    token.

  - Returns an error if the HTTP
    request fails.

  - Updates Provider state only
    after a successful response.

  There is no new client-side
  optimistic update that could
  hide a failed backend request.

  ### parseResourceChanges

  It correctly recognizes notes:

  ["title", "category",
  "address", "phone", "website",
  "notes"]

  Therefore, parsing the request
  does not fail because notes
  now exists.

  ### Prisma update

  The actual Prisma data object
  includes:

  - title
  - category
  - address
  - latitude
  - longitude
  - expiresAt
  - phone
  - website

  It does not include notes.

  Consequently:

  - Ordinary field edits remain
    valid and should persist
    once the API is running.

  - A notes-only edit results in
    a valid Prisma update with
    no notes change.

  - The notes value remains
    unchanged in the database.

  ## Misleading notes response

  Before the notes column
  existed, the endpoint
  simulated notes persistence by
  echoing the submitted value:

  return res.json({
    resource: {
      ...updateResult.resource,
      notes: typeof
      changes.notes ===
      "string" ? changes.notes :
      "",
    },
  });

  Now that Resource.notes is
  real, that workaround is
  incorrect:

  1. Prisma returns the actual
     database resource.

  2. The response spreads that
     resource.

  3. The endpoint overwrites its
     real notes value with the
     request value.

  4. Provider temporarily
     receives and displays the
     new note.

  5. The database still contains
     the old note.

  6. A reload loses the apparent
     edit.

  This does not cause Prisma to
  throw, but it makes a failed
  notes persistence look
  successful.

  ## GET and creation have the
  same omission

  GET /resources currently
  returns:

  notes: ""

  instead of:

  notes: resource.notes

  Therefore, even if notes were
  stored manually in the
  database, Reader and Provider
  reloads would receive an empty
  string.

  Resource creation also parses
  request.notes but omits it
  from prisma.resource.create().
  It only echoes the note in the
  POST response. Newly created
  resources consequently receive
  the database default "".

  ## Stale Prisma client
  analysis

  A running Node process does
  need to be restarted after
  prisma generate to load the
  new generated client.

  A stale pre-migration Prisma
  client would not normally
  prevent updates to the older
  fields; it simply would not
  know about the new notes
  field. However, it cannot
  start using the regenerated
  model until restarted.

  At present, there is no server
  listening on port 4000, so the
  immediate problem is more
  direct than a stale in-memory
  client: the API is
  unavailable.

  ## Exact fix

  First, restart the API from
  the repository root:

  npx tsx server/index.ts

  That restores PATCH handling
  for title, category, address,
  phone, website, coordinates,
  and expiration.

  Then correct the notes wiring:

  1. Include notes:
     request.notes in
     prisma.resource.create().

  2. Include string
     approvedChanges.notes in
     the PATCH data object.

  3. Return
     updateResult.resource
     directly instead of
     overwriting its real notes
     value with the request
     echo.

  4. Change GET /resources from
     notes: "" to notes:
     resource.notes.

  5. Restart the API again after
     changing server code.

  So the conclusion is:

  - All edits currently fail:
    API server is not running
    after migration/generation.

  - Notes still fail after
    restart: the real notes
    column was added, but the
    server persistence and GET
    paths still use the old fake
    echo behavior.

  No files were changed.


