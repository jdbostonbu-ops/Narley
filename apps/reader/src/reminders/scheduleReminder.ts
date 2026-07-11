import { validateReminder } from "./validateReminder";

type ScheduleReminderDependencies = {
  scheduleNotification: (date: string, time: string) => Promise<unknown>;
};

type ScheduleReminderResult =
  | { ok: true; message: string }
  | { ok: false; error: string };

export const scheduleReminder = async (
  date: string,
  time: string,
  now: Date,
  { scheduleNotification }: ScheduleReminderDependencies
): Promise<ScheduleReminderResult> => {
  const validation = validateReminder(date, time, now);

  if (!validation.ok) {
    return { ok: false, error: validation.error };
  }

  await scheduleNotification(date, time);

  return { ok: true, message: "Reminder scheduled" };
};
