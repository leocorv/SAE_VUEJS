<template>       
<div id="connexion" class="text-center flex flex-col items-center mb-8">
    <h1 class="text-5xl font-semibold mb-8">Connexion</h1>
    <div class="block justify-around text-center w-full max-w-md">
      <div class="px-10 py-4 m-4 text-center items-center border-gray-500/10 border-2 border-solid rounded-3xl shadow-lg">
            <!-- <h2 class="text-3xl font-semibold">Par adresse mail</h2> -->
            <form @submit.prevent="onSubmit">
                <div class="pt-2">
                    <label>E-mail</label>
                    <div>
                        <input ref="email" class=" peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="email" type="email" name="email" value required autocomplete="email" autofocus v-model="user.Mail" pattern="^[a-zA-Z0-9]+([._]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$" title="Doit être de ce format : mail@domaine.code">
                    </div>
                </div>
                <div class="pt-4">
                    <label>Mot de passe</label>
                    <div>
                        <input class="peer border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="password" type="password" name="password" value required autocomplete="current-password"  v-model="user.Password"  title="Doit contenir au minimum un chiffre, une minuscule, une majuscule et faire minimum 8 caractères">
                        <!-- pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" -->
                    </div>
                </div>
                <span id="error_span" class=" text-sm hidden text-red-600">Veuillez saisir correctement votre adresse mail ou votre mot de passe.</span>
                <div>
                    <button class=" rounded-full btn2 mt-6 px-10 py-4 relative border border-gray-500 uppercase font-bold tracking-wider leading-none overflow-hidden text-gray-900" type="submit" >
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
import { useAuthStore } from '../../store.js';
import { accountService } from '@/_services';
import router from '../../router/index.js'


export default {
  name: 'LoginView',
  data() {
    return {
      user: {
        Mail: '',
        Password: ''
      }
    };
  },
  methods: {
    async onSubmit() {
      try {
        const res = await accountService.login(this.user);
        // console.log(res.data.token.result);
        await accountService.saveToken(res.data.token.result);

        // console.log(useAuthStore().isConnected);
        useAuthStore().isConnected = true;
        // console.log(useAuthStore().isConnected);
        
        // console.log(router.push('/profil'))

        var emailToken = accountService.getEmailFromToken()
        // console.log(emailToken)
        await accountService.getUserByEmail(emailToken)

        await router.push('/myaccount');
        await location.reload()

      } catch (e) {
        document.getElementById('error_span').classList.remove('hidden');
        // console.log(e);
      }
    }
  }
};
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
