<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SearchBar from './components/SearchBar.vue';
</script>

<template>
  <SearchBar />
  

  <RouterView />

  <footer>
        <p style="margin-bottom:8px;">
            <a href="/mentions-legales">Mentions légales</a>
            |
            <a href="/donnees-personnelles">Politique des données personnelles</a>
            |
            <a id="gerer_cookie_footer" href="#">Gérer mes cookies</a>
            |
            <a href="/contact">Contact</a>
            |
            <a href="/faq">F.A.Q</a>
        </p>
        <p>Miliboo ~2023</p>
</footer>

</template>

<style scoped>
 footer{
        border-top: 1px solid rgba(0, 0, 0, 0.589);
        margin-top: 5vh;
        padding-top: 1rem;
        padding-bottom: 5px;
        margin-bottom: 0 ;
        margin-top: auto;
        width: 100%;
        text-align: center;
        background-color: grey;
        height: 7rem;
        position: absolute;
    }

</style>
