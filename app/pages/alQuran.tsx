import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Stack, useNavigation, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import QuranCompleteFinalFinal from '@/assets/QuranCompleteFinalFinal.json';
import type { Ayah, FullQuran } from "../types/quranJson";
import { Colors } from '@/constants/Colors';
import { DarkTheme } from '@react-navigation/native';

const fullQuran = QuranCompleteFinalFinal as FullQuran
// const ayah = quranJson as Ayah
// export const surahs = fullQuran.data.surahs
// export const quranTanzil = TheQuran.filter((item) => item.arabic1)
export const surahs = fullQuran.data.surahs

const numToArb: { [key: number]: string } = {
    0: '٠', 1: '١', 2: '٢', 3: '٣', 4: '٤',
    5: '٥', 6: '٦', 7: '٧', 8: '٨', 9: '٩',
}

function convertToArabicNumerals(num: number): string {
    return num.toString().split('').map((d) => numToArb[parseInt(d)]).join('');
}

// export const ayat = ayah

export default function SurahsList() {
    const route = useRouter()
    const navigation = useNavigation();
    const englishToArabic: { [key: string]: string } = {
        Meccan: 'مكية',
        Medinan: 'مدنية',
    }
    
    // const numToArb: { [key: number]: string } = {
    //     0: '۰', 1: '۱', 2: '۲', 3: '۳', 4: '٤',
    //     5: '٥', 6: '٦', 7: '٧', 8: '۸', 9: '۹',
    // }

    // function convertToArabicNumerals(num: number): string {
    //     return num.toString().split('').map((d) => numToArb[parseInt(d)]).join('');
    // }
    return(
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
            <View style={{ margin: 10, }}>
        <FlatList
            data={surahs}
            keyExtractor={(item) => item.number.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', flexDirection: 'row-reverse' }}
            renderItem={({ item }) => (
                <TouchableOpacity
                
                onPress={() => route.push(`./${item.number}`)}
                
                style={styles.surahItem}
                >
                    <View style={styles.surahNumber}>
                        <Text style={styles.surahNumberText}>{convertToArabicNumerals(item.number)}</Text>
                    </View>
                    <View>
                        <Text style={styles.surahText}>{item.name}</Text>
                        <Text style={styles.surahDetails}>
                        {englishToArabic[item.revelationType]} - عدد آياتها: {convertToArabicNumerals(item.ayahs.length)}
                        </Text>
                        </View>
                </TouchableOpacity>
            )}
            />
            </View>
    </>
    )
}

const styles = StyleSheet.create({
    surahItem: {
        backgroundColor: '#000',
        width: '48%',
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
        borderRadius: 12,
      },
      surahNumber: {
        backgroundColor: '#d1e7dd',
        padding: 5,
        borderRadius: 20,
        borderColor: '#000',
        borderWidth: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        width: '25%',
        height: '25%',
        alignItems: 'center',
        justifyContent: 'center',
      },
      surahNumberText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
        fontFamily: 'Cairo',
      },
      surahText: {
        fontSize: 26,
        letterSpacing: 1,
        textAlign: 'center',
        fontFamily: 'Uthmani',
        color: '#d1e7dd',
        marginBottom: 4,
      },
      surahDetails: {
        color: '#777',
        fontFamily: 'Cairo',
      },
    });