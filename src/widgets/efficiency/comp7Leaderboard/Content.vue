<template>
  <InsetsWrapper :insets="skin === 'default' ? 0 : 8" :edge-mask="skin === 'default' ? 0 : 8">
    <div ref="container" class="leaderboard wg-font" :class="[
      `skin-${skin ?? 'transparent'}`,
      { 'hide-icon': hideIcon, 'hide-delta': hideDelta },
    ]">
      <div ref="content" class="content" :style="{ transform: `scale(${scale})` }">
        <svg v-if="!hideIcon" class="podium" viewBox="0 0 36 30" fill="currentColor">
          <rect x="0" y="11" width="10" height="19" />
          <rect x="13" y="0" width="10" height="30" />
          <rect x="26" y="18" width="10" height="12" />
        </svg>

        <p v-if="isNotFound" class="not-found">не в таблице</p>
        <template v-else>
          <p class="position number">{{ position === null ? '–' : formatNumber(position) }}</p>

          <p v-if="!hideDelta" class="delta number" :class="{
            up: delta !== null && delta > 0,
            down: delta !== null && delta < 0,
            new: isNew,
          }">
            <template v-if="delta !== null && delta !== 0">
              <TriangleUp class="triangle" />
              <span>{{ formatNumber(Math.abs(delta)) }}</span>
            </template>
            <span v-else>{{ isNew ? 'NEW' : '–' }}</span>
          </p>
        </template>
      </div>
    </div>
  </InsetsWrapper>
</template>

<script setup lang="ts">
import InsetsWrapper from '@/components/InsetsWrapper.vue'
import type { Props } from './define.widget'
import TriangleUp from './assets/triangle-up.svg'
import { useElementSize } from '@vueuse/core'
import { computed, ref } from 'vue'

defineProps<Props>()

const container = ref<HTMLElement | null>(null)
const content = ref<HTMLElement | null>(null)
const { width: availableWidth } = useElementSize(container)
const { width: contentWidth } = useElementSize(content)
const scale = computed(() => availableWidth.value > 0 && contentWidth.value > 0
  ? Math.min(1, availableWidth.value / contentWidth.value)
  : 1)

function formatNumber(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: value < 100_000 ? 1 : 0,
  }).format(value).toLowerCase()
}
</script>

<style lang="scss" scoped>
.leaderboard {
  position: relative;
  isolation: isolate;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.65em 0.85em;
  border-radius: 5em;
  color: #fff;
  white-space: nowrap;
  line-height: 1;
  font-variant-numeric: tabular-nums;

  &.skin-default {
    background: var(--wotstat-background);
  }

  &.skin-transparent::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: rgba(0, 0, 0, 0.35);
    border-radius: 5em;
    filter: blur(1.2em);
  }
}

.content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1em;
  width: max-content;
  flex-shrink: 0;

  .hide-icon & {
    font-size: 1.2em;
  }

  .hide-delta & {
    font-size: 1.5em;
  }

  .hide-icon.hide-delta & {
    font-size: 1.8em;
  }
}

.podium {
  width: 3em;
  height: 2.5em;
  flex-shrink: 0;
}

.position,
.delta,
.not-found {
  font-size: 3.5em;
  font-weight: bold;
  flex-shrink: 0;
}

.delta {
  display: flex;
  align-items: center;
  gap: 0.2em;
  color: #aaa;

  &.up {
    color: #57ff6e;
  }

  &.down {
    color: #ff6060;

    .triangle {
      transform: rotate(180deg);
    }
  }

  &.new {
    color: #ffd557;
  }

  .triangle {
    width: 0.6em;
    height: 0.6em;
    flex-shrink: 0;
  }
}
</style>
