import type { ProviderCardData } from "../components/ProviderCard";

export type ProviderAlertCard = ProviderCardData & {
  kind: "report" | "weather";
};
