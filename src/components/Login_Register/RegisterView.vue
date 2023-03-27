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
                <div class="pt-4">
                    <div class=" inline-block">
                        <input class="border-solid border-2 border-gray-700/10 min-w-full rounded-xl text-lg p-1" id="News" type="checkbox" name="News" value required>
                        <label>S'abonner à la newsletter</label>
                    </div>
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
