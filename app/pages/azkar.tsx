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
import { Directions } from 'react-native-gesture-handler'



export default function Azkar() { 
  const theme = useColorScheme() ?? 'light';
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const addToFavorites = useElementStore((state) => state.addToFavourites);
  const element = useElementStore((state) => state.element);
  const decrementCounter = useElementStore((state) => state.decrementCounter);


  
  const toggleFavorite = (item: any) => {
    setFavorites((prev) => ({
      ...prev,
      [item.textId]: !prev[item.textId], 
    }));
    addToFavorites(item); 
  };

  return (
    <>
    <ScrollView keyboardShouldPersistTaps="handled">
      <Stack.Screen options={{ headerTitle: 'الأذكار'}}/>
      <ThemedView >
        {element.map((e , idx) => (
          <ThemedView key={idx}>
            <Collapsible title={e.title}>
            {element[idx].content.map((p ,indx)=>(
              <ThemedView key={indx} 
                style={{
                  // margin: 5,
                  backgroundColor: Colors.dark.primary
                }}>
                <ThemedView 
                style={{
                  margin:5,
                  borderRadius: 10,
                  // borderColor: '#3c7380',
                  // borderWidth: 1,
                  // backgroundColor: Colors.dark.second
                }}>
                  <ThemedText style={styles.text}>{p.text}</ThemedText>
                  <TouchableOpacity 
                    disabled={false}
                      onPress={()=>{
                        decrementCounter(e.id, p.textId);
                        
                      }}
                      >
                  <ThemedView 
                  style={styles.count}>
                
                      <ThemedText 
                        style={{ 
                        color: Colors.dark.text,
                        fontWeight: 'bold',
                        fontSize: 15,
                        }}>{p.counter}</ThemedText>
                    
                    </ThemedView>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={()=>{
                        toggleFavorite(p);
                        }} >
                      <MaterialCommunityIcons
                        name={favorites[p.textId] ? 'heart' : 'heart-outline'} // Check the favorite status for the specific item
                        size={25}
                        weight="medium"
                        style={{position: 'absolute', left: 20 , bottom: 15, color: 'rgb(243, 158, 158)'}}/>
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
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    lineHeight: 30,
    // color: Colors.light.text,
    // direction: 'rtl',
    textAlign: 'left'
    
  },
  count: {
    backgroundColor: Colors.dark.primary , 
    marginRight: 10 , 
    width: '70%' ,
    borderRadius: 10, 
    marginLeft: 'auto', 
    marginBottom: 10,
    height: 35 ,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  }

})

