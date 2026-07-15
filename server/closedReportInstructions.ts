const CLOSED_REPORT_REASON = "Closed / no longer operating";

export const closedReportInstructions = (reportReason: string): string[] =>
  reportReason === CLOSED_REPORT_REASON
    ? [
        `For the report reason ${JSON.stringify(CLOSED_REPORT_REASON)}, override any conflicting shared instruction about evidence of current operation or conflicting evidence. Continue the existing web research and determine confidence and sources normally under these rules; there is no fixed response.`,
        "The AI may never report that an organization is currently operating on the strength of records that persist without maintenance. Listings, directories, registries, profiles, and search results are not evidence of current operation — they persist for years after an organization ceases to exist, and their presence required no one to do anything.",
        "Current operation may only be supported by evidence that someone acted recently: a dated report of active service delivery, a recent official statement from the organization, or other current-dated evidence of real operation.",
        "If no such evidence exists, current operation is unverified. Unverified is not a conflict between evidence — it is low confidence. The AI must state that current status could not be verified and recommend human verification.",
      ]
    : [];
