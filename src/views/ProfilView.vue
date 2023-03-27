<template>
    <div class="flex flex-col items-center mb-8 p-5 font-sans w-full h-full">
      <Information_Account />
      <Button_myaccountpage />
    </div>
</template>
  
<script>
  import Information_Account from '../components/account/Account_information.vue'
  import Button_myaccountpage from '../components/account/Button_myaccountpage.vue'

  export default {
    components: {
      Information_Account,
      Button_myaccountpage  
    }
  }
</script>

  