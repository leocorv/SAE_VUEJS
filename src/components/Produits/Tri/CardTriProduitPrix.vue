<template>
    <div v-click-outside-element="unfocusTri" 
    :id="'div_tri'+title" class="flex flex-col font-semibold w-auto h-full border border-transparent hover:border-gray-300 hover:cursor-pointer transition-all">
        <div @mousedown=" this.toggleClickedTri()" 
            class="flex flex-row relative w-full h-full p-3 place-items-center ">
            <p>{{ title }} :</p>
            <p  :id="'fleche_tri'+title" class="ml-2 text-xl transition-all">^</p>
        </div>
        <div class=" z-50">
            <div v-if="this.isClickedTri" class="px-3 py-2 gap-2 flex flex-col border-2 absolute top-18 w-40 bg-gray-100 border-gray-600 text-black ">                   
                <div>
                    <label for="prixMin">Minimum :</label>
                    <input v-model="prixMin" @change="sendPrixMin()"
                     id="prixMin" type="number"  class="w-full border border-gray-400 px-1">
                </div>
                <div>
                    <label for="prixMax">Maximum :</label>
                    <input v-model="prixMax" @change="sendPrixMax()"
                    id="prixMax" type="number" class="w-full border border-gray-400 px-1">
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props:[
        "title",
        "reseted",
    ],
    data() {
      return {
        isClickedTri:false,
        prixMin:'',
        prixMax:'',
      }
    },
    methods: {
        //envoix prix min
        sendPrixMin(){
            this.$emit('setPrixMin',this.prixMin)
        },
        //envoix prix max
        sendPrixMax(){
            this.$emit('setPrixMax',this.prixMax)
        },
        //affichage uniquement
        toggleClickedTri(){
            if(this.isClickedTri){
                this.isClickedTri=false
            }else {
                this.isClickedTri=true
            }
            document.getElementById("div_tri"+this.title).classList.toggle("text-white")
            document.getElementById("div_tri"+this.title).classList.toggle("bg-gray-600")
            document.getElementById("fleche_tri"+this.title).classList.toggle("rotate-180")
        },
        unfocusTri(){
            this.isClickedTri=false
            document.getElementById("div_tri"+this.title).classList.remove("text-white")
            document.getElementById("div_tri"+this.title).classList.remove("bg-gray-600")
            document.getElementById("fleche_tri"+this.title).classList.remove("rotate-180")
        }
    },
    mounted() {
    }
}

</script>