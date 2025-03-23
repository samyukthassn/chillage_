import axios from 'axios';
import { store } from '../store';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor
api.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Handle token expiration
            store.dispatch({ type: 'auth/logout' });
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: (credentials) => api.post('/auth/login', credentials),
    logout: () => api.post('/auth/logout'),
    refreshToken: () => api.post('/auth/refresh-token'),
};

export const profileAPI = {
    getProfile: () => api.get('/profile'),
    updateProfile: (data) => api.put('/profile', data),
    updateProfilePicture: (formData) => 
        api.put('/profile/picture', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }),
};

export const inboxAPI = {
    getMessages: (page = 1) => api.get(`/messages?page=${page}`),
    sendMessage: (data) => api.post('/messages', data),
    markAsRead: (messageId) => api.put(`/messages/${messageId}/read`),
};

export default api; 