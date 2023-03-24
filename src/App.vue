<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SearchBar from './components/SearchBar.vue';
import FooterView from './components/FooterView.vue';
import { accountService } from '@/_services';
</script>

<template>
    <SearchBar />
  

    <RouterView />

    <FooterView />

</template>

<style scoped>  
</style>
