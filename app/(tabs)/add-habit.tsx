import { DATABASE_ID, databases, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { ID } from "react-native-appwrite";
import { Button, SegmentedButtons, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
const FREQUENCIES = ["daily", "weekly", "monthly"];
type frequency = (typeof FREQUENCIES)[number];
export default function HabitScreen() {
    const router = useRouter();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [frequency, setFrequency] = useState<frequency>("daily");
    const [error, setError] = useState<string>("");
    const { user } = useAuth();
    const handleSubmit = async () => {
        try {
            await databases.createDocument(
                DATABASE_ID,
                HABITS_COLLECTION_ID,
                ID.unique(),
                {
                    user_id: user?.$id,
                    title,
                    description,
                    frequency,
                    streak_count: 0,
                    last_completed: new Date().toISOString(),
                    created_at: new Date().toISOString(),
                }
            );
            router.back();
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("An unknown error occurred");
            }
            console.log(error);
        }
    };
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                label="Title"
                mode="outlined"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                label="Description"
                mode="outlined"
                value={description}
                onChangeText={setDescription}
            />
            <View style={styles.frequencyContainer}>
                <SegmentedButtons
                    onValueChange={(value) => setFrequency(value as frequency)}
                    value={frequency}
                    buttons={FREQUENCIES.map((frequency) => ({
                        value: frequency,
                        label: frequency,
                    }))}
                />
            </View>
            <Button
                disabled={!title || !description}
                mode="contained"
                onPress={handleSubmit}
            >
                add habit
            </Button>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
    },
    input: {
        marginBottom: 16,
    },
    frequencyContainer: {
        marginBottom: 24,
    },
    error: {
        color: "red",
        marginBottom: 16,
    },
});
