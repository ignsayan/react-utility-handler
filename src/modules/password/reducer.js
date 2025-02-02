import { createSlice } from "@reduxjs/toolkit"
import {
    fetchPasswords,
    savePassword,
    deletePassword,
} from "./slices/index"

const initialState = {
    passwords: [],
    loading: false,
};

export const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch Passwords
            .addCase(fetchPasswords.fulfilled, (state, action) => {
                state.loading = false;
                state.passwords = action.payload
            })
            // Save Password
            .addCase(savePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(savePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.passwords.push(action.payload)
            })
            // Delete Password
            .addCase(deletePassword.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.passwords = state.passwords.filter(
                    (password) => password._id !== action.payload._id
                )
            });
    },
});

export const { } = passwordSlice.actions

export default passwordSlice.reducer