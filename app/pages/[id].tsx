import { useLocalSearchParams, Stack, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Text, ScrollView, View, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';

const numToArb: { [key: number]: string } = {
0: '۰', 1: '۱', 2: '۲', 3: '۳', 4: '٤',
5: '٥', 6: '٦', 7: '٧', 8: '۸', 9: '۹',
};

function convertToArabicNumerals(num: number): string {
return num.toString().split('').map((d) => numToArb[parseInt(d)]).join('');
}

export default function SurahDetail() {
const { id } = useLocalSearchParams();
const [ayahs, setAyahs] = useState<any[]>([]);
const [ name, setName ] = useState()
const [loading, setLoading] = useState(true);
const fontSizeValue = 20

type Surah = {
    englishName: string,
    juz: string,
    text: string,
}

useEffect(() => {
    async function fetchAyahs() {
    try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}/ar`);
        const json = await res.json();

        const textToRemove = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
        const asd = json.data.name
        setName(asd)
        const cleaned = json.data.ayahs.map((ayah, index) => {
        if (index === 0 && id !== '1') {
            return {
            ...ayah,
            text: ayah.text.replace(textToRemove, '').trim(),
            };
        }
        return ayah;
        });

        setAyahs(cleaned);
    } catch (e) {
        // alert 
    } finally {
        setLoading(false);
    }
    }

    fetchAyahs();
}, [id]);

if (loading) {
    return <ActivityIndicator size="large" />;
}

return (
    <>
    <Stack.Screen
        // options={{ title: `سورة ${}`, headerTitleAlign: 'center' }}
    />
    <ScrollView contentContainerStyle={{ padding: 20 }}>

        <Text style={styles.surahName}>{name} {'\n'}</Text>
        <ThemedText style={styles.quranText}>
            {/* {ayahs.page} */}
            ﷽
        {'\n'}

        {ayahs.map((item) => (
            <ThemedText style={styles.ayahText} key={item.numberInSurah}>
            {item.englishName}
            {item.text}
            <Text style={styles.ayahEnd}> ﴿ {convertToArabicNumerals(item.numberInSurah)} ﴾ </Text>{' '}
            </ThemedText>
        ))}
        </ThemedText>
    </ScrollView>
    </>
);
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 60,
      },
      loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      headerBox: {
        marginBottom: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingBottom: 10,
      },
      bismillah: {
        fontSize: 28,
        fontFamily: 'Lateef',
        color: Colors.secondaryColor,
        marginBottom: 10,
      },
      surahName: {
        fontSize: 26,
        fontFamily: 'Lateef',
        fontWeight: 'bold',
        color: Colors.secondaryColor,
        letterSpacing: 2,
      },
      ayahText: {
        fontFamily: 'Lateef',
        fontSize: 28,
        lineHeight: 48,
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 5,
      },
      ayahEnd: {
        fontFamily: 'Lateef',
        color: Colors.secondaryColor,
        fontSize: 24,
      },
    });