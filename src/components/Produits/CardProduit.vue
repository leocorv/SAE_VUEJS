<template>
    <div class="flex flex-row gap-1 text-xl ml-10 mt-10">
        <p class="font-bold">  {{produits.length}}</p>produits
    </div>
    <!-- div contenant tt les cars -->    
    <div class="flex flex-wrap mt-10 mx-20 place-content-around z-0">
        <!-- on boucle sur le nombre de produit pour tous les affichers -->
        <div v-for="produit in this.produits" :key="this.produits.idProduit" class=" duration-75 mx-4 my-4 pb-5 ease-in md:ease-in hover:outline hover:outline-violet-600 hover:outline-4 h-auto w-80 bg-base-100 shadow-xl rounded-xl bg-gray-200" >
            <div  class="h-48 rounded-t-xl">
                <img v-if="produit.variantesProduitNavigation.length!=0 && produit.variantesProduitNavigation[0].photosVarianteNavigation.length != 0"
                    :src="produit.variantesProduitNavigation[0].photosVarianteNavigation[0].chemin" alt="imagePresentation">
                <img v-else src="" alt="imagePresentation">
            </div>

            <div class=" flex flex-col card-body px-3 relative gap-3">
                <!-- libelle -->
                <h2 class="text-indigo-900 text-xl font-semibold pb-4">{{produit.libelle}}</h2>
                <!-- afficher prix -->
                <div class="flex flex-row gap-2">
                    <p >Prix : </p>
                    <p class="font-bold">{{ produit.prixMinMax }}</p>
                </div>
                <!-- afficher avis -->
                <div class="flex flex-row gap-2 place-items-center">
                    <p>Note moyenne : </p>
                    <div v-if=" produit.avis.length!=0" class="flex flex-row gap-1 place-items-center">
                        <p class="ml-1 font-bold text-gray-900 dark:text-white">{{ (produit.noteMoyenneAvis).toFixed(1) }}/5 </p>
                        <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                    </div>
                    <p v-else class="ml-1 italic text-gray-900 dark:text-white text-sm"> aucune note</p>
                </div>
                <!-- afficher couleurs disponibles -->
                <div class="flex flex-row gap-2 mt-3">
                    <p class=" w-1/3">Couleurs :</p>
                    <div class=" w-2/3 flex flex-wrap">
                        <div v-for="(variante, index) in produit.variantesProduitNavigation" class="border-2 border-red-500 p-1">
                            <div v-if="idCouleursSelect.includes(variante.couleurVarianteNavigation.idCouleur)"
                                class=" border-2 border-black rounded-full w-6 h-6 flex place-content-center items-center"
                                :style="{'background-color':(variante.couleurVarianteNavigation.codeHexa)}">
                            </div>
                            <div v-else class=" border-2 border-black rounded-full w-6 h-6 flex place-content-center items-center"
                                :style="{'background-color':(variante.couleurVarianteNavigation.codeHexa)}">
                                <p class=" text-xs"></p>
                            </div>
                        </div>
                    </div>
                </div>


                <!-- boutons pour aller au détail / payer -->
                <div class="mt-3">
                    <router-link :to="'/description/'+produit.idProduit">
                        <button  class="btn-outline px-1 border-2 text-violet-600 border-violet-600 transition-all hover:bg-violet-600 font-semibold hover:text-white rounded text-base w-25 h-10">
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
        props: ["produits","idCouleursSelect"]
    }
</script>

<style scoped >
</style>
