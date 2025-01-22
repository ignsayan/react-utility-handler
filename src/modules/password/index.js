import { createSlice } from "@reduxjs/toolkit"
import savePasswordHandler from './slices/savePassword'
import deletePasswordHandler from './slices/deletePassword'
import editPasswordHandler from './slices/editPassword'

const initialState = {};

export const passwordSlice = createSlice({
    name: 'password',
    initialState,
    reducers: {
        savePassword: savePasswordHandler,
        deletePassword: deletePasswordHandler,
        editPassword: editPasswordHandler,
    },
});

export const { addPassword, removePassword, editPassword } = passwordSlice.actions

export default passwordSlice.reducer