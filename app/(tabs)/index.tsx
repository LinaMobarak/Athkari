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
import { checkIf12HoursPassed } from "@/app/functions/resetCounter";

const img = require("@/assets/images/HeaderImage.jpeg");
export default function HomeScreen() {
  useEffect(() => {
    checkIf12HoursPassed();
  }, []);

  const [hijriDate, setHijriDate] = useState("");

  useEffect(() => {
    const getHijriDateInArabic = async () => {
      try {
        const response = await fetch(
          "https://api.aladhan.com/v1/gToH?date=10-04-2025"
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

  const route = useRouter();
  const { colors } = useTheme();

  const [loaded, error] = useFonts({
    Cairo: require("@/assets/fonts/Cairo.ttf"),
  });
  const [theme, setTheme] = useState(Appearance.getColorScheme());
  const [newIcon, setNewIcon] = useState(false);

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
            <View
              style={{
                backgroundColor: "rgba(3, 3, 3, 0.5)",
                borderWidth: 1,
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "100%",
                height: 50,
                borderTopColor: "#B0C4A1",
                // backdropFilter: 'blur(20px)',
              }}
            >
              <BlurView
                intensity={20}
                style={{
                  position: "relative",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: 250,
                }}
              />
            </View>

            <View style={styles.date}>
              <Text style={styles.textOfDate}>{hijriDate}</Text>
            </View>
          </ThemedView>
        }
      >
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

  containerText: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 20,
    borderRadius: 20,
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

  date: {
    backgroundColor: "#151718",
    position: "absolute",
    bottom: 15,
    left: "40%",
    width: "20%",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.secondaryColor,
  },

  textOfDate: {
    color: Colors.secondaryColor,
    fontFamily: "Cairo",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
