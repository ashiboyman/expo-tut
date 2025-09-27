import { useAuth } from "@/lib/auth-context";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
export default function AuthScreen() {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const { signUp, signIn } = useAuth();
    const router = useRouter();
    const handleSignUp = () => {
        setIsSignUp((prev) => !prev);
    };
    const handleAuth = async () => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        if(password.length < 8){
            setError("Password must be at least 8 characters long");
            return;
        }
        setError("");
        if(isSignUp){
            const message = await signUp(email, password);
            if (message) {
                setError(message);
                return;
            }else{
                router.push("/");
            }
        }else{
            const message = await signIn(email, password);
            if (message) {
                setError(message);
                return;
            }
            router.replace("/");
        }
    };
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <View style={styles.content}>
                <Text variant="headlineMedium" style={styles.title}>
                    {isSignUp ? "create account" : "welcome back"}
                </Text>
                <TextInput
                    label="Email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder="example@gmail.com"
                    mode="outlined"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    label="Password"
                    autoCapitalize="none"
                    secureTextEntry
                    placeholder="Password"
                    mode="outlined"
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                />
                {error && <Text style={styles.error}>{error}</Text>}
                <Button
                    mode="contained"
                    style={styles.button}
                    onPress={handleAuth}
                >
                    {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
                <Button
                    mode="text"
                    onPress={handleSignUp}
                    style={styles.switchButton}
                >
                    {isSignUp
                        ? "Already have an account? Sign In"
                        : "Don't have an account? Sign Up"}
                </Button>
            </View>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5",
    },
    content: {
        flex: 1,
        padding: 16,
        justifyContent: "center",
    },
    title: {
        marginBottom: 24,
        textAlign: "center",
    },
    input: {
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
    },
    switchButton: {
        marginTop: 16,
    },
    error: {
        color: "red",
        marginBottom: 16,
    },
});