import { configureStore } from '@reduxjs/toolkit'
import passwordReducer from '../modules/password/reducers'

export const store = configureStore({
    reducer: {
        password: passwordReducer,
    },
})

export default store
