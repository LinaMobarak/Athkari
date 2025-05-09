import { Collapsible } from "@/components/Collapsible";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import useElementStore from "../stores/store";
import { DuaType, useDuaStore } from "@/app/stores/duaStore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import { Adan } from "@/app/functions/popAdan";
import ShareFunction from "@/app/functions/ShareFunction";
import { FlatList } from "react-native";

function MyComponent({ item }: any) {
  const { favourites } = useElementStore();

  const toggleFavorite = async (item: DuaType) => {
    const fav = useElementStore.getState().favourites;
    let newFav = [];
    if (fav.includes(item)) {
      newFav = fav.filter((f) => (f as DuaType).id !== item.id);
    } else {
      newFav = fav.concat([item]);
    }
    useElementStore.setState({ favourites: newFav });
  };

  return (
    <>
      <Collapsible title={item.title}>
        <ThemedView style={styles.infoBox}>
          <ThemedText style={styles.text}>{item.description}</ThemedText>
        </ThemedView>
        <ThemedView style={styles.icons}>
          {/* Share icon */}
          <TouchableOpacity
            onPress={() => {
              ShareFunction(item.description);
            }}
          >
            <MaterialCommunityIcons
              name="share-variant-outline"
              size={25}
              weight="medium"
              style={{ color: "rgb(243, 158, 158)" }}
            />
          </TouchableOpacity>

          {/* Favourite icon */}
          <TouchableOpacity
            onPress={() => {
              toggleFavorite(item);
            }}
            hitSlop={30}
          >
            <MaterialCommunityIcons
              name={
                favourites.find((f) => (f as DuaType).id === item.id)
                  ? "heart"
                  : "heart-outline"
              }
              size={25}
              weight="medium"
              style={{ color: "rgb(243, 158, 158)" }}
            />
          </TouchableOpacity>
        </ThemedView>
      </Collapsible>
    </>
  );
}

export default function Azkar() {
  const theme = useColorScheme() ?? "light";
  const dua = useDuaStore((s) => s.dua);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "الأدعية",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
      <Adan />

      <FlatList
        // style={{ marginBottom: 200 }}
        data={dua}
        renderItem={({ item }) => <MyComponent item={item} />}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
}

export const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    lineHeight: 30,
  },
  containers: {
    marginTop: 0,
    display: "flex",
    backgroundColor: "black",
    borderColor: "white",
  },
  infoBox: {
    padding: 10,
    alignItems: "center",
    direction: "rtl",
  },
  icons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
});
