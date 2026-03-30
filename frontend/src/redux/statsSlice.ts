
import { Stats } from './../types/dashboard';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';


interface StatsState {
    stats: Stats | null;
    loading: boolean;
    error: string | null;
}



export const fetchStats = createAsyncThunk<Stats>(
    'stats/fetchStats',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/stats');
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch stats');
        }
    }
);



const initialState: StatsState = {
    stats: null,
    loading: false,
    error: null,
}



const statsSlice = createSlice({
    name: "stats",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStats.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            
            .addCase(fetchStats.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload;
            })

            .addCase(fetchStats.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})



export default statsSlice.reducer;



