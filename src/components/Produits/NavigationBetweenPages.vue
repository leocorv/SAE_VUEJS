<template>
    <!-- DIV DES BOUTONS -->
    <div class="mb-5 ">

        <div class="flex flex-wrap place-content-center" >
            <!-- 1 div = 1 bouton -->
            <div v-for="nbPage in this.nbPages" >
                <!-- BOUTON ACTUEL (a colorier en x couleur)-->
                <button v-if="nbPage==this.pageActuelle"
                class="border-l-2 border-y-2 rounded px-1 border-violet-600 transition-all bg-violet-600 font-semibold text-white  w-12 h-12" >
                    <p>{{ nbPage }}</p>
                </button>

                <!-- premier bouton (on l'affiche tt le temps)-->
                <button v-else-if="nbPage == 1" @click="changePage(nbPage)"
                class=" border-l-2 border-y-2 rounded-l px-1 text-violet-600 border-violet-600 transition-all hover:bg-violet-600 font-semibold hover:text-white  w-12 h-12" >
                    <p>{{ nbPage }}</p>
                </button>

                <!-- dernier bouton (on l'affiche tt le temps) -->
                <button v-else-if="nbPage==this.nbPages" @click="changePage(nbPage)"
                class="border-r-2 rounded-r border-y-2 px-1 text-violet-600 border-violet-600 transition-all hover:bg-violet-600 font-semibold hover:text-white w-12 h-12" >
                    <p>{{ nbPage }}</p>
                </button>

                <!-- au debut ou a la fin (genre si on est p1, p2, p3)-->
                <button v-else-if="(this.pageActuelle<=3 && nbPage<=4) || (this.pageActuelle>=this.nbPages-3 && nbPage>=this.nbPages-4)" @click="changePage(nbPage)"
                    class="border-y-2 px-1 text-violet-600 border-violet-600 transition-all hover:bg-violet-600 font-semibold hover:text-white w-12 h-12" >
                    <p>{{ nbPage }}</p>
                </button>
                <!-- au debut ou a la fin suite (faux boutons)-->
                <button v-else-if="(this.pageActuelle<=3 && nbPage==5) || (this.pageActuelle>=this.nbPages-3 && nbPage==this.nbPages-5)"
                class="border-y-2 px-1 text-gray-600 border-violet-600 bg-gray-300 hover:cursor-default w-8 h-12" >
                    <p>...</p>
                </button>

                <!-- FAUX BOUTON -->
                <button v-else-if="nbPage-this.pageActuelle==-2 || nbPage-this.pageActuelle==2"
                    class="border-y-2 px-1 text-gray-600 border-violet-600 bg-gray-300 hover:cursor-default w-8 h-12" >
                    <P>...</P>
                </button>

                <!-- entre deux (genre 5 et 7 si on est sur page 6)-->
                <button v-else-if="nbPage-this.pageActuelle==-1 || nbPage-this.pageActuelle==1 " @click="changePage(nbPage)"
                class="border-y-2 px-1 text-violet-600 border-violet-600 transition-all hover:bg-violet-600 font-semibold hover:text-white w-12 h-12" >
                    <p>{{ nbPage }}</p>
                </button>

            </div>            
        </div>

    </div> 
    <!-- FIN DIV BOUTONS -->



</template>

<script>
export default {
    props: ["nbPages","pageActuelle"],
    methods: {
        changePage(page) {
            this.$emit('changePageProduit',page)
        }
    },
    mounted() {
    },   
}
</script>

<style scoped >
</style>
