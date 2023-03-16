<template>
    <div class="flex justify-between pt-4 pb-3 border-b-2 border-yellow-900 dark:bg-gray-800 dark:border-b-0">
        <div class="text-left align-left pl-4">
          <a href="/">
            <img class="h-auto w-72 dark:rounded-md" src="/src/assets/miliboo_logo.png" alt="Logo miliboo" >
          </a>
          </div>
        <div class="search-container bg-gray-200 dark:bg-gray-500">
            <img src="/src/assets/loupe.png" alt="Loupe" @click="search()">
            <input type="text" v-model="searchTerm" placeholder="Rechercher..." @keydown.enter="search()">
        </div>
        <div class="flexbox relative w-20 img_nav">
          <a href="/account">
            <img class="block mt-4 w-14 text-center image dark:invert contrast-50"  src="/src/assets/logo_user.png">
            <div class="absolute l-0 w-auto text-left opacity-0 font-bold transition-all text dark:text-white dark:font-semibold dark:contrast-50">Compte</div>
          </a>
        </div>
        <div class="flexbox relative w-20 img_nav">
          <a href="/boutique">
            <img class="block mt-4 w-14 text-center image dark:invert contrast-50"  src="/src/assets/boutique.png">
            <div class="absolute l-0 w-auto text-left opacity-0 font-bold transition-all text dark:text-white dark:font-semibold dark:contrast-50">Boutique</div>
          </a>    
        </div>
        <div class="flexbox mr-12 relative w-20 img_nav">
          <a href="/panier">
            <img class="block mt-4 w-14 text-center image dark:invert contrast-50"  src="/src/assets/caddie.png">
            <div class="absolute ml-3 w-auto text-left opacity-0 font-bold transition-all text dark:text-white dark:font-semibold dark:contrast-50">Panier</div>
          </a>
        </div>
        <!-- <div class="flexbox relative w-20 img_nav">
          <a href="/help">
            <img class="block mt-4 w-14 text-center image dark:invert contrast-50"  src="/src/assets/help.png">
            <div class="absolute l-0 ml-3 text-center opacity-0 font-bold transition-all w-3 text dark:text-white font-semibold contrast-50">Aide</div>
          </a>
        </div> -->
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
  border-radius: 20px;
  margin: 0.7rem;
  padding-right: 1rem;
  padding-left: 1rem;
  width: 25rem;
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