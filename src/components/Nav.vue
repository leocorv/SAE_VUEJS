<template>
    <nav>
        <RouterLink class="nav-title hover-underline-animation" to="/">Acceuil</RouterLink>
        <RouterLink class="nav-title hover-underline-animation " to="/sell">Vendre</RouterLink> 
        <RouterLink class="nav-title hover-underline-animation " to="/search">Chercher</RouterLink> 
        <RouterLink class="nav-title hover-underline-animation " to="/location">Location</RouterLink> 
    </nav>
</template>

<style>
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
    /* text-align: left;
    align-items: left; */
    padding-left: 1rem;
}

.left img{
    width: 15rem;
}

.right{
    /* text-align:left;
    align-items: left; */
    padding-top: 3rem;
}

.nav-title,
.nav-title:hover{
    margin-right: 3rem;
    color:rgb(6, 180, 0);
    text-decoration: none;
    /* width: 5rem; */
    font-size: 25px;
}

.hover-underline-animation {
  display: inline-block;
  position: relative;
  color: #008311;
}

.hover-underline-animation::after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #008311;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.hover-underline-animation:hover::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

</style>