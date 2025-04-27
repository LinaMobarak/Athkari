import * as Notifications from "expo-notifications";


export async function scheduleNotificationAfter() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    alert("Failed to get permission for notifications!");
    return;
  }

  
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false, 
      shouldSetBadge: false,
      priority: Notifications.AndroidNotificationPriority.HIGH, // Add this for Android
    presentation: { // Add this for iOS
      banner: true,
      badge: false, 
      sound: true,
    },
    })
  })

  
}
