import { RelayState } from "@/utils/widgetsRelay";
import { computed, ref, shallowRef, triggerRef } from "vue";

export function useReactiveRelayState<T>(relayState: RelayState<T>) {

  const all = shallowRef(new Map<string, T>())

  for (const [key, val] of relayState.all) {
    all.value.set(key, structuredClone(val))
  }

  relayState.subscribe((uuid, newValue) => {
    if (newValue === undefined) all.value.delete(uuid)
    else all.value.set(uuid, structuredClone(newValue))
    triggerRef(all)
  })


  const lastValue = shallowRef(relayState.value)
  const state = computed({
    get() {
      return lastValue.value
    },
    set(newValue: T) {
      lastValue.value = structuredClone(newValue)
      all.value.set(relayState.uuid, newValue)
      triggerRef(all)
      relayState.value = newValue
    }
  })

  return {
    all, state, trigger: () => {
      lastValue.value = structuredClone(lastValue.value)
      all.value.set(relayState.uuid, lastValue.value)
      triggerRef(all)
      relayState.value = structuredClone(lastValue.value)
    }
  }
}