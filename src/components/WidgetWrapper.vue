<template>
  <WidgetRoot :autoScale :autoHeight :hangarOnly>
    <WidgetStatusWrapper :requiredExtensions :battleOnly :hideSlotOnWarning>
      <slot></slot>
    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import WidgetRoot from "@/components/WidgetRoot.vue";
import WidgetStatusWrapper from "@/components/WidgetStatusWrapper.vue";

const props = defineProps<{
  autoScale?: boolean,
  autoHeight?: boolean,
  hangarOnly?: boolean,
  battleOnly?: boolean,
  requiredExtensions?: string[]
  hideSlotOnWarning?: boolean
}>()
</script>


<style lang="scss" scoped></style>