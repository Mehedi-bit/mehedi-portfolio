

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import { Skillset } from '../types/dashboard';


interface SkillsState {
    skillset: Skillset | null;
    loading: boolean;
    error: string | null;
}

export const fetchSkills = createAsyncThunk<Skillset>(
    'skills/fetchSkills',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/skills');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch skills');
        }
    }
);



const initialState: SkillsState = {
    skillset: null,
    loading: false,
    error: null,
}



const skillsSlice = createSlice({
    name: "skills",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSkills.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSkills.fulfilled, (state, action) => {
                state.loading = false;
                state.skillset = action.payload;
            })
            .addCase(fetchSkills.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})



export default skillsSlice.reducer;