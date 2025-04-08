import { Share } from "react-native";

export default async function onShare(item: any) {
    try {
      const result = await Share.share({
        message: item,
      });

    
    }
    catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred.');
      }
    }

  }
