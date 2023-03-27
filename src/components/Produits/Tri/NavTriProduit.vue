<template>
    <div class="mx-5 mt-10 mb-5">
        <hr>
        <div class="px-5 h-14 relative flex place-items-center ">
            <div class=" flex place-items-center flex-wrap place-content-around w-2/3">
                <!-- <div class="flex flex-row gap-10">
                    <div class="flex flex-row gap-1">
                        <p>FILTRER</p>
                        <button>enba</button>
                    </div>
                    <div class="flex flex-row gap-1">
                        <p>Matière</p>
                        <button>enba</button>
                    </div>
                    <div class="flex flex-row gap-1">
                        <p>Couleur</p>
                        <button>enba</button>
                    </div>
                    <div class="flex flex-row gap-1">
                        <p>Prix</p>
                        <button>enba</button>
                    </div>
                    
                </div> -->
                <!-- TRI -->
                <!-- <div id="div_tri" class="flex flex-col absolute right-5  font-semibold w-36 h-full hover:cursor-pointer hover:underline-offset-4 hover:underline transition-all">
                    <div @mousedown=" this.toggleClickedTri()"
                    class="flex flex-row relative w-full h-full p-3 place-items-center ">
                        <p>Trier par :</p>
                        <p  id="fleche_tri" class="absolute right-5 bottom-3 text-xl transition-all">^</p>
                    </div>
                    <div v-if="this.isClickedTri" class="p-1 border-2 absolute top-14 bg-white border-gray-600 text-black w-full">
                        
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" class="sr-only peer" checked>
                            <div class="w-8 h-4 bg-gray-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border peer-checked:after:border-gray-500  after:content-[''] after:absolute after:top-0.5 after:left-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 checked:text-4xl">
                                Checkbox 1
                            </span>
                        </label>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" class="sr-only peer" checked>
                            <div class="w-8 h-4 bg-gray-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border peer-checked:after:border-gray-500  after:content-[''] after:absolute after:top-0.5 after:left-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 checked:text-4xl">
                                Checkbox 2
                            </span>
                        </label>
                        <label class="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" value="" class="sr-only peer" checked>
                            <div class="w-8 h-4 bg-gray-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border peer-checked:after:border-gray-500  after:content-[''] after:absolute after:top-0.5 after:left-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
                            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 checked:text-4xl">
                                Checkbox 3 
                            </span>
                        </label>
                    </div>
                </div> -->
                
                <CardTriProduit @toggleElementFilter="toggleElementCouleurFilter" :title="'Couleur'" :elements="elements"/>
                <CardTriProduit :title="'Prix'" :elements="elements" :isPrix="true" :prixMin="prixMinFilter" :prixMax="prixMaxFilter"/>
                <CardTriProduit :title="'Matière'" :elements="elements"/>
                <CardTriProduit class="absolute right-5" :title="title4" :elements="elements"/>

                
            </div>

        </div>
        <hr>
    </div>
</template>
<script>
import CardTriProduit from './CardTriProduit.vue'
export default{
    components: {
        CardTriProduit,
    },
    data() {
          return {          
            //isClickedTri:false,
            
            //filter state
            couleurFilter: [],
            prixMinFilter:null,
            prixMaxFilter:null,
            matiereFilter:[],
            //tri
            ordreTri:null,


            //test
            title:"Couleur",
            title2:"Couleur2",
            title3:"Couleur3",
            title4:"Trier ",
            elements:[
                "Bleu",
                "Blanc",
                "Rouge",
            ]
          }
    },
    methods: {
        toggleElementCouleurFilter(element){
            //on récup l'index
            const index = this.couleurFilter.indexOf(element);
            if (index > -1) { // si l'élément est trouvé
                this.couleurFilter.splice(index, 1); // on retir 1 élément à l'index voulu
                // console.log("deleted")
            }
            else{
                this.couleurFilter.push(element)
                // console.log("added")
            }
            // console.log(this.couleurFilter)
        },

        // toggleClickedTri(){
        //     if(this.isClickedTri){
        //         this.isClickedTri=false
        //     }else {
        //         this.isClickedTri=true
        //     }
        //     document.getElementById("div_tri").classList.toggle("text-white")
        //     document.getElementById("div_tri").classList.toggle("bg-gray-600")
        //     document.getElementById("fleche_tri").classList.toggle("rotate-180")
        // },
    }
}
</script>