import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api';
import { Project } from '../types/dashboard';


interface ProjectsState {
    projects: Project[];
    loading: boolean;
    error: string | null;
}


export const fetchProjects = createAsyncThunk<Project[]>(
    'projects/fetchProjects',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/projects');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch projects');
        }
    }
)



const initialState: ProjectsState = {
    projects: [],
    loading: false,
    error: null,
}




const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(
                fetchProjects.pending, (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )

            .addCase(
                fetchProjects.fulfilled, (state, action) => {
                    state.loading = false;
                    state.projects = action.payload;
                }
            )

            .addCase(
                fetchProjects.rejected, (state, action) => {
                    state.loading = false;
                    state.error = action.payload as string;
                }
            )
    }
})



export default projectSlice.reducer;