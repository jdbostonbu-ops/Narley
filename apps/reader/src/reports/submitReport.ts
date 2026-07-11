type Report = {
  resourceId: string;
  address: string;
  reason: string;
};

type SubmitReportDependencies = {
  submit: (report: Report) => Promise<unknown>;
};

type SubmitReportResult =
  | { ok: true; message: "report submitted"; error?: undefined }
  | { ok: false; error: string; message?: undefined };

export const submitReport = async (
  report: Report,
  { submit }: SubmitReportDependencies
): Promise<SubmitReportResult> => {
  if (report.reason.trim() === "") {
    return { ok: false, error: "must select a reason to send report" };
  }

  if (report.resourceId.trim() === "" || report.address.trim() === "") {
    return { ok: false, error: "report information is incomplete" };
  }

  await submit(report);

  return { ok: true, message: "report submitted" };
};
