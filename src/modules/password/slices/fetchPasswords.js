import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPasswords = createAsyncThunk(
    'passwords/fetch',
    async (id) => {
        
        const endpoint = `${import.meta.env.VITE_API_URL}/passwords/${id}`
        const response = await axios.get(endpoint)
        return await response.data
    });