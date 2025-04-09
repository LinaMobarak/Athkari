import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import useElementStore from '../store';
import Modal from 'react-native-modal';

export default function namesOfAllah() {
    // const systemTheme = useColorScheme();
    const [isModalVisible, setIsModalVisible] = useState(false)
    const store = useElementStore((state) => state.namesOfAllah)
    const [selectedId, setSelectedId] = useState<number | null>(null)
    const selectedItem = store.find((namesOfAllah) => namesOfAllah.id === selectedId);    
    
    function handleModalClose() {
        setIsModalVisible(!isModalVisible)
    }

    return (
        <ScrollView 
            keyboardShouldPersistTaps="handled"
            >
            <Stack.Screen options={{ 
                headerTitle: 'أسماء الله الحسنى',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontWeight: 'bold',
                    fontSize: 20,
                    // fontFamily: 'Lateef',
                },
            }} />
            <TouchableOpacity onPress={handleModalClose} style={{ marginVertical: 20, alignItems: 'center' }}>
                <Text style={{ color: '#fff', fontSize: 20, textAlign: 'center', marginVertical: 10 }}>Click To Toggle Pop-Up</Text>
            </TouchableOpacity>

            <Modal isVisible={isModalVisible}>
                <ThemedView style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 20, padding: 20 }}>

                    <ThemedText style={{ fontSize: 20, fontWeight: 'bold', fontFamily: 'Cairo', margin: 10, }}>{selectedItem?.text}</ThemedText>
                    <ThemedText style={{ fontSize: 20,textAlign: 'right', }}>{selectedItem?.description || 'No description available'}</ThemedText>
                    <TouchableOpacity onPress={handleModalClose}>
                    <ThemedText style={{ marginTop: 20, fontWeight: 'bold', fontFamily: 'Cairo', }}>إغلاق</ThemedText>
                    </TouchableOpacity>
                </ThemedView>
            </Modal>

            <ThemedView style={styles.container}>
                <View style={styles.gridContainer}>
                    {store.map((namesOfAllah) => (
                        <TouchableOpacity 
                            key={namesOfAllah.id}
                            style={[styles.itemContainer, { backgroundColor: namesOfAllah.color }]}
                            onPress={() => {
                                setSelectedId(namesOfAllah.id);
                                setIsModalVisible(true);
                            }}
                        >
                                <Svg
                                    height="50"
                                    width="150%"
                                    viewBox="0 0 1440 320"
                                    style={[styles.wavyPattern]}
                                >
                                    <Path
                                        fill="#000"
                                        fillOpacity="0.05"
                                        d="M0,96L48,106.7C96,117,192,139,288,160C384,181,480,203,576,192C672,181,768,139,864,122.7C960,107,1056,117,1152,138.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
                                    />
                                </Svg>
                                <ThemedText style={styles.itemText}>{namesOfAllah.text}</ThemedText>
                        </TouchableOpacity>
                    ))}
                </View>
            </ThemedView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    gridContainer: {
        direction: 'rtl',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 10,
    },
    itemContainer: {
        marginBottom: 15,
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: '48%', // slightly less than 50% to account for spacing
        overflow: 'hidden',
    },
    itemText: {
        fontSize: 16,
        fontWeight: 'bold',
        fontFamily: 'Cairo',
        color: '#000',
    },
    wavyPattern: {
        position: 'absolute',
        top: 15,
        right: -20
    },
});

