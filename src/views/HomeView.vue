<script>
export default {
    data() {
        return{
            //toutes les cat
            categories:null,
            //toutes les cat parents
            categoriePar:[],
            

        }
    },
    components  : {
    },
    methods: {

    },   
    mounted() {
        //on load le produit
        fetch('https://localhost:7140/api/Categorie/GetAllCategories')
            .then(response => response.json())
            .then((data) => {    
                this.categories = data;

                //si on a bien un résultat
                if (this.categories!=null)
                {
                  //on range les categories parent
                  this.categories.forEach((cat) => {
                    if (cat.categorieParentid==null)
                    {
                      this.categoriePar.push(cat)
                    }
                  })
                }
            })
            .catch((e)=> {
                console.log("erreur"+e)
            })
        

    }
}


</script>

<template>
  <div class="flex flex-wrap  py-5 px-5">
    <div v-for="categorie in categoriePar"
      class="md:ease-in ">
      
      <div class="px-4 py-2  border border-white transition-all hover:border-gray-600 w-full h-full hover:cursor-pointer">
        <router-link :to="{name: 'categorie', params:{idCategorie: categorie.categorieid}}">
          <button>
            {{ categorie.libelle }}
          </button>
        </router-link>
  
      </div>
  
    </div>
  </div>
</template>

<style>
h2{
    text-align: center;
}
</style>
