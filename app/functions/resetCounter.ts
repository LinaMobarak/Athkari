import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAzkarStore } from '@/app/stores/azkarStore'

export const checkIf12HoursPassed = async () => {
    const currentTime = Date.now();
    const lastTimestampKey = "lastTimestamp";

    try {
        const savedTimestamp = await AsyncStorage.getItem(lastTimestampKey);

        if (savedTimestamp) {
        const lastTimestamp = parseInt(savedTimestamp);
        const Passed = (currentTime - lastTimestamp) / (1000);

        if (Passed >= 10) {
            resetCounters();
            // cosnsole.log('reseted')
        }
        } 
    
    await AsyncStorage.setItem(lastTimestampKey, currentTime.toString());
    } catch (error) {
        console.error("Error checking timestamp:", error);
    }
};

export const resetCounters = () => {
    const { element } = useAzkarStore.getState();
  
    const updatedElement = element.map((azkarItem) => ({
      ...azkarItem,
      content: azkarItem.content.map((contentItem) => ({
        ...contentItem,
        counter: contentItem.resetCounter,
      })),
    }));

    useAzkarStore.setState({ element: updatedElement });
  

  };