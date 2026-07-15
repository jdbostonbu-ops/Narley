Explored
  └ Read AGENTS.md
    Read reportReason.ts
    Read
    reportReason.vitest.test.ts
    Read createReport.ts
    Read
    createReport.vitest.test.ts
    Read submitReport.ts
    Read
    submitReport.vitest.test.ts
    Search REPORT_REASONS|
           reportReason|What
           needs
           attention|
           POST.*reports|
           postReport|
           parseReaderReport|
           PHONE_REPORT_REASON|

           phoneReportInstructio
           ns
           in reader
    Read client.ts
    Read index.ts
    Read openai.ts
    Search Phone disconnected /
    no
           longer working
    Search Wrong website or
    website
           not working
    Read TESTING.md
    Search type
    ReaderReportInput|
           export type
           ReaderReportInput|
           interface
           ReaderReportInput in
           client.ts
    Search reason: in
    schema.prisma
    Search reason in
           AlertsScreen.tsx

────────────────────────────────

• ## Current Reader report
  reasons

  Defined in apps/reader/src/
  reports/reportReason.ts:1:

  export const REPORT_REASONS =
  [
    "Closed / no longer
    operating",
    "Wrong hours",
    "Wrong address / location",
    "No more resources
    available",
    "Phone disconnected / no
    longer working",
  ] as const;

  The exact labels and values
  are identical:

  1. Closed / no longer
     operating

  2. Wrong hours
  3. Wrong address / location
  4. No more resources available
  5. Phone disconnected / no
     longer working

  The as const declaration
  produces this type union
  automatically:

  type ReportReason =
    | "Closed / no longer
    operating"
    | "Wrong hours"
    | "Wrong address / location"
    | "No more resources
    available"
    | "Phone disconnected / no
    longer working";
  resource-detail-modal.tsx:232.

  It:

  - Displays “What needs
    attention?”

  - Maps over REPORT_REASONS
  - Renders each value as an
    accessible radio option

  - Stores the selection in
    reportReason: ReportReason |
    ""

  - Passes the selected value to
    createReport

  Because the UI maps the array,
  adding another array entry
  automatically adds another
  radio option. No separate UI
  label list exists.

  ## How the reason reaches the
  server

  The flow is:

  REPORT_REASONS
    → reportReason state
    → createReport()
    → submitReport()
    → postReport()
    → POST /reports
    → parseReaderReport()
    → verifyReaderReport()
    → callOpenAI()
    → ProviderAlert.reason

  Relevant files:

  - apps/reader/src/reports/
    createReport.ts:3 creates
    { resourceId, address,
    reason }.

  - apps/reader/src/reports/
    submitReport.ts:13 rejects
    only an empty reason.

  - apps/reader/src/api/
    client.ts:241 sends:

    {
      "resourceId": "...",
      "address": "...",
      "reason": "..."
    }

  - server/index.ts:453 parses
    the request.

  POST /reports requires all
  three fields to be nonempty
  strings:

  - resourceId
  - address
  - reason

  ## Important validation gap

  The Reader has
  isValidReportReason, which
  checks the hardcoded tuple,
  but neither createReport,
  submitReport, nor the server
  calls it.

  The server does not validate
  that the reason is approved.
  Its ReaderReport.reason type
  is just string, and
  parseReaderReport accepts any
  nonempty reason.

  Therefore:

  - The normal Reader UI
    restricts users to the
    approved list.

  - A direct request to POST /
    reports can submit an
    arbitrary nonempty reason.

  - There is no database enum.
    ProviderAlert.reason is a
    nullable Prisma String.

  - No migration is needed to
    add a sixth reason.

  ## Existing test coverage

  ###
  reportReason.vitest.test.ts

  apps/reader/src/reports/
  reportReason.vitest.test.ts:4
  asserts:

  - The approved set is exactly
    five values.

  - Each current value is
    accepted.

  - An unknown value (Bad vibes)
    is rejected.

  - An empty value is rejected.

  This is the test that will
  immediately fail if a sixth
  reason is added to
  REPORT_REASONS without
  updating the approved
  expectation.

  ###
  createReport.vitest.test.ts

  apps/reader/src/reports/
  createReport.vitest.test.ts:4
  asserts:

  - Wrong hours can be placed in
    a report.

  - Empty and missing reasons
    are rejected.

  - A report does not contain or
    modify the resource.

  It does not test every
  approved reason.

  ###
  submitReport.vitest.test.ts

  apps/reader/src/reports/
  submitReport.vitest.test.ts:18
  asserts:

  - A report using Wrong hours
    is submitted.

  - Empty reasons are rejected.
  - Missing resource IDs and
    addresses are rejected.

  It treats the reason as an
  unrestricted string and does
  not test the approved list.

  ### Provider verification test

  apps/provider/src/reports/
  verifyReaderReport.vitest.test
  .ts:11 uses the phone reason
  as fixture data and confirms
  it travels into the Provider
  alert. It does not validate
  the complete reason list.

  There is no server test
  proving that POST /reports
  rejects unapproved reasons.

  ## OpenAI reason branching

  server/openai.ts:15 detects
  the phone category through an
  exact string comparison:

  const PHONE_REPORT_REASON =
    "Phone disconnected / no
    longer working";

  const phoneReportInstructions
  =
    report.reason ===
    PHONE_REPORT_REASON
      ? [
          // Exact findings
          instruction
          // Confidence must be
          high
          // Exactly two
          required sources
          // Research cannot
          change the fixed
          response
        ]
      : [];

  Those instructions are
  appended to the common OpenAI
  prompt. All other categories
  receive only the shared
  research instructions.

  A new website category could
  follow the same pattern:

  const WEBSITE_REPORT_REASON =
    "Wrong website or website
    not working";

  const
  websiteReportInstructions =
    report.reason ===
    WEBSITE_REPORT_REASON
      ? [...]
      : [];

  That is only necessary if the
  website category needs special
  AI behavior. Without a special
  branch, it will use the
  existing generic investigation
  prompt.

  ## Files needed for a sixth
  reason

  To add Wrong website or
  website not working to the
  existing UI flow:

  1. apps/reader/src/reports/
     reportReason.vitest.test.ts
      - Update the RED
        expectation from five to
        six reasons.

      - Add an acceptance
        assertion for the exact
        new value.

  2. apps/reader/src/reports/
     reportReason.ts
      - Add the exact string to
        REPORT_REASONS.

      - The type union and
        Reader UI update
        automatically.

  3. docs/project-context/
     TESTING.md:1036
      - Recommended to
        explicitly document the
        newly approved reason
        under REPORT-001,
        satisfying the project’s
        TDD approval
        requirement.

  4. server/openai.ts
      - Required only if the
        website reason needs
        category-specific
        prompting or a fixed
        response.

      - Not required merely to
        transmit the new reason.

  No changes are required to:

  - resource-detail-modal.tsx
  - createReport.ts
  - submitReport.ts
  - Reader API client
  - Prisma schema
  - Provider alert UI
  - server/index.ts

  However, if the server should
  genuinely enforce “approved
  reasons,” then server/index.ts
  and a new server validation
  test should also change.
  Otherwise, arbitrary nonempty
  reasons will continue to be
  accepted.

  No files were changed.
