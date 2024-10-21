import { WidgetsRelay } from "@/utils/widgetsRelay";
import { computed, MaybeRefOrGetter, ref, shallowRef, toValue, triggerRef, watch } from "vue";

export function useReactiveRelayState<T>(relay: MaybeRefOrGetter<WidgetsRelay>, name: string, defaultValue: T) {

  const relayState = shallowRef(toValue(relay).createState(name, defaultValue))
  const all = shallowRef(new Map<string, T>())

  watch(() => toValue(relay), relay => {
    relayState.value = relay.createState(name, relayState.value.value)
  })


  for (const [key, val] of relayState.value.all) {
    all.value.set(key, structuredClone(val))
  }

  let unsubscribe: (() => void) | undefined
  watch(relayState, state => {
    unsubscribe?.()
    unsubscribe = state.subscribe((uuid, newValue) => {
      if (newValue === undefined) all.value.delete(uuid)
      else all.value.set(uuid, structuredClone(newValue))
      triggerRef(all)
    })
  })

  const lastValue = shallowRef(relayState.value.value)
  const state = computed({
    get() {
      return lastValue.value
    },
    set(newValue: T) {
      lastValue.value = structuredClone(newValue)
      all.value.set(relayState.value.uuid, newValue)
      triggerRef(all)
      relayState.value.value = newValue
    }
  })

  return {
    all, state, trigger: () => {
      lastValue.value = structuredClone(lastValue.value)
      all.value.set(relayState.value.uuid, lastValue.value)
      triggerRef(all)
      relayState.value.value = structuredClone(lastValue.value)
    }
  }

}