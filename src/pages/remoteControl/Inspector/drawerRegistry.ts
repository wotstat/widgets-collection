import { Component, inject, reactive, shallowReactive } from 'vue'

export type DrawerComponent = Component | (() => Component)  // or define a stricter type

function createDrawerRegistry() {
  const map = shallowReactive(new Map<string, DrawerComponent>())
  return {
    register(name: string, comp: DrawerComponent) {
      map.set(name, comp)
    },
    resolve(name: string) {
      return map.get(name)
    }
  }
}

export const drawerRegistry = createDrawerRegistry()


import StringDrawer from './drawers/StringDrawer.vue'
import OptionsDrawer from './drawers/OptionsDrawer.vue'
import NumberDrawer from './drawers/NumberDrawer.vue'
import CheckboxDrawer from './drawers/CheckboxDrawer.vue'


drawerRegistry.register('string', StringDrawer)
drawerRegistry.register('number', NumberDrawer)
drawerRegistry.register('boolean', CheckboxDrawer)
drawerRegistry.register('select', OptionsDrawer)