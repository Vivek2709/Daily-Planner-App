import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/slices/taskSlice";
import { saveTasks, loadTasks } from "../../utils/storage";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "react-native-paper";
import theme from "@/app/utils/theme";

const AddTaskScreen = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const theme = useTheme();

    const handleAddTask = async () => {
        const newTask = { id: Date.now().toString(), title, description };
        dispatch(addTask(newTask));

        const updatedTasks = await loadTasks();
        updatedTasks.push(newTask);
        await saveTasks(updatedTasks);

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
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
            <CustomButton title="Add Task" onPress={handleAddTask} />
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

export default AddTaskScreen;
