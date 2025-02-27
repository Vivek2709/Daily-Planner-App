import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface HeaderProps {
    title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
    console.log("Header Title:", title);
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#232333",
        padding: 20,
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#3A3A4A",
    },
    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#BB86FC",
    },
});

export default Header;
