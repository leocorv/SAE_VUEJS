import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'


export const categoriesStore = defineStore('categoriePar', () => {
    
    const list = reactive([])

    axios.get('https://localhost:7140/api/Categorie/GetAllCategoriesPremierNiveau')
            .then(response => {
                response.data.forEach(cat => {
                        list.push(cat)
                    })
                })
                .catch((e)=> {
                    console.log("erreur"+e)
                })
  return { list }
})