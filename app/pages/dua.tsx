import { Collapsible } from '@/components/Collapsible'
import { ThemedView } from '@/components/ThemedView'
import { Stack } from 'expo-router'
import React from 'react'
import { Text,ScrollView ,  StyleSheet, TouchableOpacity, View } from 'react-native'
import useElementStore from '../store'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText'
import {Colors} from '@/constants/Colors'



export default function Azkar() { 
  const theme = useColorScheme() ?? 'light';
  const dua = useElementStore((s)=>s.dua)

  return (
    <>
    <ScrollView keyboardShouldPersistTaps="handled">
    <Stack.Screen options={{ headerTitle: 'الأدعية'}}/>
    <ThemedView style={styles.containers}>
        {dua.map((e , idx) => (
            <ThemedView key={idx}>
                <Collapsible title={e.title}>
                    <ThemedView style={{
                        // backgroundColor: Colors.dark.second,
                        padding: 10,
                        alignItems: 'center',
                        direction: 'rtl'
                        }}>
                        <ThemedText
                        style={styles.text}
                        >{e.description}</ThemedText>
                    </ThemedView>
                </Collapsible>

            </ThemedView>
        
    ))}
    </ThemedView>
    </ScrollView>
    </>
  )
}

export const styles = StyleSheet.create({
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign:'left',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    lineHeight: 30,
  },
  containers: {
    marginTop: 0,
    display: 'flex',
    backgroundColor: 'black',
    borderColor: 'white',
    
  },
  box: {
    borderColor: 'white',
    width: 100,
    margin: 10,
    padding: 20,
  },
});