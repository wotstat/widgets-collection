<template>
  <div class="widgets-sdk-styles">
    <div class="autoscale" v-if="autoScale">
      <slot></slot>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script setup lang="ts">
import { WidgetMetaTags } from '@/composition/widgetSdk';
import { onMounted } from 'vue';

const props = defineProps<{
  autoScale?: boolean,
  autoHeight?: boolean
}>()

onMounted(() => {
  if (!props.autoHeight) return
  WidgetMetaTags.enableAutoHeight()
})

</script>

<style lang="scss" scoped>
.widgets-sdk-styles {
  position: relative;
}
</style>