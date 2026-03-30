import { ContactMessage } from '../types/dashboard'; 
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from './api'; 



interface ContactState {
    contacts: ContactMessage[];
    loading: boolean;
    error: string | null;
    success: boolean;
}


// fetch all contact messages
export const fetchContact = createAsyncThunk<ContactMessage[]>(
    'contact/fetchContact',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/contact/messages');
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to fetch contact message');
        }
    }
);




// send contact message (form)
export const sendContactMessage = createAsyncThunk<ContactMessage, Omit<ContactMessage, '_id'|  'id' | 'createdAt'>>(
    'contact/sendContactMessage',
    async (data, { rejectWithValue }) => {
        try {
            const response = await api.post('/contact/send-message', data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Failed to send contact message');
        }
    }
);




const initialState: ContactState = {
    contacts: [],
    loading: false,
    error: null,
    success: false,
}


const contactSlice = createSlice({
    name: "contacts",
    initialState,
    reducers: {
        resetContactState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = false;
        }
    },

    extraReducers: (builder) => {
        builder
            // FETCH (for getting data in dashboard)
            .addCase(fetchContact.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchContact.fulfilled, (state, action) => {
                state.loading = false;
                state.contacts = action.payload;
            })
            .addCase(fetchContact.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            }) 

            // SEND (for contact form)
            .addCase(sendContactMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })

            .addCase(sendContactMessage.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.contacts.unshift(action.payload);
            })
            
            .addCase(sendContactMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;
            }) 
    }
})



export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;