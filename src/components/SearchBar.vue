<template>
    <div class="flex justify-between pt-4 mr-4 pb-2 dark:bg-gray-800">
        <div class="text-left align-left pl-4">
        <img class="h-auto w-72 dark:rounded-md" src="/src/assets/miliboo_logo.png" alt="Logo miliboo" >
        </div>
        <div class="flexbox relative w-20 img_nav">
          <img class="block mt-4 w-14 text-center image dark:invert contrast-50"  src="/src/assets/logo_user.png">
          <div class="absolute l-0 w-auto text-left opacity-0 font-bold transition-all text dark:text-white font-semibold">Compte</div>
        </div>
        <div class="flexbox relative w-20 img_nav">
          <img class="block mt-4 w-14 text-center image dark:invert contrast-50"  src="/src/assets/boutique.png">
          <div class="absolute l-0 w-auto text-left opacity-0 font-bold transition-all text dark:text-white font-semibold">Boutique</div>
        </div>
        <div class="flexbox relative w-20 img_nav">
          <img class="block mt-4 w-14 text-center image dark:invert contrast-50"  src="/src/assets/caddie.png">
          <div class="absolute ml-3 w-auto text-left opacity-0 font-bold transition-all text dark:text-white font-semibold">Panier</div>
        </div>
        <div class="flexbox relative w-20 img_nav">
          <img class="block mt-4 w-14 text-center image dark:invert contrast-50"  src="/src/assets/help.png">
          <div class="absolute l-0 ml-3 text-center opacity-0 font-bold transition-all w-3 text dark:text-white font-semibold">Aide</div>
        </div>
        <div class="search-container">
            <img src="/src/assets/loupe.png" alt="Loupe" @click="search()">
            <input type="text" v-model="searchTerm" placeholder="Rechercher..." @keydown.enter="search()">
        </div>
    </div> 
</template>
  
<script>   
  export default {
    data() {
      return {
        searchTerm: ""
      }
    },
    methods: {
      search() {
        // Code pour traiter la recherche
        console.log(this.searchTerm);
      }
    }
  }
</script>
  


<style scoped>
    *{
    margin: 0px;
    font-family: "Sora", sans-serif;
}

.left{
    text-align: left;
    align-items: left;
    padding-left: 1rem;
}

.left img{
    width: 20vw;
}

.text {
  transition: all 0.25s ease-in-out;
}

.img_nav:hover .text {
  /* bottom:0; */
  opacity: 1;
  transform: translateY(0.2rem);
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #f1f1f1;
  border-radius: 20px;
  margin: 0.7rem;
  padding-right: 1rem;
  padding-left: 1rem;
  width: 20rem;
  height: auto;
}

.search-container img {
  width: 7%;
  margin-right: 10px;
  cursor: pointer;
}

.search-container input[type="text"] {
  border: none;
  font-size: 16px;
  height: 30px;
  padding: 10px;
  width: 100%;
}

.search-container input[type="text"]::placeholder {
  color: #a1a1a1;
}

.search-container input[type="text"]:focus {
  outline: none;
}
</style> 