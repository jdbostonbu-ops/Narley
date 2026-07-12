import type { ProviderCardData } from "../components/ProviderCard";

export type ProviderAlertCard = ProviderCardData & {
  kind: "report" | "weather";
};

export const REPORT_ALERTS: readonly ProviderAlertCard[] = [
  {
    id: "report-alert-preview",
    kind: "report",
    title: "Resource information may have changed",
    notes: "An AI-assisted provider report will appear here with its findings and confidence.",
    metadata: "Report preview",
  },
];
