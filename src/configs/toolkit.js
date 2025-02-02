import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../modules/authentication/reducer'
import passwordReducer from '../modules/password/reducer'

export const store = configureStore({
    reducer: {
        authentication: authReducer,
        password: passwordReducer,
    },
})

export default store
