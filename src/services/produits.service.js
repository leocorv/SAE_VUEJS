import { ref, computed, reactive } from 'vue'
import axios from 'axios'
import localStorageService from './localStorage.service'


//get
let getProduits = (idCategorie) => {
    
    // //on renvoie une promesse
    return new Promise(function(resolve){
        
        const list = reactive([])

        axios.get('https://localhost:7140/api/Produits/GetAllByAllFilters?page=1&categorieId='+idCategorie)
            .then(response => {
                response.data.forEach(pdt => {
                    list.push(pdt)
                })
                console.log("fetched produits")
                resolve(list)
            })
            .catch((e)=> {
                console.log("erreur"+e)
            })

        // console.log("on a pas fetch")
        // resolve(produits_value)
    })
    // return new Promise(function(resolve){
    //     //NOM DE LA VAR DU LOCALSTORAGE
    //     const name="produits"
    //     //TEMPS D'EXPIRATION DES CATEGORIES
    //     const tpsExp = 20
        
    //     //on regarde si on a déjà les produits dans le local et s'ils ne sont pas expirés
    //     var produits_value = localStorageService.getWithExpiry(name)
        
    //     //si on a un retour null
    //     if(produits_value == null){
    //         //liste qui stock les catégories
    //         const categorie_list = reactive([])
    //         //on va chercher les données
    //         axios.get('https://localhost:7140/api/Categorie/GetAllCategoriesPremierNiveau')
    //             .then(response => {
    //                 response.data.forEach(cat => {
    //                     categorie_list.push(cat)
    //                 })

    //                 //on stocke les données dans le localstorage
    //                 localStorageService.setWithExpiry(name,categorie_list,tpsExpCat)
                    
    //                 //debug
    //                 console.log("on a du fetch")

    //                 resolve(categorie_list)
    //             })
    //             .catch((e)=> {
    //                 console.log("erreur"+e)
    //             })
    //     }else {
    //         console.log("on a pas fetch")
    //         resolve(produits_value)
    //     }
    // })
    
}


export const produitsService = {
    getProduits,
}

