<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="1.19">
    <Content :target-tank="'ARMT'" :section1="4" :section2="16" :section3="20" :perfect="12" :accent="color" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { ColorScheme, styleParams } from './define.widget';


const props = defineProps<{
  isMiniPreview: boolean
  accent?: string
  colorScheme?: ColorScheme
}>();


const color = computed(() => styleParams(props.colorScheme ?? 'orange', props.accent))


</script>


<style lang="scss" scoped></style>