const ADDRESS_REPORT_REASON = "Wrong address / location";
const ADDRESS_REPORT_FINDINGS = "I can't verify an address by searching. Organizations often appear at several addresses across listings, including ones they left years ago, and a search can't tell me which is current. It's also worth checking the pin for a typo. Only a human can confirm this — please call or visit.";
const HUMAN_VERIFICATION_SOURCES = [
  {
    url: "https://www.seerinteractive.com/insights/ai-models-provide-incorrect-phone-numbers-36-of-the-time-heres-what-you-can-do",
  },
  {
    url: "https://www.dreamhost.com/blog/google-business-profile/",
  },
] as const;

export const addressReportInstructions = (reportReason: string): string[] =>
  reportReason === ADDRESS_REPORT_REASON
    ? [
        `For the report reason ${JSON.stringify(ADDRESS_REPORT_REASON)}, override every conflicting investigation and search instruction: do not use web search to verify the address and do not report what any listing says the address is.`,
        `Return findings exactly as follows, verbatim: ${JSON.stringify(ADDRESS_REPORT_FINDINGS)}. Do not reword, re-punctuate, summarize, add to, or remove anything from this response.`,
        "For this address report reason, confidence must always be high: this is high confidence that only a human can verify the address.",
        `For this address report reason, sources must contain exactly these two URLs in this order and no others: ${JSON.stringify(HUMAN_VERIFICATION_SOURCES)}.`,
        "No search result may change the required findings, confidence, or sources for this address report reason.",
      ]
    : [];
