import { describe, it, expect, vi, beforeEach } from "vitest";
import { scheduleReminder } from "./scheduleReminder";

const scheduleNotification = vi.fn();
const deps = { scheduleNotification };

const now = new Date("2026-07-11T12:00:00");

beforeEach(() => {
  vi.clearAllMocks();
  scheduleNotification.mockResolvedValue({ id: "notif_1" });
});

describe("scheduleReminder (REM-004)", () => {
  it("schedules exactly one notification for a valid future reminder", async () => {
    const result = await scheduleReminder("2026-08-01", "15:30", now, deps);

    expect(scheduleNotification).toHaveBeenCalledTimes(1);
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.message).toMatch(/scheduled/i);
    }
  });

  it("does not schedule when the reminder is invalid, and reports it", async () => {
    const result = await scheduleReminder("2026-02-30", "15:30", now, deps);

    expect(scheduleNotification).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBeTruthy();
    }
  });

  it("does not schedule when the reminder is in the past, and reports it", async () => {
    const result = await scheduleReminder("2020-01-01", "09:00", now, deps);

    expect(scheduleNotification).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
  });

  it("does not schedule when the date is missing, and reports it", async () => {
    const result = await scheduleReminder("", "15:30", now, deps);

    expect(scheduleNotification).not.toHaveBeenCalled();
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toMatch(/date/i);
    }
  });

  it("schedules only one notification, never duplicates", async () => {
    await scheduleReminder("2026-08-01", "15:30", now, deps);
    expect(scheduleNotification).toHaveBeenCalledTimes(1);
  });
})
