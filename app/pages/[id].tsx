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
const [loading, setLoading] = useState(true);
const fontSizeValue = 20

useEffect(() => {
    async function fetchAyahs() {
    try {
        const res = await fetch(`https://api.alquran.cloud/v1/surah/${id}/ar`);
        const json = await res.json();

        const textToRemove = "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ";
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
        alert 
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
        options={{ title: `سورة رقم ${convertToArabicNumerals(Number(id))}`, headerTitleAlign: 'center' }}
    />
    <ScrollView contentContainerStyle={{ padding: 20 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 20 }}>
        <Text style={{ textAlign: 'center', color: Colors.secondaryColor, fontSize: 18 }}>← الرجوع</Text>
        </TouchableOpacity>

        <Text style={styles.quranText}>
            {/* {ayahs.page} */}
            ﷽
        {'\n\n'}
        {ayahs.map((ayah) => (
            <ThemedText style={styles.ayahText} key={ayah.numberInSurah}>
            {ayah.text}
            <Text style={styles.ayahEnd}> ﴿ {convertToArabicNumerals(ayah.numberInSurah)} ﴾ </Text>{' '}
            </ThemedText>
        ))}
        </Text>
    </ScrollView>
    </>
);
}

const styles = StyleSheet.create({
quranText: {
    fontSize: 28,
    fontFamily: 'Cairo',
    textAlign: 'center',
    letterSpacing: 0.5,
    color: Colors.secondaryColor,
},
ayahText: {
    lineHeight: 35,
    fontSize: 24,

},
ayahEnd: {
    // fontSize: 28,
    // fontFamily: 'Lateef',
    color: Colors.secondaryColor,
},
});
