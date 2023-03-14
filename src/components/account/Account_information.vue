<template>
    <div class="inline-flex justify-center w-full">
        <div class="mt-6 text-center items-center">
            <h1 class="text-5xl font-semibold mb-4">Mon compte</h1>
            <div class=" p-2 mb-4 border-solid border-2 border-gray-500/10 rounded-xl shadow-xl w-[100rem] max-w-[100rem]">
                <div class="flex justify-between items-center ">
                    <div id="info_account" class=" selectionner input_categorie_button select-none cursor-pointer min-h-[3rem] max-w-[20rem] rounded-xl basis-full flex-auto border-solid border-black-500 border-2 m-4 flex justify-center items-center">Informations personnelles</div> <div id="commandes" class=" input_categorie_button select-none cursor-pointer min-h-[3rem] max-w-[20rem] rounded-xl basis-full flex-auto border-solid border-black-500 border-2 m-4 flex justify-center items-center">Commandes</div> <div id="paiement" class=" input_categorie_button select-none cursor-pointer min-h-[3rem] max-w-[20rem] rounded-xl basis-full flex-auto border-solid border-black-500 border-2 m-4 flex justify-center items-center">Moyen de paiement</div>
                </div>
                <hr>
                <div class="flex justify-between items-center">
                    <InfosView v-if="document.querySelector('#info_account').classList.contains('selectionner')" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import InfosView from './Info_perso_div.vue'
</script>

<style scoped>
.input_categorie_button{
    transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
    border: 1px solid rgba(0, 0, 0, 0.137);
    box-shadow: 0px 0px 0px #000000;
}

.input_categorie_button:hover{
    transform: translateY(-1px);
    box-shadow: 0px 5px 10px #000000;
}
.input_categorie_button:active{
    transform: translateY(1px);
    box-shadow: inset 0px 5px 10px #000000;
}
</style>