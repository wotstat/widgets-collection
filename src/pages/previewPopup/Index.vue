<template>
  <template v-if="currentOptions">
    <div class="main">
      <div class="info">
        <p>{{ currentOptions.options.description }}</p>
      </div>
      <div class="preview">
        <div class="widget">
          <img src="@/assets/shot_5.jpg">
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
import { computed, defineAsyncComponent, h, Ref, ref, shallowRef, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { accent, background } from "@/composition/wotstatColors";
import { setupStyles } from "@/composition/widgetSdk"
import Checkbox from './settings/Checkbox.vue';
import Int from './settings/Int.vue';
import Color from './settings/Color.vue';
import Unsupported from './settings/Unsupported.vue';
import { computedWithControl } from '@vueuse/core';
import CopyIcon from '@/assets/copy.svg';

setupStyles()

const BASE_URL = import.meta.env.VITE_BASE_URL

const route = useRoute();

const widgetPreviews = import.meta.glob('/src/widgets/**/*.vue')
const widgetsOptions = getAllWidgetsRoutes()

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
      return { component: h(Color, { label: 'Акцент', ...vModel(accent) }), target: 'accent', value: accent }

    if (param == 'backgroundColorParam')
      return { component: h(Color, { label: 'Фон', ...vModel(background) }), target: 'background', value: background }

    if (param.type == 'checkbox') {
      const value = ref(param.default ?? false)
      return { component: h(Checkbox, { label: param.label, ...vModel(value) }), target: param.target, value }
    }

    if (param.type == 'int') {
      const value = ref(param.default ?? 0)
      return { component: h(Int, { label: param.label, ...vModel(value) }), target: param.target, value }
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

const isActivated = ref(false)
function copy() {
  isActivated.value = true
  navigator.clipboard.writeText(`https://widgets.wotstat.info${currentOptions.value?.route}?${targetQuery.value}`)
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
  }

  .preview {
    height: 60%;
    display: flex;
    gap: 20px;

    .widget {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      user-select: none;
      position: relative;
      padding: 10px;

      img {
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
      }
    }

    @media screen and (max-width: 500px) {
      flex-direction: column;

      .settings {
        width: 100%;
      }
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