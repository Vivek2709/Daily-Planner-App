import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/taskTypes";
const USERS_KEY = "users";
const SESSION_KEY = "user_session";
const TASKS_KEY = "tasks";

const validatePassword = (password: string): string | null => {
    if (password.length < 6) return "Password must be at least 6 characters!";
    if (!/[A-Z]/.test(password))
        return "Password must contain an uppercase letter!";
    if (!/\d/.test(password)) return "Password must contain a number!";
    return null; // Password is valid
};

export const registerUser = async (
    fullName: string,
    email: string,
    password: string
): Promise<string | null> => {
    const passwordError = validatePassword(password);
    if (passwordError) return passwordError; // Return error if password is weak

    try {
        const usersJson = await AsyncStorage.getItem(USERS_KEY);
        const users = usersJson ? JSON.parse(usersJson) : [];
        if (users.some((user: any) => user.email === email)) {
            return "Email already registered!";
        }

        const newUser = { fullName, email, password };
        await AsyncStorage.setItem(
            USERS_KEY,
            JSON.stringify([...users, newUser])
        );

        return null;
    } catch (error) {
        return "Registration failed!";
    }
};

export const loginUser = async (
    email: string,
    password: string
): Promise<{ fullName: string; email: string } | string> => {
    try {
        const usersJson = await AsyncStorage.getItem(USERS_KEY);
        const users = usersJson ? JSON.parse(usersJson) : [];

        // Find user by email
        const user = users.find((user: any) => user.email === email);
        if (!user || user.password !== password) {
            return "Invalid email or password!";
        }

        // Save user session
        const sessionData = { fullName: user.fullName, email: user.email };
        await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));

        return sessionData; // Return user data
    } catch (error) {
        return "Login failed!";
    }
};

export const getUserSession = async (): Promise<{
    fullName: string;
    email: string;
} | null> => {
    try {
        const userJson = await AsyncStorage.getItem(SESSION_KEY);
        return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
        return null;
    }
};

export const logoutUser = async (): Promise<void> => {
    await AsyncStorage.removeItem(SESSION_KEY);
};

export const saveTasks = async (tasks: Task[]) => {
    try {
        await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error("Failed to save tasks:", error);
    }
};

export const loadTasks = async (): Promise<Task[]> => {
    try {
        const tasksJson = await AsyncStorage.getItem(TASKS_KEY);
        return tasksJson ? JSON.parse(tasksJson) : [];
    } catch (error) {
        console.error("Failed to load tasks:", error);
        return [];
    }
};

export const clearTasks = async () => {
    await AsyncStorage.removeItem(TASKS_KEY);
};

export default {};
