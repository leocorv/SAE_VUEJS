<template>
    <div class="mx-5 mt-10 mb-5">
        <hr>
        <div class="px-5 h-14 relative flex place-items-center ">
            <div class=" flex place-items-center flex-wrap place-content-around w-2/3">
                
                <CardTriProduit @toggleElementFilter="toggleElementCouleurFilter" :title="'Couleur'" :elements="couleursAAfficher"/>
                <CardTriProduit :title="'Prix'" :elements="elements" :isPrix="true" :prixMin="prixMinFilter" :prixMax="prixMaxFilter"/>
                <CardTriProduit :title="'Matière'" :elements="elements"/>
                <CardTriProduit class="absolute right-5" :title="title4" :elements="elements"/>
                
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

export default{
    components: {
        CardTriProduit,
    },
    data() {
          return {          
            //isClickedTri:false,
            
            //filter state
            couleursAAfficher:null,
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
            const index = this.couleurFilter.indexOf(element); //on récup l'index
            if (index > -1) { // si l'élément est trouvé
                this.couleurFilter.splice(index, 1); // on retir 1 élément à l'index voulu
            }
            else{
                this.couleurFilter.push(element)
            }
            console.log(this.couleurFilter)
        },
        getCouleursAAfficher(){
            filtresService.getCouleurs().then(response => {
                this.couleursAAfficher = response
            })
        }

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
    },   
    mounted() {
        this.getCouleursAAfficher()
    }
}
</script>