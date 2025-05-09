import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Stack, useNavigation, useRouter } from "expo-router";

import QuranCompleteFinalFinal from "@/assets/QuranCompleteFinalFinal.json";
import type { FullQuran } from "../types/quranJson";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import useQuranStore from "../stores/quranStore";

const fullQuran = QuranCompleteFinalFinal as FullQuran;
// const ayah = quranJson as Ayah
// export const surahs = fullQuran.data.surahs
// export const quranTanzil = TheQuran.filter((item) => item.arabic1)
export const surahs = fullQuran.data.surahs;

const numToArb: { [key: number]: string } = {
  0: "٠",
  1: "١",
  2: "٢",
  3: "٣",
  4: "٤",
  5: "٥",
  6: "٦",
  7: "٧",
  8: "٨",
  9: "٩",
};

function convertToArabicNumerals(num: number): string {
  return num
    .toString()
    .split("")
    .map((d) => numToArb[parseInt(d)])
    .join("");
}

export default function SurahsList() {
  const route = useRouter();
  const { colors } = useTheme();
  const { bookmarks, removeBookmark } = useQuranStore();
  const englishToArabic: { [key: string]: string } = {
    Meccan: "مكية",
    Medinan: "مدنية",
  };

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

      <TouchableOpacity
        onPress={() => route.push("./bookmarks")}
        style={{
          backgroundColor: colors.card,
          borderColor: colors.border,
          borderWidth: 1,
          marginRight: 10,
          marginLeft: 10,
          paddingVertical: 10,
          paddingHorizontal: 20,
          borderRadius: 12,
          marginTop: 5,
          width: "95%",
          marginBottom: 10,
          alignItems: "flex-end",
          flexDirection: "row-reverse",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{ fontSize: 20, color: colors.text, fontFamily: "Uthmani" }}
        >
          المحفوظات
        </Text>

        <Feather
          name="bookmark"
          size={20}
          color={colors.text}
          style={{ marginBottom: 8 }}
        />
      </TouchableOpacity>
      <View>
        <FlatList
          data={surahs}
          keyExtractor={(item) => item.number.toString()}
          numColumns={2}
          contentContainerStyle={{
            paddingBottom: 170, // Adjust padding for better scrolling behavior
            paddingRight: 10,
            paddingLeft: 10,
          }}
          columnWrapperStyle={{
            justifyContent: "space-between",
            flexDirection: "row-reverse",
          }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => route.push(`./${item.number}`)}
              style={[
                styles.surahItem,
                {
                  backgroundColor: colors.card,
                  borderWidth: 1,
                  borderColor: colors.border,
                },
              ]}
            >
              <View style={styles.surahNumber}>
                <Text style={styles.surahNumberText}>
                  {convertToArabicNumerals(item.number)}
                </Text>
              </View>
              <View>
                <Text style={[styles.surahText, { color: colors.text }]}>
                  {item.name}
                </Text>
                <Text style={styles.surahDetails}>
                  {englishToArabic[item.revelationType]} - عدد آياتها:{" "}
                  {convertToArabicNumerals(item.ayahs.length)}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  surahItem: {
    width: "48%",
    paddingVertical: 20,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 12,
  },
  surahNumber: {
    backgroundColor: "#d1e7dd",
    padding: 5,
    width: 30,
    borderRadius: 12,
    // borderColor: "transparent",
    // borderWidth: 1,
    position: "absolute",
    top: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  surahNumberText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
    fontFamily: "Cairo",
  },
  surahText: {
    fontSize: 26,
    letterSpacing: 1,
    textAlign: "center",
    fontFamily: "Uthmani",
    color: "white",
    marginBottom: 4,
  },
  surahDetails: {
    color: "#777",
    fontFamily: "Cairo",
  },
});
