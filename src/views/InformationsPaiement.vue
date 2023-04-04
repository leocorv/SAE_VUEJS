<template>       
    <div id="connexion" class="text-center flex flex-col items-center mb-8">
        <h1 class="text-5xl font-semibold mb-8">Informations nécessaires avant le paiement</h1>
        <div class="block justify-around text-center w-full max-w-md">
          <div class="px-10 py-4 m-4 text-center items-center border-gray-500/10 border-2 border-solid rounded-3xl shadow-lg">
                <h3 class="text-2xl mb-4 font-bold" >Entrez l'adresse de livraison :</h3>
                <div>
                    <input class="border border-gray-400 px-2 py-1 text-lg mb-4" maxlength="120"  id="input"/>

                    <div id="toWriteAddresses" class="">
                        
                    </div>
                </div>

                <hr class="mb-4" >
                <h3 class="titleAddress text-xl pb-4 font-semibold" >Informations précises:</h3>
                
                <div>
                    <label class="mt-4" for="rue">Rue* :</label>
                    <div>
                        <input class="border border-gray-400 px-2 py-1 my-2" v-model="rue"
                            maxlength="255" id="rue" type="rue" name="rue" required autocomplete="street-address" autofocus>
                    </div>
                </div>
                <div>
                    <label class="mt-4" for="ville">Ville* :</label>
                    <div>
                        <input class="border border-gray-400 px-2 py-1 my-2" v-model="ville"
                            maxlength="255" id="ville" type="ville" name="ville" required autocomplete="address_level2" autofocus>
                    </div>
                </div>
                <div>
                    <label class="mt-4" for="codePostal">Code postal* :</label>
                    <div>
                        <input class="border border-gray-400 px-2 py-1 my-2" v-model="cp"
                            maxlength="5" id="codePostal" type="text" name="codePostal" required autocomplete="postal-code" autofocus>
                    </div>
                </div>
                <div>
                    <label class="mt-4" for="pays">Pays* :</label>
                    <div>
                        <input class=" border border-gray-400 px-2 py-1 my-2" v-model="pays"
                            maxlength="255" id="pays" type="text" name="pays" autocomplete="country-name">
                    </div>
                </div>
                <div class="mt-4">
                    <label class="mt-4 text-xl font-bold" for="instructions">Instructions supplémentaires :</label>
                    <div>
                        <textarea class=" border border-gray-400 px-2 py-1 my-2 w-60 h-32" v-model="instructions"
                            maxlength="255" id="instructions" type="text" name="instructions" />
                    </div>
                </div>
                <div class="flex flex-col place-items-center justify-center">
                    <label class="mt-4 text-lg font-semibold" for="instructions">Livraison-express :</label>
                    <div>
                        <label class="relative inline-flex cursor-pointer w-full ">
                            <input type="checkbox" value="" class="sr-only peer" v-model="isLivraisonExpress">
                            <div class="border-2 border-violet-500 w-12 h-7 bg-gray-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border peer-checked:after:border-gray-500  after:content-[''] after:absolute after:top-0.5 after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 checked:text-4xl">
                            </span>
                        </label>
                    </div>
                </div>
                <div class="flex flex-col place-items-center justify-center">
                    <label class="mt-4 text-lg font-semibold" for="instructions">Livraison en point relai :</label>
                    <div>
                        <label class="relative inline-flex cursor-pointer w-full ">
                            <input type="checkbox" class="sr-only peer" v-model="isPointRelai">
                            <div class="border-2 border-violet-500 w-12 h-7 bg-gray-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border peer-checked:after:border-gray-500  after:content-[''] after:absolute after:top-0.5 after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 checked:text-4xl">
                            </span>
                        </label>
                    </div>
                </div>
                
                <div class="flex flex-col gap-4 mt-8 transition-all">
                    <button @click="back()" class=" border border-red-400 bg-red-300 rounded hover:scale-105">
                        Annuler
                    </button>

                    <button @click="valider()" class="border border-green-400 bg-green-300 rounded hover:scale-105">
                        Valider
                    </button>
                    <div v-if="this.erreur!=null">
                        <p class="text-xl text-red-600 font-bold">{{ erreur }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
import { panierService } from '../_services'



export default {
    data() {
        return {
            adresse:null,
            rue:null,
            ville:null,
            cp:null,
            pays:null,
            idclient:null,
            isLivraisonExpress:false,
            isPointRelai:false,
            instructions:null,

            //error
            erreur:null,

            //api
            searchInput:null,
            requestUrl:'https://api-adresse.data.gouv.fr/search/?q=',
        }
    },
    methods: {
        valider(){
            if(this.rue!=null&&this.cp!=null&&this.ville!=null&&this.pays!=null)
            {
                this.adresse=""
                this.adresse+=this.rue
                this.adresse+=", "+this.cp
                this.adresse+=" "+this.ville
                this.adresse+=", "+this.pays
                // console.log(this.adresse)
                // console.log(this.isLivraisonExpress)
                // console.log(this.isPointRelai)
                // console.log(this.instructions)
                panierService.validerPanier(3,this.adresse,this.isLivraisonExpress,this.isPointRelai,this.instructions).then(response=>{
                    //if good
                    console.log('end')
                    this.$router.push('/merci')
                    //else
                })
            }else{
                this.erreur="Veuillez remplir tous les champs obligatoires !"
            }

        },
        back(){
            this.$router.back()
        },
        //
        verify(){
            if (this.adresse!=null && this.adresse.length >= 4)
                return true;
            return false
        },
        //start autocomplete
        startAutocomplete(){
            this.searchInput = document.getElementById("input");
            this.searchInput.addEventListener("input",()=>{
                this.adresse = document.getElementById("input").value;
                if (this.verify())
                    this.show();
            })
        },
        //
        show(){
            fetch(this.setQuery(this.adresse))
                .then((response)=>{
                    response.json().then((datas)=>{
                        let parent = document.getElementById("toWriteAddresses");
                        parent.innerHTML = ""
                        let id=0;

                        datas.features.forEach( (data)=>{
                            id++;

                            let myDiv = document.createElement("div");
                            myDiv.classList.add("border-b-2")
                            myDiv.classList.add("border-gray-700")
                            myDiv.classList.add("py-2")
                            myDiv.classList.add("hover:bg-gray-300")
                            myDiv.classList.add("hover:cursor-pointer")
                            myDiv.classList.add("transition:all")
                            myDiv.innerHTML= data.properties.label
                            parent.appendChild(myDiv);

                            myDiv.addEventListener("click",()=>{
                                this.rue = data.properties.name;
                                this.ville =  data.properties.city;
                                this.cp =  data.properties.postcode;
                                this.pays = 'France';
                                parent.innerHTML = "";
                            })
                        });
                        
                        
            
                    })
                })
        },
        //
        setQuery(value){
            return this.requestUrl+value;
        },

    },   
    mounted() {
        this.startAutocomplete()
    }
}


</script>
