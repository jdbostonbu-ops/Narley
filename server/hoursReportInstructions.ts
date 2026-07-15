const HOURS_REPORT_REASON = "Wrong hours";
const HOURS_REPORT_FINDINGS = "I can't verify hours by searching. What's published online is often behind — hours change for holidays, weather, staffing, or just because, and the update reaches the internet later, if ever. If these hours changed recently, no website would know yet. It's also worth checking the pin for a typo. Only a human can confirm this — please call or visit.";
const HUMAN_VERIFICATION_SOURCES = [
  {
    url: "https://www.seerinteractive.com/insights/ai-models-provide-incorrect-phone-numbers-36-of-the-time-heres-what-you-can-do",
  },
  {
    url: "https://www.dreamhost.com/blog/google-business-profile/",
  },
] as const;

export const hoursReportInstructions = (reportReason: string): string[] =>
  reportReason === HOURS_REPORT_REASON
    ? [
        `For the report reason ${JSON.stringify(HOURS_REPORT_REASON)}, override every conflicting investigation and search instruction: do not use web search to verify the hours and do not report what any website says the hours are.`,
        `Return findings exactly as follows, verbatim: ${JSON.stringify(HOURS_REPORT_FINDINGS)}. Do not reword, re-punctuate, summarize, add to, or remove anything from this response.`,
        "For this hours report reason, confidence must always be high: this is high confidence that only a human can verify the hours.",
        `For this hours report reason, sources must contain exactly these two URLs in this order and no others: ${JSON.stringify(HUMAN_VERIFICATION_SOURCES)}.`,
        "No search result may change the required findings, confidence, or sources for this hours report reason.",
      ]
    : [];
