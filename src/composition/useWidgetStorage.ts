import { pausableWatch, RemovableRef, useLocalStorage } from "@vueuse/core";
import { useRoute } from "vue-router";
import { useQueryParams } from "./useQueryParams";
import { useReactiveState, useWidgetSdk } from "./widgetSdk";
import { computed, onUnmounted, ref, Ref, shallowRef, watch } from "vue";

function syncRef(a: Ref<any>, b: Ref<any>) {
  const rtl = pausableWatch(b, v => {
    lrt.pause()
    a.value = v
    lrt.resume()
  }, { deep: true })

  const lrt = pausableWatch(a, v => {
    rtl.pause()
    b.value = v
    rtl.resume()
  }, { deep: true, immediate: true })

  return () => {
    lrt.stop()
    rtl.stop()
  }

}

export function useWidgetStorage<T>(postfix: string, defaultValue: T, options?: {
  preventClearData?: boolean
  alwaysClearDataAvailable?: boolean
  groupByPlayerId?: boolean
}) {
  const route = useRoute();
  const { saveKey } = useQueryParams({ saveKey: { type: String, default: '' } })
  const { sdk } = useWidgetSdk();

  const playerId = useReactiveState(sdk.data.player.id)
  const value = ref<T>(structuredClone(defaultValue))

  let lastHandle: ReturnType<typeof syncRef> | null = null

  const groupById = options?.groupByPlayerId === true


  if (groupById) {
    watch(playerId, id => {
      lastHandle?.()

      if (!id) return

      lastHandle = syncRef(useLocalStorage(`${route.path}_${saveKey}_${id}_${postfix}`, defaultValue), value)
    }, { immediate: true })
  } else {
    lastHandle = syncRef(useLocalStorage(`${route.path}_${saveKey}_${postfix}`, defaultValue), value)
  }


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