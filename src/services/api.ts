import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Sesuaikan dengan URL Laravel Anda
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// Request Interceptor: Tambah Token
api.interceptors.request.use(config => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Response Interceptor: Handle 401
api.interceptors.response.use(
    response => response,
    async error => {
        if (error.response && error.response.status === 401) {
            const authStore = useAuthStore();
            await authStore.logout(); // Hapus token dan redirect
        }
        return Promise.reject(error);
    }
);

export default api;