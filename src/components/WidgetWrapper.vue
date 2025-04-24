<template>
  <WidgetRoot :autoScale :autoHeight :hangarOnly :topLevel>
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
  topLevel?: boolean,
  requiredExtensions?: string[]
  hideSlotOnWarning?: boolean
}>()
</script>


<style lang="scss" scoped></style>