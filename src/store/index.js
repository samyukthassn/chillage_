import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import profileReducer from './slices/profileSlice';
import inboxReducer from './slices/inboxSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        profile: profileReducer,
        inbox: inboxReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
}); 