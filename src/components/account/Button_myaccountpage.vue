<template>
    <div>
        <button class=" rounded-full btn2 mt-2 px-10 py-4 relative border border-gray-500 uppercase font-bold tracking-wider leading-none overflow-hidden text-gray-900" type="button" @click="deconnexion">
            <span class=" absolute inset-0 bg-red-200 ">
            </span>
            <span class=" rounded-full absolute inset-0 flex justify-center items-center font-bold" id="btn_deconnexion"> 
            Deconnexion
            </span>
            Deconnexion
        </button>
    </div>
</template>
  
<script>
import { accountService } from '@/_services';
import router from '../../router/index.js'


export default {
  methods: {
    deconnexion() {
    //   console.log("deco");
      accountService.logout();
      router.push('/');
      location.reload();
    }
  }
}
</script>