import { Collapsible } from '@/components/Collapsible'
import { ThemedView } from '@/components/ThemedView'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { Text,ScrollView ,  StyleSheet, TouchableOpacity } from 'react-native'
import useElementStore from '../store'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText'



export default function Azkar() { 
  const theme = useColorScheme() ?? 'light';
  const [isFavo, setIsFavo] = useState(false);
  const addToFavorites = useElementStore((state) => state.addToFavourites);
  const element = useElementStore((state) => state.element);

  return (
    <>
    <ScrollView >
      <Stack.Screen options={{ headerTitle: 'Azkar' }}/>
      <ThemedView>
        {element.map((e , idx) => (
          <ThemedView key={idx}>
            <Collapsible title={e.title}>
            {element[idx].content.map((p ,indx)=>(
              <ThemedView key={indx} 
                style={{
                  margin: 5
                }}>
                <ThemedView 
                style={{
                  borderColor: '#3c7380',
                  borderWidth: 1
                }}>
                  <ThemedText style={styles.text}>{p.text}</ThemedText>
                  <ThemedView 
                  style={styles.count}>
                    <TouchableOpacity 
                      // onPress={}
                      >
                      <ThemedText 
                        style={{ 
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: 20,
                        }}>{p.counter}</ThemedText>
                    </TouchableOpacity>
                    </ThemedView>
                    <TouchableOpacity
                      onPress={()=>{
                        addToFavorites(p);
                        setIsFavo((prev) => !prev)
                        }} >
                      <MaterialCommunityIcons
                        name={isFavo ? 'heart' : 'heart-outline' }
                        size={20}
                        weight="medium"
                        color={theme === 'light' ? Colors.light.icon : Colors.dark.icon} 
                        style={{position: 'absolute', left: 5 , bottom: 5}}/>
                      </TouchableOpacity>
                    
                  </ThemedView>
                </ThemedView>
            ))}
          
              
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
    padding: 5
  },
  count: {
    backgroundColor: '#3c7380' , 
    marginRight: 'auto' , 
    width: '70%' ,
    borderRadius: 10, 
    marginLeft: 'auto', 
    marginBottom: 10,
    height: 40 ,
    alignItems: 'center',
    justifyContent: 'center',
    
    alignContent: 'center'
  }

})

