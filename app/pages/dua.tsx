import { Collapsible } from '@/components/Collapsible'
import { ThemedView } from '@/components/ThemedView'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { Text,ScrollView ,  StyleSheet, TouchableOpacity, View } from 'react-native'
import useElementStore from '../store'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText'
import {Colors} from '@/constants/Colors'
import ShareFunction from '../ShareFunction'
// Removed incorrect import of favourites



export default function Azkar() { 
  const theme = useColorScheme() ?? 'light';
  const dua = useElementStore((s)=>s.dua)
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const addToFavorites = useElementStore((state) => state.addToFavourites);

  const toggleFavorite = (item: any) => {
    setFavorites((prev) => ({
      ...prev,
      [item.id]: !prev[item.id], 
    }));
    addToFavorites(item); 
  };

  return (
    <>
    <ScrollView keyboardShouldPersistTaps="handled">
    <Stack.Screen options={{ headerTitle: 'الأدعية', headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },}}/>
    <ThemedView style={styles.containers}>
        {dua.map((e , idx) => (
            <ThemedView key={idx}>
                <Collapsible title={e.title}>
                    <ThemedView style={{
                        padding: 10,
                        alignItems: 'center',
                        direction: 'rtl'
                        }}>
                        <ThemedText
                        style={styles.text}
                        >{e.description}</ThemedText>
                    </ThemedView>
                    <ThemedView 
                                style={{
                                  display: 'flex',
                                  flexDirection: 'row', 
                                  justifyContent: 'space-between',
                                  alignItems: 'center',
                                  margin: 10,
                                  
                          }}>
                  
                                  <TouchableOpacity
                                        onPress={()=>{ShareFunction(e.description)}}>
                                        <MaterialCommunityIcons
                                          name= "share-variant-outline"
                                          size={25}
                                          weight="medium"
                                          style={{ color: 'rgb(243, 158, 158)'}}/>
                                </TouchableOpacity>

                                <TouchableOpacity
                                      onPress={()=>{
                                      toggleFavorite(e);
                                    }}>
                                  <MaterialCommunityIcons
                                        name={favorites[e.id] ? 'heart' : 'heart-outline'} 
                                        size={25}
                                        weight="medium"
                                        style={{ color: 'rgb(243, 158, 158)'}}/>
                                    </TouchableOpacity>

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