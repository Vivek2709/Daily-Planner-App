import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet, ViewStyle } from "react-native";
import { Provider, useDispatch } from "react-redux";
import store from "./redux/store";
import { PaperProvider } from "react-native-paper";
import AppNavigator from "./navigation/AppNavigator";
import { theme } from "./utils/theme";
import { useFonts, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { Inter_400Regular } from "@expo-google-fonts/inter";
import { getUserSession, loadTasks } from "./utils/storage";
import { setUser } from "./redux/slices/authSlice";
import { setTasks } from "./redux/slices/taskSlice";

export default function App() {
    return (
        <Provider store={store}>
            <PaperProvider theme={theme}>
                <AppContent />
            </PaperProvider>
        </Provider>
    );
}

const AppContent = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [fontsLoaded] = useFonts({
        Poppins_700Bold,
        Inter_400Regular,
    });

    useEffect(() => {
        const loadSessionAndTasks = async () => {
            try {
                const session = await getUserSession();
                if (session) {
                    dispatch(setUser(session));
                }
                const tasks = await loadTasks();
                dispatch(setTasks(tasks));
            } catch (error) {
                console.error("Error loading user session or tasks:", error);
            } finally {
                setLoading(false);
            }
        };
        loadSessionAndTasks();
    }, [dispatch]);

    if (!fontsLoaded || loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        );
    }

    return <AppNavigator />;
};

const styles = StyleSheet.create({
    loaderContainer: {
        flex: 1,
        justifyContent: "center" as ViewStyle["justifyContent"],
        alignItems: "center" as ViewStyle["alignItems"],
    },
});
