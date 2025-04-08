import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import useElementStore from '../store';

export default function Azkar() {
    const systemTheme = useColorScheme();
    const [theme, setTheme] = useState(systemTheme);
    const store = useElementStore((state) => state.namesOfAllah); // Directly fetch the store

    const isDark = theme === 'dark';

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <>
            <Stack.Screen options={{ 
                headerTitle: 'أسماء الله الحسنى',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                    // fontFamily: 'Lateef',
                },
            }} />
            <ThemedView style={styles.container}>
                {store.map((namesOfAllah) => (
                    <View
                        key={namesOfAllah.id}
                        style={[styles.itemContainer, { backgroundColor: namesOfAllah.color }]}
                    >
                        <Svg
                            height="50"
                            width="100%"
                            viewBox="0 0 1440 320"
                            style={styles.wavyPattern}
                        >
                            <Path
                                fill="#000"
                                fillOpacity="0.1"
                                d="M0,96L48,106.7C96,117,192,139,288,160C384,181,480,203,576,192C672,181,768,139,864,122.7C960,107,1056,117,1152,138.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                            />
                        </Svg>
                        <ThemedText style={styles.itemText}>{namesOfAllah.text}</ThemedText>
                    </View>
                ))}
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    itemContainer: {
        marginBottom: 20,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden', // Ensures the SVG doesn't overflow the card
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    wavyPattern: {
        position: 'absolute',
        top: 10,
        right: -70
    },
});


// share feature.