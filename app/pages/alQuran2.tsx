import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Stack, useNavigation, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import quranJson from "@/assets/fullQuran2.json";
import type { FullQuran } from "../stores/quranJson";
import quranTanzil from '@/assets/TheQuran.json';
import type { Ayah } from "../stores/quranJson";
import { Colors } from '@/constants/Colors';
import { DarkTheme } from '@react-navigation/native';

const fullQuran = quranJson as FullQuran
const ayah = quranJson as Ayah
export const surahs = fullQuran.data.surahs
// export const quranTanzil = TheQuran.filter((item) => item.arabic1)
const numToArb: { [key: number]: string } = {
    0: '٠', 1: '١', 2: '٢', 3: '٣', 4: '٤',
    5: '٥', 6: '٦', 7: '٧', 8: '٨', 9: '٩',
}

function convertToArabicNumerals(num: number): string {
    return num.toString().split('').map((d) => numToArb[parseInt(d)]).join('');
}

export const ayat = ayah

export default function SurahsList() {
    const route = useRouter()
    const navigation = useNavigation();
    const englishToArabic: { [key: string]: string } = {
        Mecca: 'مكية',
        Madina: 'مدنية',
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
            data={quranTanzil}
            keyExtractor={(item) => item.surahNo.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', flexDirection: 'row-reverse' }}
            renderItem={({ item }) => (
                <TouchableOpacity
                onPress={() => route.push(`./${item.surahNo}`)}
                style={styles.surahItem}
                >
                    <View style={styles.surahNumber}>
                        <Text style={styles.surahNumberText}>{convertToArabicNumerals(item.surahNo)}</Text>
                    </View>
                    <View>
                        <Text style={styles.surahText}>{item.surahNameArabicLong}</Text>
                        <Text style={styles.surahDetails}>
                        {englishToArabic[item.revelationPlace]} - عدد آياتها: {convertToArabicNumerals(item.totalAyah)}
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
        // backgroundColor: Colors.primary,
        // padding: 16,
        width: '48%',
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,

        borderRadius: 12,
        // elevation: 4, // Android shadow
        // shadowColor: '#000', // iOS shadow
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 5,
        // overflow: 'hidden',
    },
    surahNumber: {
        backgroundColor: Colors.secondaryColor,
        // backgroundColor: '#d1e7dd',
        color: '#000',
        // color: '#0f5132',
        // paddingVertical: 4,
        // paddingHorizontal: 10,
        padding: 5,
        borderRadius: 20,
        borderColor: '#000',
        borderWidth: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        width: '25%',
        height: '25%',
        // textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        // overflow: 'hidden',
    },
    surahNumberText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#000',
        position: 'absolute',
        fontFamily: 'Cairo',
        // top: 0,
        // left: 0,
    },
    surahText: {
        fontSize: 26,
        letterSpacing: 1,
        textAlign: 'center',
        // fontWeight: 'bold',
        fontFamily: 'Uthmani',
        // color: '#111',
        color: Colors.secondaryColor,
        marginBottom: 4,
    },
    surahDetails: {
        // fontSize: 14,
        color: '#777',
        fontFamily: 'Uthmani',

        // textAlign: 'right',
    },
    loadingIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});