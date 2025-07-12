import { RemoteDebugConnection, WidgetsRemote } from "@/composition/widgetSdk";
import { computed, MaybeRefOrGetter, onUnmounted, ref, shallowRef, toValue, watch, WatchSource } from "vue";
import { Entry } from "./inspector/tree";
import { REMOTE_URL, REMOTE_URL_WS } from "@/utils/externalUrl";


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
  const status = ref<'connected' | 'disconnected' | 'connecting'>('disconnected')

  watch(channel, channel => {
    remote.value?.dispose()
    if (channel) {
      remote.value = new WidgetsRemote({ channel, url: REMOTE_URL_WS })
      remote.value.status.watch(s => status.value = s, { immediate: true })
    }
  }, { immediate: true })

  onUnmounted(() => {
    remote.value?.dispose()
    remote.value = null
  })

  return { remote, status }
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


export function useRemoteInspector(rdc: WatchSource<RemoteDebugConnection | null>, channel: WatchSource<string>, privateKey: MaybeRefOrGetter<string>) {

  const { remote: widgetsRemote, status: remoteStatus } = useWidgetsRemote(channel)
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

    if (diff.size === 0) return
    toValue<RemoteDebugConnection | null>(rdc)?.setState(Object.fromEntries(diff.entries()))
  })

  watch(rdc, rdc => {
    rdc?.isConnected.watch(connected => {
      if (!connected) return
      rdc.setState(Object.fromEntries(targetValue.value.entries()))
    })
  })

  const sending = ref(false);
  async function publish() {
    if (sending.value) return;
    sending.value = true;

    try {
      const response = await fetch(`${REMOTE_URL}/state?private-key=${toValue(privateKey)}`, {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(overrides.value.entries()))
      })

      const data = await response.json();
    }
    catch (error) {
      alert('Error sending data: ' + error);
      console.error('Error sending data:', error);
    }

    sending.value = false;
  }

  return { state: registered, remote, overrides, inspector, patch, remoteStatus, sending, publish }
}
