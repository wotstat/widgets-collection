<template>
  <div class="mini-card">
    <FallbackImg :src="`${STATIC_URL}/vehicles/shop/${tag.replace(':', '-')}.png`" class="img"
      :fallback="`${STATIC_URL}/vehicles/preview/noImage.png`" />
    <img class="checkmark" :src="Checkmark" alt="">
    <p class="name wg-font nowrap">{{ name }}</p>
  </div>
</template>


<script setup lang="ts">
import FallbackImg from '@/components/shared/FallbackImg.vue';

import Checkmark from '../assets/icons/checkmarkLarge.png'
import { STATIC_URL } from '@/utils/externalUrl';


const props = defineProps<{
  tag: string,
  name: string,
}>()
</script>


<style lang="scss" scoped>
.mini-card {
  padding: 0 !important;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  position: relative;

  .img {
    height: 5em;
    margin-top: -0.7em;
    margin-bottom: -0.8em;
  }

  .checkmark {
    position: absolute;
    bottom: 0;
    width: min(12em, 130%);
    transform: translateY(50%);
  }

  .name {
    position: relative;
    margin-bottom: 0.5em;
  }
}
</style>