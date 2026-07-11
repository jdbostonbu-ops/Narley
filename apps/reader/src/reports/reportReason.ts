export const REPORT_REASONS = [
  "Closed / no longer operating",
  "Wrong hours",
  "Wrong address / location",
  "No more resources available",
] as const;

export type ReportReason = (typeof REPORT_REASONS)[number];

export const isValidReportReason = (
  value: unknown
): value is ReportReason => REPORT_REASONS.some((reason) => reason === value);
