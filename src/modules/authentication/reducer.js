import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState = {
    user: Cookies.get('USER') || null
}

export const authSlice = createSlice({
    'name': 'authentication',
    initialState,
    reducers: {
        login: (state, action) => {
            const user = action.payload
            Cookies.set('USER', user._id)
            state.user = user
        },
        logout: (state) => {
            Cookies.remove('USER')
            state.user = null
        }
    }
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer