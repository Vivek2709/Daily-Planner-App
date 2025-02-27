import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from "..//../types/taskTypes"; // ✅ Import Task type

interface TaskState {
    tasks: Task[];
}

const initialState: TaskState = {
    tasks: [],
};

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(
                (t) => t.id === action.payload.id
            );
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        removeTask: (state, action: PayloadAction<string>) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload
            );
        },
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
    },
});

export const { addTask, updateTask, removeTask, setTasks } = taskSlice.actions;

export default taskSlice.reducer;
