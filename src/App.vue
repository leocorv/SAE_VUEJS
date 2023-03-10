<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
import SearchBar from './components/SearchBar.vue';
</script>

<template>
  <SearchBar />
  <!-- <Nav /> -->
  <!-- <header>
    <h1 class="text-3xl font-bold underline">Miliboo</h1>  
    
  </header> -->

  <RouterView />

</template>

<style scoped>
/* h1{
  text-align: center;
  
} */

</style>
