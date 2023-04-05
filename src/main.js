import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useAuthStore } from './store.js'
import ConnectionPlugin from './plugins/connection.js';
import vueClickOutsideElement from 'vue-click-outside-element'

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.use(vueClickOutsideElement)

// Installation du plugin de surveillance de la connexion (token present ou non)
app.use(ConnectionPlugin);

// Appel de la méthode startMonitoringConnection pour surveiller la connexion (token present ou non)
const authStore = useAuthStore();
authStore.startMonitoringConnection();
app.mount('#app')
