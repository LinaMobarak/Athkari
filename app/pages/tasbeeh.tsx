import { ThemedText } from '@/components/ThemedText';
import { Stack } from 'expo-router';
import { StyleSheet, useColorScheme, View, ScrollView, Vibration, TouchableOpacity, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Colors } from '@/constants/Colors'
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { FlatList } from 'react-native';
import { ThemedView } from '@/components/ThemedView';

export default function Tasbeeh() {
    const colors = useTheme().colors;
    const [count, setCount] = useState(0);
    const [maxCount, setMaxCount] = useState(33);
    const [rounds, setRounds] = useState(0);
    const [selectedDhikr, setSelectedDhikr] = useState(0);

    const dhikrOptions = [
        { count: 33, dhikr: 'سبحان الله' },
        { count: 33, dhikr: 'الحمد لله' },
        { count: 33, dhikr: 'الله أكبر' },
        { count: 100, dhikr: 'لا إله إلا الله' },
        { count: 100, dhikr: 'أستغفر الله' },
    ]
            
    const handleCount = () => {
        if (count < maxCount) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setCount(prev => prev + 1);
        }
    };

    const resetCounter = () => {
        setCount(0)
        setRounds(0)
    };
    
    const selectDhikr = (index: number) => {
        setSelectedDhikr(index);
        setMaxCount(dhikrOptions[index].count);
        resetCounter();
        setRounds(0);
    };

    useEffect(() => {
        // setCount({dhikrOptions.[selectedDhikr].count})
        if (count === maxCount) {
            Vibration.vibrate(1000)
            setRounds(prev => prev + 1)
            setCount(0)
        }
    }, [count, maxCount]);

    return (
        <ScrollView
        keyboardShouldPersistTaps="handled"
        // contentContainerStyle={{ flexGrow: 1 }}
    >
            <Stack.Screen options={{ 
                headerTitle: 'المسبحة',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                    fontFamily: 'Cairo',
                },
            }} />

            <ThemedView style={styles.container}>
                    <FlatList 
                        data={dhikrOptions}
                        keyExtractor={(item) => item.dhikr}
                        horizontal
                        inverted
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.dhikrList}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity 
                            onPress={() => selectDhikr(index)} // Use the selectDhikr function
                            style={[
                                styles.dhikrButton,
                                selectedDhikr === index && styles.selectedDhikrButton, // Highlight selected item
                            ]}
                            >
                                <ThemedText
                                    style={[
                                        styles.dhikrText,
                                        selectedDhikr === index && styles.selectedDhikrText
                                    ]}>
                                    {item.dhikr}
                                </ThemedText>
                            </TouchableOpacity>
                        )}
                    />
                
                <View style={styles.statusContainer}>
                    <View style={styles.glassCard}>
                        <ThemedText style={styles.statusLabel}>الجولات</ThemedText>
                        <Text style={styles.statusValue}>{rounds}</Text>
                    </View>
                    <View style={styles.glassCard}>
                        <ThemedText style={styles.statusLabel}>العدد</ThemedText>
                        <Text style={styles.statusValue}>{maxCount}</Text>
                    </View>
                </View>
                
                    <TouchableOpacity
                    onPress={handleCount}
                    style={styles.counterButton}
                    >
                        <Text style={styles.counterText}>{count}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={resetCounter} style={styles.resetCircle}>
                        <MaterialCommunityIcons name="refresh" size={24} color="#fff" />
                    </TouchableOpacity>
            </ThemedView>
        </ScrollView>
    );
}
// share feature from link and counter to how many people joined through you and shared the app

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    dhikrList: {
        paddingVertical: 10,
    },
    dhikrButton: {
        // backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: Colors.primary,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 18,
        marginHorizontal: 5,
    },
    selectedDhikrButton: {
        backgroundColor: Colors.primary,
    },
    dhikrText: {
        fontSize: 16,
        fontFamily: 'Cairo',
        color: Colors.primary,
    },
    selectedDhikrText: {
        color: '#fff',
    },
    statusContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginTop: 25,
    },
    glassCard: {
        // backgroundColor: '#323232',
        borderColor: Colors.primary,
        borderWidth: 1,
        borderRadius: 15,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        width: '45%',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    statusLabel: {
        fontFamily: 'Cairo',
        fontSize: 14,
        marginBottom: 5,
    },
    statusValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    counterButton: {
        marginTop: 30,
        width: 220,
        height: 220,
        borderRadius: 110,
        textAlign: 'center',
        backgroundColor: Colors.secondaryColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    counterText: {
        fontSize: 60,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    resetCircle: {
        marginTop: 25,
        backgroundColor: Colors.primary,
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
    },
});