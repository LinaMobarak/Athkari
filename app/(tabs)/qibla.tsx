import {
  useColorScheme,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  Vibration,
  View,
  TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import { useEffect, useRef, useState, useCallback } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Stack, useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import Modal from "react-native-modal";

export default function Qibla() {
  const { colors } = useTheme();
  const theme = useColorScheme() ?? "light";
  const color = theme === "light" ? "black" : "white";
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [hasVibrated, setHasVibrated] = useState(false);
  const headingSubscriptionRef = useRef<Location.LocationSubscription | null>(
    null
  );

  const [isModalVisible, setIsModalVisible] = useState(false);

  const calculateQiblaDirection = useCallback(
    (lat: number, lon: number): number => {
      // Convert degrees to radians
      const toRadians = (degrees: number): number => degrees * (Math.PI / 180);
      // Convert radians to degrees
      const toDegrees = (radians: number): number => radians * (180 / Math.PI);

      // Coordinates of Kaaba in Mecca
      const kaabaLat = 21.4225;
      const kaabaLon = 39.8262;

      // Convert to radians
      const userLatRad = toRadians(lat);
      const userLonRad = toRadians(lon);
      const kaabaLatRad = toRadians(kaabaLat);
      const kaabaLonRad = toRadians(kaabaLon);

      // Calculate the angle using haversine formula
      const dLon = kaabaLonRad - userLonRad;

      const a = Math.sin(kaabaLatRad) * Math.sin(userLatRad);
      const b = Math.cos(kaabaLatRad) * Math.cos(userLatRad) * Math.cos(dLon);
      const angle = Math.acos(a + b);

      // Calculate the direction
      const y = Math.sin(dLon) * Math.cos(kaabaLatRad);
      const x =
        Math.cos(userLatRad) * Math.sin(kaabaLatRad) -
        Math.sin(userLatRad) * Math.cos(kaabaLatRad) * Math.cos(dLon);

      // Calculate the qibla bearing
      let qiblaDirection = toDegrees(Math.atan2(y, x));

      // Normalize to 0-360 degrees (compass bearing)
      qiblaDirection = ((qiblaDirection + 360) % 360) - 20;

      return qiblaDirection;
    },
    []
  );

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const startTracking = async () => {
        try {
          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.log("Location permission not granted");
            return;
          }

          const location = await Location.getCurrentPositionAsync({});
          const { latitude, longitude } = location.coords;

          // Call the function with proper scope
          const qibla = calculateQiblaDirection(latitude, longitude);
          if (isMounted) setQiblaDirection(qibla);

          const subscription = await Location.watchHeadingAsync(
            (headingData) => {
              if (isMounted) {
                setHeading(
                  Math.round(headingData.trueHeading ?? headingData.magHeading)
                );
              }
            }
          );

          headingSubscriptionRef.current = subscription;
        } catch (error) {
          console.error("Error getting location or heading:", error);
        }
      };

      startTracking();

      return () => {
        isMounted = false;
        if (headingSubscriptionRef.current) {
          headingSubscriptionRef.current.remove();
          headingSubscriptionRef.current = null;
        }
        setHasVibrated(false);
      };
    }, [calculateQiblaDirection]) // Add calculateQiblaDirection as a dependency
  );

  const getRotation = useCallback(() => {
    const diff = Math.abs(qiblaDirection - heading);

    if (diff < 3 && !hasVibrated) {
      Vibration.vibrate(500);
      setHasVibrated(true);
    } else if (diff >= 3 && hasVibrated) {
      setHasVibrated(false);
    }

    const rotation = qiblaDirection - heading;
    return `${rotation}deg`;
  }, [qiblaDirection, heading, hasVibrated]);

  const closeModal = async () => {
    setIsModalVisible(false);
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "القبلة",
          headerTitleAlign: "center",
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      />
      <TouchableOpacity onPress={() => setIsModalVisible(true)}>
        <Feather
          name="info"
          size={20}
          style={{
            marginLeft: 10,
            marginTop: 10,
            color: theme === "light" ? "dark" : "white",
          }}
        />
      </TouchableOpacity>
      <View
        style={{ justifyContent: "center", alignItems: "center", margin: 0 }}
      >
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={closeModal}
          style={{
            backgroundColor: colors.background,
            width: "80%",
            maxHeight: "50%",
            borderRadius: 20,
            padding: 10,
            direction: "rtl",
          }}
        >
          <ThemedText style={{ marginBottom: 20 }}>
            يشير السهم إلى اتجاه القبلة في مكانك الحالي. للحصول على نتيجة دقيقة،
            قف وامسك الجهاز كما هو موضح فى الصورة أعلاه وتحرك يمينًا أو يسارًا،
            عندما يتحول السهم إلى اللون الأخضر فأنت في الاتجاه الصحيح للقبلة.
            تأكد من الابتعاد عن الأجهزة الإلكترونية وعدم استخدام المغناطيس خلف
            الجهاز. للتأكد أكثر أغلق التطبيق و افتحه واتبع الخطوات من جديد
          </ThemedText>

          <ThemedText>
            ملاحظة: لن يكون الاتجاه دقيقاً إذا جربت تحديد الاتجاه داخل الحرم
            المكي. لأنك ستكون داخل خطوط الطول والعرض للحرم. يمكنك الخروج من
            المسجد الحرام بمسافة و التجربة
          </ThemedText>
        </Modal>
      </View>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/kaabaaaaaa.png")}
          style={{ width: 75, height: 75 }}
        />
        <View style={styles.compassContainer}>
          <Image
            source={
              theme === "dark"
                ? require("../../assets/images/QiblaBackgroundWhite.png")
                : require("../../assets/images/QiblaBackground.png")
            }
            style={styles.compass}
          />
          <Image
            source={
              theme === "dark"
                ? require("../../assets/images/QiblaPointerWhite.png")
                : require("../../assets/images/QiblaPointer.png")
            }
            style={[styles.needle, { transform: [{ rotate: getRotation() }] }]}
          />
        </View>
        <ThemedText style={styles.angleText}>
          زاوية القبلة: {qiblaDirection.toFixed(2)}°
        </ThemedText>
        <ThemedText style={styles.angleText}>
          اتجاه الجهاز: {heading}°
        </ThemedText>
      </View>
    </>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 50,
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    width: width * 0.2,
    height: width * 0.2,
  },
  compassContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  compass: {
    width: width * 0.9,
    height: width * 0.9,
    resizeMode: "contain",
  },
  needle: {
    position: "absolute",
    height: width * 0.5,
    width: width * 0.5,
    resizeMode: "contain",
  },
  angleText: {
    marginTop: 20,
    fontSize: 18,
  },
});
