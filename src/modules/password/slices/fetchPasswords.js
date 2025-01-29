import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPasswords = createAsyncThunk('fetchPasswords', async () => {
    // return new Promise((resolve) => {
    //     setTimeout(async () => {
    const endpoint = `${import.meta.env.VITE_API_URL}/passwords`;
    const response = await axios.get(endpoint);
    return await response.data;
    // resolve(data);
    //     }, 500);
    // })
});