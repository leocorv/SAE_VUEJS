<script>

import { useAuthStore } from '../store.js';
import { computed } from 'vue';

import LoginView from '../components/Login_Register/LoginView.vue';
import Toggle_Log_Reg from '../components/Login_Register/Toggle_Log_Reg.vue'
import RegisterView from '../components/Login_Register/RegisterView.vue'


export default {
  name: 'AccountView',
  setup() {
    const store = useAuthStore();
    const isConnected = store.isConnected;
    return {
      isConnected
    };
  },
  components: {
    LoginView,
    Toggle_Log_Reg,
    RegisterView,
  },
  data() {
    return {
      checked: false
    };
  }
}
</script>

<template>
  <div class="flex flex-col items-center mb-8 p-5 font-sans w-full h-full">
    <Toggle_Log_Reg v-model="checked" />
    <LoginView v-if="!checked"/>
    <RegisterView v-if="checked"/>
  </div>


</template>

<style>

</style>
