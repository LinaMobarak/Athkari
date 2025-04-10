import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { MaterialIcons } from "@expo/vector-icons";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const theme = useColorScheme() ?? "light";

  return (
    <ThemedView style={styles.container}>
      <TouchableOpacity
        style={styles.heading}
        onPress={() => {
          setIsOpen((value) => !value);
        }}
        activeOpacity={0.8}
      >
        <MaterialIcons
          name="chevron-right"
          size={25}
          weight="medium"
          color="white"
          style={{ transform: [{ rotate: isOpen ? "90deg" : "0deg" }] }}
        />
        <ThemedText
          style={{ color: "white", fontWeight: "bold", fontSize: 15 }}
        >
          {title}
        </ThemedText>
      </TouchableOpacity>
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    padding: 20,
    justifyContent: "space-between",
  },
  content: {
    color: Colors.primary,
    marginTop: 6,
    position: "relative",
    justifyContent: "space-around",
    borderRadius: 10,
    direction: "rtl",
  },
  container: {
    position: "sticky",
    marginRight: "auto",
    marginLeft: "auto",
    marginTop: 10,
    borderRadius: 10,
    width: "90%",
    backgroundColor: Colors.primary,
    // direction: 'rtl'
  },
});
