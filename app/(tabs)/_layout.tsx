import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
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
          }
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
        name="favourites"
        options={{
          title: "المفضلة",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons size={28} name="heart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
