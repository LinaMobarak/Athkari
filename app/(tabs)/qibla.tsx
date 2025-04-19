import {
  useColorScheme,
  Image,
  Dimensions,
  StyleSheet,
  Vibration,
} from "react-native";
import * as Location from "expo-location";
import { useEffect, useRef, useState, useCallback } from "react";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { Stack, useFocusEffect } from "expo-router"; // <-- import useFocusEffect

export default function Qibla() {
  const theme = useColorScheme() ?? "light";
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [hasVibrated, setHasVibrated] = useState(false);
  const headingSubscriptionRef = useRef<Location.LocationSubscription | null>(
    null
  );

  const calculateQiblaDirection = (lat: number, lon: number): number => {
    const kaabaLat = 21.4225;
    const kaabaLon = 39.8262;

    const phi1 = (lat * Math.PI) / 180;
    const phi2 = (kaabaLat * Math.PI) / 180;
    const deltaLon = ((kaabaLon - lon) * Math.PI) / 180;

    const x = Math.sin(deltaLon);
    const y =
      Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLon);

    let angle = Math.atan2(x, y);
    angle = (angle * 180) / Math.PI;
    return (angle + 360) % 360;
  };

  // 🧠 Only start tracking when screen is focused
  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const startTracking = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Location permission not granted");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const qibla = calculateQiblaDirection(latitude, longitude);
        if (isMounted) setQiblaDirection(qibla);

        const subscription = await Location.watchHeadingAsync((headingData) => {
          if (isMounted) {
            setHeading(
              Math.round(headingData.trueHeading ?? headingData.magHeading)
            );
          }
        });

        headingSubscriptionRef.current = subscription;
      };

      startTracking();

      return () => {
        isMounted = false;
        if (headingSubscriptionRef.current) {
          headingSubscriptionRef.current.remove();
          headingSubscriptionRef.current = null;
        }
        setHasVibrated(false); // Reset vibration when leaving page
      };
    }, [])
  );

  const getRotation = () => {
    const diff = Math.abs(qiblaDirection - heading);

    if (diff < 3 && !hasVibrated) {
      Vibration.vibrate(500);
      setHasVibrated(true);
    } else if (diff >= 3 && hasVibrated) {
      setHasVibrated(false);
    }

    const rotation = qiblaDirection - heading;
    return `${rotation}deg`;
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
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>اتجاه القبلة</ThemedText>
        <ThemedView style={styles.compassContainer}>
          <Image
            source={require("../../assets/images/qibla1111.png")}
            style={[styles.compass, { transform: [{ rotate: getRotation() }] }]}
          />
        </ThemedView>
        <ThemedText style={styles.angleText}>
          زاوية القبلة: {qiblaDirection.toFixed(2)}°
        </ThemedText>
        <ThemedText style={styles.angleText}>
          اتجاه الجهاز: {heading}°
        </ThemedText>
      </ThemedView>
    </>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  compassContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  compass: {
    width: width * 0.6,
    height: width * 0.6,
    resizeMode: "contain",
  },
  needle: {
    position: "absolute",
    width: 4,
    height: width * 0.3,
    backgroundColor: "red",
    top: width * 0.15,
  },
  angleText: {
    marginTop: 20,
    fontSize: 18,
  },
});
