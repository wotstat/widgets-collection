<template>
  <div class="widgets-sdk-styles" @contextmenu.prevent="onClick">
    <div class="autoscale" v-if="autoScale">
      <slot></slot>
    </div>
    <slot v-else></slot>

    <div class="settings-context" v-if="contextPosition" :style="{
      '--x': `${contextPosition.x}px`,
      '--y': `${contextPosition.y}px`
    }" ref="contextMenu">
      <div class="option" @click="() => onClickToContextOption('clear')">Очистить данные</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useReactiveState, useWidgetSdk, WidgetMetaTags } from '@/composition/widgetSdk';
import { isInit as isMetrikaInit, metrikaId } from '@/composition/ym/metrika';
import { onMounted, ref, watch } from 'vue';
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
  autoScale?: boolean,
  autoHeight?: boolean
  hangarOnly?: boolean
}>()

onMounted(() => {
  if (props.autoHeight) WidgetMetaTags.setAutoHeight(props.autoHeight)
  if (props.hangarOnly) WidgetMetaTags.setHangarOnly(props.hangarOnly)
})

const { sdk } = useWidgetSdk()

const playerName = useReactiveState(sdk.data.player.name)
const playerRegion = useReactiveState(sdk.data.game.region)
const gameVersion = useReactiveState(sdk.data.game.version)

watch(() => [isMetrikaInit.value, playerName.value, playerRegion.value, gameVersion.value] as const, ([isMetrikaInit, playerName, playerRegion, gameVersion]) => {
  if (!isMetrikaInit || !playerName || !playerRegion || !gameVersion) return
  ym(metrikaId, 'params', {
    playerName,
    playerRegion,
    gameVersion
  })

  ym(metrikaId, 'userParams', {
    playerName,
    playerRegion,
    gameVersion
  })
})

const contextMenu = ref<HTMLElement | null>(null)
const contextPosition = ref<{ x: number, y: number } | null>(null)

onClickOutside(contextMenu, () => {
  contextPosition.value = null
})

function onClick(e: MouseEvent) {
  contextPosition.value = { x: e.clientX, y: e.clientY }
}

function onClickToContextOption(option: 'clear') {
  contextPosition.value = null

  switch (option) {
    case 'clear':
      sdk.commands.forceClearData()
      break
  }
}

</script>

<style lang="scss" scoped>
.widgets-sdk-styles {
  position: relative;
  color: var(--wotstat-primary);
}

.settings-context {
  z-index: 10000;
  font-size: 2.5vw;
  position: absolute;
  top: var(--y);
  left: var(--x);
  padding: 0.2em;
  border-radius: 0.5em;
  border: 0.05em solid #b0b0b06c;
  box-shadow: 0 0 0.5em 0.1em #0000001a;

  backdrop-filter: blur(20em);
  background-color: rgba(35, 35, 35, 0.691);

  .option {
    padding: 0.3em 0.5em;
    border-radius: 0.3em;
    line-height: 1;
    cursor: pointer;
    transition: background-color 0.1s;

    &:hover {
      background-color: #207ac4;
    }
  }

}
</style>