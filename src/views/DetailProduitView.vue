<script>
export default {
    data() {
        return{
            //id du produit
            id:this.$route.params.idProduit,
            //produit
            produit:null,

            //index de la variante sélectionnée
            indexVariante:0,
            //liste des variantes du produit
            variantesProduit:null,
            //liste des photos de la variante sélectionnée
            photosVarianteSelectionnee:null,
            //liste des couleurs du produit
            couleursProduit:null,
            //liste des avis du produit
            avisProduit:null,
            //note moyenne avis
            noteMoyenneAvis:0,

            //quantité de produit sélectionnée
            quantite:1,

        }
    },
    components  : {
    },
    methods: {
        //load photo variante id x
        loadVarianteById(idVar){
            //on load les photos de la variante demandée
            fetch('https://localhost:7140/api/Photo/GetAllPhotosByVariante?varianteId='+idVar )
                    .then(response => response.json())
                    .then((data) => {    
                        this.photosVarianteSelectionnee = data;
                    })
                    .catch((e)=> {
                        console.log("erreur"+e)
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
            //fetch des photos de la nouvelle variante
            this.loadVarianteById(this.variantesProduit[this.indexVariante].idVariante)

        }

    },   
    mounted() {
        //on load le produit
        fetch('https://localhost:7140/api/Produits/GetById?id='+this.id)
            .then(response => response.json())
            .then((data) => {    
                this.produit = data;
            })
            .catch((e)=> {
                console.log("erreur"+e)
            })

        // on load les variantes
        fetch('https://localhost:7140/api/Variantes/GetAllByProduit?produitId='+this.id)
            .then(response => response.json())
            .then((data) => {    
                //les variantes
                this.variantesProduit = data;

                //on load les photos de la variante sélectionnée (de base index=0)
                this.loadVarianteById(this.variantesProduit[this.indexVariante].idVariante)         
            })
            .catch((e)=> {
                console.log("erreur"+e)
            })
            
        //on load les couleurs
        fetch('https://localhost:7140/api/Couleurs/GetCouleurOfProduit?produitId='+this.id)
            .then(response => response.json())
            .then((data) => {    
                this.couleursProduit = data;
            })
            .catch((e)=> {
                console.log("erreur"+e)
            })
            
        

        //on load tous les avis de tt les variantes du pdt
        //on load tout dès l'arrivée sur la page ou on load dynamiquement ??
        fetch('https://localhost:7140/api/Avis/GetByProduit?produitId='+this.id)
            .then(response => response.json())
            .then((data) => {    
                this.avisProduit = data;

                //on check sur le produit est pas nul (on sait jamais)
                if (this.avisProduit!=null){
                    //boucle sur chaque avis
                    this.avisProduit.forEach((avis,index) => {
                        //on incrémente le compteur de note
                        this.noteMoyenneAvis+=avis.avisNote
                        
                        //pour chaque avis, on récupère son user
                        fetch('https://localhost:7140/api/Clients/GetById?id='+avis.clientId)
                            .then(response => response.json())
                            .then((data) => {    
                                //on rajoute un champ "prenom" à chaque avis
                                this.avisProduit[index].prenom = data.prenom;
                            })
                            .catch((e)=> {
                                console.log("erreur"+e)
                            })
                    })
                    //pour la moyenne
                    this.noteMoyenneAvis=this.noteMoyenneAvis/this.avisProduit.length
                }                   
            })
            .catch((e)=> {
                console.log("erreur"+e)
            })
            

    }
}


</script>

<template>
    <div class="scroll-smooth">

        <div>
            <!-- TEST -->
            <div class=" flex place-content-center">
                <p class="text-2xl">{{ }}</p>
            </div>
    
            <div class="flex flex-row gap-20 mt-5">
                <!-- image -->
                <div class="rounded-xl border border-gray-300 w-3/5 h-96 ml-8 mt-5 flex justify-center">
                    <img v-if="photosVarianteSelectionnee!=null" class="object-contain h-full" :src="photosVarianteSelectionnee[0]" alt="photo variante">
                </div>
                <!-- DIV DESCRIPTION DETAIL -->
                <div class="p-5 rounded-2xl w-2/5 shadow-3xl mr-10">
                    <!-- titre -->
                    <div class="flex place-content-center">
                        <p v-if="produit != null" class="text-2xl">{{produit.libelle}}</p>
                    </div>
                    <!-- div detail -->
                    <div class="place-content-center mt-10 mx-4 gap-8 flex flex-col text-lg"> 
                        <!-- description -->
                        <div class="flex flex-row gap-2">
                            <p class=" font-semibold">Description : </p>
                            <p v-if="variantesProduit != null">{{variantesProduit[indexVariante].description}}</p>
                        </div>
                        <!-- hauteur pied -->
                        <div class="flex flex-row gap-2">
                            <p class=" font-semibold">Hauteur des pieds : </p>
                            <p v-if="produit != null">{{produit.hauteurPieds}} cm</p>
                        </div>
                        <!-- prix -->
                        <div v-if="variantesProduit != null && variantesProduit[indexVariante].promo==1" class="flex flex-row gap-2">
                            <p class=" font-semibold">Prix : </p>
                            <p class="font-bold">{{variantesProduit[indexVariante].prix}} €</p>
                        </div>
                        <!-- prix EN PROMO -->
                        <div v-else class="flex flex-row gap-2">
                            <p class=" font-semibold">Prix : </p>
                            <p v-if="variantesProduit != null" class="line-through text-red-700">
                                {{variantesProduit[indexVariante].prix}} €
                            </p>
                            <p v-if="variantesProduit != null" class=" text-emerald-700  font-bold">
                                {{variantesProduit[indexVariante].prix*variantesProduit[indexVariante].promo}}                             €
                            </p>
                        </div>
                        <!-- couleurs -->
                        <div class="flex flex-row gap-2">
                            <p class=" font-semibold">Couleurs disponibles : </p>
                            <div v-if="couleursProduit != null"
                                class="flex flex-row gap-2">
                                <div v-for="(couleur, index) in this.couleursProduit"
                                    @click="$event => changerVariante(index)">
                                    <div v-if="index==indexVariante" class="border border-black rounded-full w-8 h-8 flex place-content-center items-center
                                        hover:cursor-pointer"
                                        :style="{'background-color':(couleur.codeHexa)}">
                                        <p class=" text-xs"></p>
                                    </div>
                                    <div v-else class="border border-black rounded-full w-8 h-8 flex place-content-center items-center
                                        hover:cursor-pointer"
                                        :style="{'border': 'solid 1px' +(couleur.codeHexa),'background-color':(couleur.codeHexa)}">
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- avis -->
                        <div class="flex flex-row gap-2">
                            <p class=" font-semibold">Note : </p>
                            <div v-if="this.avisProduit != null" class="flex items-center">
                                <p v-if=" avisProduit.length!=0" class="ml-1  text-gray-900 dark:text-white">{{ (noteMoyenneAvis).toFixed(1) }} </p>
                                <p v-else class="ml-1 italic text-gray-900 dark:text-white text-xs"> aucune note</p>
                                <svg aria-hidden="true" class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Rating star</title><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                                <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                                <a href="#test" class="font-medium text-gray-900 underline hover:no-underline dark:text-white">{{ this.avisProduit.length }} avis</a>
                            </div>
                        </div>
                        <!-- quantité -->
                        <div class="flex flex-row gap-4">
                            <p class=" font-semibold">Quantité : </p>
                            <input v-if="variantesProduit!=null" 
                                class="border border-black w-14 h-7 px-1 text-base rounded-md"
                                v-on:focusout="$event=> {
                                    //si on écrit manuellement une valeur>stock
                                    if(quantite>variantesProduit[indexVariante].stock)
                                    {
                                        quantite=variantesProduit[indexVariante].stock
                                    }
                                    else if (quantite<=0){
                                        quantite=1
                                    }
                                }"
                                type="number" :value="quantite" :max="variantesProduit[indexVariante].stock" min="1"
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
        </div>
        <div class="mx-20 my-16 pt-4 " id="test">
            <!-- avis -->
            <div class="flex flex-col gap-2 border-2 border-black p-10" >
                <div class=" font-semibold mb-5 text-3xl gap-3 place-items-center">
                    <p class="">Avis :</p>
                    <p  v-if="avisProduit != null" class=" text-xl text-gray-800 ">({{ this.avisProduit.length }})</p>  
                    <p v-else class=" text-xl text-gray-800 ">(0)</p>
                </div>
                <div v-if="avisProduit != null" v-for="avis in this.avisProduit">
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
</template> 

