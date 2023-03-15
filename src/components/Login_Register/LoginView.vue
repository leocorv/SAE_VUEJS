<template>       
<div id="connexion" class="text-center flex flex-col items-center mb-8">
    <h1 class="text-5xl font-semibold mb-8">Connexion</h1>
    <div class="block justify-around text-center w-full max-w-md">
        <div class="p-3 m-4 text-center items-center border-gray-500/10 border-2 border-solid rounded-3xl shadow-lg">
            <h2 class="text-3xl font-semibold">Par adresse mail</h2>
            <form>
                <div class="pt-4">
                    <label>E-mail</label>
                    <div>
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="email" type="email" name="email" v-model="email" required autocomplete="email" autofocus>
                    </div>
                </div>
                <div class="pt-4">
                    <label>Mot de passe</label>
                    <div>
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="password" type="password" name="password" v-model="password" required autocomplete="current-password">
                    </div>
                </div>
                <div class="pt-4">
                    <button type="submit" @submit.prevent="login" class="rounded-full">Connexion</button>
                </div>
            </form>
        </div>
    </div>
</div>

</template>

<script>
import { useStore } from '../../store.js';
import { ref } from 'vue';

export default {
  name: 'LoginComponent',
  setup() {
    const store = useStore();
    const email = ref('');
    const password = ref('');

    function login() {
      // Call an API to validate the credentials
      api.post('/login', { email: email.value, password: password.value })
        .then(() => {
          // Set isConnected to true if the credentials are valid
          store.mutations.setIsConnected(true);
        })
        .catch((error) => {
          // Handle the error
          console.log(error);
        });
    }

    return {
      email,
      password,
      login
    };
  }
}
</script>


<style>
</style>
