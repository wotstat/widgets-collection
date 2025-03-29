<template>
  <WidgetRoot autoScale autoHeight>
    <WidgetStatusWrapper>
      <Content :value="startFrom + count" :skin="skin" />
    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import WidgetRoot from '@/components/WidgetRoot.vue';
import WidgetStatusWrapper from '@/components/WidgetStatusWrapper.vue';
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { watch } from 'vue';
import { NumberDefault, oneOf, useQueryParams } from '@/composition/useQueryParams';
import { useWidgetStorage } from '@/composition/useWidgetStorage';

const { startFrom, skin } = useQueryParams({
  startFrom: NumberDefault(),
  skin: oneOf(['transparent', 'default'] as const, 'transparent'),
})

const { sdk } = useWidgetSdk();
const count = useWidgetStorage('count', startFrom)

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