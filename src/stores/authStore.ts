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
    const token = ref<string | null>(localStorage.getItem('auth_token'))
    const fcmToken = ref<string | null>(null);
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
            await api.post('/update-fcm-token', {
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
            const response = await api.post('/login', credentials);

            // 2. Cek apakah Laravel memberikan lampu hijau (success: true)
            if (response.data.success) {

                // 3. Menyimpan data ke State (Pinia/Vuex) agar aplikasi tahu user sudah masuk
                token.value = response.data.token;
                user.value = response.data.data;

                // 4. Menyimpan Token ke memori HP (LocalStorage)
                // Tujuannya: Agar saat aplikasi ditutup dan dibuka lagi, user tidak perlu login ulang.
                localStorage.setItem('auth_token', token.value ?? '');

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
            const response = await api.post('/register', userData);
            if (response.data.success) {
                token.value = response.data.token;
                user.value = response.data.data;

                localStorage.setItem('auth_token', token.value ?? '');

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
            const response = await api.get('/me');
            user.value = response.data.data;
        } catch (error) {
            logout();
        }
    };

    const logout = async () => {
        try {
            // 1. Hapus FCM Token di Laravel (Opsional, agar user tidak dapat notif lagi)
            // Pastikan ini dilakukan saat masih memiliki akses (sebelum logout)
            await api.post('/update-fcm-token', { fcm_token: null });

            // 2. Request Logout ke Server
            await api.post('/logout');

            console.log('Server session destroyed');
        } catch (error) {
            // Jika 401, biarkan saja karena artinya di server memang sudah tidak ada session
            console.warn('Logout server failed or already unauthorized', error);
        } finally {
            // 3. APAPUN yang terjadi (sukses/error), bersihkan data di HP
            token.value = null;
            user.value = null;
            localStorage.removeItem('auth_token');
            localStorage.removeItem('last_fcm_token');

            // 4. Tendang user ke halaman Login
            router.push('/login');
        }
    };

    return { user, token, fcmToken, isAuthenticated, login, register, logout, fetchUser, updateFcmToken };
});