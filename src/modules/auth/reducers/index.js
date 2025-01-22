import { createSlice } from "@reduxjs/toolkit";
import loginHandler from "../slices/loginUser";
import logoutHandler from "../slices/logoutUser";

const initialState = {
    user: {},
    _token: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: loginHandler,
        logout: logoutHandler,
    },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;