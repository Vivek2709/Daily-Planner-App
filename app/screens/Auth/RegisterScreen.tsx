import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { theme } from "../../utils/theme";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../../navigation/AppNavigator";
import { registerUser } from "../../utils/storage";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleRegister = async () => {
        if (!fullName || !email || !password || !confirmPassword) {
            setError("All fields are required!");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setLoading(true);
        const result = await registerUser(fullName, email, password);
        setLoading(false);

        if (result) {
            setError(result);
        } else {
            navigation.navigate("Login");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            {error && <Text style={styles.error}>{error}</Text>}

            <CustomInput
                label="Full Name"
                value={fullName}
                onChangeText={setFullName}
                icon="account"
            />
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
            <CustomInput
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                icon="lock"
            />

            <CustomButton
                title="Sign Up"
                onPress={handleRegister}
                loading={loading}
            />
            <Text style={styles.text}>
                Already have an account?{" "}
                <Text
                    style={styles.link}
                    onPress={() => navigation.navigate("Login")}
                >
                    Login
                </Text>
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        padding: 20,
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontFamily: "Poppins_700Bold",
        color: theme.colors.primary,
        textAlign: "center",
        marginBottom: 10,
    },
    error: {
        color: theme.colors.error,
        fontSize: 14,
        textAlign: "center",
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        fontFamily: "Inter_400Regular",
        color: theme.colors.onSurface,
        textAlign: "center",
        marginTop: 10,
    },
    link: {
        color: theme.colors.primary,
        fontFamily: "Poppins_700Bold",
    },
});

export default RegisterScreen;
