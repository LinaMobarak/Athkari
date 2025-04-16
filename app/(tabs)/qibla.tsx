// import {
//   Text,
//   useColorScheme,
//   View,
//   Image,
//   Dimensions,
//   StyleSheet,
//   Vibration,
// } from "react-native";
// import { Colors } from "@/constants/Colors";
// import { Stack } from "expo-router";
// import { Magnetometer } from "expo-sensors";
// import * as Location from "expo-location";
// import { useEffect, useState } from "react";
// import { ThemedView } from "@/components/ThemedView";
// import { ThemedText } from "@/components/ThemedText";
// import CompassHeading from "react-native-compass-heading";

// export default function qibla() {
//   const theme = useColorScheme() ?? "light";
//   //   const [heading, setHeading] = useState(0);
//   //   const [qiblaDirection, setQiblaDirection] = useState(0);
//   const [headingValue, setHeadingValue] = useState(0);
//   useEffect(() => {
//     const degree_update_rate = 3;

//     CompassHeading.start(degree_update_rate, ({ heading, accuracy }) => {
//       setHeadingValue(heading);
//     });

//     return () => {
//       CompassHeading.stop();
//     };
//     // (async () => {
//     //   const { status } = await Location.requestForegroundPermissionsAsync();
//     //   if (status !== "granted") {
//     //     console.log("Location permission not granted");
//     //     return;
//     //   }

//     //   const location = await Location.getCurrentPositionAsync({});
//     //   const { latitude, longitude } = location.coords;

//     //   const qibla = calculateQiblaDirection(latitude, longitude);
//     //   setQiblaDirection(qibla);

//     //   const headingSubscription = await Location.watchHeadingAsync(
//     //     (headingData) => {
//     //       setHeading(
//     //         Math.round(headingData.trueHeading ?? headingData.magHeading)
//     //       );
//     //     }
//     //   );

//     //   return () => headingSubscription.remove();
//     // })();
//   }, []);

//   //   const calculateQiblaDirection = (lat: number, lon: number): number => {
//   //     const kaabaLat = 21.4225;
//   //     const kaabaLon = 39.8262;

//   //     const phi1 = (lat * Math.PI) / 180;
//   //     const phi2 = (kaabaLat * Math.PI) / 180;
//   //     const deltaLon = ((kaabaLon - lon) * Math.PI) / 180;

//   //     const x = Math.sin(deltaLon);
//   //     const y =
//   //       Math.cos(phi1) * Math.tan(phi2) - Math.sin(phi1) * Math.cos(deltaLon);

//   //     let angle = Math.atan2(x, y);
//   //     angle = (angle * 180) / Math.PI;
//   //     return (angle + 360) % 360;
//   //   };

//   //   const getRotation = () => {
//   //     const diff = qiblaDirection - heading;
//   //     if (diff < 1) {
//   //       Vibration.vibrate(500);
//   //     }
//   //     return `${diff}deg`;
//   //   };

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "white",
//       }}
//     >
//       <Text>{headingValue}</Text>
//     </View>
//     // <ThemedView style={styles.container}>
//     //   <ThemedText style={styles.title}>اتجاه القبلة</ThemedText>
//     //   <ThemedView style={styles.compassContainer}>
//     //     <Image
//     //       source={require("../../assets/images/qibla1111.png")}
//     //       style={[styles.compass, { transform: [{ rotate: getRotation() }] }]}
//     //     />
//     //     {/* <ThemedView style={styles.needle} /> */}
//     //   </ThemedView>
//     //   <ThemedText style={styles.angleText}>
//     //     زاوية القبلة: {qiblaDirection.toFixed(2)}°
//     //   </ThemedText>
//     //   <ThemedText style={styles.angleText}>اتجاه الجهاز: {heading}°</ThemedText>
//     // </ThemedView>
//   );
// }

// const { width } = Dimensions.get("window");

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//     height: "100%",
//   },
//   title: {
//     fontSize: 20,
//     // marginBottom: ,
//     fontWeight: "bold",
//   },
//   compassContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   compass: {
//     width: width * 0.6,
//     height: width * 0.6,
//     resizeMode: "contain",
//   },
//   needle: {
//     position: "absolute",
//     width: 4,
//     height: width * 0.3,
//     backgroundColor: "red",
//     top: width * 0.15,
//   },
//   angleText: {
//     marginTop: 20,
//     fontSize: 18,
//   },
// });
