<template>
    <div class="mx-5 mt-10 mb-5">
        <hr>
        <div class="px-5 h-auto relative flex place-items-center ">
            <div class=" flex place-items-center flex-wrap place-content-around w-2/5 py-5">
                <!-- filtres -->
                <CardTriProduit @toggleElementFilter="toggleElementCouleurFilter" :title="'Couleur'" :elements="couleursAAfficher"/>
                <CardTriProduitPrix  :listePrix="prix" :title="'Prix'" @setPrix="setPrix"/>
                <!-- btn valider -->
                <button @click="validerFiltres()" class=" bg-gray-200 border border-gray-500 px-2 py-1 hover:bg-gray-500 hover:border-gray-800 active:bg-gray-800 transition-all">Appliquer</button>
                <!-- btn suppr -->
                <button @click="supprFiltres()" class=" bg-red-100 border border-red-300 px-2 py-1 hover:bg-red-200 hover:border-red-500 active:bg-red-400 transition-all">Supprimer</button>
                <!-- tri -->
                <CardTriProduit class="absolute right-5" :title="'Trier par '" :elements="['a','b']"/>
                
            </div>
        </div>
       
        <hr>
    </div>
</template>


<script setup>
import {filtresService } from "../../../_services"
</script>
<script>
import CardTriProduit from './CardTriProduit.vue'
import CardTriProduitPrix from './CardTriProduitPrix.vue'

export default{
    components: {
        CardTriProduit,
        CardTriProduitPrix,
    },
    data() {
          return {
            //filter state
            couleursAAfficher:[],
            couleurFilter: [],
            prix:{'mini':null,'maxi':null},
            //tri
            ordreTri:null,
          }
    },
    methods: {
        supprFiltres(){//reset filtres
            this.couleursAAfficher.forEach((clr,index)=>{
                this.couleursAAfficher[index].isActive=false
            })
            this.couleurFilter=[]
            this.prix={'mini':null,'maxi':null}
            this.ordreTri=null
            this.validerFiltres()
        },
        validerFiltres(){ //valide filtres appliqués
            this.couleurFilter.sort(function(a,b){
                return a.idCouleur - b.idCouleur
            })
            this.$emit('setFiltres',this.couleurFilter,this.prix.mini,this.prix.maxi) //emit
        },
        setPrix(prix){ //set le prix mini
            this.prixMinFilter = prix
        },
        // setPrixMaxi(prix){ //set le prix maxi
        //     this.prixMaxFilter = prix
        // },
        toggleElementCouleurFilter(element){ //set/unset element from couleur
            const index = this.couleurFilter.indexOf(element); //on récup l'index
            const indexAffichage = this.couleursAAfficher.indexOf(element) //pour persistance
            if (index > -1) { // si l'élément est trouvé
                this.couleurFilter.splice(index, 1); // on retir 1 élément à l'index voulu
                this.couleursAAfficher[indexAffichage].isActive=false //persistance

            } else{
                this.couleurFilter.push(element)
                this.couleursAAfficher[indexAffichage].isActive=true //persistance
            }
        },
        getCouleursAAfficher(){ //get les couleurs à afficher dans le filtre couleurs 
            filtresService.getCouleurs().then(response => {
                response.forEach((clr,index) => {
                        this.couleursAAfficher.push(clr)
                        this.couleursAAfficher[index].isActive=false
                    })
            })
        }

    },   
    mounted() {
        this.getCouleursAAfficher()
    }
}
</script>