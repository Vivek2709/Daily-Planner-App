import React from "react";
import { TextInput } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { theme } from "../app/utils/theme";

interface CustomInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    placeholder?: string;
    secureTextEntry?: boolean;
    icon?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry = false,
    icon,
}) => {
    return (
        <View style={styles.container}>
            <TextInput
                label={label}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                mode="outlined"
                left={icon ? <TextInput.Icon icon={icon} /> : null}
                style={styles.input}
                theme={{ colors: { primary: theme.colors.primary } }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    input: {
        backgroundColor: theme.colors.surface,
    },
});

export default CustomInput;
