<template>       
<div id="connexion" class="text-center flex flex-col items-center mb-8">
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
                <div>
                    <button type="submit" class=" rounded-full">Connexion</button>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>

</script>


<style>
</style>
