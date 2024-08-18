<template>
  <template v-if="currentOptions">
    <div class="main">
      <div class="info">
        <h1>{{ currentOptions.options.name }}</h1>
        <p>{{ currentOptions.options.description }}</p>
      </div>
      <div class="preview">
        <div class="widget">
          <div class="preview-container">
            <template v-if="currentPreviewComponent">
              <component :is="currentPreviewComponent" :isMiniPreview="true" />
            </template>
          </div>
        </div>
        <div class="settings">
          <h2>Параметры</h2>
          <component v-for="setting in settingsValues" :is="setting.component" />
          {{ settingsValues?.map(t => t.value) }}
          {{ targetQuery }}
        </div>
      </div>
    </div>
  </template>
</template>


<script setup lang="ts">
import { getAllWidgetsRoutes, pathResolve } from '@/utils'
import { type Component, computed, defineAsyncComponent, defineComponent, h, Ref, ref, watch, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { accent, background } from "@/composition/wotstatColors";
import { setupStyles } from "@/composition/widgetSdk"
import Checkbox from './settings/Checkbox.vue';
import Int from './settings/Int.vue';
import Color from './settings/Color.vue';
import Unsupported from './settings/Unsupported.vue';
import { WidgetParam } from '@/utils/defineWidget';
import { computedWithControl, RemovableRef } from '@vueuse/core';
setupStyles()

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

const targetQuery = computed(() => {
  if (!settingsValues.value) return null
  return settingsValues.value.map(s => {
    const target = s.target
    const value = s.value?.value

    if (value !== undefined) return `${target}=${value}`
    return target
  }).filter(t => t).join('&')
})

</script>


<style lang="scss" scoped>
.main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 20px;

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
    background-color: #203031;

    .widget {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;

      .preview-container {
        flex: 1;
        height: 100%;
        max-width: 500px;
      }
    }

    .settings {
      width: 200px;

      .line {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>