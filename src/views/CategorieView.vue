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
        //load la page n 'numpage' et la foutre dans produits[]
        loadPageProduit(numPage){
            fetch('https://localhost:7140/api/Produits/GetAllByAllFilters?page='+numPage+'&categorieId='+this.idCategorie)
                .then(response => response.json())
                .then((data) => {    
                    this.produits = data;
                    
                    //si on a bien des data retournées
                    if (this.produits!=null){
                        this.produits.forEach((produit,index) => {
                            //on rajoute à chaque pdt une liste de variantes
                            this.loadVariantesProduit(produit,index)
                        })
                    }
                })
                .catch((e)=> {
                    console.log("erreur"+e)
                })
        },
        //load les variantes de chaque produit
        loadVariantesProduit(produit,index){
            fetch('https://localhost:7140/api/Variantes/GetAllByProduit?produitId='+produit.idProduit)
                .then(response => response.json())
                .then((data) => {    
                    //on donne la liste des variantes au produit [index]
                    this.produits[index].variantes = data;

                    //on rajoute à chaque pdt une liste de photos
                    this.loadPhotoPresentationProduit(produit.variantes[0],index)
                })
                .catch((e)=> {
                    console.log("erreur"+e)
                })
        },
        //load une photo de présentation d'un produit à partir d'une de ses variantes
        loadPhotoPresentationProduit(variante,indexProduit){
            fetch('https://localhost:7140/api/Photo/GetAllPhotosByVariante?varianteId='+variante.idVariante)
                .then(response => response.json())
                .then((data) => {    
                    //on donne la liste de photos au produit [index]
                    this.produits[indexProduit].photos = data;
                })
                .catch((e)=> {
                    console.log("erreur"+e)
                })
        }

    },   
    mounted() {
        // load le nombre de pages 
        fetch('https://localhost:7140/api/Produits/GetNumberPages')
            .then(response => response.json())
            .then((data) => {    
                this.nbPagesProduit = data;
            })
            .catch((e)=> {
                console.log("erreur"+e)
            })
        // load de la page n1
        this.loadPageProduit(1)
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
