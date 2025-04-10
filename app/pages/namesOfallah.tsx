import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import Modal from 'react-native-modal';
import useNamesOfAllahStore from '../stores/namesOfAllah-store';
import { FlatList } from 'react-native';

export default function NamesOfAllah() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const store = useNamesOfAllahStore((state) => state.namesOfAllah);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selectedItem = store.find((name) => name.id === selectedId) || null;

  function handleModalClose() {
    setIsModalVisible(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          headerTitle: 'أسماء الله الحسنى',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }}
      />

      <Modal isVisible={isModalVisible}>
        <ThemedView style={styles.modal}>
          <ThemedText style={styles.modalTitle}>{selectedItem?.text}</ThemedText>
          <ThemedText style={styles.modalDescription}>{selectedItem?.description}</ThemedText>
          <TouchableOpacity onPress={handleModalClose}>
            <ThemedText style={styles.closeText}>إغلاق</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </Modal>

      <FlatList
        contentContainerStyle={styles.gridContainer}
        data={store}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.itemContainer, { backgroundColor: item.color }]}
            onPress={() => {
              setSelectedId(item.id);
              setIsModalVisible(true);
            }}
          >
            <Svg
              height="50"
              width="150%"
              viewBox="0 0 1440 320"
              style={styles.wavyPattern}
            >
              <Path
                fill="#000"
                fillOpacity="0.05"
                d="M0,96L48,106.7C96,117,192,139,288,160C384,181,480,203,576,192C672,181,768,139,864,122.7C960,107,1056,117,1152,138.7C1248,160,1344,192,1392,208L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              />
            </Svg>
            <ThemedText style={styles.itemText}>{item.text}</ThemedText>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  gridContainer: {
    direction: 'rtl',
    padding: 10,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '48%',
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
    right: -20,
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Cairo',
    margin: 10,
  },
  modalDescription: {
    fontSize: 20,
    textAlign: 'right',
  },
  closeText: {
    marginTop: 20,
    fontWeight: 'bold',
    fontFamily: 'Cairo',
  },
});
