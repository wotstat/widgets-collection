<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="2.9">
    <Content v-bind="data" :transparentBackground="!isMiniPreview && transparentBackground"
      :showBest="isMiniPreview || showBest" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { ref } from 'vue';

const props = defineProps<{
  isMiniPreview: boolean,
  transparentBackground?: boolean,
  showBest?: boolean,
}>();

const data = ref({
  place: 156,
  avgDamage: 4358,
  battles: 3,
  resets: 1,
  places: [12734, 8994, 3125],
})


</script>


<style lang="scss" scoped></style>