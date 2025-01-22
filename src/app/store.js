import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../modules/todo/reducers'
import authReducer from '../modules/auth/reducers'

export const store = configureStore({
    reducer: {
        todo: todoReducer,
        auth: authReducer,
    },
})

export default store
