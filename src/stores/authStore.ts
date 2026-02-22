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
  const isAuthenticated = computed(() => !!token.value);

  const login = async (credentials: any) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.success) {
        token.value = response.data.token;
        user.value = response.data.data;

        localStorage.setItem('auth_token', token.value);
        return response.data;
      }
    } catch (error) {
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

  return { user, token, isAuthenticated, login, register, logout, fetchUser };
});