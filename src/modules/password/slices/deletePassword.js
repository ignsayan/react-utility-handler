import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deletePassword = createAsyncThunk(
    'deletePassword',
    async (uuid) => {
        const endpoint = `${import.meta.env.VITE_API_URL}/passwords/delete/${uuid}`;
        const response = await axios.delete(endpoint);
        return response.data;
    }
)