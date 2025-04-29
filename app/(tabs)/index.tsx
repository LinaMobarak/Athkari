import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import ParallaxScrollView from "../../components/ParallaxScrollView";
import React, { useCallback, useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { Stack, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { BlurView } from "expo-blur";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";
import { Appearance } from "react-native";
import { scheduleNotificationAfter } from "@/app/functions/notification";
import {
  setupNotifications,
  sendLocalNotification,
} from "@/app/functions/fullNotification";
import DateTimePicker from "@react-native-community/datetimepicker";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import { checkIf12HoursPassed } from "@/app/functions/resetCounter";
import ModalAdan from "@/app/functions/adan";
import Modal from "react-native-modal";
import { getTimeDiffInSeconds } from "../functions/getNextTime";
import { CustomCountdown } from "@/app/functions/countdown";

console.log(CustomCountdown);
const prayerNamesInArabic = {
  Fajr: "الفجر",
  Sunrise: "الشروق",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
  Midnight: "منتصف الليل",
  Lastthird: "الثلث الاخير",
};
const img = require("../../assets/images/lllllllllllllllllllllllllllllinaaaaaaaaaaaaa.jpg");

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function HomeScreen() {
  const { colors } = useTheme();
  const loaded = useFonts({
    Cairo: require("@/assets/fonts/Cairo.ttf"),
    Uthmani: require("@/assets/fonts/UthmanicHafs.otf"),
  });

  const [date, setDate] = useState(new Date());
  const [hijriDate, setHijriDate] = useState("");
  const [dateFlag, setDateFlag] = useState(false);

  const [showPicker, setShowPicker] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [newIcon, setNewIcon] = useState(false);

  const [prayerTimes, setPrayerTimes] = useState<any>(null);
  const [next, setNext] = useState<string>("");
  const [timey, setTimey] = useState<number>(0);
  const [showAdhan, setShowAdhan] = useState(false);

  const router = useRouter();

  const getPrayingTime = async (date: Date) => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      const loc = await Location.getCurrentPositionAsync({});
      const lat = loc.coords.latitude;
      const long = loc.coords.longitude;
      const method = 4;

      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear();

      const response = await fetch(
        `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${lat}&longitude=${long}&method=${method}`
      );
      const json = await response.json();
      const timings = json.data.timings;

      const nextPrayer = getNextPrayer(timings);
      setNext(nextPrayer.name);

      const countdownTimer = getTimeDiffInSeconds(nextPrayer.time);
      setTimey(countdownTimer);

      console.log("Fetched Prayer Times:", timings);
      console.log("Next Prayer:", nextPrayer.name, "at", nextPrayer.time);
      console.log("Time Left (sec):", countdownTimer);

      // Only update state at the end
      setPrayerTimes(timings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPrayingTime(date);
  }, [date]);

  useEffect(() => {
    setupNotifications();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      sendLocalNotification();
    }, 900000);

    return () => clearInterval(interval);
  }, []);

  const getNextPrayer = (prayerTimes: Record<string, string>) => {
    const now = new Date();

    const nextPray = Object.entries(prayerTimes).map(([name, time]) => {
      const [hours, minutes] = time.split(":").map(Number);

      const datetime = new Date(date);
      datetime.setHours(hours);
      datetime.setMinutes(minutes);
      datetime.setSeconds(0);

      return { name, time, datetime };
    });

    const next = nextPray
      .filter((prayer) =>
        Object.keys(prayerNamesInArabic).includes(prayer.name)
      )
      .find((p) => {
        const prayerTime = new Date(p.datetime).getTime();
        return prayerTime - now.getTime() > 0;
      });

    console.log("next : ", next);

    return next || nextPray[0];
  };

  const convertTo12HourFormat = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "م" : "ص";
    const convertedHours = hours % 12 || 12;

    return `${convertedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  useEffect(() => {
    checkIf12HoursPassed();
  }, []);

  useEffect(() => {
    const getHijriDateInArabic = async () => {
      try {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        const formattedDate = `${day}-${month}-${year}`;
        const response = await fetch(
          `https://api.aladhan.com/v1/gToH?date=${formattedDate}`
        );
        const json = await response.json();
        const hijri = json.data.hijri;
        setHijriDate(
          dateFlag
            ? formattedDate
            : `${hijri.day} ${hijri.month.ar} ${hijri.year}`
        );
      } catch (error) {
        console.error("Error fetching Hijri date in Arabic:", error);
      }
    };

    getHijriDateInArabic();
  }, [date, dateFlag]);

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setDate(selectedDate);
    }
    setShowPicker(false);
    setIsModalVisible(!isModalVisible);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setNewIcon(!newIcon);
    Appearance.setColorScheme(newTheme);
  };

  // useEffect(() => {
  //   registerForPushNotifications();
  // }, []);

  LogBox.ignoreLogs(["AppState.removeEventListener"]);

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          headerTitle: "أذكار المسلم",
        }}
      />

      <ParallaxScrollView
        headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
        headerImage={
          <ThemedView style={styles.headerContainer}>
            <Image source={img} style={styles.imgg} />

            <TouchableOpacity onPress={toggleTheme}>
              <Feather
                name={newIcon ? "moon" : "sun"}
                size={20}
                color="white"
                style={styles.settingsIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                router.push("/pages/favourites");
              }}
            >
              <Feather
                name="heart"
                size={20}
                color="white"
                style={styles.heartIcon}
              />
            </TouchableOpacity>

            <View style={styles.dateContainer}>
              <BlurView intensity={20} style={styles.blurCon} />
            </View>

            <TouchableOpacity
              style={styles.date}
              onPress={() => {
                setDateFlag(!dateFlag);
              }}
            >
              <View>
                <Text style={styles.textOfDate}>{hijriDate}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ position: "absolute", bottom: 15, left: 15 }}
              onPress={() => {
                setShowPicker(true);
                setIsModalVisible(!isModalVisible);
              }}
            >
              <Feather name="calendar" size={16} color="white" />
            </TouchableOpacity>

            {Platform.OS === "ios" ? (
              <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setIsModalVisible(false)}
                style={{
                  backgroundColor: Colors.primary,
                  width: "80%",
                  maxHeight: "30%",
                  borderRadius: 20,
                }}
              >
                {showPicker && (
                  <DateTimePicker
                    style={{ flex: 1 }}
                    value={date}
                    mode="date"
                    display="spinner"
                    onChange={onChange}
                  />
                )}
              </Modal>
            ) : (
              showPicker && (
                <DateTimePicker
                  style={{ flex: 1 }}
                  value={date}
                  mode="date"
                  display="default"
                  onChange={onChange}
                />
              )
            )}

            <TouchableOpacity
              onPress={() => {
                setDate(new Date());
              }}
              style={{ position: "absolute", bottom: 15, right: 15 }}
            >
              <Feather name="refresh-cw" size={16} color="white" />
            </TouchableOpacity>
          </ThemedView>
        }
      >
        {/* <TouchableOpacity
          onPress={() => {
            setShowAdhan(true);
          }}
        >
          <Text style={{ color: "black" }}>Start</Text>
        </TouchableOpacity>

        */}

        <View style={styles.nextPrayer}>
          <ThemedText
            style={{
              fontSize: 20,
              fontWeight: "bold",
              fontFamily: "Cairo",
              marginTop: 20,
            }}
          >
            الصلاة القادمة
          </ThemedText>
          <ThemedText
            style={{ fontSize: 20, fontWeight: "bold", fontFamily: "Cairo" }}
          >{`${
            prayerNamesInArabic[next as keyof typeof prayerNamesInArabic] ||
            next
          }`}</ThemedText>

          {timey > 0 && (
            <View
              style={{
                marginTop: 10,
                borderRadius: 10,
                padding: 5,
                width: "100%",
              }}
            >
              <CustomCountdown
                until={timey}
                onFinish={() => {
                  setDate(new Date());
                  setShowAdhan(true);
                }}
              />

              {showAdhan && <ModalAdan onClose={() => setShowAdhan(false)} />}
            </View>
          )}
        </View>

        <View style={styles.prayer}>
          {Object.entries(prayerTimes || {})
            .filter(([name]) => Object.keys(prayerNamesInArabic).includes(name))
            .map(([name, time]) => {
              const formattedTime = convertTo12HourFormat(time as string);
              return (
                <View
                  key={name}
                  style={[
                    styles.containerPrayers,
                    name === next && styles.highlightedPrayer,
                  ]}
                >
                  <ThemedText style={styles.text}>{`${
                    prayerNamesInArabic[
                      name as keyof typeof prayerNamesInArabic
                    ] || name
                  }`}</ThemedText>
                  <ThemedText style={{ fontFamily: "Cairo" }}>
                    {formattedTime as string}
                  </ThemedText>
                </View>
              );
            })}
        </View>

        <TouchableOpacity>
          <Text style={styles.shareText}>شارك التطبيق واكسب الأجر 💫</Text>
        </TouchableOpacity>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    position: "relative",
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 0,
  },

  imgg: {
    height: "100%",
    width: "100%",
    bottom: -5,
    left: 0,
    position: "absolute",
  },

  prayer: {
    padding: 5,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    direction: "rtl",
  },

  containerPrayers: {
    width: "48%",
    marginBottom: 10,
    marginLeft: 5,
    padding: 5,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 5,
    shadowRadius: 5,
  },

  text: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Cairo",
  },
  button: {
    backgroundColor: "white",
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  themeIcon: {
    position: "absolute",
    top: 60,
    left: 30,
  },
  settingsIcon: {
    position: "absolute",
    top: 60,
    right: 30,
  },
  heartIcon: {
    position: "absolute",
    top: 60,
    left: 30,
  },
  shareText: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.primary,
    fontFamily: "Cairo",
    marginTop: 15,
    marginBottom: 75,
  },
  dateContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 0.5,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 50,
    borderTopColor: "#c17387",
  },
  date: {
    marginTop: 205,
    paddingVertical: 5,
    paddingHorizontal: 14,
    borderBottomColor: Colors.primary,
    borderRadius: 20,
    width: "80%",
    marginRight: "auto",
    marginLeft: "auto",
  },
  textOfDate: {
    fontFamily: "Cairo",
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },

  blurCon: {
    position: "relative",
    bottom: 0,
    left: 0,
    width: "100%",
  },

  nextPrayer: {
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    overflow: "hidden",
    width: "70%",
    marginLeft: "15%",
  },
  highlightedPrayer: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: 10,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  textNotification: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
