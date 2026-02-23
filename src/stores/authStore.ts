import router from '@/router';
import api from '@/services/api';
import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

interface User {
    id: number;
    name: string;
    email: string;
    [key: string]: any;
}

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const token = ref(localStorage.getItem('auth_token') || '');
    const fcmToken = ref('');
    const isAuthenticated = computed(() => !!token.value);

    const updateFcmToken = async (newToken?: string) => {
        if (newToken) fcmToken.value = newToken;

        // 1. Pastikan user login & token tersedia
        if (!isAuthenticated.value || !fcmToken.value) {
            console.warn('Skip update FCM: User belum login atau token kosong');
            return;
        }

        // 2. Cek apakah token sudah pernah dikirim sebelumnya (Opsional - Hemat Bandwidth)
        const lastSavedToken = localStorage.getItem('last_fcm_token');
        if (lastSavedToken === fcmToken.value) {
            console.log('FCM Token sudah up-to-date di server.');
            return;
        }

        try {
            // 3. Tambahkan timeout atau retry jika perlu
            await api.post('/auth/update-fcm-token', {
                fcm_token: fcmToken.value,
                platform: 'android' // Tambahan info untuk backend jika perlu
            });

            // Simpan status sukses ke local storage
            localStorage.setItem('last_fcm_token', fcmToken.value);
            console.log('FCM Token updated successfully in Laravel');
        } catch (error: any) {
            // Handle error spesifik (misal token Laravel expired)
            if (error.response?.status === 401) {
                console.error('Gagal update FCM: Sesi login berakhir');
            } else {
                console.error('Failed to update FCM Token:', error);
            }
        }
    };

    const login = async (credentials: any) => {
        try {
            // 1. Mengirim data (email/password) ke Laravel
            const response = await api.post('/auth/login', credentials);

            // 2. Cek apakah Laravel memberikan lampu hijau (success: true)
            if (response.data.success) {

                // 3. Menyimpan data ke State (Pinia/Vuex) agar aplikasi tahu user sudah masuk
                token.value = response.data.token;
                user.value = response.data.data;

                // 4. Menyimpan Token ke memori HP (LocalStorage)
                // Tujuannya: Agar saat aplikasi ditutup dan dibuka lagi, user tidak perlu login ulang.
                localStorage.setItem('auth_token', token.value);

                // 5. Sinkronisasi Push Notification
                // Ini sangat krusial! Kita memberi tahu Laravel: 
                // "User A sekarang memakai HP dengan Token FCM ini, tolong kirim notif ke sini."
                await updateFcmToken();

                return response.data;
            }
        } catch (error) {
            // Jika password salah atau server mati, lempar error ke UI untuk ditampilkan
            throw error;
        }
        return false;
    };

    const register = async (userData: any) => {
        try {
            const response = await api.post('/auth/register', userData);
            if (response.data.success) {
                token.value = response.data.token;
                user.value = response.data.data;

                localStorage.setItem('auth_token', token.value);

                // Update FCM Token after registration if exists
                await updateFcmToken();

                return true;
            }
        } catch (error) {
            throw error;
        }
        return false;
    };

    const fetchUser = async () => {
        if (!token.value) return;
        try {
            const response = await api.get('/auth/me');
            user.value = response.data.data;
        } catch (error) {
            logout();
        }
    };

    const logout = async () => {
        try {
            if (token.value) await api.post('/auth/logout');
        } catch (e) {
            // Ignore error on logout
        } finally {
            token.value = '';
            user.value = null;
            localStorage.removeItem('auth_token');
            router.push('/login');
        }
    };

    return { user, token, fcmToken, isAuthenticated, login, register, logout, fetchUser, updateFcmToken };
});