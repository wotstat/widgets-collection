
import { onUnmounted, shallowRef } from 'vue';
import { WidgetSDK, type State } from '../../../wotstat-widgets-sdk/lib/main';

export function useWidgetSdk() {
  const sdk = new WidgetSDK()

  onUnmounted(() => {
    console.log('destroying sdk');
    sdk.dispose()
  })

  return sdk;
}

export function useReactiveState<T>(state: State<T>) {
  const stateRef = shallowRef(state.value)
  const unmount = state.watch(t => stateRef.value = t)
  onUnmounted(() => unmount())
  return stateRef
}