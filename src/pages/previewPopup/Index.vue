<template>
  <template v-if="currentOptions">
    <div class="main">
      <div class="info markdown nice-scrollbar">
        <RMC />
      </div>
      <div class="preview">
        <div class="widget">
          <img class="preview-background" src="@/assets/images/preview-background.jpg">
          <div class="preview-container">
            <template v-if="currentPreviewComponent">
              <component :is="currentPreviewComponent" :isMiniPreview="false" v-bind="targetProps" />
            </template>
          </div>
        </div>
        <div class="settings">
          <h2>
            <span class="flex-1">Параметры</span>
            <button class="reset-button" @click="resetToDefault" v-if="canReset">
              <IconReset class="icon-reset" />
            </button>
          </h2>
          <div class="params nice-scrollbar">
            <component v-for="setting in settingsValues" :is="setting.component" />
          </div>
        </div>
      </div>
      <div class="flex url-container">
        <div class="url" :class="{ 'active': isActivatedUrl }" :key="'url'">
          {{ widgetUrl }}
          <CopyIcon class="icon" @click="copy" />
        </div>
        <Transition>
          <button v-if="predictedStatus == 'predict-open' || predictedStatus == 'open'" :key="'button'"
            :class="{ 'active': isActivatedButton }" @click="add">Добавить в
            игру</button>
        </Transition>
      </div>
    </div>
  </template>
</template>


