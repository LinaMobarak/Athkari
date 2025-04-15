import {
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from "react-native";
import AlQibla from "qibla-direction";
import { Audio } from "expo-av";
import ParallaxScrollView from "../../components/ParallaxScrollView";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { Stack, useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@react-navigation/native";
import CountDown from "react-native-countdown-component";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { BlurView } from "expo-blur";
import { useFonts } from "expo-font";
import { LogBox } from "react-native";
import { Appearance } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Magnetometer } from "expo-sensors";
import * as Location from "expo-location";
import { checkIf12HoursPassed } from "@/app/functions/resetCounter";
import axios from "axios";
// import { I18nManager } from 'react-native';
import { FlatList } from "react-native";

// I18nManager.allowRTL(true);
// I18nManager.forceRTL(true);

import { withTiming } from "react-native-reanimated";
import { selectionAsync } from "expo-haptics";
import Modal from "react-native-modal";

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
const img = require("@/assets/images/HeaderImage.jpeg");

export default function HomeScreen() {
  const { colors } = useTheme();
  const loaded = useFonts({
    Cairo: require("@/assets/fonts/Cairo.ttf"),
  });

  const [loadingPrayers, setLoadingPrayers] = useState(true);
  const [loadingHijri, setLoadingHijri] = useState(true);
  const loading = loadingPrayers || loadingHijri;
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [newIcon, setNewIcon] = useState(false);
  const [selectedNavigation, setSelectedNavigation] = useState(0);
  const [qibla, setQibla] = useState<number>(0);
  const [hijriDate, setHijriDate] = useState("");
  const [datey, setDatey] = useState(false);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [next, setNext] = useState("");
  const [timey, setTimey] = useState<number>(0);
  const [heading, setHeading] = useState<number>(0);

  const navigationMenu = [
    // {name: 'الرئيسية' },
    { name: "القران", route: "alQuran" },
    { name: "أذكار المسلم", route: "azkar" },
    { name: "التسبيح", route: "tasbeeh" },
    { name: "ادعية", route: "dua" },
  ];
  const router = useRouter();

  const selectNavigation = (index: number) => {
    setSelectedNavigation(index);
    // router.push(`./pages/name=${navigationMenu[index].route}`);
  };

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
      .find((p) => p.datetime > now);

    return next || nextPray[0];
  };

  const getNextTimer = (nextPrayerTime: Date) => {
    const now = new Date();
    const diffInSeconds = Math.abs(
      (nextPrayerTime.getTime() - now.getTime()) / 1000
    );
    setTimey(diffInSeconds > 0 ? diffInSeconds : 0);
  };

  useEffect(() => {
    try {
      if (prayerTimes) {
        const nextt = getNextPrayer(prayerTimes);
        if (nextt && nextt.datetime) {
          setNext(nextt.name);
          getNextTimer(nextt.datetime);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [prayerTimes, date]);

  const convertTo12HourFormat = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    // console.log(hours, minutes);
    const period = hours >= 12 ? "م" : "ص";
    const convertedHours = hours % 12 || 12;

    return `${convertedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  useEffect(() => {
    const getPrayingTime = async (date: Date) => {
      setLoadingPrayers(true);
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          alert("Permission to access location was denied");
          return;
        }
        const method = 4;
        const loc = await Location.getCurrentPositionAsync({});
        const lat = loc.coords.latitude;
        const long = loc.coords.longitude;

        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        const direction = await AlQibla.getDirection(lat, long);
        setQibla(direction);

        const response = await fetch(
          `https://api.aladhan.com/v1/timings/${day}-${month}-${year}?latitude=${lat}&longitude=${long}&method=${method}`
        );
        const json = await response.json();
        const timings = json.data.timings;
        setPrayerTimes(timings);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingPrayers(false);
      }
    };

    getPrayingTime(date);
  }, [date]);

  const playAdhan = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sounds/azan1.mp3")
    );
    await sound.playAsync();
  };

  useEffect(() => {
    checkIf12HoursPassed();
    console.log(timey);
    if (timey === 0 && !loading) {
      playAdhan();
    }
  }, []);
  useEffect(() => {
    const getHijriDateInArabic = async () => {
      setLoadingHijri(true);
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
          datey ? formattedDate : `${hijri.day} ${hijri.month.ar} ${hijri.year}`
        );
      } catch (error) {
        console.error("Error fetching Hijri date in Arabic:", error);
      } finally {
        setLoadingHijri(false);
      }
    };

    getHijriDateInArabic();
  }, [date, datey]);

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

  LogBox.ignoreLogs([
    "AppState.removeEventListener", // or the full warning string
  ]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

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
                size={24}
                color="white"
                style={styles.settingsIcon}
              />
            </TouchableOpacity>

            <View style={styles.dateContainer}>
              <BlurView intensity={20} style={styles.blurCon} />
            </View>

            {/* <TouchableOpacity
              style={{ position: "absolute", bottom: 40, right: 80 }}
              onPress={() => {}}
            >
              <Feather name="arrow-right" size={20} color={Colors.primary} />
            </TouchableOpacity> */}

            {/* <TouchableOpacity
              style={{ position: "absolute", bottom: 40, left: 80 }}
            >
              <Feather name="arrow-left" size={20} color={Colors.primary} />
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.date}
              onPress={() => {
                setDatey(!datey);
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
              <Feather name="calendar" size={20} color="white" />
            </TouchableOpacity>

            {Platform.OS === "ios" ? (
              <Modal
                isVisible={isModalVisible}
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
              <Feather name="refresh-cw" size={20} color="white" />
            </TouchableOpacity>
          </ThemedView>
        }
      >
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
                backgroundColor: "rgba(255, 255, 255, 0.24)",
                borderRadius: 10,
                padding: 5,
              }}
            >
              <CountDown
                size={10}
                until={timey}
                onFinish={() => console.log("Countdown finished")}
              />
            </View>
          )}
        </View>

        <View style={styles.prayer}>
          {Object.entries(prayerTimes || {})
            .filter(([name]) => Object.keys(prayerNamesInArabic).includes(name))
            .map(([name, time]) => {
              const formattedTime = convertTo12HourFormat(time as string);
              return (
                <View key={name} style={styles.containerPrayers}>
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

        {/* {qibla && (
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <ThemedText
              style={{ fontFamily: "Cairo", fontSize: 16, marginBottom: 20 }}
            >
              اتجاه القبلة
            </ThemedText>
            <Image
              source={require("@/assets/images/qibla.png")}
              style={{
                width: 100,
                height: 100,
                transform: [
                  {
                    rotate: `${(qibla - heading).toFixed(2)}deg`,
                  },
                ],
              }}
            />
          </View>
        )} */}
        {/* Placeholder for future feature */}
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
    bottom: 0,
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
  shareText: {
    fontSize: 16,
    textAlign: "center",
    color: Colors.primary,
    fontFamily: "Cairo",
    marginTop: 15,
    marginBottom: 75,
  },
  dateContainer: {
    backgroundColor: "rgba(3, 3, 3, 0.5)",
    borderWidth: 0.5,
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 50,
    borderTopColor: "#B0C4A1",
  },
  date: {
    backgroundColor: "#151718",
    position: "absolute",
    bottom: 20,
    left: "30%",
    width: "40%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.secondaryColor,
    paddingLeft: 5,
    paddingRight: 5,
  },

  textOfDate: {
    color: Colors.secondaryColor,
    fontFamily: "Cairo",
    fontSize: 14,
    fontWeight: "bold",
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
    // borderColor: Colors.primary,
    // borderWidth: 1,
    // borderTopLeftRadius: 100,
    // borderTopRightRadius: 100,
    height: 150,
    overflow: "hidden",
    width: "70%",
    marginLeft: "15%",
  },
});
