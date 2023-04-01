<script setup>
//components
import NavTriProduit from '../components/Produits/Tri/NavTriProduit.vue'
import CardProduit from '../components/Produits/CardProduit.vue';
import NavPage from '../components/Produits/NavigationBetweenPages.vue';

import { produitsService } from "../_services"

//properties
const props = defineProps({
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
        couleursFilter: [],
        prixMinFilter:null,
        prixMaxFilter:null,
        ordreTri:null,
    };
  },
  methods: {
    setFiltres(couleurs,prixMin,prixMax){
      this.couleursFilter=[]
      if(couleurs!=null && couleurs.length!=0){
        couleurs.forEach((couleur)=>{
          this.couleursFilter.push(couleur.idCouleur)
        })
      }
      this.prixMinFilter=prixMin
      this.prixMaxFilter=prixMax
      this.pageActuelleProduit=1
      console.log(this.couleursFilter)
      this.getPdt()
      this.getNbPages()
    },
    getNbPages() { //récupère le nombre de pages
      produitsService.getNbPages(this.idCategorie,this.couleursFilter,this.prixMinFilter,this.prixMaxFilter).then(response => {
        if (response==0){
          response=1
        }
        this.nbPagesProduits = response
      })
    },
    getPdt() { //récupère tt les produits à afficher
      //reset
      this.produits=null //on vire tt les produits   
      produitsService.getProduits(this.idCategorie,this.pageActuelleProduit,this.couleursFilter,this.prixMinFilter,this.prixMaxFilter).then(response => {
        this.produits = response
      })
    },
    changePageProduit(page) { //change de page
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
    <div class="flex text-5xl justify-center font w-full pb-10 mt-6">
        <h2>Nos produits</h2>   
    </div>
    
    <!-- mon component de tri -->
    <div>
        <NavTriProduit @setFiltres="setFiltres"/>
    </div>

    <!-- pdt le chargement -->
    <div v-if="produits==null "
        class="flex flex-col place-items-center justify-center h-48 gap-5">
        <p class="text-3xl">Chargement en cours ...</p>
    </div>
    <!-- si on a pas de produits  -->
    <div v-else-if="produits.length==0" class="h-56 flex flex-col place-items-center justify-center">
      <p class="text-3xl flex flex-col place-items-center justify-center gap-5">Cette page est vide ...</p>
    </div>
    <!-- sinon -->
    <div v-else>
        <CardProduit :produits="produits"/>
    </div>
    
    
</div>
<!-- La vue qui permet de changer les pages -->
<!-- la méthode utilisée prend en paramètre la nouvelle page -->
<!-- il faut lui donner la page actuelle et le nombre de page à afficher -->
<div class="mt-20">
    <NavPage  @changePageProduit="changePageProduit" :pageActuelle="pageActuelleProduit" :nbPages="nbPagesProduits"/>
</div>

</template>

