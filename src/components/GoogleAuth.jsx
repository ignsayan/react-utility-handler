import React from 'react'
import { app } from '../configs/firebase';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
    initiateLogin,
    attemptLogin,
    loginFailuer
} from '../modules/authentication/reducer';
import {
    GoogleAuthProvider,
    signInWithPopup,
    getAuth,
} from 'firebase/auth'

export default function GoogleAuth({ prefix }) {

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    const { loading } = useSelector((state) => state.authentication);
    const dispatch = useDispatch();

    const handleGoogleAuthentication = async () => {
        try {
            dispatch(initiateLogin());
            const google = await signInWithPopup(auth, provider);
            let user = google.user;

            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users`, {
                firebase_uid: user.uid,
                name: user.displayName,
                email: user.email,
            });
            user = await response.data
            dispatch(attemptLogin(user));

        } catch (error) {
            console.error(error);
            dispatch(loginFailuer());
        }
    }

    return (
        <>
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-full"
                onClick={handleGoogleAuthentication}>
                {loading
                    ? <svg className="animate-spin h-5 w-5 text-white mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0h-2a6 6 0 00-12 0H4z"></path>
                    </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                        className="w-6 h-6 mr-2">
                        <path fill="white"
                            d="M24 4C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.38-.12-2.72-.34-4H24v8h12.69C34.64 31.56 29.84 36 24 36c-6.63 0-12-5.37-12-12s5.37-12 12-12c3.08 0 5.91 1.16 8.09 3.05l5.76-5.77C33.82 5.92 29.22 4 24 4Z" />
                    </svg>
                }
                {`${prefix} Google`}
            </button>
        </>
    )
}
