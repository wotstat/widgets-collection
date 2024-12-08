
import { onUnmounted, provide, ref, shallowRef } from 'vue';
import { WidgetSDK, type State, WidgetMetaTags, Trigger, I18n, KeyCodes, WidgetsSdkData, setupStyles } from '../../../wotstat-widgets-sdk/lib/main';
// import { WidgetSDK, type State, WidgetMetaTags, Trigger, I18n, KeyCodes, WidgetsSdkData, setupStyles } from 'wotstat-widgets-sdk';

export { WidgetMetaTags, I18n, type KeyCodes, type Trigger, setupStyles }


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
  })
  onUnmounted(() => unmount())
  return stateRef
}

export function useReactiveTrigger<T>(trigger: Trigger<T>, callback: (t: T) => void) {
  const unmount = trigger.watch(callback)
  onUnmounted(() => unmount())
}