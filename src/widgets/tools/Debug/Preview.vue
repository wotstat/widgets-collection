<template>

  <WidgetPreviewRoot auto-scale :predicted-aspect-ratio="1.2">
    <WidgetCard>
      <Game v-bind="gameProps" :collapse-keys="['game', ['KEY_H', 'KEY_1'], ['KEY_H', 'KEY_1']]" />
    </WidgetCard>
    <br>
    <WidgetCard>
      <Aiming v-bind="aimingProps" :collapse-keys="['aiming', null, ['KEY_H', 'KEY_4']]" />
    </WidgetCard>
  </WidgetPreviewRoot>
</template>


<script setup lang="ts">
import WidgetCard from '@/components/WidgetCard.vue';
import WidgetPreviewRoot from '@/components/WidgetPreviewRoot.vue';
import Game from './panels/Game.vue';
import Aiming from './panels/Aiming.vue';
import { provideFakeKeyBinding } from './useToggleKeyBinding';


const props = defineProps<{
  isMiniPreview: boolean
}>();

const gameProps = {
  gameVersion: 'ru_1.28.0',
  gameRegion: 'RU',
  gameState: 'hangar',
  gameLanguage: 'ru',
  gameServer: 'ru2',
  serverTime: 123,
  ping: 123,
  fps: 60,
  isInReplay: false,
  dataProviderVersion: 3,
}

const aimingProps = {
  isAutoAim: false,
  isServerAim: true,
  clientDispersion: 0.31,
  serverDispersion: 0.39,
  idealDispersion: 0.38,
}

provideFakeKeyBinding()

</script>


<style lang="scss" scoped></style>