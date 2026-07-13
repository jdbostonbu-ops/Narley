import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

type NotificationResource = {
  title: string;
  address: string;
};

const REMINDER_CHANNEL_ID = "resource-reminders";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const ensureNotificationPermission = async (): Promise<void> => {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync(REMINDER_CHANNEL_ID, {
      name: "Resource reminders",
      importance: Notifications.AndroidImportance.HIGH,
      sound: "default",
    });
  }

  const currentPermission = await Notifications.getPermissionsAsync();
  const permission = currentPermission.granted
    ? currentPermission
    : await Notifications.requestPermissionsAsync();

  if (!permission.granted) {
    throw new Error("Notification permission is required to set a reminder");
  }
};

const toScheduledDate = (date: string, time: string): Date => {
  const dateMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
  const timeMatch = /^(\d{2}):(\d{2})$/.exec(time);

  if (dateMatch === null || timeMatch === null) {
    throw new Error("Enter a valid date and time");
  }

  return new Date(
    Number(dateMatch[1]),
    Number(dateMatch[2]) - 1,
    Number(dateMatch[3]),
    Number(timeMatch[1]),
    Number(timeMatch[2]),
    0,
    0,
  );
};

export const scheduleResourceNotification = async (
  date: string,
  time: string,
  resource: NotificationResource,
): Promise<string> => {
  await ensureNotificationPermission();
  const scheduledDate = toScheduledDate(date, time);

  return Notifications.scheduleNotificationAsync({
    content: {
      title: `Reminder: ${resource.title}`,
      body: `${resource.title} is located at ${resource.address}.`,
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: scheduledDate,
      ...(Platform.OS === "android" ? { channelId: REMINDER_CHANNEL_ID } : {}),
    },
  });
};
