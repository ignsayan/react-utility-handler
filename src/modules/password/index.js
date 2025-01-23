import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import savePasswordHandler from './slices/savePassword'
import deletePasswordHandler from './slices/deletePassword'
import editPasswordHandler from './slices/editPassword'

export const fetchPasswords = createAsyncThunk('fetchPasswords', async () => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            // const endpoint = `${import.meta.env.VITE_API_URL}/passwords`;
            const endpoint = "/database.json";
            const response = await fetch(endpoint);
            const data = await response.json();
            resolve(data);
        }, 600);
    })
});

const initialState = {
    passwords: [],
    loading: false,
};

export const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {
        savePassword: savePasswordHandler,
        deletePassword: deletePasswordHandler,
        editPassword: editPasswordHandler,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPasswords.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPasswords.fulfilled, (state, action) => {
                state.loading = false;
                state.passwords = action.payload;
            });
    },
});

export const { savePassword, removePassword, editPassword } = passwordSlice.actions

export default passwordSlice.reducer