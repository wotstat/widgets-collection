<template>
  <WidgetRoot autoScale autoHeight>
    <WidgetStatusWrapper>
      <Content :background :underLeg :leftEye :rightEye :mouth :left="leftThrottled" :right="rightThrottled" :flipX
        :flipY />
    </WidgetStatusWrapper>
  </WidgetRoot>
</template>


<script setup lang="ts">
import WidgetRoot from '@/components/WidgetRoot.vue';
import WidgetStatusWrapper from '@/components/WidgetStatusWrapper.vue';
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from '@/composition/widgetSdk';
import Content from './Content.vue';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useWidgetStorage } from '@/composition/useWidgetStorage';
import { Background, Eye, Mouth, UnderLeg } from './define.widget';
import { refThrottled, useIntervalFn } from '@vueuse/core';
import { useQueryParams } from '@/composition/useQueryParams';
import { useWidgetMainTab } from '@/composition/useWidgetMainTab';

const battleBackgrounds = ref<Set<Background>>(new Set())
const afterBattleBackgrounds = ref<Set<Background>>(new Set())

const battleUnderLeg = ref<Set<UnderLeg>>(new Set())
const afterBattleUnderLeg = ref<Set<UnderLeg>>(new Set())

const tapLeft = ref<'up' | 'down'>('up')
const tapRight = ref<'up' | 'down'>('up')

const leftBlink = ref(false)
const rightBlink = ref(false)
const isRip = ref(false)
const wow = ref(false)

const left = computed(() => {
  if (isRip.value) return 'down'
  return tapLeft.value
})

const right = computed(() => {
  if (isRip.value) return 'down'
  return tapRight.value
})

const leftThrottled = refThrottled(left, 50)
const rightThrottled = refThrottled(right, 50)

const leftEye = computed<Eye>(() => {
  if (isRip.value) return 'x'
  if (leftBlink.value) return 'close'
  return 'normal'
})

const rightEye = computed<Eye>(() => {
  if (isRip.value) return 'x'
  if (rightBlink.value) return 'close'
  return 'normal'
})

const { sdk } = useWidgetSdk();

const { flipX, flipY } = useQueryParams({
  flipX: Boolean,
  flipY: Boolean,
})

const isMain = useWidgetMainTab()

const leftTapCount = useWidgetStorage('leftTapCount', 0, { preventClearData: true })
const rightTapCount = useWidgetStorage('rightTapCount', 0, { preventClearData: true })

const background = computed(() => [
  ...battleBackgrounds.value,
  ...afterBattleBackgrounds.value]
)

const underLeg = computed(() => [
  ...battleUnderLeg.value,
  ...afterBattleUnderLeg.value
])

const mouth = computed<Mouth>(() => {
  if (isRip.value) return 'dot'
  if (wow.value) return 'o'
  return 'normal'
})

function rnd() {
  return Math.random()
}

useReactiveState(sdk.data.battle.arena, arena => {
  battleBackgrounds.value.clear()
  battleUnderLeg.value.clear()

  if (!arena?.tag) return

  afterBattleBackgrounds.value.clear()
  afterBattleUnderLeg.value.clear()

  if (arena.tag === '112_eiffel_tower_ctf') {
    battleBackgrounds.value.add('tour-eiffel')
    if (rnd() < 0.3) afterBattleUnderLeg.value.add('baguette')
  }
})

useReactiveState(sdk.data.keyboard.KEY_LEFTMOUSE, e => {
  if (e && isMain.value) leftTapCount.value += 1
  tapLeft.value = e ? 'down' : 'up'
})

useReactiveState(sdk.data.keyboard.KEY_RIGHTMOUSE, e => {
  if (e && isMain.value) rightTapCount.value += 1
  tapRight.value = e ? 'down' : 'up'
})

useReactiveTrigger(sdk.data.battle.onPlayerFeedback, (feedback) => {
  if (feedback.type == 'damage' && feedback.data.damage > 1000) {
    wow.value = true
    setTimeout(() => wow.value = false, 3000);
  }
})

const health = useReactiveState(sdk.data.battle.health)
const isInBattle = useReactiveState(sdk.data.battle.isInBattle)
const isKilled = computed(() => !isInBattle.value || health.value == undefined || health.value <= 0)
watch(isKilled, (killed) => {
  if (!killed) return
  isRip.value = true
  setTimeout(() => isRip.value = false, 5000);
})

let blinkTimer: ReturnType<typeof setTimeout> | null = null
async function blink() {
  leftBlink.value = true
  rightBlink.value = true
  await new Promise(resolve => setTimeout(resolve, 200))
  leftBlink.value = false
  rightBlink.value = false

  blinkTimer = setTimeout(blink, 15000 + ((Math.random() - 0.5) * 5000));
}

onMounted(() => {
  blink()
})

onUnmounted(() => {
  if (blinkTimer) {
    clearTimeout(blinkTimer)
    blinkTimer = null
  }
})

</script>


<style lang="scss" scoped></style>