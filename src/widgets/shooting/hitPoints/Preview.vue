<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="1">
    <Content :values="data" :showCircle :showCenter :circleBackground="isMiniPreview || circleBackground" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed, ref } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';


const props = defineProps<{
  isMiniPreview: boolean
  circleBackground?: boolean
  showCircle?: boolean
  showCenter?: boolean
  maxHits?: number
}>();

const values = ref([
  { r: 0.3, theta: 0.3 },
  { r: 0.1, theta: 1 },
  { r: 0.4, theta: -0.3 },
  { r: 0.23, theta: 3.6 },
])

setInterval(() => {
  values.value.push({ r: Math.random(), theta: Math.random() * 2 * 3.14 })
}, 4000);

const data = computed(() => values.value.slice(-(props.maxHits ?? 0)));

</script>


<style lang="scss" scoped></style>