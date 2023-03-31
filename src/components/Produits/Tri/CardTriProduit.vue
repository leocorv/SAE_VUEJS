<template>
    <div v-click-outside-element="unfocusTri" 
    :id="'div_tri'+title" class="flex flex-col font-semibold border border-transparent hover:border-gray-300 w-auto hover:cursor-pointer transition-all">
        <div @mousedown=" this.toggleClickedTri()" 
            class="flex flex-row relative w-full h-full p-3 place-items-center ">
            <p>{{ title }} :</p>
            <p  :id="'fleche_tri'+title" class=" ml-2 text-xl transition-all">^</p>
        </div>
        <div class="z-50">
            <div v-if="this.isClickedTri" class="p-1 border-2 absolute top-18 w-36 bg-gray-100 border-gray-600 text-black ">                   
                <label v-for="element in this.elements"
                    class="relative inline-flex items-center cursor-pointer w-full">             
                    <input v-model="element.isActive" @click="$event => this.toggleElementSelected(element)"
                        type="checkbox" value="" class="sr-only peer">
                    <div class="w-8 h-4 bg-gray-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border peer-checked:after:border-gray-500  after:content-[''] after:absolute after:top-0.5 after:left-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 checked:text-4xl">
                        {{ element.libelle }}
                    </span>
                </label>
            </div>     
        </div>

    </div>
</template>

<script>
export default {
    props:[
        "title",
        "elements",
    ],
    data() {
      return {
        isClickedTri:false,
      }
    },
    methods: {
        //permet d'envoyer un element selectionné/déselectionné
        toggleElementSelected(element){
            this.$emit('toggleElementFilter',element)
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