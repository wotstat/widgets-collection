<template>
  <slot v-if="shouldShowContent || !hideSlotOnWarning"></slot>
  <Transition>
    <div class="card warning-text" v-if="!shouldShowContent" ref="warningOverlay">
      <div v-if="!isConnected">
        <p class="primary">Ожидание клиента игры</p>
        <p class="secondary">Для работы виджета необходим мод wotstat-widgets. Подробнее на сайте wotstat.info</p>
        <p class="secondary ellipsis">{{ ellipsis.join(' ') }}</p>
      </div>
      <div v-else-if="!isExtensionsReady">
        <p class="primary">Необходим мод-расширение</p>
        <p class="secondary" v-if="missingExtensions.length === 1">
          Для работы виджета необходимы мод-расширение –
          <span class="primary"> {{ missingExtensions!.join(', ') }}</span>
        </p>
        <p class="secondary" v-else>
          Для работы виджета необходимы моды расширения:
          <span class="primary"> {{ missingExtensions!.join(', ') }}</span>
        </p>
      </div>
      <div v-else-if="props.battleOnly && isInHangar">
        <p class="primary">Виджет доступен только в бою</p>
        <p class="secondary">В ангаре вы можете свернуть его</p>
        <ArrowUp class="arrow-up-icon" v-if="isInWidgetMod" />
      </div>
    </div>
  </Transition>
</template>


<script setup lang="ts">
import { useReactiveState, useWidgetSdk } from '@/composition/widgetSdk';
import { useElementBounding } from '@vueuse/core';
import { computed, inject, ref, watchEffect } from 'vue';
import ArrowUp from '@/assets/icons/arrow-up.svg'
import { isInWidgetMod as isInWidgetModKey } from '@/utils/provides';

const warningOverlay = ref<HTMLElement | null>(null)
const { height } = useElementBounding(warningOverlay)

watchEffect(() => {
  if (height.value) {
    document.body.style.minHeight = `${height.value}px`
  } else {
    document.body.style.minHeight = ''
  }
})

const props = defineProps<{
  requiredExtensions?: string[]
  battleOnly?: boolean
  hideSlotOnWarning?: boolean
}>()

const ctx = useWidgetSdk();

const extensions = useReactiveState(ctx.sdk.data.registeredExtensions)
const missingExtensions = computed(() => {
  if (!props.requiredExtensions) return []
  if (extensions.value === undefined) return props.requiredExtensions

  const extSet = new Set(extensions.value)
  return props.requiredExtensions.filter(ext => !extSet.has(ext))
})

const isConnected = computed(() => ctx.status.value === 'connected')
const isExtensionsReady = computed(() => missingExtensions.value.length === 0)

const isInHangar = useReactiveState(ctx.sdk.data.hangar.isInHangar)
const shouldShowContent = computed(() => isConnected.value && isExtensionsReady.value && !(props.battleOnly && isInHangar.value))

const isInWidgetMod = inject(isInWidgetModKey, ref(false))

const ellipsis = ref<string[]>([])
async function ellipsisLoop() {
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    ellipsis.value = [...ellipsis.value, '•']
    if (ellipsis.value.length > 5) ellipsis.value = []
  }
}
ellipsisLoop()

</script>


<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

div.card {
  background-color: #292929;
}

.warning-text {
  min-height: 30vw;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.2em;
  z-index: 10000;

  p {
    margin: 0;
  }

  .primary {
    font-weight: bold;
  }

  .secondary {
    font-size: 0.8em;
    line-height: 1.3;
    line-break: loose;
  }

  .arrow-up-icon {
    width: 20px;
    max-width: 3em;
    fill: #ffffff;
    position: absolute;
    top: 5px;
    left: 0px;

    animation: move 2s ease-in-out infinite;

    @keyframes move {
      0% {
        transform: translateY(0);
      }

      50% {
        transform: translateY(-5px);
      }

      100% {
        transform: translateY(0);
      }

    }
  }

  .ellipsis {
    margin-top: 0.2em;
    min-height: 1em;
    line-height: 1;
  }
}
</style>