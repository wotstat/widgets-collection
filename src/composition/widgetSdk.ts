
import { onUnmounted, provide, ref, ShallowRef, shallowRef, toValue, triggerRef, watch, WatchSource } from 'vue';
// import {
//   WidgetSDK, type State, WidgetMetaTags, Trigger, I18n, KeyCodes, WidgetsSdkData, setupStyles, WidgetsRelay,
//   WidgetsRemote, RemoteDebugConnection, SdkDebugConnection, RelayDebugConnection
// } from '../../../wotstat-widgets-sdk/lib/main';
import {
  type State, WidgetSDK, WidgetMetaTags, Trigger, I18n, KeyCodes, WidgetsSdkData, setupStyles, injectStylesheet,
  WidgetsRelay, WidgetsRemote, RemoteDebugConnection, SdkDebugConnection, RelayDebugConnection
} from 'wotstat-widgets-sdk';

export { WidgetMetaTags, I18n, type KeyCodes, type Trigger, setupStyles, injectStylesheet, WidgetsRelay, WidgetsRemote, RemoteDebugConnection, SdkDebugConnection, RelayDebugConnection }


let currentSdk: WidgetSDK<WidgetsSdkData> | null = null
let refCount = 0

export function useWidgetSdk() {
  if (currentSdk == null) {
    currentSdk = new WidgetSDK()
  }

  onUnmounted(() => {
    refCount--
    if (refCount == 0 && currentSdk != null) {
      console.log('destroying sdk');
      currentSdk.dispose()
      currentSdk = null
    }
  })

  const status = ref(currentSdk.status)
  currentSdk.onStatusChange(s => status.value = s)

  const res = { sdk: currentSdk, status }
  provide('sdk', res)

  refCount++
  return res;
}


export type SdkContext = ReturnType<typeof useWidgetSdk>

export function useReactiveState<T>(state: State<T>, onChange?: (t: T) => void) {
  const stateRef = shallowRef(state.value)
  const unmount = state.watch(t => {
    stateRef.value = t
    onChange?.(t)
  }, { immediate: true })
  onUnmounted(() => unmount())
  return stateRef
}

export function useReactiveTrigger<T>(trigger: Trigger<T>, callback: (t: T) => void) {
  const unmount = trigger.watch(callback)
  onUnmounted(() => unmount())
}


type BaseDebugConnection = RemoteDebugConnection | SdkDebugConnection | RelayDebugConnection
type WatchableValue<T> = {
  value: T;
  watch: (callback: (value: T) => void, options?: { immediate?: boolean }) => () => void;
}

export function useReactiveWatchableValue<T, B>(base: ShallowRef<B | null>, getter: (b: B) => WatchableValue<T>) {

  const result = shallowRef<T | null>(null)

  watch(base, b => {
    if (!b) {
      result.value = null
      return
    }

    result.value = getter(b).value

    const unwatch = getter(b).watch(value => {
      result.value = value
      triggerRef(result)
    }, { immediate: true })

    onUnmounted(() => unwatch())
  }, { immediate: true })

  return result
}

function useDebugConnection<T extends BaseDebugConnection>(frame: WatchSource<HTMLIFrameElement | null>, constructor: new (frame: HTMLIFrameElement) => T) {
  const debug = shallowRef<T | null>(null)
  const isConnected = useReactiveWatchableValue(debug, b => b.isConnected)

  watch(frame, _ => {
    debug.value?.dispose()
    if (toValue(frame)) {
      debug.value = new constructor(toValue(frame))
    }
  }, { immediate: true })

  onUnmounted(() => {
    debug.value?.dispose()
    debug.value = null
  })

  return { debug, isConnected }
}

export function useWidgetRemoteDebugConnection(frame: WatchSource<HTMLIFrameElement | null>) {
  const { debug, isConnected } = useDebugConnection(frame, RemoteDebugConnection)
  const bbox = useReactiveWatchableValue(debug, b => b.boundingBoxes)

  return { debug, isConnected, bbox }
}

export function useWidgetSdkDebugConnection(frame: WatchSource<HTMLIFrameElement | null>) {
  return useDebugConnection(frame, SdkDebugConnection)
}

export function useWidgetRelayDebugConnection(frame: WatchSource<HTMLIFrameElement | null>) {
  return useDebugConnection(frame, RelayDebugConnection)
}