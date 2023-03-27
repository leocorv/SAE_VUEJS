import { defineStore } from 'pinia';
import { accountService } from '@/_services';

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: null,
    isConnected: accountService.isLogged() || false
  }),
  mutations: {
    setIsConnected(state, isConnected) {
      state.isConnected = isConnected;
    }
  },
  actions: {
    startMonitoringConnection() {
      setInterval(() => {
        // console.log("isConnected :");
        // console.log(this.isConnected);
        // console.log("accountService.isLogged :");
        // console.log(accountService.isLogged());
        if(this.isConnected != accountService.isLogged()) {
          this.isConnected = accountService.isLogged();
        }
        
        // console.log("------------------------")
      }, 1000);
    }
  },
  onInit() {
    this.startMonitoringConnection();
  }
});