import { type KeyCodes } from "@/composition/widgetSdk";
import { useLocalStorage } from "@vueuse/core";
import { computed, inject, provide, Ref, ref, ShallowRef, watch, watchEffect } from "vue";

export const onAnyKeyPressKey = Symbol('pressedKeys')

export type KeyBindingSetting = [string, KeyCodes[] | null, KeyCodes[] | null]

export function useToggleKeyBinding(settings: KeyBindingSetting, defaultValue = true) {
  const visible = useLocalStorage('debug-widget-visible-' + settings[0], defaultValue)

  const pressed = inject<Ref<Set<string>>>(onAnyKeyPressKey)
  const isInBattle = inject<Ref<boolean>>('isInBattle')

  watch(pressed!.value, (newPressed) => {
    const keybinding = settings[isInBattle?.value ? 2 : 1]
    if (keybinding?.every(k => newPressed.has(k)) && keybinding.length === newPressed.size) {
      visible.value = !visible.value
    }
  })

  const localizedKeys = computed(() => {
    return settings[isInBattle?.value ? 2 : 1]?.map(k => k.replace('KEY_', '')).join('+') + (visible.value ? '' : ' [hidden]')
  })

  return { visible, localizedKeys }
}

export function provideFakeKeyBinding() {
  const pressed = ref(new Set<string>())
  const isInBattle = ref(false)

  provide(onAnyKeyPressKey, pressed)
  provide('isInBattle', isInBattle)
}