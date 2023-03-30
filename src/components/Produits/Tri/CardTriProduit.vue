<template>
    <div :id="'div_tri'+title" class="flex flex-col font-semibold w-36 h-full hover:cursor-pointer hover:underline-offset-4 hover:underline transition-all">
        <div @mousedown=" this.toggleClickedTri()"
            class="flex flex-row relative w-full h-full p-3 place-items-center ">
            <p>{{ title }} :</p>
            <p  :id="'fleche_tri'+title" class="absolute right-5 bottom-3 text-xl transition-all">^</p>
        </div>
        <div v-if="!isPrix" class="z-50">
            <div v-if="this.isClickedTri" class="p-1 border-2 absolute top-14 w-36 bg-gray-100 border-gray-600 text-black ">                   
                <label v-for="element in this.elements"
                    class="relative inline-flex items-center cursor-pointer w-full">
                    <input @click="$event => this.toggleElementSelected(element)"
                        type="checkbox" value="" class="sr-only peer">
                    <div class="w-8 h-4 bg-gray-300 rounded-full peer peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border peer-checked:after:border-gray-500  after:content-[''] after:absolute after:top-0.5 after:left-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-violet-600"></div>
                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 checked:text-4xl">
                        {{ element.libelle }}
                    </span>
                </label>
            </div>     
        </div>
        <div v-else>
            <div v-if="this.isClickedTri" class="px-3 py-2 gap-2 flex flex-col border-2 absolute top-14 w-40 bg-gray-100 border-gray-600 text-black ">                   
                
                <div>
                    <label for="prixMin">Minimum :</label>
                    <input id="prixMin" type="number" value="" class="w-full">
                </div>
                <div>
                    <label for="prixMax">Maximum :</label>
                    <input id="prixMax" type="number" value="" class="w-full">
                </div>
                <div class="border-blue-500 border-2 p-1">
                    <input @click="$event => this.toggleElementSelected(element)"
                        type="button" value="Valider" class="hover:cursor-pointer">
                </div>

            </div>
        </div>

    </div>
</template>

<script>
export default {
    props:[
        "title",
        "elements",
        "prixMin",
        "prixMax",
        "isPrix",
    ],
    data() {
      return {
        isClickedTri:false,
      }
    },
    methods: {
        toggleElementSelected(element){
            console.log("emit from card")
            this.$emit('toggleElementFilter',element)
        },
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
    },   
    mounted() {
    }
}

</script>