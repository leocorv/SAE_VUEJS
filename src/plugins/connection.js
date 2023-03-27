import { useAuthStore } from '../store.js';

export default {
  install: (app) => {
    const authStore = useAuthStore();
    authStore.startMonitoringConnection();

    app.mixin({
      beforeUnmount() {
        clearInterval(authStore.intervalId);
      }
    });
  }
}
