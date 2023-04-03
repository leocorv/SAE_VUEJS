<script setup>
import { panierService } from "../_services"
</script>
<script>
export default {
    data() {
        return{
            //panier
            panier:null,

        }
    },
    methods: {
        //get panier
        getPanier(){
          panierService.getProduitsPanier().then(response => {
                this.panier = response
            })
        },
    },   
    mounted() {
        this.getPanier()
    }
}


</script>

<template>
  <div v-if="this.panier!=null">
    {{ panier }}
  </div>

  <div class="h-auto mt-5 mb-5 flex flex-col place-self-center justify-center">
    <h2 class="text-6xl mb-8">Panier</h2>
    <div class="flex flex-col h-full px-10 gap-10  place-items-center text-lg">
      <div v-for="ligne in this.panier" class="px-5 flex w-2/3Screen gap-10 h-auto border border-gray-600 rounded place-items-center justify-center ">
        <div class="flex flex-row border gap-2 h-32 w-48">
          <p class="">photo</p>
        </div>
        <div class="flex flex-row gap-2  ">
          <p class="font-semibold">{{ligne.variantesLignePanierNavigation.produitVarianteNavigation.libelle}}</p>
        </div>
        <div class="flex flex-row gap-2  ">
          <p class="">Couleur</p>
          <p>:</p>
          <p class="">gris</p>
        </div>
        <div class="flex flex-row gap-2  ">
          <p class="">Prix</p>
          <p>:</p>
          <p class="font-semibold">2€</p>
        </div>
        <div class="flex flex-row gap-2 ">
          <p class="">Quantité</p>
          <p>:</p>
          <input type="number" value="2" class="border-2 rounded border-gray-400 w-14 font-semibold">
        </div>
        <div class="ml-5">
          <button class=" text-base rounded px-2 py-1 border-2 border-red-500 bg-red-200 hover:cursor-pointer hover:bg-red-300 hover:border-red-800">
            <p>Supprimer</p>
          </button>
        </div>
      </div>
    </div>
    <div class="mt-5 relative w-full h-10">
      <button class="absolute right-20 rounded px-2 py-1 border-2 border-yellow-500 bg-yellow-200 hover:cursor-pointer hover:bg-yellow-300 hover:border-yellow-800">
        Procéder au paiement
      </button>
    </div>
  </div>

</template>


