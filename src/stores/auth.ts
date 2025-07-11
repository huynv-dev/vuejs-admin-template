import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User, LoginCredentials, RegisterData } from '@/types/models';
import { authApi } from '@/services/api';
import { useStorage } from '@/composables/useStorage';

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null);
  const token = useStorage<string | null>('auth_token', null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const isAuthenticated = computed(() => !!token.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  async function login(credentials: LoginCredentials) {
    try {
      loading.value = true;
      error.value = null;
      const response = await authApi.login(credentials);
      user.value = response.user;
      token.value = response.token;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Login failed';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function register(data: RegisterData) {
    try {
      loading.value = true;
      error.value = null;
      const response = await authApi.register(data);
      user.value = response.user;
      token.value = response.token;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Registration failed';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    user.value = null;
    token.value = null;
  }

  return {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout
  };
}); 