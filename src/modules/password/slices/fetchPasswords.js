import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPasswords = createAsyncThunk('fetchPasswords', async () => {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const endpoint = `${import.meta.env.VITE_API_URL}/passwords`;
            // const endpoint = "/database.json";
            const response = await axios.get(endpoint);
            const data = await response.data;
            resolve(data);
        }, 600);
    })
});