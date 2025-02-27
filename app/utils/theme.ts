import { MD3DarkTheme, MD3Theme } from "react-native-paper";

export const theme: MD3Theme = {
    ...MD3DarkTheme,
    colors: {
        ...MD3DarkTheme.colors,
        primary: "#BB86FC", // Vibrant Material Purple
        secondary: "#03DAC6", // Teal Accent
        background: "#1C1C27", // Darker but not pitch black
        surface: "#232333", // Slightly lighter for contrast
        onSurface: "#E0E0E0", // Light gray text for readability
        error: "#CF6679", // Material Red for errors
        outline: "#3A3A4A", // Border for input fields & buttons
    },
};

export default theme;
