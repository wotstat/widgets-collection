<template>
  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="1.19">
    <Content :target-tank="'ARMT'" :section1="4" :section2="16" :section3="20" :perfect="12" :accent="color"
      :background-scheme="backgroundScheme ?? 'default'" :back-color-from="backColorFrom" :back-color-to="backColorTo"
      :headerMode="headerMode" />
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">

import { computed } from 'vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Content from './Content.vue';
import { BackgroundScheme, ColorScheme, styleParams } from './define.widget';


const props = defineProps<{
  isMiniPreview: boolean
  accent?: string
  colorScheme?: ColorScheme
  backColorFrom?: string,
  backColorTo?: string,
  backgroundScheme?: BackgroundScheme
  headerMode?: 'full' | 'compact' | 'hide'
}>();


const color = computed(() => styleParams(props.colorScheme ?? 'orange', props.accent))


</script>


<style lang="scss" scoped></style>