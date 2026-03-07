import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

// Flag untuk mencegah multiple redirect saat 401
let isLoggingOut = false;

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'X-Mobile-App': 'NFBS-Mobile-App-Secret-Key-2026',
        'Accept': 'application/json',
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
        if (error.response && error.response.status === 401 && !isLoggingOut) {
            isLoggingOut = true;

            const authStore = useAuthStore();
            // Gunakan forceLogout agar tidak panggil API lagi (mencegah loop)
            authStore.forceLogout();

            isLoggingOut = false;
        }
        return Promise.reject(error);
    }
);

export default api;