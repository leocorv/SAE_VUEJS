<template>
    <div class="container">
        
        <div class="left">
        <img src="/src/assets/miliboo_logo.png" alt="Logo Logements" >
        </div>
        <div class="img_nav">
          <img class="image"  src="/src/assets/logo_user.png">
          <div class="text">Compte</div>
        </div>
        <div class="img_nav">
          <img class="image"  src="/src/assets/boutique.png">
          <div class="text">Boutique</div>
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

.container{
    display: flex;
    justify-content:space-between;
    padding-top: 1rem;
    margin-right: 1rem;
}

.left{
    text-align: left;
    align-items: left;
    padding-left: 1rem;
}

.left img{
    width: 20vw;
}

.img_nav {
  display: flexbox;
  position: relative;
  width: 3vw;
  height: auto;
  text-align: center; 
}

.image {
  position:relative;
  top: 1.5rem;
  width: 3vw;
  height: auto;
  text-align: center;
}

.text {
  position:absolute;
  bottom:0;
  left: 0;
  width: auto;
  text-align: left;
  opacity: 0;
  font-weight: bolder;
  transition: all 0.25s ease-in-out;
}

.img_nav:hover .text {
  bottom:0;
  opacity: 1;
  transform: translateY(5vh);
}

.search-container {
  display: flex;
  align-items: center;
  background-color: #f1f1f1;
  border-radius: 20px;
  margin: 10px;
  padding-right: 1rem;
  padding-left: 1rem;
  width: 25%;
  height: 5rem;
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