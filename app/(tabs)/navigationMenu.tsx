import ParallaxScrollView from "@/components/ParallaxScrollView"
import { ThemedText } from "@/components/ThemedText"
import { ThemedView } from "@/components/ThemedView"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { Stack, useRouter } from "expo-router"
import { TouchableOpacity, View, StyleSheet } from "react-native"
import { Colors } from "@/constants/Colors";
import { useTheme } from "@react-navigation/native"

export default function NavigationMenu() {
    const { colors } = useTheme()
    const route = useRouter()
    
    return (
    <>
            <Stack.Screen
                options={{
                    headerTitle: 'الصفحات',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        fontSize: 20,
                        fontFamily: 'Cairo',
                    },
                }}
            />
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.containerAlQuran}
                onPress={() => route.navigate("/pages/alQuran2")}
            >
                <MaterialCommunityIcons
                    color={colors.text}
                    size={20}
                    name="star-four-points-outline"
                />
                <ThemedText style={styles.text}>المصحف</ThemedText>
            </TouchableOpacity>

            <View>
                <TouchableOpacity
                    style={styles.containerText}
                    onPress={() => route.navigate("/pages/azkar")}
                >
                    <MaterialCommunityIcons
                        color={colors.text}
                        size={20}
                        name="book-outline"
                    />
                    <ThemedText style={styles.text}>أذكار المسلم</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.containerText}
                    onPress={() => route.navigate("/pages/dua")}
                >
                    <MaterialCommunityIcons
                        color={colors.text}
                        size={20}
                        name="hands-pray"
                    />
                    <ThemedText style={styles.text}>الأدعية</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.containerText}
                    onPress={() => route.navigate("/pages/tasbeeh")}
                >
                    <MaterialCommunityIcons
                        color={colors.text}
                        size={20}
                        name="circle-double"
                    />
                    <ThemedText style={styles.text}>المسبحة</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.containerText}
                    onPress={() => route.navigate("/pages/namesOfallah")}
                >
                    <MaterialCommunityIcons
                        color={colors.text}
                        size={20}
                        name="star-four-points-outline"
                    />
                    <ThemedText style={styles.text}>أسماء الله الحسنى</ThemedText>
                </TouchableOpacity>
            </View>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
        margin: 25,
    },
    containerAlQuran: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // height: '10%',
        width: "100%",
        padding: 20,
        borderRadius: 10,
        backgroundColor: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 5,
        marginBottom: 15,
        borderColor: Colors.primary,
        borderWidth: 1,
    },
    containerText: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        // height: '15%',
        width: "100%",
        padding: 20,
        borderRadius: 10,
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 5,
        shadowRadius: 5,
        marginBottom: 15,
        borderColor: Colors.primary,
        borderWidth: 2,
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        fontFamily: "Cairo",
    },
})