import * as Notifications from "expo-notifications";
import { Platform } from "react-native";


export const registerForPushNotifications = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    return;
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  await Notifications.cancelAllScheduledNotificationsAsync();

};


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
      seconds: 60 * 3,
      repeats: false,
    },
  });


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
