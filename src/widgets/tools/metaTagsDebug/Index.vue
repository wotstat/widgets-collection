<template>
  <WidgetWrapper autoScale>
    <Content v-bind="data" />
  </WidgetWrapper>
</template>


<script setup lang="ts">
import Content from './Content.vue';
import { computed, ref, watchEffect } from 'vue';
import WidgetWrapper from '@/components/WidgetWrapper.vue';
import { Props } from './define.widget';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { useReactiveTrigger, useWidgetSdk, WidgetMetaTags } from '@/composition/widgetSdk';

const selectedLine = ref(0)

const flagByIndex = [
  'autoHeight',
  'hangarOnly',
  'readyToClearData',
  'useSniperMode',
  'preferredTopLayer',
  'unlimitedSize',
  'insets',
  'relativeFont',
  'insetsPadding',
  'oscillateHeight'
] as const

const values = useWidgetStorage('settings', {
  autoHeight: true,
  hangarOnly: false,
  readyToClearData: true,
  useSniperMode: false,
  preferredTopLayer: false,
  unlimitedSize: false,
  relativeFont: true,
  insetsPadding: true,
  oscillateHeight: false,
  insets: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
})

const data = computed<Props>(() => ({
  selectedLine: selectedLine.value,
  insets: values.value.insets,
  values: {
    ...values.value,
  }
}))

const { sdk } = useWidgetSdk()

useReactiveTrigger(sdk.data.keyboard.KEY_UPARROW, (isDown) => {
  if (!isDown) return
  if (selectedLine.value < 100) return selectedLine.value = Math.max(0, selectedLine.value - 1)

  if (selectedLine.value == 700) {
    const insets = values.value.insets
    return values.value.insets = { top: insets.top + 1, right: insets.right + 1, bottom: insets.bottom + 1, left: insets.left + 1 }
  }

  if (selectedLine.value == 701) values.value.insets.top += 1
  if (selectedLine.value == 702) values.value.insets.right += 1
  if (selectedLine.value == 703) values.value.insets.bottom += 1
  if (selectedLine.value == 704) values.value.insets.left += 1
})

useReactiveTrigger(sdk.data.keyboard.KEY_DOWNARROW, (isDown) => {
  if (!isDown) return
  if (selectedLine.value < 100) return selectedLine.value = Math.min(flagByIndex.length, selectedLine.value + 1)

  if (selectedLine.value == 700) {
    const insets = values.value.insets
    return values.value.insets = { top: insets.top - 1, right: insets.right - 1, bottom: insets.bottom - 1, left: insets.left - 1 }
  }

  if (selectedLine.value == 701) values.value.insets.top -= 1
  if (selectedLine.value == 702) values.value.insets.right -= 1
  if (selectedLine.value == 703) values.value.insets.bottom -= 1
  if (selectedLine.value == 704) values.value.insets.left -= 1
})

useReactiveTrigger(sdk.data.keyboard.KEY_LEFTARROW, (isDown) => {
  if (!isDown) return
  if (selectedLine.value <= 0) return

  if (selectedLine.value >= 100) {
    if (selectedLine.value == 700) return selectedLine.value = 7
    if (selectedLine.value == 701) return selectedLine.value = 700
    if (selectedLine.value > 701) return selectedLine.value = selectedLine.value - 1
    return
  }

  const target = flagByIndex[selectedLine.value - 1]
  if (target == 'insets') {
    return
  }
  values.value[target] = false
})

useReactiveTrigger(sdk.data.keyboard.KEY_RIGHTARROW, (isDown) => {
  if (!isDown) return
  if (selectedLine.value <= 0) return

  if (selectedLine.value >= 100) {

    if (selectedLine.value >= 700) return selectedLine.value = Math.min(selectedLine.value + 1, 704)

    return
  }

  const target = flagByIndex[selectedLine.value - 1]
  if (target == 'insets') {
    return selectedLine.value = 700
  }
  values.value[target] = true
})

watchEffect(() => {
  WidgetMetaTags.setAutoHeight(values.value.autoHeight)
  WidgetMetaTags.setHangarOnly(values.value.hangarOnly)
  WidgetMetaTags.setReadyToClearData(values.value.readyToClearData)
  WidgetMetaTags.setUseSniperMode(values.value.useSniperMode)
  WidgetMetaTags.setPreferredTopLayer(values.value.preferredTopLayer)
  WidgetMetaTags.setUnlimitedSize(values.value.unlimitedSize)
  WidgetMetaTags.setInsets(values.value.insets)
})

</script>


<style lang="scss" scoped></style>