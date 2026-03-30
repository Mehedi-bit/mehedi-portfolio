
import { configureStore } from '@reduxjs/toolkit';
import adminReducer from './adminSlice';
import contactsReducer from './contactsSlice';
import projectsReducer from './projectsSlice';
import skillsReducer from './sklillsSlice';
import statsReducer from './statsSlice';


export const store = configureStore({
    reducer: {
        admin: adminReducer,
        contacts: contactsReducer,
        projects: projectsReducer,
        skills: skillsReducer,
        stats: statsReducer,
    },
});





export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;