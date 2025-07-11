<template>
  <div class="mini-card">
    <FallbackImg :src="`${STATIC_URL}/vehicles/small/${tag.replace(':', '-')}.png`" class="img"
      :fallback="`${STATIC_URL}/vehicles/small/noImage.png`" />
    <img class="checkmark" :src="Checkmark" alt="">
    <p class="name wg-font nowrap">{{ name }}</p>
  </div>
</template>


<script setup lang="ts">
import FallbackImg from '@/components/shared/FallbackImg.vue';

import Checkmark from '../assets/icons/checkmark.png'
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
  align-items: center;
  overflow: hidden;
  position: relative;

  .img {
    margin-right: -4em;
    margin-left: 0em;
    height: 1.9em;
  }

  .checkmark {
    position: absolute;
    top: 0.8em;
    left: 0.2em;
    height: 1.2em;
    width: 1.2em;
  }
}
</style>