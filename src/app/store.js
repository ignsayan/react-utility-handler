import { configureStore } from '@reduxjs/toolkit'
// import todoReducer from '../modules/todo'
import passwordReducer from '../modules/password'

export const store = configureStore({
    reducer: {
        password: passwordReducer,
        // todo: todoReducer,
    },
})

export default store
