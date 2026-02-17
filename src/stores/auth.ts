import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
    // --- State ---
    const token = ref<string>(localStorage.getItem('token') || '');
    const user = ref<any>(null);
    const isAuthenticated = ref<boolean>(!!localStorage.getItem('token'));

    // --- Getters (Computed) ---
    const getUser = computed(() => user.value);

    // --- Actions ---

    /**
     * Login Action
     */
    async function login(credentials: any) {
        try {
            const response = await axios.post('/login', credentials);

            // Update State
            token.value = response.data.token;
            user.value = response.data.user;
            isAuthenticated.value = true;

            // Persistence
            localStorage.setItem('token', token.value);

            // Axios Header Global
            axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;

            return true;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Logout Action
     */
    async function logout() {
        try {
            if (token.value) {
                // Pastikan header terpasang sebelum logout ke axios
                axios.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
                await axios.post('/logout');
            }
        } catch (error) {
            console.error('Logout axios error:', error);
        } finally {
            // Reset State
            token.value = '';
            user.value = null;
            isAuthenticated.value = false;

            // Cleanup
            localStorage.removeItem('token');
            delete axios.defaults.headers.common['Authorization'];
        }
    }

    /**
     * Fetch User Data (Optional - useful for re-authentication)
     */
    async function fetchUser() {
        if (!token.value) return;
        try {
            const response = await axios.get('/user');
            user.value = response.data;
        } catch (error) {
            logout();
        }
    }

    return {
        token,
        user,
        isAuthenticated,
        getUser,
        login,
        logout,
        fetchUser
    };
});