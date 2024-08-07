<template>
  <div class="tank-icon-container">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" class="body" :style="bodyStyle" viewBox="0 0 219 107">
      <path stroke="#fff" stroke-linejoin="round" stroke-width="10"
        d="M5.5 100.392V6.797h207.905v26.851h-16.867l16.867 19.643-16.867 19.935h16.867v27.166H5.501Z" />
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" class="turret" :style="turretStyle" fill="none" viewBox="0 0 433 91">
      <circle cx="216.5" cy="45.798" r="5" fill="#D9D9D9" />
      <path stroke="#fff" stroke-linejoin="round" stroke-width="10"
        d="m401.191 45.423 5.829 2.178h11.259v-4.917H407.02l-5.829 2.739Zm0 0-122.67.377v-1.922l122.67 1.545ZM168.245 66.326c0 7.662 10.383 13.72 19.934 13.72h50.273c15.66 0 30.614-18.47 37.006-28.45 1.707-2.664 1.168-5.269 1.168-5.796 0-.526.539-3.131-1.168-5.796-6.392-9.981-21.346-28.453-37.006-28.453h-50.273c-9.551 0-19.934 6.058-19.934 13.721v41.054Z" />
    </svg>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
  bodyAngle: number
  turretAngle: number
}>()

const bodyStyle = computed(() => {
  return {
    transform: `rotate(${-props.bodyAngle}deg)`
  }
})

const turretStyle = computed(() => {
  return {
    transform: `rotate(${-props.turretAngle - props.bodyAngle}deg)`
  }
})
</script>


<style lang="scss" scoped>
.tank-icon-container {
  width: 50%;
  height: 100%;
  position: relative;

  .body {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 50%;
  }

  .turret {
    position: absolute;
    width: 200%;
    top: 39.5%;
    left: 0%;

  }
}
</style>