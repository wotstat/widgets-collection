<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="aspect">
    <Content :slots="slots ?? []" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { IconType } from '@/components/efficiencyIcon/utils';


const props = defineProps<{
  isMiniPreview: boolean
  slots?: IconType[]
}>();

const aspect = computed(() => {
  switch (props.slots?.length) {
    case 0: return 2.11
    case 1: return 2
    case 2: return 2.64
    case 3: return 3.11
    case 4: return 3.51
    case 5: return 4.18
    default: return 2.11
  }
})
</script>


<style lang="scss" scoped></style>