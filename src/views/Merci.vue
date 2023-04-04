<template>       
    <div class="scroll-smooth">
        <div  class=" h-96 flex flex-col place-items-center justify-center">
            <p class="text-4xl flex flex-col place-items-center justify-center gap-5">Merci pour votre achat !</p>
            <div class=" ml-5 mt-10 text-lg border border-gray-600 rounded-xl w-40 h-12 flex justify-center text-center hover:bg-gray-200 hover:scale-105">
                <button @click="$event => this.$router.push('/')">Revenir à l'accueil</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
    },
    methods: {

    },   
    mounted() {
    }
}


</script>
