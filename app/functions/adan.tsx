import { Colors } from "@/constants/Colors";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import Modal from "react-native-modal";
import { Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ThemedText } from "@/components/ThemedText";

type ModalAdanProps = {
  onClose: () => void;
};

export default function ModalAdan({ onClose }: ModalAdanProps) {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const { colors } = useTheme();

  const playAdhan = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });

      const { sound } = await Audio.Sound.createAsync(
        require("@/assets/sounds/azan1.mp3")
      );
      setSound(sound);
      await sound.playAsync();
    } catch (error) {
      console.log("Error playing Adhan:", error);
    }
  };

  const stopAdhan = async () => {
    try {
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }
    } catch (error) {
      console.log("Error stopping Adhan:", error);
    }
  };

  const closeModal = async () => {
    await stopAdhan();
    setIsModalVisible(false);
    onClose();
  };

  useEffect(() => {
    playAdhan();
    return () => {
      stopAdhan();
    };
  }, []);

  return (
    <Modal
      isVisible={isModalVisible}
      backdropOpacity={0.5}
      onBackdropPress={closeModal}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <View
        style={{
          backgroundColor: colors.background,
          padding: 20,
          borderRadius: 20,
          width: "80%",
          maxHeight: "30%",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: colors.text,
            fontSize: 18,
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          حان الآن موعد الآذان
        </Text>

        <TouchableOpacity
          onPress={closeModal}
          style={{
            paddingVertical: 8,
            paddingHorizontal: 20,
            backgroundColor: Colors.primary,
            borderRadius: 10,
          }}
        >
          <ThemedText>إغلاق</ThemedText>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
