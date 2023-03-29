import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'


export const produitsCategorieStore = defineStore('produitsCategorie', () => {
    
    const list = reactive([])

    axios.get('https://localhost:7140/api/Produits/GetAllByAllFilters?page=1&categorieId=1')
        .then(response => {
            response.data.forEach(pdt => {
                list.push(pdt)
            })
            console.log("fetched produits")
        })
        .catch((e)=> {
            console.log("erreur"+e)
        })
  return { list }
})