<script setup lang="ts">
import { getAllWidgetsRoutes, pathResolve } from '@/utils'
import { computed, defineAsyncComponent, defineComponent, h, provide, Ref, ref, shallowRef, VNode, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { accent, background, defaultAccent, defaultBackground } from "@/composition/wotstatColors";
import { setupStyles } from "@/composition/widgetSdk"
import Checkbox from './settings/Checkbox.vue';
import Select from './settings/Select.vue';
import Int from './settings/Int.vue';
import Color from './settings/Color.vue';
import String from './settings/String.vue';
import MultiSlot from './settings/MultiSlot.vue';
import RandomString from './settings/RandomString.vue';
import Unsupported from './settings/Unsupported.vue';
import { computedWithControl } from '@vueuse/core';
import CopyIcon from '@/assets/icons/copy.svg';
import IconReset from '@/assets/icons/reset.svg'
import { isInPreview, language } from '@/utils/provides';
import { usePredictWebSocketInterface } from './usePredictWebSocketInterface';
import { useWidgetPreviewStorage } from './useWidgetPreviewStorage';
import { WidgetParam } from '@/utils/defineWidget';

setupStyles()

const BASE_URL = location.origin
const route = useRoute();

const widgetPreviews = import.meta.glob('/src/widgets/**/*.vue')
const widgetReadmes = import.meta.glob('/src/widgets/**/*.md')
const widgetsOptions = getAllWidgetsRoutes()
const emit = defineEmits<{
  onLoaded: [any]
}>()

provide(language, 'ru')
provide(isInPreview, true)

const widgetPath = computed(() => {
  if (Array.isArray(route.params.widget)) {
    return route.params.widget.join('/');
  }
  return route.params.widget;
});

const currentOptions = computed(() => widgetsOptions.find((widget) => widget.route === `/${widgetPath.value}`));
const currentPreview = computed(() => {
  if (!currentOptions.value || !currentOptions.value.options.preview) return null

  const previewPath = '/' + pathResolve('src', currentOptions.value.path, currentOptions.value.options.preview)
  if (!(previewPath in widgetPreviews) || !widgetPreviews[previewPath]) return null

  return widgetPreviews[previewPath]
});

const canReset = computed(() => {
  if (!settingsValues.value) return
  if (!currentOptions.value) return

  for (let i = 0; i < currentOptions.value.options.params.length; i++) {
    const element = currentOptions.value.options.params[i];
    const settings = settingsValues.value[i]

    if (element.type == 'accentColorParam' && accent.value != defaultAccent) return true
    if (element.type == 'backgroundColorParam' && background.value != defaultBackground) return true

    if (element.type == 'accentColorParam') continue
    if (element.type == 'backgroundColorParam') continue
    if (element.type == 'separator') continue

    if (!settings) continue
    if (element.default === undefined) continue

    const value = settings.value?.value
    const target = element.default

    if (typeof value === 'object' && typeof target == 'object' && JSON.stringify(value) !== JSON.stringify(target)) return true
    if (typeof value !== 'object' && typeof target !== 'object' && value !== target) return true
  }

  return false
})

function resetToDefault() {
  if (!settingsValues.value) return
  if (!currentOptions.value) return

  currentOptions.value.options.params.forEach((v, i) => {
    if (v.type == 'accentColorParam') return accent.value = defaultAccent
    if (v.type == 'backgroundColorParam') return background.value = defaultBackground
    if (v.type == 'separator') return

    if (!settingsValues.value) return
    if (!settingsValues.value[i].value) return
    if (v.default === undefined) return
    settingsValues.value[i].value.value = structuredClone(v.default)
  })
}

const targetProps = shallowRef<any>({})

function isVisible(param?: WidgetParam) {
  if (!param) return true
  if (typeof param == 'string') return true
  if (param.visible === undefined) return true
  if (typeof param.visible == 'function') return !!param.visible(targetProps.value)
  return !!param.visible
}

const currentPreviewComponent = defineAsyncComponent(currentPreview.value as any)

const settingsValues = computedWithControl(currentOptions, () => {
  if (!currentOptions.value) return null

  function vModel<T>(value: Ref<T>) {
    return {
      'onUpdate:modelValue': (t: T) => value.value = t,
      modelValue: value.value
    }
  }

  function renderIfVisible(param: WidgetParam, element: VNode) {
    return isVisible(param) ? element : null
  }

  return currentOptions.value.options.params.map((param) => {
    const i18n = currentOptions.value?.options.i18n?.['ru'] ?? {}
    const t = (key: string) => key in i18n ? i18n[key] : key

    if (param.type == 'accentColorParam')
      return { value: accent, target: 'accent', component: defineComponent(() => () => renderIfVisible(param, h(Color, { label: 'Акцент', ...vModel(accent) }))) }

    if (param.type == 'backgroundColorParam')
      return { value: background, target: 'background', component: defineComponent(() => () => renderIfVisible(param, h(Color, { label: 'Фон', ...vModel(background) }))) }

    if (param.type == 'separator')
      return { component: h('hr') }

    if (param.type == 'checkbox') {
      const value = useWidgetPreviewStorage(param.target, param.default ?? false)
      return { value, target: param.target, component: defineComponent(() => () => renderIfVisible(param, h(Checkbox, { label: t(param.label), ...vModel(value) }))) }
    }

    if (param.type == 'select') {
      const firstVariant = param.variants[0]
      const value = useWidgetPreviewStorage(param.target, param.default ?? firstVariant.value)
      return {
        value, target: param.target,
        component: defineComponent(() => () => renderIfVisible(param, h(Select, {
          label: t(param.label),
          variants: param.variants.map(({ value, label }) => ({ value, label: t(label) })),
          ...vModel(value)
        })))
      }
    }

    if (param.type == 'int') {
      const value = useWidgetPreviewStorage(param.target, param.default ?? 0)
      return { value, target: param.target, component: defineComponent(() => () => renderIfVisible(param, h(Int, { label: t(param.label), ...vModel(value) }))) }
    }

    if (param.type == 'string') {
      const value = useWidgetPreviewStorage(param.target, param.default ?? '')
      return { value, target: param.target, component: defineComponent(() => () => renderIfVisible(param, h(String, { label: param.label, ...vModel(value) }))) }
    }

    if (param.type == 'random-string') {
      const value = useWidgetPreviewStorage(param.target, param.default ?? '')
      return {
        target: param.target, value,
        component: defineComponent(() => () => renderIfVisible(param, h(RandomString, { label: param.label, length: param.length ?? 5, ...vModel(value) })))
      }
    }

    if (param.type == 'multi-slot') {
      const value = useWidgetPreviewStorage(param.target, structuredClone(param.default) ?? [])
      return {
        target: param.target, value,
        component: defineComponent(() => () => renderIfVisible(param, h(MultiSlot, { i18n, label: param.label, min: param.min, max: param.max, slots: param.slots, ...vModel(value) })))
      }
    }

    return { component: h(Unsupported, { label: param.type }), target: '', model: undefined }
  })
})

watchEffect(() => {
  targetProps.value = settingsValues.value?.reduce((acc, s) => {
    if (!s.target) return acc

    const target = s.target
    const value = s.value?.value

    if (value !== undefined) return { ...acc, [target]: value }
    return { ...acc, [target]: true }
  }, {})
})

const targetQuery = computed(() => {
  if (!settingsValues.value) return null
  return settingsValues.value
    .map((s, i) => {
      if (!isVisible(currentOptions.value?.options.params[i])) return null

      const target = s.target
      const value = s.value?.value

      if (value === false) return null
      if (value !== undefined) return `${target}=${value}`
      return target
    }).filter(t => t).join('&')
})

const Unknown = h('div', 'Unknown widget')
const RMC = defineAsyncComponent(async () => {
  if (!currentOptions.value) return Unknown
  if (!currentOptions.value.options.readme) return Unknown

  const readmePath = '/' + pathResolve('src', currentOptions.value.path, currentOptions.value.options.readme)

  if (!widgetReadmes[readmePath]) return Unknown

  const { VueComponent, attributes } = await widgetReadmes[readmePath]() as any
  emit('onLoaded', attributes)
  parent.postMessage({
    type: 'readme-loaded',
    attributes
  }, '*')


  return VueComponent
})

const widgetUrl = computed(() => `${BASE_URL}${currentOptions.value?.route}?${targetQuery.value}`)

const isActivatedUrl = ref(false)
function copy() {
  isActivatedUrl.value = true
  navigator.clipboard.writeText(widgetUrl.value)
  setTimeout(() => isActivatedUrl.value = false, 300)
}

const isActivatedButton = ref(false)
const { ws, status: predictedStatus } = usePredictWebSocketInterface(import.meta.env.VITE_WIDGETS_INTERFACE_URL)
function add() {
  if (ws.status.value != 'OPEN') return
  ws.send(`ADD_WIDGET ${widgetUrl.value}`)
  isActivatedButton.value = true
  setTimeout(() => isActivatedButton.value = false, 300)
}

const accentColor = computed(() => '#' + accent.value)

</script>


<style lang="scss" scoped>
.main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;

  .info {
    flex: 1;
    max-height: 50%;
    min-height: 30%;
    overflow-y: auto
  }

  .preview {
    flex: 1;
    display: flex;
    gap: 20px;
    min-height: 30%;

    .preview-background {
      background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAACXBIWXMAAAsTAAALEwEAmpwYAAAJNmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNy4xLWMwMDAgNzkuOWNjYzRkZTkzLCAyMDIyLzAzLzE0LTE0OjA3OjIyICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjFmMDJmNzkwLWVlMGEtZjA0My05MjE5LTQ4ZWRmYzA4YWE4MSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpkY2IxMzBiZS0wYTc5LTQ3ZjEtYjY0MC01MzgzODM3ZTlhMTgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iMzUwQzhENEZDRTdDM0IxRjk4RjZEQzcxQTg5QTNGNzciIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB0aWZmOkltYWdlV2lkdGg9IjYzOSIgdGlmZjpJbWFnZUxlbmd0aD0iNjEwIiB0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb249IjIiIHRpZmY6U2FtcGxlc1BlclBpeGVsPSIzIiB0aWZmOlhSZXNvbHV0aW9uPSIxLzEiIHRpZmY6WVJlc29sdXRpb249IjEvMSIgdGlmZjpSZXNvbHV0aW9uVW5pdD0iMSIgZXhpZjpFeGlmVmVyc2lvbj0iMDIzMSIgZXhpZjpDb2xvclNwYWNlPSI2NTUzNSIgZXhpZjpQaXhlbFhEaW1lbnNpb249IjYzOSIgZXhpZjpQaXhlbFlEaW1lbnNpb249IjYxMCIgeG1wOkNyZWF0ZURhdGU9IjIwMjQtMDgtMzFUMDU6NTY6NDUrMDM6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDI0LTA4LTMxVDA2OjIzOjIwKzAzOjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDI0LTA4LTMxVDA2OjIzOjIwKzAzOjAwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6MWY3NzFhZGYtZjgyNS00YjdhLTg2NDAtYTAxOTdhZGVhMjNlIiBzdEV2dDp3aGVuPSIyMDI0LTA4LTMxVDA2OjIzOjIwKzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjMuMyAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL2pwZWcgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBpbWFnZS9qcGVnIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6ZGNiMTMwYmUtMGE3OS00N2YxLWI2NDAtNTM4MzgzN2U5YTE4IiBzdEV2dDp3aGVuPSIyMDI0LTA4LTMxVDA2OjIzOjIwKzAzOjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjMuMyAoTWFjaW50b3NoKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8L3JkZjpTZXE+IDwveG1wTU06SGlzdG9yeT4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MWY3NzFhZGYtZjgyNS00YjdhLTg2NDAtYTAxOTdhZGVhMjNlIiBzdFJlZjpkb2N1bWVudElEPSIzNTBDOEQ0RkNFN0MzQjFGOThGNkRDNzFBODlBM0Y3NyIgc3RSZWY6b3JpZ2luYWxEb2N1bWVudElEPSIzNTBDOEQ0RkNFN0MzQjFGOThGNkRDNzFBODlBM0Y3NyIvPiA8dGlmZjpCaXRzUGVyU2FtcGxlPiA8cmRmOlNlcT4gPHJkZjpsaT44PC9yZGY6bGk+IDxyZGY6bGk+ODwvcmRmOmxpPiA8cmRmOmxpPjg8L3JkZjpsaT4gPC9yZGY6U2VxPiA8L3RpZmY6Qml0c1BlclNhbXBsZT4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5U0wQDAAAAuElEQVQImQXB226CQBAA0J3ZWYKYGG00Pvj/v2J8M33xVoumZVkjJghU3HXK4DmwWi09K1EQBLhj1Go0niEizWcf0isFEP7F5uemaZLpVBNiD0iaIqIY+/qWlW5vuBqgUH4PiGAQm6o4pimH8tfZ+WJIWVGJdAhQ5On+O43Jx1+7awW0/VwrYRZtfzbOunEixmwurqXLaWsQW882OwT/SLSeRBxBiZMYTFd3bfF6/r18iLQemkFdPt+lpmkasjRzSwAAAABJRU5ErkJggg==);
      background-size: cover;
    }

    .widget {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      position: relative;
      padding: 10px;
      overflow: hidden;

      img {
        user-select: none;
        pointer-events: none;
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
      }

      .preview-container {
        flex: 1;
        height: 100%;
        max-width: 600px;
        z-index: 100;
      }
    }

    .settings {
      width: 300px;
      display: flex;
      flex-direction: column;

      .params {
        overflow-y: auto;
        padding-right: 5px;
      }

      h2 {
        font-size: 1.2em;
        align-items: center;
        display: flex;
        padding-right: 5px;

        .reset-button {
          float: right;
          box-sizing: content-box;
          height: 1em;
          display: block;
          cursor: pointer;
          padding: 3px;
          border: 1px solid #858585;
          border-radius: 5px;
          background: transparent;
          transition: background 0.1s;
          color: inherit;

          &:hover {
            background: #ffffff1a;
          }

          .icon-reset {
            height: 100%;
          }
        }
      }

      :deep(hr) {
        margin: 0.5em 0;
        border: none;
        border-top: 1px solid #9e9e9e7d;
      }

      :deep(.line) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0.4em 0;
        gap: 10px;
        line-height: 1.2;
      }

      :deep(input) {
        max-width: 140px;
        padding: 0.15em 0.3em;
        background-color: #3b3b3b;
        border: 1px solid #858585;
        text-align: center;
      }

      :deep(select) {
        width: 140px;
        padding: 0.15em 0.3em;
        border-radius: 5px;
        background-color: #3b3b3b;
        border: 1px solid #858585;
        text-align: center;
      }
    }
  }

  @media screen and (max-width: 600px) {
    position: unset;

    .preview {
      flex-direction: column;

      .settings {
        width: 100%;
      }
    }

    .info {
      flex: none;
    }
  }

  .url-container {
    gap: 10px;
    overflow: hidden;

    button {
      background-color: #1a1a1a;
      border: 1.5px solid v-bind('accentColor');
      padding: 10px;
      border-radius: 10px;
      font-weight: bold;
      cursor: pointer;
      white-space: nowrap;

      transition: background-color 0.2s;

      &:hover {
        background-color: #2b2b2b;
      }

      &.active {
        background-color: #30D158;
      }


      &.v-enter-active,
      &.v-leave-active {
        transition: all 0.3s ease;
      }

      &.v-enter-from,
      &.v-leave-to {
        transform: translateX(100%);
        opacity: 0;
      }

    }

    .url {
      background-color: #1a1a1a;
      padding: 10px;
      border-radius: 10px;
      font-variant-numeric: tabular-nums;
      line-height: 1.4;
      font-family: monospace;
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: space-between;
      word-wrap: break-word;
      word-break: break-all;
      flex: 1;

      transition: background-color 0.2s;

      &.active {
        background-color: #30D158;
      }

      .icon {
        min-width: 40px;
        width: 40px;
        cursor: pointer;
        margin: -5px;
        padding: 10px;
        border-radius: 8px;
        transition: background-color 0.2s;
        user-select: none;

        &:hover {
          background-color: #333;
        }
      }
    }
  }
}
</style>