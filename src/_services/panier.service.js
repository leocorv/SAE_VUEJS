import { ref, computed, reactive } from 'vue'
import axios from 'axios'
import localStorageService from './localStorage.service'

//get user
let getUser = () => {
    return null
}

//get les produits du panier
let getProduitsPanier = () => {
    //on renvoie une promesse
    return new Promise(function(resolve){
        const produitsList = reactive([]) //liste produits
            //request string
            var requestString = "https://localhost:7140/api/LignePaniers/GetByClientId?" //base
            const clientId = 3
            requestString+="idClient="+clientId //id du client
            
            //request
            axios.get(requestString)
                .then(response => {
                    response.data.forEach(pdt => {
                        produitsList.push(pdt)
                    })
                    
                    console.log("fetched panier")
                    resolve(produitsList)
                })
                .catch((e)=> {
                    console.log("erreur"+e)
                })
    })  
}

//set un produit dans le panier
//TODO

//edit un produit dans le panier
//TODO

//supprimer un produit dans le panier
//TODO



export const panierService = {
    getProduitsPanier,
}

