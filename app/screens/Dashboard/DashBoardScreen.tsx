import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setTasks } from "../../redux/slices/taskSlice";
import {
    useNavigation,
    useRoute,
    useNavigationState,
} from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import TaskCard from "../../../components/TaskCard";
import Header from "../../../components/Header";
import { useTheme, Appbar } from "react-native-paper";
import { saveTasks, logoutUser } from "../../utils/storage";
import { setUser } from "../../redux/slices/authSlice";

const DashboardScreen = () => {
    const tasks = useSelector((state: RootState) => state.task.tasks);
    const dispatch = useDispatch();
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, "Dashboard">
        >();

    const theme = useTheme();
    const route = useRoute();
    const state = useNavigationState((state) => state);

    console.log("Current route name:", route.name);
    console.log("Navigation State:", state);

    const handleDeleteTask = async (taskId: string) => {
        const updatedTasks = tasks.filter((task) => task.id !== taskId);
        dispatch(setTasks(updatedTasks));
        await saveTasks(updatedTasks);
    };
    const handleLogout = async () => {
        await logoutUser();
        dispatch(setUser(null));
        navigation.replace("Login");
    };

    return (
        <View
            style={[
                styles.container,
                { backgroundColor: theme.colors.background },
            ]}
        >
            <Appbar.Header>
                <Appbar.Content title="Your Tasks" />
                <Appbar.Action icon="logout" onPress={handleLogout} />
            </Appbar.Header>

            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onEdit={() =>
                            navigation.navigate("EditTask", { task: item })
                        }
                        onDelete={() => handleDeleteTask(item.id)}
                    />
                )}
            />
            <View style={styles.buttonContainer}>
                <Appbar.Action
                    icon="plus-circle"
                    size={40}
                    onPress={() => navigation.navigate("AddTask")}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    buttonContainer: {
        alignItems: "center",
        paddingVertical: 20,
    },
});

export default DashboardScreen;
