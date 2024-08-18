<template>
  <h1>Коллекция виджетов</h1>
  <hr>
  <input type="color" v-model="background">
  <input type="color" v-model="accent">
  <div class="collection" v-for="collection in collectionsWithWidgets">
    <h2>{{ collection.name }}</h2>
    <div class="collection-content">
      <div class="widget-container" v-for="widget in collection.widgets" :class="{ 'error': 'error' in widget }">
        <template v-if="'error' in widget">
          <div>
            {{ widget.error }}
          </div>
        </template>

        <Item v-else :name="widget.options.name" :description="widget.options.description"
          :hasSlot="widget.options.preview != null">
          <template v-if="'previewComponent' in widget">
            <component :is="widget.previewComponent" :isMiniPreview="true" />
          </template>
        </Item>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { getAllWidgetsRoutes, pathResolve } from '@/utils';
import Item from './Item.vue';
import { defineAsyncComponent } from 'vue';
import { collections } from '@/collections';
import { accent, background } from '@/composition/wotstatColors'
import { setupStyles } from "@/composition/widgetSdk";
setupStyles();

const widgets = getAllWidgetsRoutes()
const widgetsMap = new Map(widgets.map(w => ([w.route, w])))
const widgetPreviews = import.meta.glob('/src/widgets/**/*.vue')

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
    const previewComponent = widgetPreviews[previewPath] as any

    return {
      ...widget,
      previewComponent: defineAsyncComponent(previewComponent)
    }
  })
}))

</script>


<style lang="scss" scoped>
.collection {
  margin-bottom: 3em;

  h2 {
    font-size: 1.5em;
    margin: 0.2em 0;
  }

  .collection-content {
    max-width: 1200px;
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    grid-auto-rows: 150px;


    .widget-container {
      padding: 20px;
      background: #353535;
      color: white;
      border-radius: 20px;

      &.error {
        background: rgb(97, 70, 70);
      }
    }
  }
}
</style>