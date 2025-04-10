import React, { useState } from "react";
import {
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import useElementStore, { duaType, favType, thekrType } from "../store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";
import ShareFunction from "@/app/ShareFunction";
import { Colors } from "@/constants/Colors";

export default function Favourites() {
  const theme = useColorScheme() ?? "light";
  const favourites = useElementStore((state) => state.favourites);
  // console.log(favourites);

  const toggleFavorite = (item: favType) => {
    // console.log(item);

    const updatedFav = favourites.filter((fav) => fav !== item);
    useElementStore.setState({ favourites: updatedFav });
  };

  const renderFavouriteItem = (fav: favType, idx: number) => {
    // console.log(Object.keys(fav));

    if (Object.keys(fav).includes("text")) {
      // Handle `thekrType`
      const tempFav = fav as thekrType;
      return (
        <ThemedView key={idx} style={styles.favouriteItem}>
          <ThemedText style={styles.text}>{tempFav.text}</ThemedText>
          <ThemedView style={styles.icon}>
            <TouchableOpacity onPress={() => toggleFavorite(fav)}>
              <MaterialCommunityIcons
                name="heart"
                size={30}
                color="rgba(235, 151, 184, 0.68)"
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => ShareFunction(tempFav.text)}>
              <MaterialCommunityIcons
                name="share-variant-outline"
                size={25}
                style={{ color: "rgb(243, 158, 158)" }}
              />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      );
    } else if (Object.keys(fav).includes("description")) {
      // Handle `duaType`
      const tempFav = fav as duaType;
      return (
        <ThemedView key={idx} style={styles.favouriteItem}>
          <ThemedText style={styles.duaTitle}>{tempFav.title}</ThemedText>
          <ThemedText style={styles.description}>
            {tempFav.description}
          </ThemedText>
          <ThemedView style={styles.icon}>
            <TouchableOpacity onPress={() => toggleFavorite(fav)}>
              <MaterialCommunityIcons
                name="heart"
                size={30}
                color="rgba(235, 151, 184, 0.68)"
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => ShareFunction(tempFav.description)}
            >
              <MaterialCommunityIcons
                name="share-variant-outline"
                size={25}
                style={{ color: "rgb(243, 158, 158)" }}
              />
            </TouchableOpacity>
          </ThemedView>
        </ThemedView>
      );
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor:
          theme === "light" ? Colors.light.background : Colors.dark.background,
      }}
      contentContainerStyle={{ paddingBottom: 200, marginTop: 0 }}
    >
      <Stack.Screen
        options={{
          headerTitle: "المفضلة",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
      <ThemedView style={styles.container}>
        {favourites.length === 0 ? (
          <ThemedView
            style={{
              alignItems: "center",
              paddingTop: 50,
              flex: 1,
            }}
          >
            <MaterialCommunityIcons
              name="heart-outline"
              size={100}
              style={{ color: "rgb(243, 158, 158)", marginBottom: 20 }}
            />
            <ThemedText style={{ fontWeight: "bold", fontSize: 20 }}>
              The Favourite page is empty
            </ThemedText>
          </ThemedView>
        ) : (
          favourites.map((fav, idx) => renderFavouriteItem(fav, idx))
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 0,
    flex: 1,
  },
  favouriteItem: {
    margin: 20,
    padding: 30,
    borderWidth: 1,
    borderColor: "#3c7380",
    borderRadius: 10,
    backgroundColor: "white",
    position: "relative",
    paddingBottom: 50,
  },
  text: {
    fontSize: 15,
    fontWeight: 400,
    color: "black",
    direction: "rtl",
    marginBottom: 10,
  },
  description: {
    fontSize: 15,
    fontWeight: 400,
    color: "black",
    direction: "rtl",
    marginBottom: 10,
  },
  icon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "white",
    marginBottom: 0,
  },

  duaTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    direction: "rtl",
    marginBottom: 10,
  },
});
