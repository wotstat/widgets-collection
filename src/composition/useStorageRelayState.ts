import { RelayState, WidgetsRelay } from "@/utils/widgetsRelay";
import { useLocalStorage } from "@vueuse/core";
import { computed, ref, shallowRef, triggerRef, watch } from "vue";
import { useReactiveRelayState } from "./useReactiveRelayState";

export function useStorageRelayState<T>(relay: WidgetsRelay, name: string, storageKey: string, defaultValue: T) {
  const currentValue = useLocalStorage(storageKey, defaultValue, { listenToStorageChanges: false, shallow: true })

  const state = relay.createState(name, currentValue.value)
  const reactiveState = useReactiveRelayState(state)

  watch(reactiveState.state, value => {
    currentValue.value = value
  })

  return reactiveState
}