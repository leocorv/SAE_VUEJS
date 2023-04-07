import { ref, computed, reactive } from 'vue'
import axios from 'axios'
import localStorageService from './localStorage.service'


//get
let getCategories = () => {
    //on renvoie une promesse
    return new Promise(function(resolve){
        //NOM DE LA VAR DU LOCALSTORAGE
        const name="categories"
        //TEMPS D'EXPIRATION DES CATEGORIES
        const tpsExp = 20
        
        //on regarde si on a déjà les catégories dans le local et s'ils ne sont pas expirés
        var categories_value = localStorageService.getWithExpiry(name)
        
        //si on a un retour null
        if(categories_value == null){
            //liste qui stock les catégories
            const categorie_list = reactive([])
            //on va chercher les données
            axios.get('https://localhost:7140/api/Categorie/GetAllCategoriesPremierNiveau')
                .then(response => {
                    response.data.forEach(cat => {
                        categorie_list.push(cat)
                    })

                    //on stocke les données dans le localstorage
                    localStorageService.setWithExpiry(name,categorie_list,tpsExp)
                    resolve(categorie_list)
                })
                .catch((e)=> {
                    console.log("erreur"+e)
                })
        }else {
            resolve(categories_value)
        }
    })
    
}


export const categorieService = {
    getCategories,
}

