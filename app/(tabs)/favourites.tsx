import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Text, useColorScheme } from 'react-native';
import useElementStore from '../store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack } from 'expo-router';
import ShareFunction from '../ShareFunction';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors'

export default function Favourites() {

  const theme = useColorScheme() ?? 'light';
  const favourites = useElementStore((state) => state.favourites);
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const addToFavorites = useElementStore((state) => state.addToFavourites);

  const toggleFavorite = (item: any) => {
    const updatedFav = favourites.filter((f,indx) => indx !== item);
    useElementStore.setState({favourites : updatedFav})

    
  };

  return (
    
    <ScrollView style={{
      flex:1,
      backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background
    }}>
      <Stack.Screen 
        options={{
          headerTitle: "المفضلة",
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
          },
        }} 
      />
      <ThemedView style={styles.container}>
        {favourites.length === 0 ? 
          (  
            <ThemedView style={{
              alignItems: 'center',
              flex: 1
              
            }}>
              <MaterialCommunityIcons 
                name= "heart-outline"
                size={100}
                weight="medium"
                style={{ color: 'rgb(243, 158, 158)' , marginBottom: 20}}
              />
              <ThemedText style={{fontWeight: 'bold', fontSize: 20}}>The Favourite page is empty</ThemedText>
            </ThemedView>
          ) 
        : 
          (
            favourites.map((fav, idx) => (
              <ThemedView key={idx} style={styles.favouriteItem}>
                <ThemedText style={styles.text}>{fav.text}</ThemedText>
                <ThemedView 
                style={{
                  display: 'flex',
                  flexDirection: 'row', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                  backgroundColor: 'white',
                  marginBottom: 0
                }}>

                <TouchableOpacity onPress={()=>{
                    toggleFavorite(idx);
                }}>
                    <MaterialCommunityIcons
                      name="heart"
                      size={30}
                      color="rgba(235, 151, 184, 0.68)"
                      
                    />
                  </TouchableOpacity>
                      <TouchableOpacity
                        onPress={()=>{ShareFunction(fav.text)}}>
                        <MaterialCommunityIcons
                          name= "share-variant-outline"
                          size={25}
                          weight="medium"
                          style={{ color: 'rgb(243, 158, 158)'}}/>
                        </TouchableOpacity>
                </ThemedView>
              </ThemedView>
            ))
          )}
      </ThemedView>
    </ScrollView>
  
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 50,
    flex:1
  },
  favouriteItem: {
    margin: 20,
    padding: 30,
    borderWidth: 1,
    borderColor: '#3c7380',
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'relative',
    paddingBottom: 50,
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    direction: 'rtl',
    marginBottom: 10
  },
});

