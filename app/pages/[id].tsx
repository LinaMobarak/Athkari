import { Stack, useLocalSearchParams } from "expo-router";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ActivityIndicator,
  ScrollView,
  Image,
  Platform,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { useEffect, useState, useRef, useMemo } from "react";
import QuranData from "@/assets/QuranCompleteFinalFinal.json";
import TheQuran from "@/assets/TheQuran.json";
import useQuranStore from "../stores/quranStore";

const numToArb = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
const { width } = Dimensions.get("window");
const TOTAL_QURAN_PAGES = 604;

const toArabic = (n: number) =>
  n
    .toString()
    .split("")
    .map((d) => numToArb[+d] || "٠")
    .join("");

export default function SurahPage() {
  const { theme } = getColorScheme();

  const { colors } = useTheme();
  const { id } = useLocalSearchParams();
  const surahNo = parseInt(String(id), 10);
  const flatListRef = useRef<FlatList>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number | null>(null);
  const initialRenderRef = useRef(true);

  // Cache for page ayahs to improve performance
  const pageAyahsCache = useRef<Record<number, any[]>>({});

  const { bookmarks, addBookmark, removeBookmark } = useQuranStore();

  // Find the actual first page of the surah
  const firstPage = useMemo(() => {
    const surah = QuranData.data.surahs.find((s) => s.number === surahNo);
    if (!surah || !surah.ayahs.length) return 1;
    return surah.ayahs[0].page;
  }, [surahNo]);

  // Generate the pages array with the surah's first page in view
  const pages = useMemo(() => {
    // Create page array in reverse order for RTL layout
    return Array.from({ length: TOTAL_QURAN_PAGES }, (_, i) => i + 1);
  }, []);

  // Prepare component
  useEffect(() => {
    if (firstPage) {
      setCurrentPage(firstPage);
      setLoading(false);
    }
  }, [firstPage]);

  // Get ayahs for a specific page
  const getPageAyahs = (page: number) => {
    // Return cached result if available
    if (pageAyahsCache.current[page]) return pageAyahsCache.current[page];

    if (page < 1 || page > TOTAL_QURAN_PAGES) return [];

    const result = QuranData.data.surahs.flatMap((surah) =>
      surah.ayahs
        .filter((ayah) => ayah.page === page)
        .map((ayah) => {
          const correspondingSurah = TheQuran.find(
            (qSurah: any) => qSurah.surahNo === surah.number
          );
          const arabicText =
            correspondingSurah?.arabic1[ayah.numberInSurah - 1] || ayah.text;

          return {
            text: arabicText,
            numberInSurah: ayah.numberInSurah,
            surahName: surah.name,
            surahNumber: surah.number,
            page: ayah.page,
          };
        })
    );

    // Cache the result
    pageAyahsCache.current[page] = result;
    return result;
  };

  // Handle bookmark functions
  const handleAddBookmark = (ayahText: string) => {
    addBookmark({
      surahId: surahNo,
      surahName:
        QuranData.data.surahs.find((s) => s.number === surahNo)?.name || "",
      revelationType:
        QuranData.data.surahs.find((s) => s.number === surahNo)
          ?.revelationType || "",
      text: ayahText,
    });
  };

  const handleRemoveBookmark = (surahId: number) => {
    removeBookmark(surahId);
  };

  // Render each page
  const renderPage = ({ item: page }: { item: number }) => {
    const pageAyahs = getPageAyahs(page);

    return (
      <View style={[styles.pageContainer, { width }]}>
        {pageAyahs.length === 0 ? (
          <View style={styles.center}>
            <Text style={{ fontSize: 18, color: colors.text }}>
              صفحة {toArabic(page)}
            </Text>
          </View>
        ) : (
          <ScrollView>
            <View style={styles.scrollContainer}>
              <Text style={[styles.ayahsLine, { color: colors.text }]}>
                {pageAyahs.map((ayah, index) => (
                  <Text key={index}>
                    {/* Show surah header for first ayah */}
                    {ayah.numberInSurah === 1 && (
                      <Text style={[styles.surahName, { color: colors.text }]}>
                        {index !== 0 && "\n\n"}
                        {ayah.surahName} {"\n\n"}
                        {ayah.surahNumber !== 1 &&
                          ayah.surahNumber !== 9 &&
                          (Platform.OS === "android" ? (
                            <Image
                              source={
                                theme === "dark"
                                  ? require("../../assets/images/darkModeBism.png")
                                  : require("../../assets/images/whiteModeBism.png")
                              }
                              style={{
                                width: "55%",
                                height: "10%",
                                marginRight: "auto",
                                marginLeft: "auto",
                              }}
                            />
                          ) : (
                            <Text
                              style={{
                                textAlign: "center",
                                marginVertical: 10,
                                fontSize: 25,
                              }}
                            >
                              ﷽ {"\n"}
                            </Text>
                          ))}
                        {"\n"}
                      </Text>
                    )}
                    <Text
                      onPress={() => handleAddBookmark(ayah.text)}
                      onLongPress={() => handleRemoveBookmark(surahNo)}
                      style={styles.pressableAyah}
                    >
                      {ayah.text} {toArabic(ayah.numberInSurah)}{" "}
                    </Text>
                  </Text>
                ))}
              </Text>
            </View>
          </ScrollView>
        )}
      </View>
    );
  };

  // Handle scroll end to update current page
  const handleScroll = (e: any) => {
    const pageIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    if (pageIndex >= 0 && pageIndex < pages.length) {
      const newPage = pages[pageIndex];
      setCurrentPage(newPage);
    }
  };

  // Pre-calculate dimensions for better scrolling performance
  const getItemLayout = (_: any, index: number) => ({
    length: width,
    offset: width * index,
    index,
  });

  // Handle scroll to index failures
  const onScrollToIndexFailed = (info: any) => {
    console.log("Scroll to index failed:", info);

    const wait = new Promise((resolve) => setTimeout(resolve, 500));
    wait.then(() => {
      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          offset: info.index * width,
          animated: false,
        });
      }
    });
  };

  // Scroll to first page of surah on initial render
  const onLayout = () => {
    if (initialRenderRef.current && flatListRef.current && firstPage) {
      initialRenderRef.current = false;
      // Wait for layout to complete first
      setTimeout(() => {
        const indexToScrollTo = firstPage - 1; // Convert to 0-based index
        try {
          flatListRef.current?.scrollToIndex({
            index: indexToScrollTo,
            animated: false,
          });
        } catch (error) {
          console.log("Failed to scroll on layout:", error);
        }
      }, 100);
    }
  };

  // Show loading indicator
  if (loading || !currentPage) {
    return (
      <View style={[styles.container, styles.center]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 20, color: colors.text }}>
          جاري التحميل...
        </Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "القرآن الكريم",
          headerTitleAlign: "center",
          headerBackButtonDisplayMode: "minimal",
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <Text style={{ color: colors.text, fontSize: 16 }}>
                الصفحة {toArabic(currentPage || 1)}
              </Text>
            </View>
          ),
        }}
      />

      <View style={styles.container} onLayout={onLayout}>
        <FlatList
          contentContainerStyle={{ marginBottom: 20 }}
          ref={flatListRef}
          data={pages}
          renderItem={renderPage}
          keyExtractor={(page) => `page-${page}`}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          initialNumToRender={3}
          maxToRenderPerBatch={2}
          windowSize={5}
          getItemLayout={getItemLayout}
          onMomentumScrollEnd={handleScroll}
          onScrollToIndexFailed={onScrollToIndexFailed}
          removeClippedSubviews={true}
          // Use RTL layouting for the FlatList
          inverted={true}
          // Don't set initialScrollIndex as it's unreliable
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: "#fff",
  },
  pageContainer: {
    // flex: 1,
  },
  scrollContainer: {
    padding: 16,
    flex: 1,
  },
  surahName: {
    fontSize: 30,
    // fontWeight: "bold",
    fontFamily: "Uthmani",
    textAlign: "center",
    marginBottom: 20,
  },
  ayahsLine: {
    fontSize: 24,
    fontFamily: "Uthmani",

    lineHeight: 40,
    // textAlign: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pageNumber: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  pressableAyah: {
    textAlign: "center",
  },
});
function getColorScheme(): { theme: any } {
  throw new Error("Function not implemented.");
}
