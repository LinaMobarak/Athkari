import { PropsWithChildren, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialIcons } from '@expo/vector-icons';


export function Collapsible({ children, title }: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);
 

  const theme = useColorScheme() ?? 'light';

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => {
          setIsOpen((value) => !value)
        }}
        activeOpacity={0.8}>
        <MaterialIcons
          name="chevron-left" 
          size={30}
          weight="medium"
          color={theme === 'light' ? Colors.light.icon : Colors.dark.icon}
          style={{ transform: [{ rotate: isOpen ? '90deg' : '0deg' }] }}
        />

        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>
      {isOpen && 
      
        <ThemedView style={styles.content}>{children}
        
        </ThemedView>
        
      
      }

    </ThemedView>
  );
}

const styles = StyleSheet.create({
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        padding: 20,
        direction: 'rtl',
        
      },
      content: {
        marginTop: 6,
        position: 'relative',
        justifyContent: 'space-around'
        
      },
      container: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 10,
        fontSize: 20,
        borderRadius: 10,
        width: '90%',
        borderColor: 'rgb(60, 115, 128)',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }
});
