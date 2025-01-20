import { configureStore } from '@reduxjs/toolkit'
import todoReducer from '../modules/todo/reducers'

export const store = configureStore({
    reducer: {
        todo: todoReducer,
    },
})

export default store
