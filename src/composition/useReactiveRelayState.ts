import { WidgetsRelay } from "./widgetSdk";
import { computed, MaybeRefOrGetter, ref, shallowRef, toValue, triggerRef, watch } from "vue";

export const passive = 'passive-reactive-relay-state' as const
type Passive = typeof passive

export function useReactiveRelayState<T>(relay: MaybeRefOrGetter<WidgetsRelay>, name: string, defaultValue: T | Passive) {

  const relayState = shallowRef(toValue(relay).createState(name, defaultValue))
  const all = shallowRef(new Map<string, T | Passive>())

  watch(() => toValue(relay), relay => {
    relayState.value = relay.createState(name, relayState.value.value)
  })


  for (const [key, val] of relayState.value.all) {
    all.value.set(key, structuredClone(val))
  }

  let unsubscribe: (() => void) | undefined

  watch(relayState, state => {
    unsubscribe?.()
    unsubscribe = state.watch((uuid, newValue) => {
      if (newValue === undefined) all.value.delete(uuid)
      else all.value.set(uuid, structuredClone(newValue))
      triggerRef(all)
    })
  }, { immediate: true })

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

  const publicAll = computed(() => new Map([...all.value.entries()].filter(([k, v]) => v != passive) as [string, T][]))

  return {
    all: publicAll, state, trigger: () => {
      lastValue.value = structuredClone(lastValue.value)
      all.value.set(relayState.value.uuid, lastValue.value)
      triggerRef(all)
      relayState.value.value = structuredClone(lastValue.value)
    }
  }

}