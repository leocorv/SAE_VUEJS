import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    isConnected: false
  }),
  actions: {
    setIsConnected(value) {
      this.isConnected = value;
    },
  },
});