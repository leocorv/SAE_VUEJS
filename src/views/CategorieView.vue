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
        couleursFilterId: [],
        prixMinFilter:null,
        prixMaxFilter:null,
        ordreTri:null,
    };
  },
  methods: {
    setFiltres(couleurs,prixMin,prixMax){
      this.couleursFilter=[]
      this.couleursFilterId=[]
      if(couleurs!=null && couleurs.length!=0){
        couleurs.forEach((couleur)=>{
          this.couleursFilterId.push(couleur.idCouleur)
        })
        this.couleursFilter=couleurs
      }
      this.prixMinFilter=prixMin
      this.prixMaxFilter=prixMax
      this.pageActuelleProduit=1
      this.getPdt()
      this.getNbPages()
    },
    getNbPages() { //récupère le nombre de pages
      produitsService.getNbPages(this.idCategorie,this.couleursFilterId,this.prixMinFilter,this.prixMaxFilter).then(response => {
        if (response==0){
          response=1
        }
        this.nbPagesProduits = response
      })
    },
    getPdt() { //récupère tt les produits à afficher
      //reset
      this.produits=null //on vire tt les produits   
      produitsService.getProduits(this.idCategorie,this.pageActuelleProduit,this.couleursFilterId,this.prixMinFilter,this.prixMaxFilter).then(response => {
        this.produits = response
      })
    },
    changePageProduit(page) { //change de page
      this.pageActuelleProduit = page //on change la page actuelle
      this.getPdt()//on met à jour la liste de produits
    },
    //retour page arrière
    retour() {
        console.log("back")
        this.$router.back()
    },
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
        <h2 id="title">Nos produits</h2>   
    </div>
    
    <!-- mon component de tri -->
    <div>
        <NavTriProduit @setFiltres="setFiltres"/>
    </div>
    <div v-if="(prixMinFilter!=null && prixMinFilter!='') || (prixMaxFilter!=null && prixMaxFilter!='') || this.couleursFilter.length!=0" class="flex place-items-center flex-wrap  pb-5 mx-10 ">
        <p class="text-xl font-bold mb-2">Filtres actifs :</p>
        <div class="flex flex-wrap w-auto h-auto">
            <div v-if="prixMinFilter!=null && prixMinFilter!=''" class="border p-2 flex place-items-center gap-1 border-gray-400 bg-gray-100 m-2">Prix minimum : <p class="font-bold">{{ prixMinFilter }}€</p></div>
            <div v-if="prixMaxFilter!=null && prixMaxFilter!=''" class="border p-2 flex place-items-center gap-1 border-gray-400 bg-gray-100 m-2">Prix maximum : <p class="font-bold">{{ prixMaxFilter }}€</p></div>
            <div v-for="couleur in this.couleursFilter"  
                class="border p-2 border-gray-400 bg-gray-100 m-2 flex flex-wrap gap-1 place-items-center">
                {{ couleur.libelle }}
                <div :style="{'background-color':(couleur.codeHexa)}" class="rounded-full w-4 h-4 border border-gray-800"></div>
            </div>
        </div>
    </div>
    <!-- retour -->
    <div class=" ml-5 mt-5 text-xl border border-gray-600 rounded-xl w-20 h-12 flex justify-center text-center hover:bg-gray-300">
            <button @click="$event => retour()">Retour</button>
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
        <CardProduit :produits="produits" :idCouleursSelect="couleursFilter"/>
    </div>
    
    
</div>
<!-- La vue qui permet de changer les pages -->
<!-- la méthode utilisée prend en paramètre la nouvelle page -->
<!-- il faut lui donner la page actuelle et le nombre de page à afficher -->
<div class="mt-20">
    <NavPage  @changePageProduit="changePageProduit" :pageActuelle="pageActuelleProduit" :nbPages="nbPagesProduits"/>
</div>

</template>

