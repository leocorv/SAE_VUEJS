<template>
    <div class="text-center flex flex-col items-center mb-8 p-5 font-sans w-full h-full">
        <div class="flex flex-grow">
            <span class="text-3xl font-medium text-gray-900 dark:text-gray-600 mr-3 mb-2">Se connecter</span>
            <div>
                <label class="relative inline-flex items-center mr-5 cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer">
                    <div style="width: 4.5rem;" class="h-9 bg-red-600 rounded-full peer dark:bg-red-400 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-gray-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-8 after:w-8 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
                </label>
            </div>
            <span class=" pb-11 text-3xl font-medium text-gray-900 dark:text-gray-600">S'enregistrer</span>
        </div>  
        <div class="text-center flex flex-col items-center mb-8">
            <h1 class="text-5xl font-semibold">Connexion</h1>
            <div class="inline-block justify-around text-center">
                <div class="p-3 m-4 text-center items-center border-gray-500/10 border-2 border-solid rounded-3xl shadow-lg min-w-full w-80">
                    <h2 class="text-3xl font-semibold">Par adresse mail</h2>
                    <form method="post" action="#">
                        <div class="pt-4">
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
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
</script>


<style>
h2{
    text-align: center;
}
</style>
