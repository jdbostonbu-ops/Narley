export type TemperatureAlert = {
  type: "HEAT" | "COLD";
  expectedAt: string;
};

export type NwsAlert = {
  event: string;
  headline: string;
  expires: string;
  severity: string;
};

export type Alert = TemperatureAlert | NwsAlert;

const TWENTY_FOUR_HOURS_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const DATE_ONLY_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const EASTERN_DATE_TIME_FORMATTER = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  hour: "2-digit",
  hourCycle: "h23",
  minute: "2-digit",
  month: "2-digit",
  second: "2-digit",
  timeZone: "America/New_York",
  year: "numeric",
});

type EasternDateTimePart =
  | "year"
  | "month"
  | "day"
  | "hour"
  | "minute"
  | "second";

const getPartValue = (
  parts: readonly Intl.DateTimeFormatPart[],
  type: EasternDateTimePart,
): number => Number(parts.find((part) => part.type === type)?.value);

const getEasternOffset = (timestamp: number): number => {
  const parts = EASTERN_DATE_TIME_FORMATTER.formatToParts(new Date(timestamp));
  const easternClockAsUtc = Date.UTC(
    getPartValue(parts, "year"),
    getPartValue(parts, "month") - 1,
    getPartValue(parts, "day"),
    getPartValue(parts, "hour"),
    getPartValue(parts, "minute"),
    getPartValue(parts, "second"),
  );

  return easternClockAsUtc - timestamp;
};

const getDateOnlyExpiry = (expectedAt: string): number | null => {
  const match = DATE_ONLY_PATTERN.exec(expectedAt);

  if (match === null) {
    return null;
  }

  const year = Number(match[1]);
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);
  const parsedDate = new Date(Date.UTC(year, monthIndex, day));

  if (
    parsedDate.getUTCFullYear() !== year ||
    parsedDate.getUTCMonth() !== monthIndex ||
    parsedDate.getUTCDate() !== day
  ) {
    return null;
  }

  const expiryDateAsUtc = Date.UTC(year, monthIndex, day + 2);

  return expiryDateAsUtc - getEasternOffset(expiryDateAsUtc);
};

export const isAlertExpired = (alert: Alert, now: Date): boolean => {
  if ("type" in alert) {
    const dateOnlyExpiry = getDateOnlyExpiry(alert.expectedAt);

    if (dateOnlyExpiry !== null) {
      return now.getTime() >= dateOnlyExpiry;
    }

    const expiresAt =
      new Date(alert.expectedAt).getTime() +
      TWENTY_FOUR_HOURS_IN_MILLISECONDS;

    return now.getTime() > expiresAt;
  }

  return now.getTime() > new Date(alert.expires).getTime();
};
