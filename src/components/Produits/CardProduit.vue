<template>
    <div class="flex flex-row gap-1 text-xl ml-10 mt-10">
        <p class="font-bold">  {{produits.length}}</p>produits
    </div>

    <!-- div contenant tt les cars -->    
    <div class="flex flex-wrap mt-10 mx-20 place-content-around">
        <div v-if="this.produits==null || this.produits==[] || this.produits.length==0 ">
            <p class=" text-2xl h-28 items-center flex">Cette page est vide ...</p>
        </div>
        <!-- on boucle sur le nombre de produit pour tous les affichers -->
        <div v-else v-for="bien in this.produits" :key="this.produits.idProduit" class=" duration-75 mx-4 my-4 ease-in md:ease-in hover:outline hover:outline-violet-600 hover:outline-4 h-96 w-80 bg-base-100 shadow-xl rounded-xl bg-gray-200" >
            <div  class="h-48 rounded-t-xl">
                <img v-if="bien.photos!=null"
                    :src="bien.photos[0]" alt="imagePresentation">
                <img v-else src="" alt="imagePresentation">
            </div>

            <div class=" block card-body px-3 relative">
                <!-- libelle -->
                <h2 class="text-indigo-900 text-xl font-semibold pb-4">{{bien.libelle}}</h2>
                <!-- afficher prix -->
                <p class="text-sm">afficher prix todo </p>
                <!-- afficher avis -->
                <p class="text-sm">afficher avis todo</p>
                <!-- afficher couleurs disponibles -->
                <p class="text-sm">afficher couleurs todo</p>

                <!-- quantité ? on laisse ou on vire ? -->
                <p class="text-sm">Quantité dispo : {{bien.pdt_stock}}</p>

                <!-- boutons pour aller au détail / payer -->
                <div class="grid bottom-0 ">
                    <router-link :to="'/description/'+bien.idProduit">
                        <button  class="btn-outline px-1 absolute bottom-3 right-3 border-2 text-violet-600 border-violet-600 transition-all hover:bg-violet-600 font-semibold hover:text-white rounded text-base w-25 h-10">
                            Plus d'infos
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        props: ["produits"]
    }
</script>

<style scoped >
</style>
