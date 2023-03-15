<template>
<div class="flex flex-grow">
    <span class="text-3xl font-medium text-gray-900 dark:text-gray-600 mr-3 mb-2">Se connecter</span>
    <div>
        <label class="relative inline-flex items-center mr-5 cursor-pointer">
            <input id="toggle" type="checkbox" v-model="isChecked" value="" class="sr-only peer">
            <div style="width: 4.3rem;" class="h-9 bg-red-600 rounded-full peer dark:bg-red-400 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-gray-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-8 after:w-8 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
        </label>
    </div>
    <span class=" pb-11 text-3xl font-medium text-gray-900 dark:text-gray-600">S'enregistrer</span>
</div>  
</template>

<script>
export default {
  name: 'Toggle_Log_Reg',
  props: {
    modelValue: Boolean
  },
  emits: ['update:modelValue'],
  data() {
    return {
      isChecked: false
    };
  },
  watch: {
    isChecked(value) {
      this.$emit('update:modelValue', value);
    }
  }
}
</script>
