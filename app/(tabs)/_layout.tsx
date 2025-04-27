import { Tabs } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity, View, Image } from "react-native";
import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Adan } from "@/app/functions/popAdan";
import { useFonts } from "expo-font";

export default function TabLayout() {
  const url = require("../../assets/images/KaabaTab.png");
  const colorScheme = useColorScheme();

  useFonts({
    Cairo: require("@/assets/fonts/Cairo.ttf"),
    Uthmani: require("@/assets/fonts/UthmanicHafs.otf"),
    // Naksh: require("@/assets/fonts/Nakshasd.ttf"),
    // Amiri: require("@/assets/fonts/Amiri-Regular.ttf"),
    // new: require("@/assets/fonts/ScheherazadeNew.ttf"),
  });

  return (
    <>
      {/* <Adan /> */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          showHeader: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: Platform.select({
            ios: {
              position: "absolute",
              // backgroundColor: Colors[colorScheme ?? "light"].background,
            },
            default: {
              // backgroundColor: Colors[colorScheme ?? "light"].background,
            },
          }),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "الرئيسية",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons size={28} name="home" color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="qibla"
          options={{
            title: "القبلة",
            tabBarIcon: ({ focused }) => (
              <View>
                <Image
                  source={url}
                  style={{
                    width: 100,
                    height: 100,
                    marginBottom: 50,
                    // borderWidth: 1,
                    // borderColor: "white",
                  }}
                />
              </View>
            ),
          }}
        />

        <Tabs.Screen
          name="navigationMenu"
          options={{
            title: "الصفحات",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                size={28}
                name="menu-open"
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
