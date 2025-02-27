import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import { loginUser } from "../../utils/storage";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch();
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Both fields are required!");
            return;
        }

        setLoading(true);
        try {
            const result = await loginUser(email, password);
            if (typeof result === "string") {
                setError(result);
            } else {
                dispatch(setUser(result));
                navigation.replace("Dashboard");
            }
        } catch (err) {
            setError("An unexpected error occurred. Please try again.");
            console.error("Login error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <Text style={[styles.title, { color: theme.colors.primary }]}>
                Welcome Back
            </Text>
            {error && (
                <Text style={[styles.error, { color: theme.colors.error }]}>
                    {error}
                </Text>
            )}

            <CustomInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                icon="email"
            />
            <CustomInput
                label="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                icon="lock"
            />

            <CustomButton
                title="Login"
                onPress={handleLogin}
                loading={loading}
            />

            <Text style={[styles.text, { color: theme.colors.onSurface }]}>
                Don't have an account?{" "}
                <Text
                    style={[styles.link, { color: theme.colors.primary }]}
                    onPress={() => navigation.navigate("Register")}
                >
                    Sign Up
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontFamily: "Poppins_700Bold",
        textAlign: "center",
        marginBottom: 10,
    },
    error: {
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        fontFamily: "Inter_400Regular",
        textAlign: "center",
        marginTop: 10,
    },
    link: {
        fontFamily: "Poppins_700Bold",
    },
});

export default LoginScreen;
