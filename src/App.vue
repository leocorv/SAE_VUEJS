<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SearchBar from './components/SearchBar.vue';
import FooterView from './components/FooterView.vue';
</script>

<template>
    <SearchBar />
  

    <RouterView />

    <FooterView />

</template>

<style scoped>  
</style>
