<script>
import LoginView from '../components/Login_Register/LoginView.vue';
import Toggle_Log_Reg from '../components/Login_Register/Toggle_Log_Reg.vue'
import RegisterView from '../components/Login_Register/RegisterView.vue'
import Information_Account from '../components/account/Account_information.vue'

export default {
  components: {
    LoginView,
    Toggle_Log_Reg,
    RegisterView,
    Information_Account  
  },
  data() {
    return {
      logged: true,
      checked: false
    };
  }
}
</script>

<template>
  <div class="text-center flex flex-col items-center mb-8 p-5 font-sans w-full h-full" v-if="logged === false" >
    <Toggle_Log_Reg />
    <LoginView v-if="checked === false"/>
    <RegisterView v-if="checked === true"/>
  </div>
  <div>
    <Information_Account />
  </div>

</template>

<style>
h2{
    text-align: center;
}
</style>
