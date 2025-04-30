import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, Text } from "react-native";
import useQuranStore from "../stores/quranStore";
import { ScrollView } from "react-native";
import { surahs } from "./alQuran";

export default function Bookmarks() {
  const { bookmarks, removeBookmark } = useQuranStore();
  const { colors } = useTheme();
  const route = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "القرآن الكريم",
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 16,
            fontFamily: "Cairo",
          },
        }}
      />
      <ScrollView
        style={{
          backgroundColor: colors.background,
          paddingHorizontal: 10,
        }}
      >
        {bookmarks.map((bookmark) => (
          <TouchableOpacity
            key={bookmark.idd}
            onPress={() => {
              route.push(`./${bookmark.idd}`);
            }}
            style={{
              backgroundColor: colors.card,
              borderColor: colors.border,
              borderWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 12,
              marginTop: 5,
              width: "100%",
              marginBottom: 5,
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                color: colors.text,
                fontFamily: "Uthmani",
              }}
            >
              {bookmark.surahName} - {bookmark.text}
            </Text>
            <TouchableOpacity onPress={() => removeBookmark(bookmark.text)}>
              <Feather name="trash-2" size={20} color={colors.text} />
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
}
