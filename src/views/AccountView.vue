<script>

import { useStore } from '../store.js';

import LoginView from '../components/Login_Register/LoginView.vue';
import Toggle_Log_Reg from '../components/Login_Register/Toggle_Log_Reg.vue'
import RegisterView from '../components/Login_Register/RegisterView.vue'
import Information_Account from '../components/account/Account_information.vue'

export default {
  name: 'AccountView',
  setup() {
    const store = useStore();
    const isConnected = store.isConnected;
    return {
      isConnected
    };
  },
  components: {
    LoginView,
    Toggle_Log_Reg,
    RegisterView,
    Information_Account  
  },
  data() {
    return {
      checked: false
    };
  }
}
</script>

<template>
  <div v-if="!isConnected" class="flex flex-col items-center mb-8 p-5 font-sans w-full h-full">
    <Toggle_Log_Reg v-model="checked" />
    <LoginView v-if="!checked"/>
    <RegisterView v-if="checked"/>
  </div>
  <div v-else class="flex flex-col items-center">
    <Information_Account />
  </div>

</template>

<style>

</style>
