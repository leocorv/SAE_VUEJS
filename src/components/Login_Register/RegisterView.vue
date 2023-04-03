<template>
<div id="register" class="text-center flex flex-col items-center mb-8">
    <h1 class="text-5xl font-semibold mb-8">Inscription</h1>
    <div class="block justify-around text-center w-full max-w-md">
        <div class=" px-10 py-4 m-4 text-center items-center border-gray-500/10 border-2 border-solid rounded-3xl shadow-lg">
            <!-- <h2 class="text-3xl font-semibold">Par adresse mail</h2> -->
            <form method="post" action="#">
                <div class="pt-4">
                    <label>Nom *</label>
                    <div>
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="lname" type="text" name="lname" value required autofocus>
                    </div>
                </div>
                <div class="pt-4">
                    <label>Prénom *</label>
                    <div>
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="fname" type="text" name="fname" value required autofocus>
                    </div>
                </div>
                <!-- <div class="pt-4">
                    <label>Deuxième prénom</label>
                    <div>
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="sfname" type="text" name="sfname" value autofocus>
                    </div>
                </div> -->
                <div class="pt-4">
                    <label>E-mail *</label>
                    <div>
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="email" type="email" name="email" value required autocomplete="email" autofocus>
                    </div>
                </div>
                <div class="pt-4">
                    <label>Mot de passe *</label>
                    <div>
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="password_register" type="password" name="password" value required>
                    </div>
                </div>
                <div class="pt-4">
                    <label>Confirmer le mot de passe *</label>
                    <div>
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="password_second" type="password" name="password" value required>
                    </div>
                </div>
                <div class="pt-4 flex items-center">
                    <span>Recevoir les offres de Miliboo:</span>
                    <label class="relative inline-flex items-center cursor-pointer ml-2">
                        <input type="checkbox" class="sr-only peer"  id="newsMiliboo">
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                </div>
                <div class="pt-4 flex items-center">
                    <span>Recevoir les offres de nos partenaires:</span>
                    <label class="relative inline-flex items-center cursor-pointer ml-2">
                        <input type="checkbox" class="sr-only peer"  id="newsPartenaire">
                        <div class="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>
                </div>

                <div>
                    <button class=" rounded-full btn2 mt-6 px-10 py-4 relative border border-gray-500 uppercase font-bold tracking-wider leading-none overflow-hidden text-gray-900" type="submit" @submit.prevent="login">
                      <span class=" absolute inset-0 bg-gray-200 "></span>
                      <span class=" rounded-full absolute inset-0 flex justify-center items-center font-bold"> 
                        Créer un compte
                      </span>
                      Créer un compte
                  </button>
                </div>
            </form>
        </div>
    </div>
</div>

</template>


<script>
import { ref } from 'vue';
</script>

<style>
.btn2 span:first-child{
  transform: translateX(-101%);
  transition: transform .3s ease-in
}
.btn2:hover span{
  transform: translateX(0)
}
</style>
