<template>
  <WidgetCardWrapper auto-height auto-scale>
    <Content :value="startFrom + count" />
  </WidgetCardWrapper>
</template>


<script setup lang="ts">
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed, watch } from 'vue';
import WidgetCardWrapper from '@/components/WidgetCardWrapper.vue';
import { NumberDefault, useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';

const { startFrom, saveKey } = useQueryParams({
  startFrom: NumberDefault(),
  saveKey: String
})

const { sdk } = useWidgetSdk();
const count = useWidgetStorage(saveKey ?? '_empty', 0)

const keyP = useReactiveState(sdk.data.keyboard.KEY_P)
const keyO = useReactiveState(sdk.data.keyboard.KEY_O)
const keyLAlt = useReactiveState(sdk.data.keyboard.KEY_LALT)
const keyRAlt = useReactiveState(sdk.data.keyboard.KEY_RALT)

watch(keyP, v => {
  if (!v) return
  count.value += keyLAlt.value || keyRAlt.value ? 10 : 1
})

watch(keyO, v => {
  if (!v) return
  count.value -= keyLAlt.value || keyRAlt.value ? 10 : 1
})

</script>


<style lang="scss" scoped></style>