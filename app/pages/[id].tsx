import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, ScrollView, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { useTheme } from "@react-navigation/native";
import { useEffect, useState } from 'react';
import QuranData from '@/assets/QuranCompleteFinalFinal.json';
import TheQuran from '@/assets/TheQuran.json';
import useQuranStore from '../stores/quranStore';
import { surahs } from './alQuran';

const numToArb = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

const toArabic = (n: number) => n.toString().split('').map(d => numToArb[+d]).join('');

const getPageAyahs = (page: number) => {
  return QuranData.data.surahs
    .flatMap((surah) => 
      surah.ayahs.map((ayah: any) => {
        const correspondingSurah = TheQuran.find((qSurah: any) => qSurah.surahNo === surah.number);
        const arabicText = correspondingSurah?.arabic1[ayah.numberInSurah - 1] || ayah.text;

        return {
          text: arabicText,
          numberInSurah: ayah.numberInSurah,
          surahName: surah.name,
          page: ayah.page,
        };
      })
    )
    .filter((ayah) => ayah.page === page);
};

const getSurahFirstPage = (surahNo: number) => {
  const surah = QuranData.data.surahs.find(s => s.number === surahNo);
  if (!surah) return null;
  return surah.ayahs[0]?.page ?? null; // Get the first ayah's page
};

export default function SurahPage() {
  const { id } = useLocalSearchParams();
  const surahNo = Number(id); // Now this is surah number, NOT page number
  const { colors } = useTheme();

  const [page, setPage] = useState(() => getSurahFirstPage(surahNo) || 1);
  const [pageAyahs, setPageAyahs] = useState(() => getPageAyahs(getSurahFirstPage(surahNo) || 1));
  
  const surah = QuranData.data.surahs.find(s => s.number === surahNo);  
  const arabic1 = TheQuran.find(q => q.surahNo === surahNo)?.arabic1;
  
  const { lastRead, setLastRead, bookmarks, addBookmark, removeBookmark } = useQuranStore();

  const handleAddBookmark = (ayahText: string) => {
    const ayah = QuranData.data.surahs.flatMap(s => s.ayahs).find(a => a.text === ayahText);
    if (ayah) {
      addBookmark({
        surahId: surahNo,
        surahName: surah?.name || '',
        revelationType: surah?.revelationType || '',
        text: ayah.text,
      });
    }
  };
  // debugging

  const handleRemoveBookmark = (surahId: number) => {
    removeBookmark(surahId);
  };

  const updatePageAyahs = (page: number) => {
    const ayahs = getPageAyahs(page);
    return ayahs.map((ayah, index) => {
      // Ensure the Surah name is only added to the first Ayah of the Surah
      if (ayah.numberInSurah === 1) {
        const surah = QuranData.data.surahs.find(s => s.name === ayah.surahName);
        return {
          ...ayah,
          surahName: surah?.name || '', // Add Surah name to the first Ayah
        };
      }
      return ayah;
    });
  };
  
  useEffect(() => {
    setPageAyahs(updatePageAyahs(page));
  }, [page]);

  const handleNextPage = () => setPage(prev => prev + 1);
  const handlePreviousPage = () => setPage(prev => Math.max(prev - 1, 1));

  if (!pageAyahs.length) {
    return (
      <View style={styles.center}>
        <Text style={{ fontSize: 18, color: colors.text }}>No Ayahs found for page {toArabic(page)}</Text>
      </View>
    );
  }

  return (
    <>
    <Stack.Screen
    options={{
        headerTitle: "القرآن الكريم",
        // a
    }}
    />
    <View style={styles.container}>

    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.ayahsLine}>
        {pageAyahs.map((ayah, index) => (
          <Text key={index}>
            {ayah.numberInSurah === 1 && ayah.surahName && (
              <Text style={styles.surahName}>
                {'\n\n'}{ayah.surahName}{' '}{'\n\n'}
              </Text>
            )}
            <Text
              onPress={() => handleAddBookmark()}
              style={styles.pressableAyah}
            >
              {ayah.text} {toArabic(ayah.numberInSurah)}{' '}
            </Text>
          </Text>
        ))}
      </Text>
    </ScrollView>


      <View style={styles.pagination}>
        <Button color="#000" title="السابق" onPress={handlePreviousPage} disabled={page <= 1} />
        <Text style={{ fontSize: 18, color: '#000', marginHorizontal: 10 }}>{toArabic(page)}</Text>
        <Button color="#000" title="التالي" onPress={handleNextPage} disabled={page >= 604} />
      </View>
    </View>
    </>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#777',
    paddingVertical: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: 'Cairo',
    color: '#000',
  },
  scrollContainer: {
    padding: 20,
  },
  surahName: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'Uthmani',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  // ayahs: {
  //   fontSize: 54,
  //   alignItems: 'center',
  //   fontFamily: 'Uthmani',
  //   textAlign: 'right',
  // },
  ayahsLine: {
    fontSize: 24,
    fontFamily: 'Uthmani',
    color: '#000',
    lineHeight: 40,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    padding: 20,
  },
  pressableAyah: {
    // color: '#999', // normal color
    textAlign: 'center',
    // direction: 'rtl',
  },
  
});