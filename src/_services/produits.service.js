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
                        //liste d'avis (plus simple pour la suite)
                        pdt.avis=[]
                        pdt.noteMoyenneAvis=0
                        pdt.variantesProduitNavigation.forEach((variante)=>{
                            variante.avisVarianteNavigation.forEach((avi)=>{
                                pdt.avis.push(avi)
                                pdt.noteMoyenneAvis+=avi.avisNote
                            })
                        })
                        pdt.noteMoyenneAvis = pdt.noteMoyenneAvis/pdt.avis.length
                        //prix min/max (pour l'affichage)
                        pdt.prixMinMax=""
                        var min=pdt.variantesProduitNavigation[0].prix
                        var max=pdt.variantesProduitNavigation[0].prix
                        pdt.variantesProduitNavigation.forEach((variante)=>{
                            if (variante.prix*variante.promo<min){
                                min=variante.prix*variante.promo
                            }else if(variante.prix*variante.promo>max){
                                max=variante.prix*variante.promo
                            }
                        })
                        if(min!=max){
                            pdt.prixMinMax+=min+"€ - "+max+"€"
                        }else{
                            pdt.prixMinMax+=min+"€"
                        }

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
}

//get produit de la page
let getProduitById = (idProduit) => {
    //on renvoie une promesse
    return new Promise(function(resolve){
                     
        var produit = reactive({}) //liste propduits
        //request string
        var requestString = "https://localhost:7140/api/Produits/GetById?" //base
        requestString+="id="+idProduit //id du produit        
        //request
        axios.get(requestString)
            .then(response => {
                produit = response.data

                //liste d'avis (plus simple)
                produit.avis=[]
                produit.noteMoyenneAvis=0
                produit.variantesProduitNavigation.forEach((variante)=>{
                    variante.avisVarianteNavigation.forEach((avi)=>{
                        produit.avis.push(avi)
                        produit.noteMoyenneAvis+=avi.avisNote
                    })
                })
                produit.noteMoyenneAvis = produit.noteMoyenneAvis/produit.avis.length

                console.log("fetched 1 produit")
                resolve(produit)
            })
            .catch((e)=> {
                console.log("erreur"+e)
                resolve(null)
            })

    })  
}


export const produitsService = {
    getProduits,
    getNbPages,
    getProduitById,
}

