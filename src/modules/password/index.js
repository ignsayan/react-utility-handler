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
            .addCase(fetchPasswords.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPasswords.fulfilled, (state, action) => {
                state.loading = false;
                state.passwords = action.payload;
            })
            .addCase(savePassword.fulfilled, (state, action) => {
                state.passwords = action.payload;
            })
            .addCase(deletePassword.fulfilled, (state, action) => {
                state.passwords = action.payload;
            });
    },
});

export const { } = passwordSlice.actions

export default passwordSlice.reducer