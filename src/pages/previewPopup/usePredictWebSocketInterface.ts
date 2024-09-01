import { useLocalStorage, useWebSocket } from "@vueuse/core";
import { watch } from "vue";

type Status = 'predict-open' | 'predict-close' | 'open' | 'close' | 'connecting' | 'error';
export function usePredictWebSocketInterface(url: string) {
  const status = useLocalStorage<Status>("predictWebSocketStatus", 'predict-close');
  const lastStatusSetTime = useLocalStorage<number>("predictWebSocketLastStatusSetTime", Date.now());

  let skipClose = false;

  if (Date.now() - lastStatusSetTime.value > 1000 * 60 * 60 * 3) {
    status.value = 'predict-close';
  }

  const ws = useWebSocket(url)
  setTimeout(() => {
    if (ws.status.value == 'CONNECTING') status.value = 'connecting';
  }, 500);

  window.addEventListener('beforeunload', e => skipClose = true)

  watch(ws.status, (t) => {
    if (t == 'OPEN') {
      status.value = 'open';
      lastStatusSetTime.value = Date.now();
      return
    }

    if (t == 'CLOSED') {
      if (skipClose)
        return
      status.value = 'close';
      lastStatusSetTime.value = Date.now();
    }

  }, { immediate: true });

  return {
    status,
    ws
  }
}