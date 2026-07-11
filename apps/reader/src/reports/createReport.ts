import type { ReportReason } from "./reportReason";

type CreateReportInput = {
  resourceId: string;
  address: string;
  reason?: ReportReason | "";
};

type CreateReportResult =
  | {
      ok: true;
      report: {
        resourceId: string;
        address: string;
        reason: ReportReason;
      };
      error?: undefined;
    }
  | {
      ok: false;
      error: "must select a reason to send report";
      report?: undefined;
    };

export const createReport = ({
  resourceId,
  address,
  reason,
}: CreateReportInput): CreateReportResult => {
  if (reason === undefined || reason === "") {
    return { ok: false, error: "must select a reason to send report" };
  }

  return {
    ok: true,
    report: { resourceId, address, reason },
  };
};
