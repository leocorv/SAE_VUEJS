import { ref, computed, reactive } from 'vue'
import axios from 'axios'
import localStorageService from './localStorage.service'

//get le nb de pages
let getNbPages = (idCategorie,couleursId,prixMin,prixMax) => {
    //on renvoie une promesse
    return new Promise(function(resolve){
        const name="nbPagesProduit"+idCategorie+"/"+couleursId+"/"+prixMin+"/"+prixMax //NOM DE LA VAR DU LOCALSTORAGE
        const tpsExp = 60 //TEMPS D'EXPIRATION 

        var nbPages_value = localStorageService.getWithExpiry(name) //on regarde si on a déjà les produits dans le local et s'ils ne sont pas expirés
        if (nbPages_value==null){ //si non on va les chercher
            var nbPages = reactive({})  //var nbpages

            //request string
            var requestString = "https://localhost:7140/api/Produits/GetNumberPagesByAllFilters?" //base
            requestString+="&categorieId="+idCategorie //categorie (obligatoire)
            if(couleursId!=null && couleursId!=[]){
                couleursId.forEach(function(couleurId){
                    requestString+="&couleurId="+couleurId
                })
            }
            if(prixMin!=null){
                requestString+="&minprix="+prixMin
            }
            if(prixMax!=null){
                requestString+="&maxprix="+prixMax
            }
            
            //request
            axios.get(requestString)
                .then(response => {
                    nbPages = response.data

                    localStorageService.setWithExpiry(name,nbPages,tpsExp) //on stocke les données dans le localstorage

                    console.log("fetched nb pages produits")
                    resolve(nbPages)
                })
                .catch((e)=> {
                    console.log("erreur"+e)
                })
        }else{
            console.log("on a pas fetch nbpage pdt")
            resolve(nbPages_value)
        }
    })
}

//get produits de la page
let getProduits = (idCategorie,numPage,couleursId,prixMin,prixMax) => {
    //on renvoie une promesse
    return new Promise(function(resolve){
        const name="produits"+idCategorie+"/"+numPage+"/"+couleursId+"/"+prixMin+"/"+prixMax //NOM DE LA VAR DU LOCALSTORAGE
        const tpsExp = 60 //TEMPS D'EXPIRATION 
                     
        var produits_value = localStorageService.getWithExpiry(name) //on regarde si on a déjà les produits dans le local et s'ils ne sont pas expirés
        if (produits_value==null){ //si non on va les chercher
            const produitsList = reactive([]) //liste propduits
            //request string
            var requestString = "https://localhost:7140/api/Produits/GetAllByAllFilters?" //base
            requestString+="page="+numPage //num page (obligatoire)
            requestString+="&categorieId="+idCategorie //categorie (obligatoire)
            if(couleursId!=null && couleursId!=[]){
                couleursId.forEach(function(couleurId){
                    requestString+="&couleurId="+couleurId
                })
            }
            if(prixMin!=null){
                requestString+="&minprix="+prixMin
            }
            if(prixMax!=null){
                requestString+="&maxprix="+prixMax
            }
            
            //request
            axios.get(requestString)
                .then(response => {
                    response.data.forEach(pdt => {
                        produitsList.push(pdt)
                    })

                    localStorageService.setWithExpiry(name,produitsList,tpsExp) //on stocke les données dans le localstorage

                    console.log("fetched produits")
                    resolve(produitsList)
                })
                .catch((e)=> {
                    console.log("erreur"+e)
                })
        }else{
            console.log("on a pas fetch pdt")
            resolve(produits_value)
        }

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
    getNbPages,
}

