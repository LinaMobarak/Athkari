import { Image, StyleSheet, View, Text ,TouchableOpacity} from 'react-native';

import ParallaxScrollView from '../../components/ParallaxScrollView'
import React from 'react';
import Feather from '@expo/vector-icons/Feather';

const img = require("@/assets/images/HeaderImage.jpeg");
export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <View style={styles.headerContainer}>
          <Image
            source={img}
            style={styles.imgg}
          />
          <Feather name="sun" size={24} color="white" style={styles.themeIcon}/>
          <View style={{
            backgroundColor: 'rgba(3, 3, 3, 0.76)', 
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 40,
            backdropFilter: 'blur(20px)',
            }}>
                <View style={{
                backgroundColor: 'rgb(35, 35, 35)',
                position: 'absolute',
                bottom: 15,
                left: '43%',
                width: '15%',
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'white',

              }}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>7</Text>
                <Text style={{color: 'white', fontWeight: 'bold'}}>شوال</Text>
              </View>
            </View>
      
        </View>
        
      }>

      <View style={styles.containerText} ><Text style={styles.text}>أذكار المسلم</Text></View>
      <View style={styles.containerText}><Text style={styles.text}>أدعية</Text></View>
      <View style={styles.containerText}><Text style={styles.text}>التسبيح</Text></View>
      <View style={styles.containerText}><Text style={styles.text}>أسماء الله</Text></View>
    
      

      
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    position: 'relative', 
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  imgg: {
    height: '100%',
    width: '100%',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  
  containerText:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgb(60, 115, 128)',
    
    padding: 20,
    borderRadius: 20,
    
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,  
    borderColor: '#3c7280',
    borderWidth: 2,
    height: 60,
 
   },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    color: 'white',

  }
  ,
  button: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  themeIcon: {
    position: 'absolute',top: 15,left: 15
  }
});
