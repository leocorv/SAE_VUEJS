<script setup>
//components
import NavTriProduit from '../components/Produits/Tri/NavTriProduit.vue'
import CardProduit from '../components/Produits/CardProduit.vue';
import NavPage from '../components/Produits/NavigationBetweenPages.vue';

import { produitsService } from "../_services"

//properties
const props = defineProps({
    //id categorie
    idCategorie: {required: true}
})


</script>
<script>
export default {
  data() {
    return {
        //produits
        produits:null,
        //pages
        nbPagesProduits:null,
        pageActuelleProduit:1,
        //tri/filtre
        couleurFilter: [],
        prixMinFilter:null,
        prixMaxFilter:null,
        ordreTri:null,
    };
  },
  methods: {
    //récupère le nombre de pages
    getNbPages() {
      produitsService.getNbPages(this.idCategorie).then(response => {
        this.nbPagesProduits = response
      })
    },
    //récupère tt les produits à afficher
    getPdt() {
      produitsService.getProduits(this.idCategorie,this.pageActuelleProduit).then(response => {
        this.produits = response
      })
    },
    //change de page
    changePageProduit(page) {
      this.produits=null //on vire tt les produits      
      this.pageActuelleProduit = page //on change la page actuelle
      this.getPdt()//on met à jour la liste de produits
    }
  },
  mounted() {
    this.getNbPages() //get nb pages
    this.getPdt() //get produits
  },

}
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
<div class="mt-20">
    <NavPage  @changePageProduit="changePageProduit" :pageActuelle="pageActuelleProduit" :nbPages="nbPagesProduits"/>
</div>

</template>

<style>

</style>
