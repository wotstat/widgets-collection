import { useLocalStorage } from "@vueuse/core";
import { useRoute } from "vue-router";
import { useQueryParams } from "./useQueryParams";
import { useWidgetSdk } from "./widgetSdk";
import { computed, onUnmounted, watch } from "vue";

export function useWidgetStorage<T>(postfix: string, defaultValue: T, options?: {
  preventClearData?: boolean
  alwaysClearDataAvailable?: boolean
}) {
  const route = useRoute();
  const { saveKey } = useQueryParams({ saveKey: { type: String, default: '' } })
  const { sdk } = useWidgetSdk();

  const value = useLocalStorage(`${route.path}_${saveKey}_${postfix}`, defaultValue)

  const { setReadyToClearData, unsubscribe } = sdk.commands.onClearData(() => {
    if (options?.preventClearData) return
    value.value = structuredClone(defaultValue)
  })

  const isValueDefault = computed(() => typeof defaultValue === 'object' ? JSON.stringify(value.value) === JSON.stringify(defaultValue) : value.value == defaultValue)
  const isReadyToClear = computed(() => !options?.preventClearData && (!isValueDefault.value || options?.alwaysClearDataAvailable == true))
  watch(isReadyToClear, v => setReadyToClearData(v), { immediate: true })

  onUnmounted(() => unsubscribe())
  return value
}