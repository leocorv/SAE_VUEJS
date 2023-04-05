<template>
    <div class="inline-flex justify-center w-full">
        <div class="mt-6 text-center items-center">
            <h1 class="text-5xl font-semibold mb-4">Mon compte</h1>
            <div class=" p-2 mb-4 border-solid border-2 border-gray-500/10 rounded-xl shadow-xl w-[100rem] max-w-[100rem]">
                <div class="flex justify-between items-center ">
                    <div id="info_account" class=" selectionner input_categorie_button select-none cursor-pointer min-h-[3rem] max-w-[20rem] rounded-xl basis-full flex-auto border-solid border-black-500 border-2 m-4 flex justify-center items-center">Informations personnelles</div> 
                    <div id="commandes" class=" input_categorie_button select-none cursor-pointer min-h-[3rem] max-w-[20rem] rounded-xl basis-full flex-auto border-solid border-black-500 border-2 m-4 flex justify-center items-center">Commandes</div> 
                    <div id="paiement" class=" input_categorie_button select-none cursor-pointer min-h-[3rem] max-w-[20rem] rounded-xl basis-full flex-auto border-solid border-black-500 border-2 m-4 flex justify-center items-center">Moyen de paiement</div>
                </div>
                <hr>
                <div id="info_account_div" class="flex justify-evenly items-start p-4">
                    <InfosView />
                    <AdresseUserView />
                    <Modification_mdpView />
                </div>
                <div id="commandes_div" class="hidden justify-between items-center">
                    <CommandesView />
                </div>
                <div id="paiement_div" class="hidden justify-between items-center">
                    <PaiementView />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import InfosView from './categories/Info_perso_div.vue'
import CommandesView from './categories/Commande_account.vue'
import PaiementView from './categories/Methodes_Paiement.vue'
import Modification_mdpView from './categories/Modif_mdp_div.vue'
import AdresseUserView from './categories/Adresse_User_div.vue'


document.addEventListener('DOMContentLoaded', function() {
    var infos = document.getElementById('info_account');
    var commandes = document.getElementById('commandes');
    var paiements = document.getElementById('paiement');

    var div_infos = document.getElementById('info_account_div');
    var div_commandes = document.getElementById('commandes_div');
    var div_paiements = document.getElementById('paiement_div');

    infos.addEventListener('click', () => {
        infos.classList.add('selectionner');
        commandes.classList.remove('selectionner');
        paiements.classList.remove('selectionner');

        div_infos.classList.remove('hidden');
        div_infos.classList.add('flex');
        div_commandes.classList.remove('flex');
        div_commandes.classList.add('hidden');
        div_paiements.classList.remove('flex');
        div_paiements.classList.add('hidden');
    });

    commandes.addEventListener('click', () => {
        commandes.classList.add('selectionner');
        infos.classList.remove('selectionner');
        paiements.classList.remove('selectionner');
        
        div_commandes.classList.remove('hidden');
        div_commandes.classList.add('flex');
        div_infos.classList.remove('flex');
        div_infos.classList.add('hidden');
        div_paiements.classList.remove('flex');
        div_paiements.classList.add('hidden');
    });

    paiements.addEventListener('click', () => {
        paiements.classList.add('selectionner');
        infos.classList.remove('selectionner');
        commandes.classList.remove('selectionner');
        
        
        div_paiements.classList.remove('hidden');
        div_paiements.classList.add('flex');
        div_infos.classList.remove('flex');
        div_infos.classList.add('hidden');
        div_commandes.classList.remove('flex');
        div_commandes.classList.add('hidden');
    });
    

  });

</script>

<style scoped>
.selectionner {
    background-color: white;
    transition: background-color 0.7s;
}

.selectionner.active {
    background-color: rgb(204, 204, 204);
}

.selectionner:not(.active) {
    background-color: rgb(204, 204, 204);
    transition: background-color 0.7s;
}
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