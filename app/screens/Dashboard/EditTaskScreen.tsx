import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { updateTask, setTasks } from "../../redux/slices/taskSlice";
import { saveTasks } from "../../utils/storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/AppNavigator";
import { RootState } from "../../redux/store";
import { Task } from "../../types/taskTypes";
import Header from "../../../components/Header";
import { useTheme } from "react-native-paper";
import theme from "@/app/utils/theme";

type Props = NativeStackScreenProps<RootStackParamList, "EditTask">;

const EditTaskScreen: React.FC<Props> = ({ route, navigation }) => {
    const { task } = route.params;
    const dispatch = useDispatch();
    const tasks = useSelector((state: RootState) => state.task.tasks);

    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const theme = useTheme();

    const handleUpdateTask = async () => {
        const updatedTask = { ...task, title, description };
        dispatch(updateTask(updatedTask));

        const updatedTasks = tasks.map((t) =>
            t.id === task.id ? updatedTask : t
        );
        dispatch(setTasks(updatedTasks));
        await saveTasks(updatedTasks);

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Header title="Edit Task" />

            <CustomInput
                label="Task Title"
                value={title}
                onChangeText={setTitle}
            />
            <CustomInput
                label="Description"
                value={description}
                onChangeText={setDescription}
            />
            <CustomButton title="Update Task" onPress={handleUpdateTask} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: theme.colors.background,
    },
});

export default EditTaskScreen;
