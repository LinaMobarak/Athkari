import { Image, StyleSheet, View, Text ,TouchableOpacity, Button} from 'react-native'
import { IconSymbol } from '@/components/ui/IconSymbol'
import ParallaxScrollView from '../../components/ParallaxScrollView'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather'
import { useRouter } from 'expo-router'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { ThemedView } from '@/components/ThemedView'
import { useTheme } from '@react-navigation/native';
import { ThemedText } from '@/components/ThemedText'
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'react-native';

const img = require("@/assets/images/HeaderImage.jpeg")
export default function HomeScreen(){
  const route = useRouter()
  const { colors } = useTheme();

  return (
    <ParallaxScrollView
    headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
    headerImage={
      <ThemedView style={styles.headerContainer}>
          <Image
            source={img}
            style={styles.imgg}
            />
            
          <TouchableOpacity>
            <Feather name="sun" size={24} color="white" style={styles.themeIcon}/>
          </TouchableOpacity>
          <TouchableOpacity>
            <Feather name="settings" size={24} color="white" style={styles.settingsIcon}/>
          </TouchableOpacity>
          <View 
          style={{
            backgroundColor: 'rgba(3, 3, 3, 0.5)', 
            borderColor: 'white',
            borderWidth: 0.5,
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: 40,
            // backdropFilter: 'blur(20px)',
          }}>
          <BlurView intensity={20} style={{position: 'relative', bottom: 0, left: 0, width: '100%', height: 250}} />
          </View>

                <View
                style={{
                backgroundColor: '#151718',
                position: 'absolute',
                bottom: 15,
                left: '40%',
                width: '20%',
                height: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'white',
              }}>
                <ThemedText style={{ fontWeight: 'bold'}}>7</ThemedText>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>شوال</Text>
              </View>

      
        </ThemedView>
        
      }>

        <TouchableOpacity style={styles.containerText}  onPress={()=> route.navigate('/pages/azkar')} >
          <MaterialCommunityIcons color={colors.text} size={20} name="book-outline"/>
        <ThemedText style={styles.text}>
          أذكار المسلم 
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.containerText}  onPress={()=> route.navigate('/pages/dua')} >
          <MaterialCommunityIcons color={colors.text} size={20} name="hands-pray"/>
        <ThemedText style={styles.text}>
          أدعية 
        </ThemedText>
      </TouchableOpacity>

      <TouchableOpacity style={styles.containerText}  onPress={()=> route.navigate('/pages/tasbeeh')} >
          <MaterialCommunityIcons color={colors.text} size={20} name="circle-double"/>
        <ThemedText style={styles.text}>
          التسبيح  
        </ThemedText>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.containerText}  onPress={()=> route.navigate('/pages/namesOfallah')} >
          <MaterialCommunityIcons color={colors.text} size={20} name="star-four-points-outline"/>
        <ThemedText style={styles.text}>
          أسماء الله الحسنى  
        </ThemedText>
      </TouchableOpacity>
      
      {/* <TouchableOpacity 
        onPress={toggleTheme} 
        style={{
          backgroundColor: colors.primary,
          padding: 10,
          borderRadius: 5,
        }}
      >
        <Text style={{ color: colors.text }}>Switch Theme</Text>
      </TouchableOpacity> */}
    </ParallaxScrollView>

    
  )
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
    height: 70,

  },
  text: {
    fontSize: 13,
    fontWeight: 'bold',
    // color: 'white',
  }
  ,
  button: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  themeIcon: {
    position: 'absolute',
    top: 60,
    left: 30,
  },
  settingsIcon: {
    position: 'absolute',
    top: 60,
    right: 30,
  },
})
