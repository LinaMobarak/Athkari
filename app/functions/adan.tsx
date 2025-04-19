import { Audio } from "expo-av";
import Modal from "react-native-modal";
export default function ModalAdan() {
  const playAdhan = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("@/assets/sounds/azan1.mp3")
    );

    await sound.playAsync();
  };
}
