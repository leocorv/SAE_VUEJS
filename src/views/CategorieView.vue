<script>
import NavTriProduit from '../components/Produits/Tri/NavTriProduit.vue'
import CardProduit from '../components/Produits/CardProduit.vue';
import NavPage from '../components/Produits/NavigationBetweenPages.vue';

export default {
    components  : {
        NavTriProduit,
        CardProduit,
        NavPage,
    },
    data() {
      return {
        //id de la catégorie
        idCategorie:this.$route.params.idCategorie,
        //liste de pdt affichée
        produits: [],
        //pageactuelle
        pageActuelleProduit: 1,
        //nb pages
        nbPagesProduit: 1,
      }
    },
    methods: {
        changePageProduit(page) {
            this.pageActuelleProduit = page
            this.loadPageProduit(page)
        },
        loadPageProduit(numPage){
            //load la page n 'numpage' et la foutre dans produits[]
            fetch("https://localhost:7140/api/Produits/GetByAllByPage?page="+numPage)
                .then(response => response.json())
                .then((data) => {    
                    this.produits = data;
                })
        }
    },   
    mounted() {
        //il faudrait ici demander à l'api de load la page n1
        fetch('https://localhost:7140/api/Produits/GetNumberPages')
            .then(response => response.json())
            .then((data) => {    
                this.nbPagesProduit = data;
            })
            .catch((e)=> {
                console.log("erreur"+e)
            })
        // nbPagesProduit
        fetch('https://localhost:7140/api/Produits/GetAllByAllFilters?page=1&categorieId='+this.idCategorie)
            .then(response => response.json())
            .then((data) => {    
                this.produits = data;
            })
            .catch((e)=> {
                console.log("erreur"+e)
            })
    }
}
</script>

<template>

<div>
    <div class="flex text-5xl justify-center font w-full pb-10">
        <h2>Nos produits</h2>   
    </div>
    
    <!-- mon component de tri -->
    <div>
        <NavTriProduit/>
    </div>

    <!-- mes cards de produits -->
    <!-- il lui faut la liste des produits à afficher (! cette liste change dynamiquement, quand on change de page par exemple)-->
    <!-- la disposition et l'affichage sont gérés par cette vue -->
    <div>
        <CardProduit :produits="produits"/>
    </div>
    
    
</div>
<!-- La vue qui permet de changer les pages -->
<!-- la méthode utilisée prend en paramètre la nouvelle page -->
<!-- il faut lui donner la page actuelle et le nombre de page à afficher -->
<!-- J'ARRIVE PAS A METTRE MON FOOTER EN BAS PLZ HELP (oui c une div mais c un peu un footer) -->
<div class="mt-20">
    <NavPage  @changePageProduit="changePageProduit" :pageActuelle="pageActuelleProduit" :nbPages="nbPagesProduit"/>
</div>

</template>

<style>

</style>
