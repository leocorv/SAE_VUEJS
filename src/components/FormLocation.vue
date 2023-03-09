

<script>
export default {
  props: [ "msg" ],
  data() {
    return { 
      y: Math.random()
    }
  }
}
</script>




<template>
  <p>{{ msg }} {{ y }}</p>

</template>



<style scoped>
  p {
    color: orange;
  }

</style>
