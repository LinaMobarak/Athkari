import * as Notifications from "expo-notifications";
// import * as Permissions from "expo-permissions";
import { Platform } from "react-native";

// Request permissions and configure notification behavior
export const registerForPushNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    return;
  }

  // Set notification handler (for foreground notifications)
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  // Cancel existing notifications to prevent duplicates
  await Notifications.cancelAllScheduledNotificationsAsync();

  // Schedule repeating notification manually every 60 seconds
//   scheduleRepeatingNotification();
};

// Manually reschedule every 60 seconds
export const scheduleRepeatingNotification = async () => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🕊️ تذكرة روحية",
      body: "سبحان الله وبحمده، سبحان الله العظيم",
      sound: "default",
      priority: Notifications.AndroidNotificationPriority.HIGH,
      vibrate: [0, 250, 250, 250],
    },
    trigger: {
      seconds: 60 * 3, // 60 seconds delay
      repeats: false, // We reschedule it manually
    },
  });

  // You could optionally use setInterval to re-trigger every 60s
  if (Platform.OS === "android") {
    setInterval(async () => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "🕊️ تذكرة روحية",
          body: "سبحان الله وبحمده، سبحان الله العظيم",
          sound: "default",
          priority: Notifications.AndroidNotificationPriority.HIGH,
          vibrate: [0, 250, 250, 250],
        },
        trigger: {
          seconds: 60,
          repeats: false,
        },
      });
    }, 60000);
  }
};
