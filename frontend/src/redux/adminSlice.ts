import { Settings } from './../types/dashboard';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';



// admin state
interface SettingsState {
    settings: Settings | null,
    loading: boolean,
    error: string | null,
}



export const fetchAdmin = createAsyncThunk<Settings>(
    'settings/fetchAdmin',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/settings');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch admin info');
        }
    }
)



const initialState: SettingsState = {
    settings: null,
    loading: false,
    error: null,
}



const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdmin.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.settings = action.payload;
            })
            .addCase(fetchAdmin.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
    }
})

export default adminSlice.reducer;