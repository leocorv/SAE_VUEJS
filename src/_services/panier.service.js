import { ref, computed, reactive } from 'vue'
import axios from 'axios'
import localStorageService from './localStorage.service'

//get les produits du panier
let getProduitsPanier = (idClient) => {
    //on renvoie une promesse
    return new Promise(function(resolve){
        const produitsList = reactive([]) //liste produits
            //request string
            var requestString = "https://localhost:7140/api/LignePaniers/GetByClientId?" //base
            requestString+="idClient="+idClient //id du client
            
            //request
            axios.get(requestString)
                .then(response => {
                    response.data.forEach(pdt => {
                        produitsList.push(pdt)
                    })
                    produitsList.sort((a,b)=>(a.varianteId > b.varianteId) ? 1 : -1) //tri par variante id sinon c'est chiant
                    console.log("fetched panier")
                    resolve(produitsList)
                })
                .catch((e)=> {
                    console.log("erreur"+e)
                    resolve (null)
                })
    })  
}

//set un produit dans le panier
let setProduitInPanier = (idUser,idVariante,quantitePdt) => {
    //on renvoie une promesse
    return new Promise(function(resolve){
            //request string
            var requestString = "https://localhost:7140/api/LignePaniers/PostLignePanier" //base
            //request
            axios.post(requestString,{
                ligneId:1011, //A SUPPRIMER
                clientId: idUser,
                varianteId: idVariante,
                quantite: quantitePdt
            })
            .then(response => {
                                
                console.log("post panier")
                resolve(response)
            })
            .catch((e)=> {
                console.log("erreur"+e)
                resolve(e)
            })
    })  
}

//edit un produit dans le panier
let editProduitFromPanier = (idLigne,idUser,idVariante,quantitePdt) => {
    //on renvoie une promesse
    return new Promise(function(resolve){
        //request string
        var requestString = "https://localhost:7140/api/LignePaniers/PutLignePanier/" //base
        requestString+=""+idLigne
        //request
        axios.put(requestString,{
            ligneId:idLigne, 
            clientId: idUser,
            varianteId: idVariante,
            quantite: quantitePdt
        })
        .then(response => {
            console.log("put panier")
            resolve(response)
        })
        .catch((e)=> {
            console.log("erreur"+e)
        })
})  
}

//supprimer un produit dans le panier
let deleteProduitFromPanier = (idLigne) => {
    //on renvoie une promesse
    return new Promise(function(resolve){
        //request string
        var requestString = "https://localhost:7140/api/LignePaniers/DeleteLignePanier/" //base
        requestString+=""+idLigne //id de la ligne
        //request
        axios.delete(requestString)
            .then(response => {
                                    
                console.log("deleted panier")
                resolve(response)
            })
            .catch((e)=> {
                console.log("erreur"+e)
            })
    })  
}

//valider paiement (supprime les lignes panier et les met dans une nouvelle commande)
let validerPanier = (idClient,adresseId,isExpress,isCollect,instructions) => {
    //on renvoie une promesse
    return new Promise(function(resolve){
        //request string
        var requestString = "https://localhost:7140/api/Commandes/PostCommande" //base
        //request
        axios.post(requestString,{
            clientId:idClient, 
            adresseId: adresseId,
            express: isExpress,
            collecte: isCollect,
            instructions:instructions,
            pointsFideliteUtilises:1,
            etatId:1
        })
        .then(response => {
                                
            console.log("panier validated")
            resolve(response)
        })
        .catch((e)=> {
            console.log("erreur"+e)
        })
    })  
}


let getUserConnectedFromLocalStorage=()=>{
    const test =localStorageService.get('user')
    return test
}


export const panierService = {
    getProduitsPanier,
    deleteProduitFromPanier,
    setProduitInPanier,
    editProduitFromPanier,
    validerPanier,
    getUserConnectedFromLocalStorage,
}

