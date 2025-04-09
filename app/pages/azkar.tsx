import { Collapsible } from "@/components/Collapsible";
import { ThemedView } from "@/components/ThemedView";
import { Stack } from "expo-router";
import React from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import useElementStore, { thekrType } from "../store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { ThemedText } from "@/components/ThemedText";
import ShareFunction from "@/app/shareFunction";
import { FlatList } from "react-native";

function Mycomponents({
  id,
  title,
  content,
}: {
  id: number | string;
  title: string;
  content: thekrType[];
}) {
  // const decrementCounter = useElementStore((state) => state.decrementCounter);
  const { favourites } = useElementStore();

  const toggleFavorite = async (item: thekrType) => {
    const fav = useElementStore.getState().favourites;

    let newFav = [];

    if (fav.includes(item)) {
      newFav = fav.filter((f) => (f as thekrType).textId !== item.textId);
    } else {
      newFav = fav.concat([item]);
    }

    useElementStore.setState({ favourites: newFav });
  };

  return (
    <>
      <Collapsible title={title}>
        <View style={{ backgroundColor: Colors.primary }}>
          <FlatList
            data={content}
            renderItem={({ item }) => (
              <ThemedView
                style={{
                  margin: 5,
                  borderRadius: 10,
                }}
              >
                <ThemedText style={styles.text}>{item.text}</ThemedText>

                <ThemedView style={styles.icon}>
                  <TouchableOpacity
                    onPress={() => {
                      ShareFunction(item);
                    }}
                  >
                    <MaterialCommunityIcons
                      name="share-variant-outline"
                      size={25}
                      weight="medium"
                      style={{ color: "rgb(243, 158, 158)" }}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      // item.counter--;
                      // useElementStore.setState({});
                    }}
                  >
                    <ThemedView>
                      <Text style={styles.touchable}>{item.counter}</Text>
                    </ThemedView>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      toggleFavorite(item);
                    }}
                  >
                    <MaterialCommunityIcons
                      name={
                        favourites.find(
                          (fav) => (fav as thekrType)?.textId === item.textId
                        )
                          ? "heart"
                          : "heart-outline"
                      }
                      size={25}
                      weight="medium"
                      style={{ color: "rgb(243, 158, 158)" }}
                    />
                  </TouchableOpacity>
                </ThemedView>
              </ThemedView>
            )}
            keyExtractor={(item) => item.textId.toString()}
          />
        </View>
      </Collapsible>
    </>
  );
}

export default function Azkar() {
  const theme = useColorScheme() ?? "light";
  const element = useElementStore((state) => state.element);

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "أذكار المسلم",

          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
      <FlatList
        contentContainerStyle={{ paddingBottom: 200 }}
        data={element}
        renderItem={({ item }) => (
          <Mycomponents
            id={item.id}
            title={item.title}
            content={item.content}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </>
  );
}

export const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: "bold",
    padding: 10,
    lineHeight: 30,
    // textAlign: "right",
    direction: "rtl",
  },
  count: {
    backgroundColor: Colors.primary,
    marginBottom: 5,
    color: Colors.dark.text,
    fontWeight: "bold",
    fontSize: 15,
  },
  touchable: {
    backgroundColor: Colors.primary,
    padding: 10,
    color: "white",
    textAlign: "center",
    borderRadius: 10,
    fontWeight: "bold",
  },
  btn: {
    width: "60%",
  },

  icon: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
});
