<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="1">
    <Content :values="data" :showCircle="showCircle" :showCenter="isMiniPreview || showCenter"
      :skin="skin ?? 'transparent'" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed, ref } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';


const props = defineProps<{
  isMiniPreview: boolean
  showCircle?: boolean
  showCenter?: boolean
  maxHits?: number
  skin?: 'default' | 'transparent'
}>();

const values = ref([
  { r: 0.3, theta: 0.3 },
  { r: 1.1, theta: 0.75 },
  { r: 0.4, theta: -0.3 },
  { r: 0.23, theta: 3.6 },
])

setInterval(() => {
  values.value.push({ r: Math.random() * 1.2, theta: Math.random() * 2 * 3.14 })
  if (values.value.length > 10) values.value.shift()
}, 4000);

const data = computed(() => values.value.slice(-(props.maxHits ?? 0)));

</script>


<style lang="scss" scoped></style>