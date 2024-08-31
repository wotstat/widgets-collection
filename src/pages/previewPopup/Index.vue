<template>
  <template v-if="currentOptions">
    <div class="main">
      <div class="info markdown">
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
          <h2>Параметры</h2>
          <component v-for="setting in settingsValues" :is="setting.component" />
        </div>
      </div>
      <div class="url" :class="{ 'active': isActivated }">
        {{ `${BASE_URL}${currentOptions.route}?${targetQuery}` }}
        <CopyIcon class="icon" @click="copy" />
      </div>
    </div>
  </template>
</template>


<script setup lang="ts">
import { getAllWidgetsRoutes, pathResolve } from '@/utils'
import { computed, defineAsyncComponent, defineComponent, h, provide, Ref, ref, shallowRef, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { accent, background } from "@/composition/wotstatColors";
import { setupStyles } from "@/composition/widgetSdk"
import Checkbox from './settings/Checkbox.vue';
import Int from './settings/Int.vue';
import Color from './settings/Color.vue';
import String from './settings/String.vue';
import RandomString from './settings/RandomString.vue';
import Unsupported from './settings/Unsupported.vue';
import { computedWithControl } from '@vueuse/core';
import CopyIcon from '@/assets/icons/copy.svg';
import { isInPreview, language } from '@/utils/provides';

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

const currentPreviewComponent = defineAsyncComponent(currentPreview.value as any)

const settingsValues = computedWithControl(currentOptions, () => {
  if (!currentOptions.value) return null

  function vModel<T>(value: Ref<T>) {
    return {
      'onUpdate:modelValue': (t: T) => value.value = t,
      modelValue: value.value
    }
  }

  return currentOptions.value.options.params.map((param) => {
    if (param == 'accentColorParam')
      return { value: accent, target: 'accent', component: defineComponent(() => () => h(Color, { label: 'Акцент', ...vModel(accent) })) }

    if (param == 'backgroundColorParam')
      return { value: background, target: 'background', component: defineComponent(() => () => h(Color, { label: 'Фон', ...vModel(background) })) }

    if (param.type == 'checkbox') {
      const value = ref(param.default ?? false)
      return { value, target: param.target, component: defineComponent(() => () => h(Checkbox, { label: param.label, ...vModel(value) })) }
    }

    if (param.type == 'int') {
      const value = ref(param.default ?? 0)
      return { value, target: param.target, component: defineComponent(() => () => h(Int, { label: param.label, ...vModel(value) })) }
    }

    if (param.type == 'string') {
      const value = ref(param.default ?? '')
      return { value, target: param.target, component: defineComponent(() => () => h(String, { label: param.label, ...vModel(value) })) }
    }

    if (param.type == 'random-string') {
      const value = ref(param.default ?? '')
      return {
        target: param.target, value,
        component: defineComponent(() => () => h(RandomString, { label: param.label, length: param.length ?? 5, ...vModel(value) }))
      }
    }

    return { component: h(Unsupported, { label: param.type }), target: '', model: undefined }
  })
})

const targetProps = shallowRef<any>({})

watchEffect(() => {
  targetProps.value = settingsValues.value?.reduce((acc, s) => {
    const target = s.target
    const value = s.value?.value

    if (value !== undefined) return { ...acc, [target]: value }
    return { ...acc, [target]: true }
  }, {})
})

const targetQuery = computed(() => {
  if (!settingsValues.value) return null
  return settingsValues.value.map(s => {
    const target = s.target
    const value = s.value?.value

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

const isActivated = ref(false)
function copy() {
  isActivated.value = true
  navigator.clipboard.writeText(`${BASE_URL}${currentOptions.value?.route}?${targetQuery.value}`)
  setTimeout(() => isActivated.value = false, 300)
}

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
        max-width: 500px;
      }
    }

    .settings {
      width: 300px;

      h2 {
        font-size: 1.2em;
      }

      :deep(.line) {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0.2em 0;
      }

      :deep(input) {
        max-width: 100px;
        padding: 0.15em 0.3em;
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
</style>