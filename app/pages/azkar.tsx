import { Stack } from 'expo-router'
import React from 'react'
import { Text } from 'react-native'

export default function azkar() {
  return (
    <>
      <Stack.Screen
      
        options={{ headerTitle: 'Azkar' }}
      />
      <Text style={{color: 'white'}}>Lina</Text>
    </>
  )
}

