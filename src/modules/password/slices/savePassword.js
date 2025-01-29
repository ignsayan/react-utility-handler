import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const savePassword = createAsyncThunk(
    'savePassword',
    async (payload) => {
        const endpoint = `${import.meta.env.VITE_API_URL}/passwords/store`;
        const response = await axios.post(endpoint, payload);
        return response.data;
    }
);