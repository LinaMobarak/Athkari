import { ThemedText } from '@/components/ThemedText';
import { Stack } from 'expo-router';
import { StyleSheet, useColorScheme, View, ScrollView, Vibration, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { Colors } from '@/constants/Colors'
import { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';


export default function Tasbeeh() {
    const { colors } = useColorScheme();
    const [count, setCount] = useState(0);
    const [maxCount, setMaxCount] = useState(33);
    const [rounds, setRounds] = useState(0);
    
            
    const handleCount = () => {
        if (count < maxCount) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            setCount(prev => prev + 1);
        }
    };

    const resetCounter = () => {
        setCount(0);
    };
    
    useEffect(() => {
        if (count === maxCount) {
            setRounds(prev => prev + 1);
            resetCounter();
        }
    }, [count, maxCount]);

    return (
        <ScrollView
            keyboardShouldPersistTaps="handled">
            <Stack.Screen options={{ 
                headerTitle: 'المسبحة',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 18,
                    fontFamily: 'Cairo',
                },
            }} />
            <View style={styles.container}>
                <View style={styles.counterContainer}>
                    <TouchableOpacity
                    // onPress={handleCount}
                    style={styles.targetButton}
                    >
                        <ThemedText>الهدف : {maxCount}</ThemedText>
                    </TouchableOpacity>

                    <ThemedText style={styles.rounds}>{rounds}</ThemedText>

                    <TouchableOpacity 
                        onPress={handleCount}
                        style={[
                            styles.counterButton,
                        ]}
                    >
                        <ThemedText style={styles.counterText}>{count}</ThemedText>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={resetCounter} style={styles.resetButton}>
                        <MaterialCommunityIcons
                            name="refresh" 
                            size={30} 
                            color={Colors.primary}
                        />
                        <ThemedText style={styles.resetText}>إعادة تعيين</ThemedText>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        // backgroundColor: Colors.dark.background,
    },
    counterContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    targetButton: {
        padding: 10,
        marginBottom: 20,
    },
    counterButton: {
        width: 200,
        height: 200,
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
        backgroundColor: Colors.secondaryColor,
    },
    counterText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    resetButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginTop: 20,
    },
    resetText: {
        fontSize: 16,
        marginLeft: 8,
        fontFamily: 'Cairo',
    },
    rounds: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primary,
        marginBottom: 20,
    },
});