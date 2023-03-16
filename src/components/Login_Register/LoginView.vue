<template>       
<div id="connexion" class="text-center flex flex-col items-center mb-8">
    <h1 class="text-5xl font-semibold mb-8">Connexion</h1>
    <div class="block justify-around text-center w-full max-w-md">
      <div class="px-10 py-4 m-4 text-center items-center border-gray-500/10 border-2 border-solid rounded-3xl shadow-lg">
            <!-- <h2 class="text-3xl font-semibold">Par adresse mail</h2> -->
            <form method="post" action="#">
                <div class="pt-2">
                    <label>E-mail</label>
                    <div>
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="email" type="email" name="email" value required autocomplete="email" autofocus>
                    </div>
                </div>
                <div class="pt-4">
                    <label>Mot de passe</label>
                    <div>
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="password" type="password" name="password" value required autocomplete="current-password">
                    </div>
                </div>
                <div>
                    <button class=" rounded-full btn2 mt-6 px-10 py-4 relative border border-gray-500 uppercase font-bold tracking-wider leading-none overflow-hidden text-gray-900" type="submit" @submit.prevent="login">
                      <span class=" absolute inset-0 bg-gray-200 "></span>
                      <span class=" rounded-full absolute inset-0 flex justify-center items-center font-bold"> 
                        Connexion
                      </span>
                      Connexion
                  </button>
                </div>
            </form>
            <hr class="mt-5 border-gray-400 ">
            <div class="mt-5">
              <span class="label">Se connecter avec : </span>
              <br>
              <div class="mt-2 customBtn customGPlusSignIn inline-block bg-blue-600 text-gray-700 w-48 rounded-md border-solid border-gray-400 shadow-lg whitespace-nowrap transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-30">
                <span class="icon"></span>
                <span class="text-xl">|</span>
                <span class="buttonText">Google</span>
              </div>
            </div>
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
.btn2 span:first-child{
  transform: translateX(-101%);
  transition: transform .3s ease-in
}
.btn2:hover span{
  transform: translateX(0)
}

.customBtn {
  border: thin solid #888;
  box-shadow: 1px 1px 1px grey;
}
.customBtn:hover {
  cursor: pointer;
}
span.label {
  font-family: serif;
  font-weight: normal;
}
span.icon {
  background: url('../../assets/google-logo.png') transparent 5px 50% no-repeat;
  display: inline-block;
  vertical-align: middle;
  border-radius: 24px;
  width: 42px;
  height: 42px;
}
span.buttonText {
  display: inline-block;
  vertical-align: middle;
  padding-left: 42px;
  padding-right: 42px;
  font-size: 14px;
  font-weight: bold;
  /* Use the Roboto font that is loaded in the <head> */
  font-family: 'Roboto', sans-serif;
  user-select: none;
  color:aliceblue;
}

</style>
