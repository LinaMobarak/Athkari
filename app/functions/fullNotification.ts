
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const zekr = [
    "سبحان الله وبحمده , سبحان الله العظيم",
    "استغفرالله العظيم واتوب اليه",
    "الحمد لله",
    "لا حول ولا قوم الا بالله العلي العظيم",
    "الله اكبر",
    "لا اله الا انت سبحانك اني كنت من الظالمين",
    "لا اله الا الله وحده لا شريك له ,  له الملك وله الحمد وهو على كل شي قدير",
    "لا اله الا الله",
    "استغفر الله",
    "سبحان الله"
  ];

export async function setupNotifications() {
  const { status } = await Notifications.requestPermissionsAsync();
  
  if (status !== 'granted') {
    console.warn('Notification permissions not granted!');
  }

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX, // VERY IMPORTANT for showing at the top
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    
    });
  }


}

// Call this to send notification
export async function sendLocalNotification() {
    const randomIndex = Math.floor(Math.random() * zekr.length);
  await Notifications.scheduleNotificationAsync({
    content: {
      body: zekr[randomIndex],
      sound: 'default',
      priority: Notifications.AndroidNotificationPriority.MAX,
    },
    trigger: { hour: 9,   // كل يوم الساعة 9 صباحًا (تغييرها حسب وقتك)
        minute: 0,
        repeats: true,}, // Send immediately
  });
}
