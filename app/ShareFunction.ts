import { Share } from "react-native";
async function share(item: any) {
  try{
    await Share.share({message: item});
  }catch{
    
      alert('An unknown error occurred.');
    
  }
}

export default function onShare(item: any) {
    try {
      share(item)
    }
    catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert('An unknown error occurred.');
      }
    }

  }
