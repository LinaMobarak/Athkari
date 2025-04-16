import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { Stack, router } from 'expo-router';
import { Colors } from '@/constants/Colors';

type Surah = {
    number: number;
    name: string;
    revelationType: string;
    numberOfAyahs: number;
    page: string,
    };

    const englishToArabic: { [key: string]: string } = {
    Meccan: 'مكية',
    Medinan: 'مدنية',
    };

    const numToArb: { [key: number]: string } = {
    0: '۰', 1: '۱', 2: '۲', 3: '۳', 4: '٤',
    5: '٥', 6: '٦', 7: '٧', 8: '۸', 9: '۹',
    };

    function convertToArabicNumerals(num: number): string {
    return num.toString().split('').map((d) => numToArb[parseInt(d)]).join('');
    }

    export default function SurahList() {
    const [surahs, setSurahs] = useState<Surah[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://api.alquran.cloud/v1/surah')
        .then((res) => res.json())
        .then((data) => setSurahs(data.data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" style={ styles.loadingIcon } />;
    }

    return (
        <>
        <Stack.Screen
            options={{ title: 'القرآن الكريم', headerTitleAlign: 'center' }}
        />
        <FlatList
            contentContainerStyle={{ padding: 15 }}
            data={surahs}
            keyExtractor={(item) => item.number.toString()}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between', flexDirection: 'row-reverse' }}
            renderItem={({ item }) => (
            <TouchableOpacity
                style={styles.surahItem}
                onPress={() => router.push(`../pages/${item.number}`)}
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
            )}
        />
        </>
    );
    }

const styles = StyleSheet.create({
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
        // fontSize: 14,
        color: '#777',
        fontFamily: 'Cairo',
        textAlign: 'center',
    },
    loadingIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
});

