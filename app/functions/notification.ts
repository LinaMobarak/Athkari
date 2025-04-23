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
      shouldSetBadge: false
    })
  })
  await Notifications.scheduleNotificationAsync({
    content: {
      body: "لا حول ولا قوة الا بالله العلي العظيم "
    },
    trigger: {
      seconds: 60,
    },
  });
}
