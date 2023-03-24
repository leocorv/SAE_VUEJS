import { defineStore } from 'pinia';
import axios from './axios.js';
import jwtDecode from 'jwt-decode';

const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token'),
    userDetails: localStorage.getItem('token') ? jwtDecode(localStorage.getItem('token')) : null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post('api/Login', credentials);
        if (response.data.token) {
          this.token = response.data.token;
          this.userDetails = response.data.userDetails;
          localStorage.setItem('token', this.token);
        }
      } catch (error) {
        console.error('Error during authentication:', error);
        throw error;
      }
    },
    
    logout() {
      this.token = null;
      this.userDetails = null;
      localStorage.removeItem('token');
    },
  },
  getters: {
    isAuthenticated() {
      return !!this.token;
    },
  },
});

export { useAuthStore };
