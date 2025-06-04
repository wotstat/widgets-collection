<template>
  <div class="image-wrapper">
    <img :src="currentSrc" :alt="altText" @error="onError" @load="onLoad"
      :class="{ 'is-loading': isLoading, 'error-image': currentSrc == resolvedErrorSrc }" />
    <div class="loader" :class="{ 'is-loading': isLoading, 'first-show': firstShow }"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted, nextTick } from 'vue'
import WarningSrc from '@/assets/icons/warning-bold.svg?url'


const props = defineProps<{
  src: string
  alt?: string
  fallbackImage?: string
  retryCount?: number
}>()


const currentSrc = ref(props.src)
const attempts = ref(0)
const isLoading = ref(true)
const firstShow = ref(true)
const altText = computed(() => props.alt ?? '')
const resolvedErrorSrc = computed(() => props.fallbackImage ?? WarningSrc)


watch(
  () => props.src,
  (newSrc) => {
    attempts.value = 0
    currentSrc.value = newSrc
    isLoading.value = true
  }
)

function onError() {
  const maxRetries = props.retryCount ?? 3

  if (attempts.value < maxRetries) {
    attempts.value++
    const separator = currentSrc.value.includes('?') ? '&' : '?'
    currentSrc.value = `${props.src}${separator}_retry=${Date.now()}`
    isLoading.value = true
  } else {
    currentSrc.value = resolvedErrorSrc.value
    isLoading.value = false
  }
}

function onLoad() {
  isLoading.value = false
}

onMounted(() => {
  setTimeout(() => {
    firstShow.value = false
  }, 10);
})
</script>

<style lang="scss" scoped>
.image-wrapper {
  position: relative;
}

img {
  display: block;
  width: 100%;
  height: 100%;

  &.is-loading {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20%;
  aspect-ratio: 2;
  --_g: no-repeat radial-gradient(circle closest-side, #ffffff 90%, #0000);
  background:
    var(--_g) 0% 50%,
    var(--_g) 50% 50%,
    var(--_g) 100% 50%;
  background-size: calc(100%/3) 50%;
  animation: l3 1s infinite linear;

  transition: opacity 0.2s ease-in-out;
  transition-delay: 1s;

  &:not(.is-loading) {
    opacity: 0;
    transition-delay: 0s;
  }

  &.first-show {
    transition: none;
  }
}

@keyframes l3 {
  20% {
    background-position: 0% 0%, 50% 50%, 100% 50%
  }

  40% {
    background-position: 0% 100%, 50% 0%, 100% 50%
  }

  60% {
    background-position: 0% 50%, 50% 100%, 100% 0%
  }

  80% {
    background-position: 0% 50%, 50% 50%, 100% 100%
  }
}
</style>
