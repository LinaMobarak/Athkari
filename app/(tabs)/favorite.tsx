import { Stack } from 'expo-router'
import { ThemedText } from '../../components/ThemedText'
import React from 'react'


export default function Azkar() {
  return (
    <>
    <Stack.Screen
      options={{ headerTitle: 'أذكار المسلم', headerTitleAlign: 'center', headerTintColor: 'white', headerStyle: { backgroundColor: '#A1CEDC' } }}/>
      <ThemedText style={{color: 'red', fontSize: 100}}>lllllllll</ThemedText>
    </>
  )
}

