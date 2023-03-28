<script setup>
  import { categoriesStore } from "../stores/categories.js"

  const categoriePar = categoriesStore().list
  console.log(categoriePar)
</script>


<template>

  <!-- on verifie si on a bien un retour de l'api -->
  <div v-if="categoriePar != null && categoriePar.length != 0"
    class="flex flex-wrap  py-5 px-5">

    <!-- boucle sur les categories parents -->
    <div v-for="categorie in categoriePar"
      class="md:ease-in ">
      <!-- 1 bouton = 1 categorie  -->
      <div class="px-4 py-2  border border-white transition-all hover:border-gray-600 w-full h-full hover:cursor-pointer">
        <router-link :to="{name: 'categorie', params:{idCategorie: categorie.categorieid}}">
          <button>
            {{ categorie.libelle }}
          </button>
        </router-link>
      </div>
    </div>
  </div>

  <!-- si on a un probleme d'api -->
  <div v-else
    class="flex flex-col place-items-center justify-center h-96 gap-5">
    <p class="text-3xl">Il semblerait que nous rencontrions un problème avec les serveurs...</p>
    <p class="text-xl">Veuillez réessayer plus tard</p>
  </div>
</template>


