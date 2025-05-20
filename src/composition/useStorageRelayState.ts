import { useLocalStorage } from "@vueuse/core";
import { computed, onUnmounted, watch } from "vue";
import { useReactiveRelayState } from "./useReactiveRelayState";
import { useQueryParams } from "./useQueryParams";
import { useWidgetSdk, WidgetsRelay } from "./widgetSdk";
import { useRoute } from "vue-router";


export function useStorageRelayState<T>(relay: WidgetsRelay, stateKey: string, defaultValue: T, options?: {
  preventClearData?: boolean
  alwaysClearDataAvailable?: boolean
}) {
  const route = useRoute();
  const { saveKey } = useQueryParams({ saveKey: { type: String, default: '' } })
  const { sdk } = useWidgetSdk();

  const value = useLocalStorage(`${route.path}_${saveKey}_${stateKey}`, defaultValue, { listenToStorageChanges: false, shallow: true })
  const reactiveState = useReactiveRelayState(relay, stateKey, value.value)
  watch(reactiveState.state, value => value.value = value)

  const { setReadyToClearData, unsubscribe } = sdk.commands.onClearData(() => {
    if (options?.preventClearData) return
    reactiveState.state.value = structuredClone(defaultValue)
  })

  const isValueDefault = computed(() => typeof defaultValue === 'object' ? JSON.stringify(value.value) === JSON.stringify(defaultValue) : value.value == defaultValue)
  const isReadyToClear = computed(() => !options?.preventClearData && (!isValueDefault.value || options?.alwaysClearDataAvailable == true))
  watch(isReadyToClear, v => setReadyToClearData(v), { immediate: true })

  onUnmounted(() => unsubscribe())

  return reactiveState
}