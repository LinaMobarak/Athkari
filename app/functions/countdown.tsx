import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

export const CustomCountdown = ({
  until,
  onFinish,
}: {
  until: number;
  onFinish: () => void;
}) => {
  const [secondsLeft, setSecondsLeft] = useState(until);

  useEffect(() => {
    setSecondsLeft(until);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [until]);

  useEffect(() => {
    if (secondsLeft === 0) {
      onFinish();
    }
  }, [secondsLeft]);

  const hours = Math.floor(secondsLeft / 3600);
  const minutes = Math.floor((secondsLeft % 3600) / 60);
  const seconds = secondsLeft % 60;

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <ThemedText style={styles.timeText}>{hours}</ThemedText>
        <ThemedText style={styles.label}>ساعة</ThemedText>
      </View>
      <ThemedText style={styles.separator}>:</ThemedText>
      <View style={styles.column}>
        <ThemedText style={styles.timeText}>{minutes}</ThemedText>
        <ThemedText style={styles.label}>دقيقة</ThemedText>
      </View>
      <ThemedText style={styles.separator}>:</ThemedText>
      <View style={styles.column}>
        <ThemedText style={styles.timeText}>{seconds}</ThemedText>
        <ThemedText style={styles.label}>ثانية</ThemedText>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  column: {
    alignItems: "center",
  },
  timeText: {
    fontSize: 15,

    borderWidth: 1,
    borderColor: "rgb(198, 196, 196)",
    paddingTop: 3,
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 7,
  },
  label: {
    fontSize: 13,
    marginTop: 4,
  },
  separator: {
    fontSize: 15,
    marginHorizontal: 4,
  },
});
