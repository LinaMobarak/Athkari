import { Collapsible } from '@/components/Collapsible'
import { ThemedView } from '@/components/ThemedView'
import { Stack } from 'expo-router'
import React, { useState } from 'react'
import { Text,ScrollView ,  StyleSheet, TouchableOpacity, View ,Share} from 'react-native'
import useElementStore from '../store'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText'
import ShareFunction from '../ShareFunction'



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
      <Stack.Screen 
          options={{
          headerTitle: 'أذكار المسلم',
          
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }} 
      />
      <ThemedView >
        {element.map((e , idx) => (
          <ThemedView key={idx}>
            <Collapsible title={e.title}>
            {element[idx].content.map((p ,indx)=>(
              <ThemedView key={indx} 
                style={{
                  backgroundColor: Colors.primary
                }}>
                <ThemedView 
                style={{
                  margin:5,
                  borderRadius: 10,
                }}>
                  <ThemedText style={styles.text}>{p.text}</ThemedText>

                  <ThemedView style={{
                      display: 'flex',
                      flexDirection: 'row', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      margin: 10,
                  }} >

                  <TouchableOpacity
                  onPress={()=>{ShareFunction(p.text)}}>
                  <MaterialCommunityIcons
                        name= "share-variant-outline"
                        size={25}
                        weight="medium"
                        style={{ color: 'rgb(243, 158, 158)'}}/>
                  </TouchableOpacity>

                  

                  <TouchableOpacity 
                    style={styles.btn}
                      onPress={()=>{
                        decrementCounter(e.id, p.textId);
                        
                      }}
                      >
                      <ThemedView>
                
                      <Text 
                        style={styles.touchable} >{p.counter}</Text>
                    </ThemedView>
                    
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={()=>{
                        toggleFavorite(p);
                        }} >
                      <MaterialCommunityIcons
                        name={favorites[p.textId] ? 'heart' : 'heart-outline'} 
                        size={25}
                        weight="medium"
                        style={{ color: 'rgb(243, 158, 158)'}}/>
                      </TouchableOpacity>

                      </ThemedView>
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
    padding: 10,
    lineHeight: 30,
    textAlign: 'left'
    
  },
  count: {
    backgroundColor: Colors.primary,
    marginBottom: 5,
    color: Colors.dark.text,
    fontWeight: 'bold',
    fontSize: 15,
    
  },
  touchable: {
    backgroundColor:Colors.primary,
    padding:10,
    color:"white",
    textAlign:"center",
    borderRadius: 10,
    fontWeight: 'bold'

  },
  btn:{
    width:'60%',
    
  }

})

