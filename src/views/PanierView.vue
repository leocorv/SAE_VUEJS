<script>
import { panierService } from "../_services"
export default {
    data() {
        return{
            //panier
            panier:'loading',
            prixTotal:0,
            idClient:null,
        }
    },
    methods: {
        //get panier
        getPanier(){
          panierService.getProduitsPanier(this.idClient).then(response => {
            this.panier = response
            if(this.panier!=null)
            {
              this.panier.forEach((ligne,index)=>{
                this.panier[index].prixReadonly=true
                this.panier[index].quantiteTemp=this.panier[index].quantite
              })
              this.calculePrixTotal()
            }
          })
        },
        calculePrixTotal(){
          this.prixTotal=0
          this.panier.forEach((ligne)=>{
            this.prixTotal+= (parseFloat(ligne.variantesLignePanierNavigation.promo*ligne.variantesLignePanierNavigation.prix).toFixed(1))*ligne.quantite
          })
        },
        //suppr
        deleteLigne(idLigne,index){
          panierService.deleteProduitFromPanier(idLigne).then(response => {
            this.panier.splice(index,1)
            this.calculePrixTotal()
          })
        },
        //edit
        toggleReadonly(indexLigne){
          if (this.panier[indexLigne].prixReadonly)
            this.panier[indexLigne].prixReadonly=false
          else
            this.panier[indexLigne].prixReadonly=true
            this.panier[indexLigne].quantiteTemp = this.panier[indexLigne].quantite
        },
        validerEditLign(indexLigne){
          this.panier[indexLigne].quantite = this.panier[indexLigne].quantiteTemp
          this.toggleReadonly(indexLigne)
          this.calculePrixTotal()
          //save in database todo
          panierService.editProduitFromPanier(this.panier[indexLigne].ligneId,this.idClient,this.panier[indexLigne].varianteId,this.panier[indexLigne].quantite)
            .then(response => {
              console.log(response)
              //204 if succed
              
            })
        },
        validerPanier(){
          this.$router.push('/infosPaiement')
        },
    },   
    mounted() {
        // this.idClient=panierService.getUserConnectedFromLocalStorage()
        this.idClient=2;
        if (this.idClient!=null)
        {
          this.getPanier()
        }
    }
}


</script> 

