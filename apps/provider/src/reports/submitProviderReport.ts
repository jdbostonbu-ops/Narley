type ProviderReport = {
  resourceTitle: string;
  address: string;
  phone?: string;
  website?: string;
  details: string;
  reportedBy: string;
};

type SubmitProviderReportDependencies = {
  sendToNarleyAdmin: (report: ProviderReport) => Promise<unknown>;
};

type SubmitProviderReportResult =
  | { ok: true; error?: undefined }
  | { ok: false; error: string };

const countWords = (value: string): number => {
  const trimmedValue = value.trim();

  return trimmedValue === "" ? 0 : trimmedValue.split(/\s+/).length;
};

export const submitProviderReport = async (
  report: ProviderReport,
  { sendToNarleyAdmin }: SubmitProviderReportDependencies
): Promise<SubmitProviderReportResult> => {
  const requiredFields = [
    report.resourceTitle,
    report.address,
    report.details,
    report.reportedBy,
  ];

  if (requiredFields.some(
    (field) => typeof field !== "string" || field.trim() === "",
  )) {
    return { ok: false, error: "All report fields are required" };
  }

  if (countWords(report.details) > 500) {
    return { ok: false, error: "Report details cannot exceed 500 words" };
  }

  await sendToNarleyAdmin(report);

  return { ok: true };
};
