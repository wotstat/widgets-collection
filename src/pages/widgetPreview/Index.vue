<template>
  <div ref="root" class="widget-only-preview" :style="{
    '--wotstat-accent': '#' + defaultAccent,
    '--wotstat-background': '#' + defaultBackground,
  }">
    <component v-if="preview" :is="preview" :is-mini-preview="true" />
  </div>
</template>

<script setup lang="ts">
import { nextTick, onErrorCaptured, onMounted, onScopeDispose, provide, ref, shallowRef, type Component } from 'vue'
import { useRoute } from 'vue-router'
import { useEventListener } from '@vueuse/core'
import { injectStylesheet } from '@/composition/widgetSdk'
import { defaultAccent, defaultBackground } from '@/composition/wotstatColors'
import { getAllWidgetsRoutes, pathResolve } from '@/utils'
import { isInMiniPreview, isInPreview, language } from '@/utils/provides'
import { waitForQueries } from '@/utils/db'

injectStylesheet()
provide(language, 'ru')
provide(isInPreview, true)
provide(isInMiniPreview, true)

const route = useRoute()
const widgetPath = '/' + (Array.isArray(route.params.widget) ? route.params.widget.join('/') : route.params.widget)
const widget = getAllWidgetsRoutes().find(widget => widget.route === widgetPath)
const modules = import.meta.glob<{ default: Component }>('/src/widgets/**/*.vue')
const root = ref<HTMLElement | null>(null)
const preview = shallowRef<Component>()
const controller = new AbortController()
const signal = controller.signal
const frame = () => new Promise<void>(resolve => requestAnimationFrame(() => resolve()))
let renderError: unknown
let preparation: Promise<void>

const sendError = (error: unknown, requestId?: number, origin = '*') => {
  if (signal.aborted) return
  parent.postMessage({
    type: 'widget-preview-error',
    requestId,
    message: error instanceof Error ? error.message : String(error),
  }, origin)
}

onErrorCaptured(error => {
  renderError = error
  sendError(error)
  return false
})

async function waitForResources() {
  signal.throwIfAborted()
  await nextTick()
  await frame()
  await waitForQueries()
  await nextTick()
  await document.fonts.ready
  await Promise.all([...root.value!.querySelectorAll('img')].map(async image => {
    if (!image.currentSrc && !image.src) return
    try {
      await image.decode()
    } catch (error) {
      // Компонент мог заменить недоступную картинку своим fallback в обработчике error.
      await nextTick()
      if (!image.complete || image.naturalWidth === 0) await image.decode()
    }
  }))
  await frame()
  await frame()
  signal.throwIfAborted()
  if (renderError) throw renderError
}

onMounted(() => {
  preparation = (async () => {
    if (!widget?.options.preview) throw new Error('У виджета нет превью')
    const loader = modules['/' + pathResolve('src', widget.path, widget.options.preview)]
    if (!loader) throw new Error('Превью виджета не найдено')

    preview.value = (await loader()).default
    await waitForResources()
    parent.postMessage({
      type: 'widget-preview-ready',
      name: widget.options.name,
      description: widget.options.description,
    }, '*')
  })()
  void preparation.catch(error => sendError(error))
})

useEventListener(window, 'message', async event => {
  if (event.source !== parent || !event.data || typeof event.data !== 'object') return
  const { type, requestId } = event.data
  if (type !== 'widget-preview-measure' && type !== 'widget-preview-settle') return
  if (!Number.isSafeInteger(requestId)) return

  try {
    await preparation
    await waitForResources()

    if (type === 'widget-preview-settle') {
      document.getAnimations().forEach(animation => animation.pause())
      parent.postMessage({ type: 'widget-preview-settled', requestId }, event.origin)
      return
    }

    const content = root.value!.querySelector('[data-widget-preview-content]') ?? root.value!.firstElementChild
    if (!content) throw new Error('Превью виджета пустое')
    const bounds = content.getBoundingClientRect()
    parent.postMessage({
      type: 'widget-preview-size',
      requestId,
      width: Math.ceil(bounds.width),
      height: Math.ceil(bounds.height),
    }, event.origin)
  } catch (error) {
    sendError(error, requestId, event.origin)
  }
})

onScopeDispose(() => controller.abort())
</script>

<style scoped lang="scss">
:global(html:has(.widget-only-preview)) {
  color-scheme: normal;
  background: transparent;
}

.widget-only-preview {
  position: fixed;
  inset: 0;
  overflow: hidden;

  :deep(.autoscale) {
    max-height: none !important;
  }

  :deep(*) {
    animation: none !important;
    transition: none !important;
  }
}
</style>
