import { Image, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ParallaxScrollView from "../../components/ParallaxScrollView";
import React, { useEffect, useState } from "react";
import Feather from "@expo/vector-icons/Feather";
import { Stack, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { useTheme } from "@react-navigation/native";
import { Colors } from "@/constants/Colors";
import { ThemedText } from "@/components/ThemedText";
import { BlurView } from "expo-blur";
import { useFonts } from "expo-font";
import { Appearance } from "react-native";
import * as Location from "expo-location";
import { checkIf12HoursPassed } from "@/app/functions/resetCounter";
import axios from "axios";

const img = require("@/assets/images/HeaderImage.jpeg");
export default function HomeScreen() {
  const route = useRouter();
  const { colors } = useTheme();
  const [loaded, error] = useFonts({
    Cairo: require("@/assets/fonts/Cairo.ttf"),
  });
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [newIcon, setNewIcon] = useState(false);
  const [hijriDate, setHijriDate] = useState("");

  const [prayerTimes, setPrayerTimes] = useState(null);
  const prayerNames = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
  const prayerNamesInArabic = {
    Fajr: "الفجر",
    Sunrise: "الشروق",
    Dhuhr: "الظهر",
    Asr: "العصر",
    Maghrib: "المغرب",
    Isha: "العشاء",
  };

  const convertTo12HourFormat = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "مساءا" : "صباحا";
    const convertedHours = hours % 12 || 12;
    return `${convertedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  const getPrayingTime = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert(
          "Permission denied: Location permission is required to get prayer times."
        );
        return;
      }

      // Get current location
      let location = await Location.getCurrentPositionAsync({});
      const lat = location.coords.latitude;
      const long = location.coords.longitude;

      const method = 2; // islamic society for North America

      const response = await axios.get(
        `https://api.aladhan.com/v1/timings?latitude=${lat}&longitude=${long}&method=${method}`
      );

      setPrayerTimes(response.data.data.timings);
      // console.log(prayerTimes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPrayingTime();
  });

  useEffect(() => {
    checkIf12HoursPassed();
  }, []);

  useEffect(() => {
    const getHijriDateInArabic = async () => {
      try {
        const today = new Date();
        const day = today.getDate().toString().padStart(2, "0"); // Format day as "DD"
        const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Format month as "MM"
        const year = today.getFullYear();

        const currentDate = `${day}-${month}-${year}`;
        const response = await fetch(
          `https://api.aladhan.com/v1/gToH?date=${currentDate}`
        );
        const json = await response.json();
        const hijri = json.data.hijri;

        setHijriDate(`${hijri.day} ${hijri.month.ar} ${hijri.year}`);
      } catch (error) {
        console.error("Error fetching Hijri date in Arabic:", error);
      }
    };

    getHijriDateInArabic();
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    setNewIcon(!newIcon);
    Appearance.setColorScheme(newTheme);
  };

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
                name={newIcon ? "sun" : "moon"}
                size={24}
                color="white"
                style={styles.settingsIcon}
              />
            </TouchableOpacity>
            <View style={styles.dateContainer}>
              <BlurView intensity={20} style={styles.blurCon} />
            </View>

            <View style={styles.date}>
              <Text style={styles.textOfDate}>{hijriDate}</Text>
            </View>
          </ThemedView>
        }
      >
        <View style={styles.pagesContainer}>
        <TouchableOpacity
          style={styles.containerText}
          onPress={() => route.navigate("/pages/azkar")}
        >
          <MaterialCommunityIcons
            color={colors.text}
            size={20}
            name="book-outline"
          />
          <ThemedText style={styles.text}>أذكار المسلم</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.containerText}
          onPress={() => route.navigate("/pages/dua")}
        >
          <MaterialCommunityIcons
            color={colors.text}
            size={20}
            name="hands-pray"
          />
          <ThemedText style={styles.text}>الأدعية</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.containerText}
          onPress={() => route.navigate("/pages/tasbeeh")}
        >
          <MaterialCommunityIcons
            color={colors.text}
            size={20}
            name="circle-double"
          />
          <ThemedText style={styles.text}>المسبحة</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.containerText}
          onPress={() => route.navigate("/pages/namesOfallah")}
        >
          <MaterialCommunityIcons
            color={colors.text}
            size={20}
            name="star-four-points-outline"
          />
          <ThemedText style={styles.text}>أسماء الله الحسنى</ThemedText>
        </TouchableOpacity>
        </View>
        <View style={{ padding: 20 }}>
          {Object.entries(prayerTimes || {})
            .filter(([name]) => prayerNames.includes(name))
            .map(([name, time]) => {
              const formattedTime = prayerNames.includes(name)
                ? convertTo12HourFormat(time as string)
                : time;

              return (
                <Text style={{ color: "white" }} key={name}>{`${
                  prayerNamesInArabic[
                    name as keyof typeof prayerNamesInArabic
                  ] || name
                } : ${formattedTime}`}</Text>
              );
            })}
        </View>

        {/* Placeholder for future feature */}
        <TouchableOpacity>
          <Text style={styles.shareText}>شارك التطبيق واكسب الأجر 💫</Text>
        </TouchableOpacity>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
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
  pagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap", // Allows wrapping to create a grid
    justifyContent: "space-between", // Distributes items evenly with space between
    alignItems: "center", // Aligns items vertically in the center
    padding: 0,
    direction: 'rtl',
  },
  containerText: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    height: 100,
    width: "48%",
    padding: 20,
    borderRadius: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 5,
    shadowRadius: 5,
    // elevation: 5,
    marginBottom: 10,
    borderColor: Colors.primary,
    borderWidth: 2,
    // height: 70,
  },
  text: {
    fontSize: 16,
    fontWeight: "400",
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
    textDecorationLine: "underline",
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
});
