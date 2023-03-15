import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
export const useStore = defineStore({
  id: 'myStore',
  state: () => ({
    isConnected: false
  }),
  mutations: {
    setIsConnected(state, value) {
      state.isConnected = value;
    },
  },
});