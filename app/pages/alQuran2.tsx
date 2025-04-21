import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import TheQuran from '@/assets/TheQuran.json';
import { useNavigation, useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';

export default function SurahsList() {
    const route = useRouter()
    const navigation = useNavigation();

    const englishToArabic: { [key: string]: string } = {
        Mecca: 'مكية',
        Madina: 'مدنية',
    }
    
    const numToArb: { [key: number]: string } = {
        0: '۰', 1: '۱', 2: '۲', 3: '۳', 4: '٤',
        5: '٥', 6: '٦', 7: '٧', 8: '۸', 9: '۹',
    }

    function convertToArabicNumerals(num: number): string {
        return num.toString().split('').map((d) => numToArb[parseInt(d)]).join('');
    }

    return(
        <FlatList
        data={TheQuran}
        keyExtractor={(item) => item.surahNo.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => route.push(`../pages/${item.surahNo}`)}
            style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc' }}
            >
                <ThemedText style={{ fontSize: 18 }}>{item.surahNameArabic}</ThemedText>
                <ThemedText>{englishToArabic[item.revelationPlace]} - {convertToArabicNumerals(item.totalAyah)} :عدد آياتها</ThemedText>
            </TouchableOpacity>
        )}
        />
    )
}