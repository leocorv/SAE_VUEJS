import { ref, computed, reactive } from 'vue'
import axios from 'axios'
import localStorageService from './localStorage.service'


//get les couleurs
let getCouleurs = () => {
    //on renvoie une promesse
    return new Promise(function(resolve){

        //NOM DE LA VAR DU LOCALSTORAGE
        const name="couleurs"
        //TEMPS D'EXPIRATION DES CATEGORIES
        const tpsExp = 20
        
        //on regarde si on a déjà les catégories dans le local et s'ils ne sont pas expirés
        var couleurs_value = localStorageService.getWithExpiry(name)
        
        const couleursList = reactive([])

        if (couleurs_value==null)
        {
            axios.get('https://localhost:7140/api/Couleurs/GetAll')
                .then(response => {
                    response.data.forEach(col => {
                        couleursList.push(col)
                    })
                    //on stocke les données dans le localstorage
                    localStorageService.setWithExpiry(name,couleursList,tpsExp)

                    resolve(couleursList)
                })
                .catch((e)=> {
                    console.log("erreur"+e)
                })
        }else {
            resolve(couleurs_value)
        }
    })
}


export const filtresService = {
    getCouleurs,
}