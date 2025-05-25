import { RemoteDebugConnection, useWidgetRemoteDebugConnection, WidgetsRemote } from "@/composition/widgetSdk";
import { computed, onUnmounted, ref, shallowRef, toValue, triggerRef, watch, watchEffect, WatchSource } from "vue";
import { Entry } from "./Inspector/tree";


export type PossibleValues = NonNullable<ReturnType<WidgetsRemote['fullState']['value']['get']>>
export type State = NonNullable<ReturnType<RemoteDebugConnection['registeredStates']['value']['get']>>
export type RemoteStateType = State['type']
export function useRegisteredStates(rdc: WatchSource<RemoteDebugConnection | null>) {
  let lastWatch: (() => void) | null = null
  const registeredStates = ref(new Map<string, State>())

  watch(rdc, rdc => {
    if (!rdc) {
      registeredStates.value.clear()
      lastWatch?.()
      lastWatch = null
      return
    }

    registeredStates.value = new Map<string, State>(rdc.registeredStates.value)

    lastWatch?.()
    lastWatch = rdc.registeredStates.watch(t => {
      for (const [key, value] of t) registeredStates.value.set(key, value)
    })
  })

  onUnmounted(() => {
    lastWatch?.()
    lastWatch = null
    registeredStates.value.clear()
  })

  return registeredStates
}

export function useWidgetsRemote(channel: WatchSource<string>) {
  const remote = shallowRef<WidgetsRemote | null>(null)

  watch(channel, channel => {
    remote.value?.dispose()
    if (channel) {
      remote.value = new WidgetsRemote({ channel })
    }
  }, { immediate: true })

  onUnmounted(() => {
    remote.value?.dispose()
    remote.value = null
  })

  return remote
}

export function useWidgetsRemoteFullState(remote: WatchSource<WidgetsRemote | null>, onSync?: (key: string, value: any) => void) {
  const state = ref(new Map<string, PossibleValues>())
  watch(remote, remote => {
    if (!remote) {
      state.value.clear()
      return
    }

    state.value = new Map(remote.fullState.value)

    remote.onAnyChange.addListener(({ key, value }) => {
      if (value === undefined) state.value.delete(key)
      else state.value.set(key, value)
      onSync?.(key, value)
    })

  }, { immediate: true })

  return state
}


export function useInspector(rdc: WatchSource<RemoteDebugConnection | null>, channel: WatchSource<string>) {

  const widgetsRemote = useWidgetsRemote(channel)
  const registered = useRegisteredStates(rdc)
  const remote = useWidgetsRemoteFullState(widgetsRemote, onRemoteSync)
  const overrides = ref(new Map<string, any>())

  const targetValue = computed(() => {
    const map = new Map<string, any>()

    for (const [key, value] of registered.value)
      map.set(key, overrides.value.get(key) ?? remote.value.get(key) ?? value.value)

    return map
  })


  function onRemoteSync(key: string, value: any) {
    if (overrides.value.get(key) === value) {
      overrides.value.delete(key)
    }
  }

  function drawerForType(t: RemoteStateType) {
    if (t === 'string') return { drawer: 'string', meta: {} }
    if (t === 'number') return { drawer: 'number', meta: {} }
    if (t === 'boolean') return { drawer: 'boolean', meta: {} }
    if (t === 'color') return { drawer: 'color', meta: {} }
    if (typeof t === 'object' && t.type === 'select') return { drawer: 'select', meta: { variants: t.variants } }
    return { drawer: 'unknown', meta: {} }
  }

  const inspector = computed(() => {
    return [...registered.value.entries()].reduce((acc, [key, value]) => {
      const drawer = drawerForType(value.type)

      acc[key] = {
        value: targetValue.value.get(key),
        meta: {
          drawer: drawer.drawer,
          meta: drawer.meta
        },
      };

      return acc;
    }, {} as Record<string, Entry>);
  });


  function patch(key: string, value: any) {
    if (!registered.value.has(key)) return
    overrides.value.set(key, value)

    if (remote.value.get(key) == value || (!remote.value.has(key) && registered.value.get(key)?.value == value)) {
      overrides.value.delete(key)
    }
  }

  watch(targetValue, (t, old) => {
    const diff = new Map<string, any>()
    for (const [key, value] of t) {
      if (old.get(key) !== value) {
        diff.set(key, value)
      }
    }

    toValue<RemoteDebugConnection | null>(rdc)?.setState(Object.fromEntries(diff.entries()))
  })

  watch(rdc, rdc => {
    rdc?.isEnabled.watch(enabled => {
      if (!enabled) return
      rdc.setState(Object.fromEntries(targetValue.value.entries()))
    })
  })

  return { state: registered, remote, overrides, inspector, patch }
}
