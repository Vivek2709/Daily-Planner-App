import React from "react";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import { theme } from "../app/utils/theme";

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    mode?: "contained" | "outlined";
}

const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    onPress,
    loading = false,
    mode = "contained",
}) => {
    return (
        <Button
            mode={mode}
            onPress={onPress}
            loading={loading}
            style={styles.button}
            contentStyle={styles.content}
            labelStyle={styles.label}
        >
            {title}
        </Button>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 8,
        marginVertical: 10,
    },
    content: {
        height: 50,
    },
    label: {
        fontSize: 16,
    },
});

export default CustomButton;
