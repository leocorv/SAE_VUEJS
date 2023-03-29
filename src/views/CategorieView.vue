<script setup>
//components
import NavTriProduit from '../components/Produits/Tri/NavTriProduit.vue'
import CardProduit from '../components/Produits/CardProduit.vue';
import NavPage from '../components/Produits/NavigationBetweenPages.vue';

import { produitsCategorieStore } from "../stores/produitsCategorie.js"

//liste de produits
const produits = produitsCategorieStore().list

const props = defineProps({
    //id categorie
    idCategorie: {required: true}
})

//pageactuelle
const pageActuelleProduit = 1
//nb pages
const nbPagesProduit = 1

</script>


<template>
<div>
    <div class="flex text-5xl justify-center font w-full pb-10">
        <h2>Nos produits</h2>   
    </div>
    
    <!-- mon component de tri -->
    <div>
        <NavTriProduit/>
    </div>

    <!-- mes cards de produits -->
    <!-- il lui faut la liste des produits à afficher (! cette liste change dynamiquement, quand on change de page par exemple)-->
    <!-- la disposition et l'affichage sont gérés par cette vue -->
    <div v-if="produits!=null && produits.length!=0">
        <CardProduit :produits="produits"/>
    </div>
    <!-- si on a un probleme d'api -->
    <div v-else
        class="flex flex-col place-items-center justify-center h-48 gap-5">
        <p class="text-3xl">Chargement en cours ...</p>
    </div>
    
    
</div>
<!-- La vue qui permet de changer les pages -->
<!-- la méthode utilisée prend en paramètre la nouvelle page -->
<!-- il faut lui donner la page actuelle et le nombre de page à afficher -->
<!-- J'ARRIVE PAS A METTRE MON FOOTER EN BAS PLZ HELP (oui c une div mais c un peu un footer) -->
<div class="mt-20">
    <NavPage  @changePageProduit="changePageProduit" :pageActuelle="pageActuelleProduit" :nbPages="nbPagesProduit"/>
</div>

</template>

<style>

</style>
