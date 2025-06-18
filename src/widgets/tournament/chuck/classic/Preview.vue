<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="2.9">
    <Content :players :battles-count="57" :total-avg="15304" :total-last="17209" :skin="skin ?? 'transparent'" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';


const props = defineProps<{
  isMiniPreview: boolean
  skin?: 'transparent' | 'default'
}>();

const players = computed(() => {
  return [
    { name: 'HoneyBadger', avg: 2610, last: 2864 },
    { name: '__NIDIN__', avg: 5255, last: 5053 },
    { name: 'Inspirer', avg: 4808, last: 6292 },
  ];
});

</script>


<style lang="scss" scoped></style>