<template>
  <div class="collections">
    <div class="collection" v-for="collection in collectionsWithWidgets">
      <h2>{{ collection.name }}</h2>
      <div class="collection-content">
        <div class="widget-container" v-for="widget in collection.widgets" :class="{ 'error': 'error' in widget }">
          <template v-if="'error' in widget">
            <div>
              {{ widget.error }}
            </div>
          </template>

          <template v-else>
            <Item :name="widget.options.name" :description="widget.options.description"
              :hasSlot="widget.options.preview != null">
              <template v-if="'previewComponent' in widget">
                <component :is="widget.previewComponent" :isMiniPreview="true" @click="onClick(widget)" />
              </template>
            </Item>

            <div class="beta" v-if="widget.options.beta">В РАЗРАБОТКЕ</div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { getAllWidgetsRoutes, pathResolve } from '@/utils';
import Item from './Item.vue';
import { type Component, provide } from 'vue';
import { collections } from '@/collections';
import { setupStyles } from "@/composition/widgetSdk";
import { useProvideDocumentBounding } from '@/composition/useProvideDocumentBounding';
import { Options } from '@/utils/defineWidget';
import { isInPreview, language } from '@/utils/provides';
import.meta.glob('/src/widgets/**/*.md', { eager: true })

setupStyles();
useProvideDocumentBounding()

const emit = defineEmits<{
  onClickToWidget: [{
    route: string,
    title: string
  }]
}>()

const widgets = getAllWidgetsRoutes()
const widgetsMap = new Map(widgets.map(w => ([w.route, w])))
const widgetPreviews = import.meta.glob<{ default: Component }>('/src/widgets/**/*.vue', { eager: true })

provide(language, 'ru')
provide(isInPreview, true)

const collectionsWithWidgets = collections.map(collection => ({
  ...collection,
  widgets: collection.widgets.map(route => {
    const widget = widgetsMap.get(route)
    if (!widget) {
      return { error: route }
    }

    if (!widget.options.preview) {
      return widget
    }

    const previewPath = '/' + pathResolve('src', widget.path, widget.options.preview)
    const previewComponent = widgetPreviews[previewPath].default

    return {
      ...widget,
      previewComponent
    }
  })
}))

function onClick(widget: {
  route: string;
  path: string;
  options: Options;
}) {

  emit('onClickToWidget', {
    route: widget.route,
    title: widget.options.name
  })

  parent.postMessage({
    type: 'widget-click',
    route: widget.route,
    title: widget.options.name
  }, '*')
}

</script>


<style lang="scss" scoped>
.collections {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.collection {
  h2 {
    font-size: 1.5em;
    margin: 0.2em 0;
  }

  .collection-content {
    max-width: 1200px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
    grid-auto-rows: 150px;

    @media screen and (max-width: 440px) {
      grid-auto-rows: auto;
      grid-template-columns: 1fr;
    }


    .widget-container {
      padding: 20px;
      background: #353535;
      color: white;
      border-radius: 20px;
      position: relative;

      &.error {
        background: rgb(97, 70, 70);
      }

      .beta {
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 5px 10px;
        border-radius: 5px;

        font-size: 1em;
        font-weight: bold;

        background: #353535d9;
        border: 2px solid rgb(255, 162, 0);
        color: rgb(255, 162, 0);
        box-shadow: 0 0 10px #00000037;

        transform: rotate(5deg);
      }
    }
  }
}
</style>