import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserSession, logoutUser } from "../../utils/storage";

interface User {
    fullName: string;
    email: string;
}

interface AuthState {
    user: User | null;
}

// Initial state
const initialState: AuthState = {
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User | null>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = authSlice.actions;
export const loadUserSession = () => async (dispatch: any) => {
    try {
        const session = await getUserSession();
        dispatch(setUser(session || null));
    } catch (error) {
        console.error("Failed to load user session:", error);
    }
};
export const logout = () => async (dispatch: any) => {
    try {
        await logoutUser();
        dispatch(clearUser());
    } catch (error) {
        console.error("Logout failed:", error);
    }
};

export default authSlice.reducer;
