const ALERT_DATE_FORMATTER = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

export const formatAlertDate = (isoDate: string): string => {
  const year = Number(isoDate.slice(0, 4));
  const month = Number(isoDate.slice(5, 7));
  const day = Number(isoDate.slice(8, 10));
  const localDate = new Date(year, month - 1, day);

  return ALERT_DATE_FORMATTER.format(localDate);
};
