import { WidgetsRelay } from "@/utils/widgetsRelay";
import { useRoute } from "vue-router";
import { v4 as uuidv4 } from 'uuid';
import { MaybeRefOrGetter, shallowRef, toValue } from "vue";
import { watch } from "vue";

export function useWidgetRelay(postfix: string) {
  const route = useRoute();
  const uuid = uuidv4()

  const relay = new WidgetsRelay({
    channel: route.path + postfix,
    uuid
  })

  return {
    relay,
    uuid
  }
}

export function useReactiveWidgetRelay(postfix: MaybeRefOrGetter<string>) {
  const route = useRoute();
  const uuid = uuidv4()

  function setupRelay(postfix: string) {
    return new WidgetsRelay({
      channel: route.path + ':' + postfix,
      uuid
    })
  }

  const relay = shallowRef(setupRelay(toValue(postfix)))

  watch(() => toValue(postfix), postfix => {
    if (relay.value) relay.value.dispose()
    relay.value = setupRelay(postfix)
  })

  return {
    relay,
    uuid
  }
}