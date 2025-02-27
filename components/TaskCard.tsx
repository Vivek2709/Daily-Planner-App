import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Task } from "../app/types/taskTypes";

interface TaskCardProps {
    task: Task;
    onEdit: () => void;
    onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>

            <View style={styles.actions}>
                <TouchableOpacity onPress={onEdit}>
                    <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onDelete}>
                    <Text style={styles.deleteButton}>Delete</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: "#1E1E2E",
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#BB86FC",
    },
    description: {
        fontSize: 14,
        color: "#E0E0E0",
        marginTop: 5,
    },
    actions: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    editButton: {
        color: "#03DAC6",
        fontWeight: "bold",
    },
    deleteButton: {
        color: "#CF6679",
        fontWeight: "bold",
    },
});

export default TaskCard;
