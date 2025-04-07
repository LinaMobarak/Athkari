import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';

export default function Azkar() {
    const systemTheme = useColorScheme();
    const [theme, setTheme] = useState(systemTheme);

    const isDark = theme === 'dark';

    const toggleTheme = () => {
        setTheme(isDark ? 'light' : 'dark');
    };

    return (
        <>
            <Stack.Screen options={{ headerTitle: 'Azkar' }} />
            <ThemedView>
                <ThemedText style={[styles.themeIcon, { color: isDark ? '#fff' : '#000' }]}>
                    Lina
                </ThemedText>
                <TouchableOpacity onPress={toggleTheme}>
                    <Text style={[styles.themeIcon, { color: isDark ? '#fff' : '#000' }]}>
                        Toggle Theme
                    </Text>
                </TouchableOpacity>
            </ThemedView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    themeIcon: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: 20,
    },
});
