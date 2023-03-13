<script>
import LoginView from '../components/LoginView.vue';

export default {
  components: {
    LoginView
  },
  data() {
    return {
      logged: false
    };
  }
}
</script>

<template>
  <h2>Compte</h2>
  <div v-if="logged === false">
    <LoginView />
  </div>

</template>

<style>
h2{
    text-align: center;
}
</style>
