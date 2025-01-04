<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="2.78">
    <WidgetCard>
      <TitledCounter :title="data.title ? (reverse ? 'ОСТАЛОСЬ ФРАГОВ' : 'ФРАГОВ') : false"
        :value="data.startFrom ?? 0" />
    </WidgetCard>
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import TitledCounter from '../TitledCounter.vue';
import WidgetCard from '@/components/WidgetCard.vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';

const props = defineProps<{
  isMiniPreview: boolean
  title?: boolean
  reverse?: boolean
  startFrom?: number
}>();

const data = computed(() => props.isMiniPreview ? { title: true, startFrom: 1863 } : props);

</script>


<style lang="scss" scoped></style>