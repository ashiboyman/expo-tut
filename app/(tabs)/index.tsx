import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
    return (
        <View style={styles.view}>
            <Text>random text</Text>
            
        </View>
    );
}
const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    link: {
        marginTop: 20,
        padding: 10,
        backgroundColor: "blue",
        color: "white",
        borderRadius: 5,
    },
});
