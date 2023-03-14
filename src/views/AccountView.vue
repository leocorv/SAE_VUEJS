<script>
import LoginView from '../components/account/LoginView.vue';
import Toggle_Log_Reg from '../components/account/Toggle_Log_Reg.vue'
import RegisterView from '../components/account/RegisterView.vue'
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
      logged: true
    };
  }
}
</script>

<template>
  <!-- <h2>Compte</h2> -->
  <div class="text-center flex flex-col items-center mb-8 p-5 font-sans w-full h-full" v-if="logged === false" >
    <Toggle_Log_Reg />
    <LoginView />
    <RegisterView />
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
