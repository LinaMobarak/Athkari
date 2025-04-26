import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, ScrollView, View, StyleSheet, Button } from 'react-native';
import { useTheme } from "@react-navigation/native";
import QuranData from '@/assets/QuranCompleteFinalFinal.json';
import { useEffect, useState } from 'react';
import { ThemedText } from '@/components/ThemedText';

const numToArb = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];

const toArabic = (n: number) => n.toString().split('').map(d => numToArb[+d]).join('');

const getPageAyahs = (page: number) => {
  return QuranData.data.surahs
    .flatMap((surah) => 
      surah.ayahs.map((ayah: any) => ({
        text: ayah.text,
        numberInSurah: ayah.numberInSurah,
        surahName: surah.name,
        page: ayah.page,
      }))
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
  const [surahName, setSurahName] = useState("")
  
  const surah = QuranData.data.surahs.find(s => s.number === surahNo);
  const ayaty = surah?.ayahs
  
  useEffect(() => {
    if (ayaty && ayaty[0]?.numberInSurah === 1) {
    setSurahName(surah?.name || "");
    }
    
    setPageAyahs(getPageAyahs(page));
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
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      
        {/* Display Surah name only on the first page of the Surah */}
        {page === getSurahFirstPage(surahNo) && (
          <>
          <Text style={styles.surahName}>{surahName}</Text>
          {surahNo !== 9 && ( // Do not display for Surah Al-Tawbah
            <Text style={styles.bismillah}>بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</Text>
          )}
          </>
        )}

        <Text style={styles.ayahsLine}>
          {pageAyahs.map((ayah, index) => (
            <Text key={index}>
              {ayah.text} {toArabic(ayah.numberInSurah)}{' '}
            </Text>
          ))}
        </Text>
      </ScrollView>

      <View style={styles.pagination}>
        <Button color="#000" title="السابق" onPress={handlePreviousPage} disabled={page <= 1} />
        <Text style={{ fontSize: 18, color: '#000', marginHorizontal: 10 }}>{toArabic(page)}</Text>
        <Button color="#000" title="التالي" onPress={handleNextPage} />
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  bismillah: {
    fontSize: 24,
    fontFamily: 'Uthmani',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
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
    fontSize: 28,
    fontWeight: 'bold',
    fontFamily: 'Uthmani',
    color: '#000',
    textAlign: 'center',
    marginBottom: 20,
  },
  ayahsLine: {
    fontSize: 28,
    textAlign: 'right',
    fontFamily: 'Uthmani',
    color: '#000',
    writingDirection: 'rtl',
    lineHeight: 50,
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
});