<template>
  <div v-if="panier!=null">
    {{ }}
  </div>
  <div class="h-auto mt-5 mb-5 flex flex-col place-self-center justify-center ">
    <h2 class="text-5xl mb-24 mt-10">Mon panier</h2>
    <!-- loading / vide -->
    <div v-if="this.panier == 'loading'" class=" h-56 flex flex-col place-items-center justify-center">
        <p class="text-2xl flex flex-col place-items-center justify-center gap-5">Chargement ...</p>
    </div>
    <div v-else-if="this.panier==null || this.panier.length==0" class=" h-56 flex flex-col place-items-center justify-center mt-5">
            <p class="text-3xl flex flex-col place-items-center justify-center gap-5">Votre panier est vide</p>
            <div class=" text-lg flex flex-row gap-2 mt-10 place-items-center justify-center ">
              <p>Allez voir la</p>
              <a class="underline text-purple-900 font-semibold hover:cursor-pointer hover:font-bold" href="/"> boutique</a>
            </div>
        </div>
    <!-- affichage -->
    <div v-else class="flex flex-col h-full px-10 gap-14 place-items-center text-lg ">
      <div v-for="ligne,index in this.panier" class="flex flex-row place-items-center ">
        <div  class="px-5 flex w-2/3Screen gap-10 h-auto border border-gray-600 py-5 rounded place-items-center justify-center ">
          <!-- photo -->
          <div class="flex flex-row border border-gray-300 p-2 h-40 w-auto">
            <img :src="ligne.variantesLignePanierNavigation.photosVarianteNavigation[0].chemin" alt="">
          </div>
          <!-- libelle -->
          <div class="flex flex-row gap-2  ">
            <p class="font-semibold">{{ligne.variantesLignePanierNavigation.produitVarianteNavigation.libelle}}</p>
          </div>
          <!-- couleur -->
          <div class="flex flex-row gap-1 place-items-center p-2 border border-gray-400 bg-gray-100">
            <p class="">Couleur</p>
            <p>:</p>
            <div class="  flex flex-row gap-1 place-items-center">
                  {{ ligne.variantesLignePanierNavigation.couleurVarianteNavigation.libelle }}
                  <div :style="{'background-color':(ligne.variantesLignePanierNavigation.couleurVarianteNavigation.codeHexa)}" class="rounded-full w-4 h-4 border border-gray-800"></div>
              </div>
          </div>
          <!-- prix -->
          <div class="flex flex-row gap-2  ">
            <p class="">Prix</p>
            <p>:</p>
            <p class="font-semibold">{{ parseFloat(ligne.variantesLignePanierNavigation.promo*ligne.variantesLignePanierNavigation.prix).toFixed(1) }}€</p>
          </div>
          <!-- quantite -->
          <div v-if="ligne.prixReadonly" class="flex flex-row gap-2 place-items-center ">
            <p class="">Quantité</p>
            <p>:</p>
            <input type="number" v-model="ligne.quantite" readonly :max="ligne.variantesLignePanierNavigation.stock" min="1"
              class="border-2 px-1 rounded bg-gray-200 border-gray-400 w-16 font-semibold">
          </div>
          <div v-else class="flex flex-row gap-2 place-items-center">
            <p class="">Quantité</p>
            <p>:</p>
            <input type="number" v-model="ligne.quantiteTemp" :max="ligne.variantesLignePanierNavigation.stock" min="1"
              v-on:focusout="$event=> {
                //si on écrit manuellement une valeur>stock
                if(ligne.quantiteTemp>ligne.variantesLignePanierNavigation.stock)
                {
                  ligne.quantiteTemp=ligne.variantesLignePanierNavigation.stock
                }
                else if (ligne.quantiteTemp<=0){
                  ligne.quantiteTemp=1
                }
              }"
              class="border-4 px-1 rounded border-blue-700 bg-blue-300 w-16 font-semibold scale-110">
          </div>
        </div>
          <div v-if="ligne.prixReadonly" class="flex flex-col gap-4">
            <!-- edit -->
            <div class="ml-5">
              <button @click="toggleReadonly(index)" 
                class="w-32 transition-all text-base rounded px-2 py-1 border-2 border-blue-500 bg-blue-200 hover:cursor-pointer hover:bg-blue-300 hover:border-blue-800">
                <p>Modifier la quantité</p>
              </button>
            </div>
            <!-- suppr -->
            <div class="ml-5">
                <button @click="deleteLigne(ligne.ligneId,index)"
                  class="w-32 transition-all text-base rounded px-2 py-1 border-2 border-red-500 bg-red-200 hover:cursor-pointer hover:bg-red-300 hover:border-red-800">
                  <p>Supprimer</p>
                </button>
            </div>
          </div>
          <div v-else class="flex flex-col gap-4">
            <!-- edit -->
            <div class="ml-5">
              <button @click="validerEditLign(index)" 
                class="w-32 transition-all text-base rounded px-2 py-1 border-2 border-green-500 bg-green-200 hover:cursor-pointer hover:bg-green-300 hover:border-green-800">
                <p>Valider les changements</p>
              </button>
            </div>
            <!-- annuler -->
            <div class="ml-5">
              <button @click="toggleReadonly(index)"
                class="w-32 transition-all text-base rounded px-2 py-1 border-2 border-orange-500 bg-orange-200 hover:cursor-pointer hover:bg-orange-300 hover:border-orange-800">
                <p>Annuler les changements</p>
              </button>
            </div>
        </div>
      </div>
      <div class="flex w-2/3Screen flex-col gap-20 mb-24 mt-10">
        <!-- total -->
        <div class="flex flex-row place-items-center text-4xl gap-2 justify-end">
          <p>Total :</p>
          <p class="font-semibold">{{ prixTotal }} €</p>
        </div>
        <!-- paiement -->
        <div class="flex flex-row place-items-center text-3xl justify-end">
          <button @click="validerPanier()" class="transition-all  hover:scale-105 rounded px-2 py-1 border-2 border-yellow-500 bg-yellow-200 hover:cursor-pointer hover:bg-yellow-300 hover:border-yellow-800">
            Procéder au paiement
          </button>
        </div>
      </div>
    </div>
  </div>

</template>


