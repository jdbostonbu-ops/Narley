type ReminderValidation = {
  ok: boolean;
  error: string;
};

export const validateReminder = (
  date: string,
  time: string,
  now: Date
): ReminderValidation => {
  if (date === "") {
    return { ok: false, error: "Date is required" };
  }

  if (time === "") {
    return { ok: false, error: "Time is required" };
  }

  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(time);

  if (dateMatch === null || timeMatch === null) {
    return { ok: false, error: "Enter a valid date and time" };
  }

  const year = Number(dateMatch[1]);
  const month = Number(dateMatch[2]);
  const day = Number(dateMatch[3]);
  const hour = Number(timeMatch[1]);
  const minute = Number(timeMatch[2]);
  const reminder = new Date(year, month - 1, day, hour, minute, 0, 0);
  const isRealMoment =
    reminder.getFullYear() === year &&
    reminder.getMonth() === month - 1 &&
    reminder.getDate() === day &&
    reminder.getHours() === hour &&
    reminder.getMinutes() === minute;

  if (!isRealMoment) {
    return { ok: false, error: "Enter a valid date and time" };
  }

  if (reminder.getTime() <= now.getTime()) {
    return { ok: false, error: "Reminder must be in the future" };
  }

  return { ok: true, error: "" };
};
