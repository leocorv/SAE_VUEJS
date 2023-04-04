<script setup>
import {produitsService } from "../_services"
</script>
<script>
export default {
    data() {
        return{
            //id du produit
            id:this.$route.params.idProduit,
            //produit
            produit:'load',
            indexVariante:0,

            //note moyenne avis
            noteMoyenneAvis:0,

            //quantité de produit sélectionnée
            quantite:1,

        }
    },
    components  : {
    },
    methods: {
        //get produit
        getProduit(){
            produitsService.getProduitById(this.id).then(response => {
                this.produit = response
            })
        },
        //achat
        btnAcheterClick(){
            console.log(this.quantite)
        },
        //changer variante (déclanchée par click sur couleur)
        changerVariante(index){
            //changement index variante
            this.indexVariante=index
        },
        //retour page arrière
        retour() {
            console.log("back")
            this.$router.back()
        },

    },   
    mounted() {
        this.getProduit()
    }
}


</script>

<template>

    <div class="scroll-smooth">
        <div class=" ml-5 mt-5 text-lg border border-gray-600 rounded-xl w-16 h-10 flex justify-center text-center">
            <button @click="$event => retour()">Retour</button>
        </div>
        <div v-if="produit == 'load'" class=" h-56 flex flex-col place-items-center justify-center">
            <p class="text-2xl flex flex-col place-items-center justify-center gap-5">Chargement ...</p>
        </div>
        <div v-else-if="produit != null">
            <div class="flex flex-row gap-20 mt-5">
                <!-- image -->
                <div class="rounded-xl border border-gray-300 w-3/5 h-96 ml-8 mt-5 flex justify-center">
                    <img  class="object-contain h-full" :src="produit.variantesProduitNavigation[this.indexVariante].photosVarianteNavigation[0].chemin" alt="photo variante">
                </div>
                <!-- DIV DESCRIPTION DETAIL -->
                <div class="p-5 rounded-2xl w-2/5 shadow-3xl mr-10">
                    <!-- titre -->
                    <div class="flex place-content-center">
                        <p class="text-2xl">{{produit.libelle}}</p>
                    </div>
                    <!-- div detail -->
                    <div class="place-content-center mt-10 mx-4 gap-8 flex flex-col text-lg"> 
                        <!-- description -->
                        <div class="flex flex-row gap-2">
                            <p class=" font-semibold">Description : </p>
                            <p >{{produit.description}}</p>
                        </div>
                        <!-- hauteur pied -->
                        <div class="flex flex-row gap-2">
                            <p class=" font-semibold">Hauteur des pieds : </p>
                            <p v-if="produit != null">{{produit.hauteurPieds}} cm</p>
                        </div>
                        <!-- prix -->
                        <div v-if="produit.variantesProduitNavigation[this.indexVariante].promo==1" class="flex flex-row gap-2">
                            <p class=" font-semibold">Prix : </p>
                            <p class="font-bold">{{produit.variantesProduitNavigation[this.indexVariante].prix}} €</p>
                        </div>
                        <!-- prix EN PROMO -->
                        <div v-else class="flex flex-row gap-2">
                            <p class=" font-semibold">Prix : </p>
                            <p class="line-through text-red-700">
                                {{produit.variantesProduitNavigation[this.indexVariante].prix}} €
                            </p>
                            <p  class=" text-emerald-700  font-bold">
                                {{produit.variantesProduitNavigation[this.indexVariante].prix*produit.variantesProduitNavigation[this.indexVariante].promo}}                             €
                            </p>
                        </div>
                        <!-- couleurs -->
                        <div class="flex flex-row gap-2">
                            <div class=" flex flex-wrap gap-x-2 font-semibold h-min w-3/5">
                                <p>Couleurs </p>
                                <div class="flex flex-row gap-x-1">
                                    <p>disponibles</p>
                                    <p>:</p>
                                </div>
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <div v-for="(variante, index) in this.produit.variantesProduitNavigation"
                                    @click="$event => changerVariante(index)">
                                    <div v-if="index==indexVariante" class=" border-2 border-black rounded-full w-8 h-8 flex place-content-center items-center
                                        hover:cursor-pointer"
                                        :style="{'background-color':(variante.couleurVarianteNavigation.codeHexa)}">
                                        <p class=" text-xs"></p>
                                    </div>
                                    <div v-else class=" border border-gray-300 rounded-full w-8 h-8 flex place-content-center items-center
                                        hover:cursor-pointer"
                                        :style="{'background-color':(variante.couleurVarianteNavigation.codeHexa)}">
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- avis -->
                        <div class="flex flex-row gap-2">
                            <p class=" font-semibold">Note : </p>
                            <div class="flex items-center">
                                <p v-if=" this.produit.avis.length!=0" class="ml-1  text-gray-900 dark:text-white">{{ (produit.noteMoyenneAvis).toFixed(1) }} </p>
                                <p v-else class="ml-1 italic text-gray-900 dark:text-white text-xs"> aucune note</p>
                                <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                <a href="#avis" class="font-medium text-gray-900 underline hover:no-underline dark:text-white">{{ this.produit.avis.length }} avis</a>
                            </div>
                        </div>
                        <!-- quantité -->
                        <div class="flex flex-row gap-4">
                            <p class=" font-semibold">Quantité : </p>
                            <input class="border border-black w-14 h-7 px-1 text-base rounded-md"
                                v-on:focusout="$event=> {
                                    //si on écrit manuellement une valeur>stock
                                    if(quantite>produit.variantesProduitNavigation[this.indexVariante].stock)
                                    {
                                        quantite=produit.variantesProduitNavigation[this.indexVariante].stock
                                    }
                                    else if (quantite<=0){
                                        quantite=1
                                    }
                                }"
                                type="number" :value="quantite" :max="produit.variantesProduitNavigation[this.indexVariante].stock" min="1"
                                @input="event => quantite = event.target.value"
                                > 
                            </div>
                        <!-- btn acheter -->
                        <div class="w-full flex justify-center">
                            <button @click="$event=> btnAcheterClick()"
                                class="border-2 border-yellow-600 hover:bg-yellow-600 w-48 rounded-md transition-all mt-8 mb-10">
                                Acheter todo
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mx-20 my-16 pt-4 " id="avis">
                <!-- avis -->
                <div class="flex flex-col gap-2 border-2 border-black p-10" >
                    <div class=" font-semibold mb-5 text-3xl gap-3 place-items-center">
                        <p class="">Avis :</p>
                        <p  v-if="this.produit.avis != null" class=" text-xl text-gray-800 ">({{ produit.avis.length }})</p>  
                        <p v-else class=" text-xl text-gray-800 ">(0)</p>
                    </div>
                    <div v-for="avis in this.produit.avis">
                        <div class="border border-gray-400 mx-20"></div>
                        <div class="mx-10">
                            <div class="flex flex-row gap-2 text-sm font-semibold pb-2 pt-6 ">
                                <p class="border-b border-gray-800 ">{{avis.prenom}}</p>
                            </div>
                            <div class="flex flex-row gap-4">
                                <div class="flex items-center">
                                    <svg v-for="note in avis.avisNote" aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>First star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <svg v-for="pasNote in (5-avis.avisNote)" aria-hidden="true" class="w-5 h-5 text-gray-300 dark:text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Fifth star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                    <p class="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">{{ avis.avisNote }} sur 5</p>
                                </div>
                                <div class="flex flex-row gap-2 font-bold">
                                    <p>{{avis.avisTitre}}</p>
                                </div>
                            </div>
                            <div class="flex flex-row gap-2 text-sm text-gray-600 italic">
                                <p>Date du commentaire : </p>
                                <p>{{avis.avisDate}}</p>
                            </div>
                            <div class="flex flex-row gap-2 pt-4">
                                <p>{{avis.avisTexte}}</p>
                            </div>
                            <div class="h-5"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class=" h-56 flex flex-col place-items-center justify-center">
            <p class=" text-lg flex flex-col place-items-center justify-center gap-5 font-bold">404 not found</p>
            <p class="text-2xl flex flex-col place-items-center justify-center gap-5">Il semblerait que ce produit n'existe pas ...</p>
        </div>
    </div>
</template> 

<style scoped>
*{
    scroll-behavior: smooth;
}

</style>