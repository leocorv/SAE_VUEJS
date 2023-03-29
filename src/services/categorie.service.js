import { ref, computed, reactive } from 'vue'
import axios from 'axios'

//get
let getCategories = () => {
    //on renvoie une promesse
    return new Promise(function(resolve){
        //NOM DE LA VAR DU LOCALSTORAGE
        const name="categories"
        
        //on regarde si on a déjà les catégories dans le local
        var categories_string = localStorage.getItem(name)
        
        //si on les retrouve pas on va les chercher
        if(categories_string == null){
            //liste qui stock les catégories
            const categorie_list = reactive([])
            //la requête
            axios.get('https://localhost:7140/api/Categorie/GetAllCategoriesPremierNiveau')
                .then(response => {
                    response.data.forEach(cat => {
                        categorie_list.push(cat)
                    })
                    //et on stocke cette fois dans le store
                    categories_string = JSON.stringify(categorie_list)
                    localStorage.setItem(name,categories_string)
                    console.log("on a du fetch")
                    resolve(categorie_list)
                })
                .catch((e)=> {
                    console.log("erreur"+e)
                })
        }else {
            console.log("on a pas fetch")
            resolve(JSON.parse(categories_string))
        }
    })
    
}


export const categorieService = {
    getCategories,
}


