import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie';

export const fetchPasswords = createAsyncThunk(
    'passwords/fetch',
    async () => {

        const id = Cookies.get('USER')

        const endpoint = `${import.meta.env.VITE_API_URL}/passwords/${id}`
        const response = await axios.get(endpoint)
        return response.data
    });