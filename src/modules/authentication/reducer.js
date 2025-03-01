import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

const initialState = {
    user: Cookies.get('USER') || null,
    loading: false,
}

export const authSlice = createSlice({
    'name': 'authentication',
    initialState,
    reducers: {
        initiateLogin: (state) => {
            state.loading = true
        },
        attemptLogin: (state, action) => {
            const user = action.payload
            Cookies.set('USER', user._id)
            state.user = user
            state.loading = false
        },
        loginFailuer: (state) => {
            state.loading = false
        },
        logout: (state) => {
            Cookies.remove('USER')
            state.user = null
        }
    }
})

export const { initiateLogin, attemptLogin, loginFailuer, logout } = authSlice.actions

export default authSlice.reducer