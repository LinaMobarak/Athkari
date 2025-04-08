import React, { useState } from 'react';
import { TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import useElementStore from '../store';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Favourites() {
  const favourites = useElementStore((state) => state.favourites);
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const addToFavorites = useElementStore((state) => state.addToFavourites);

  const toggleFavorite = (item: any) => {
    const updatedFav = favourites.filter((f,indx) => indx !== item);

    useElementStore.setState({favourites : updatedFav})
    // setFavorites((prev) => ({
    //   ...prev,
    //   [item.textId]: !prev[item.textId], 
    // }));
    
  };

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        {favourites.map((fav, idx) => (
          <ThemedView key={idx} style={styles.favouriteItem}>
            <ThemedText style={styles.text}>{fav.text}</ThemedText>
            <TouchableOpacity onPress={()=>{
                toggleFavorite(idx);
            }}>
              <MaterialCommunityIcons
                name="heart"
                size={30}
                color="rgba(235, 151, 184, 0.68)"
                style={{position: 'absolute' , left: '47%', top:5}}
              />
            </TouchableOpacity>
          </ThemedView>
        ))}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 50
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
    direction: 'rtl'
  },
});

function addToFavorites(item: any) {
    throw new Error('Function not implemented.');
}
