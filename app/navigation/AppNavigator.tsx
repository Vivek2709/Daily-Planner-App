import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/Auth/LoginScreen";
import RegisterScreen from "../screens/Auth/RegisterScreen";
import DashboardScreen from "../screens/Dashboard/DashBoardScreen";
import AddTaskScreen from "../screens/Dashboard/AddTaskScreen";
import EditTaskScreen from "../screens/Dashboard/EditTaskScreen";
import { Task } from "../types/taskTypes";

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Dashboard: undefined;
    AddTask: undefined;
    EditTask: { task: Task };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Login"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="AddTask" component={AddTaskScreen} />
            <Stack.Screen name="EditTask" component={EditTaskScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
