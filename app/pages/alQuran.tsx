import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '@react-navigation/native';
import { Colors } from '@/constants/Colors'
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

type Surah = {
    number: number;
    name: string;
    revelationType: string;
    numberOfAyahs: number;
    page: string;
    juz: string;
};

type Ayah = {
    numberInSurah: number;
    text: string;
    page: string;
};

export default function QuranPage() {
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [ayahs, setAyahs] = useState<Ayah[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedSurah, setSelectedSurah] = useState<number | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);

    const [fontsLoaded] = useFonts({
        Cairo: require('@/assets/fonts/Cairo.ttf'),
    })

    const englishToArabic: { [key: string]: string } = {
        Meccan: 'مكية',
        Medinan: 'مدنية',
    }

    const numToArb: { [key: number]: string } = {
        0: '۰',
        1: '۱',
        2: '۲',
        3: '۳',
        4: '٤',
        5: '٥',
        6: '٦',
        7: '٧',
        8: '۸',
        9: '۹',
    }

    function convertToArabicNumerals(num: number): string {
        return num
            .toString()
            .split('') 
            .map((digit) => numToArb[parseInt(digit)])
            .join('')
    }

    useEffect(() => {
        const fetchSurahs = async () => {
            try {
                const res = await fetch('https://api.alquran.cloud/v1/surah');
                const json = await res.json();
                setSurahs(json.data);
                setFilteredSurahs(json.data); // Initialize filteredSurahs
            } catch (err) {
                console.error('Error fetching Surahs:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchSurahs();
    }, []);

    const handleSurahSelect = async (surahNumber: number) => {
        setLoading(true);
        setSelectedSurah(surahNumber);
        try {
            const res = await fetch(`https://api.alquran.cloud/v1/surah/${surahNumber}/ar`);
            const json = await res.json();
            setAyahs(json.data.ayahs);
        } catch (err) {
            console.error('Error fetching Ayahs:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleFilter = (searchText: string) => {
        setSearchQuery(searchText);
        const filtered = surahs.filter((item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredSurahs(filtered);
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: 'القرآن الكريم',
                    headerTitleAlign: 'center',
                    headerSearchBarOptions: {
                        placeholder: 'ابحث',
                        inputType: 'text',
                        onChangeText: (e) => handleFilter(e.nativeEvent.text),
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                    },
                }}
            />
            <View style={styles.container}>
                {selectedSurah === null ? (
                    <>
                        <FlatList
                            // contentContainerStyle={styles.gridContainer}
                            data={filteredSurahs}
                            keyExtractor={(item) => item.number.toString()}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
                            renderItem={({ item }) => (
                                <>
                                <TouchableOpacity
                                style={styles.surahItem}
                                onPress={() => handleSurahSelect(item.number)}
                                >
                                <View style={styles.surahNumber}>
                                    <Text style={styles.surahNumberText}>{convertToArabicNumerals(item.number)}</Text>
                                </View>
                                    <View>
                                        <Text style={styles.surahText}>{item.name}</Text>
                                        <Text style={styles.surahDetails}>
                                            {englishToArabic[item.revelationType]} - عدد آياتها: {convertToArabicNumerals(item.numberOfAyahs)}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                </>
                            )}
                        />
                    </>
                ) : (
                    <FlatList
                        data={ayahs}
                        keyExtractor={(item) => item.numberInSurah.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.ayahContainer}>
                                <Text style={styles.ayahPage}>صفحة: {item.page}</Text>
                                <Text style={styles.ayahText}>
                                    {item.text} ﴿{item.numberInSurah}﴾
                                </Text>
                            </View>
                        )}
                    />
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    // gridContainer: {
    //     marginTop: 150,
    //     paddingBottom: 30,
    //     flexDirection: 'row-reverse',
    // },
    container: {
        padding: 10,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    surahItem: {
        backgroundColor: '#000',
        // backgroundColor: Colors.primary,
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
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 20,
        position: 'absolute',
        top: 0,
        right: 0,
        width: '20%',
        height: '30%',
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
        // top: 0,
        // left: 0,
    },
    surahText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        // fontFamily: 'Cairo',
        // color: '#111',
        color: Colors.secondaryColor,
        marginBottom: 4,
    },
    surahDetails: {
        fontSize: 13,
        color: '#777',
        fontFamily: 'Cairo',
        textAlign: 'center',
    },
    ayahContainer: {
        padding: 10,
        backgroundColor: '#e9ecef',
        borderRadius: 8,
        marginBottom: 10,
    },
    ayahPage: {
        fontSize: 14,
        color: '#555',
        marginBottom: 5,
    },
    ayahText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
});

