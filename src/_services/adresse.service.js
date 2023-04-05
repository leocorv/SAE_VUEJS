import { ref, computed, reactive } from 'vue'
import axios from 'axios'
import localStorageService from './localStorage.service'


//get les produits du panier
let addAdresse = (rue,cp,ville,pays) => {
    //on renvoie une promesse
    return new Promise(function(resolve){
            //request string
            var requestString = "https://localhost:7140/api/Adresses/PostAdresse" //base
            
            //request
            axios.post(requestString)
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

export const adresseService = {
    addAdresse,
}

