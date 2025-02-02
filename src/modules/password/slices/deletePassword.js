import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deletePassword = createAsyncThunk(
    'passwords/delete',
    async (id) => {
        
        const endpoint = `${import.meta.env.VITE_API_URL}/passwords/delete/${id}`
        const response = await axios.delete(endpoint)
        return response.data
    }
)