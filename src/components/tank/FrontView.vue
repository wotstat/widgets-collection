<template>
  <div class="tank-icon-container">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="body" :style="bodyStyle" viewBox="0 0 121 93">
      <path stroke="#fff" stroke-linejoin="round" stroke-width="9"
        d="M36.231 85.582h-23.15V56.056h-2.195V37.9h99.228v18.155h-1.908v29.526H82.827V71.617H36.231v13.965ZM18.064 37.877c0-20.96 15.188-30.674 40.73-30.455 8.393.071 15.533.19 22.013 2.091m22.129 28.364c0-11.98-5.06-19.688-13.525-24.353m-8.604-4.01 1.484-2.092h7.12v6.102m-8.604-4.01c2.956.866 6.172 2.67 8.604 4.01" />
      <circle cx="60.5" cy="22.647" r="5.747" fill="#fff" />
    </svg>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
  bodyAngle: number
}>()

const bodyStyle = computed(() => {
  return {
    transform: `rotate(${-props.bodyAngle}deg)`
  }
})
</script>


<style lang="scss" scoped>
.tank-icon-container {
  width: 40%;
  height: 100%;
  position: relative;

  .body {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 75%;
  }
}
</style>