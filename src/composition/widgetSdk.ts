
import { onUnmounted, provide, ref, shallowRef } from 'vue';
import { WidgetSDK, type State, WidgetMetaTags } from '../../../wotstat-widgets-sdk/lib/main';

export { WidgetMetaTags }

export function useWidgetSdk() {
  const sdk = new WidgetSDK()

  onUnmounted(() => {
    console.log('destroying sdk');
    sdk.dispose()
  })

  const status = ref(sdk.status)
  sdk.onStatusChange(s => status.value = s)

  const res = { sdk, status }
  provide('sdk', res)

  return res;
}


export type SdkContext = ReturnType<typeof useWidgetSdk>

export function useReactiveState<T>(state: State<T>) {
  const stateRef = shallowRef(state.value)
  const unmount = state.watch(t => stateRef.value = t)
  onUnmounted(() => unmount())
  return stateRef
}