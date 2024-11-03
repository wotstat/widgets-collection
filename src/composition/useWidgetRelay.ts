import { WidgetsRelay } from "@/utils/widgetsRelay";
import { useRoute } from "vue-router";
import { v4 as uuidv4 } from 'uuid';
import { computed, MaybeRefOrGetter, shallowRef, toValue } from "vue";
import { watch } from "vue";
import { useReactiveState, useWidgetSdk } from "./widgetSdk";

export function useWidgetRelay(postfix: string) {
  const route = useRoute();
  const uuid = uuidv4()

  console.log(`Setup relay for ${route.path}:${postfix}`);
  const relay = new WidgetsRelay({
    channel: `${route.path}:${postfix}`,
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
    console.log(`Setup relay for ${route.path}:${postfix}`);

    return new WidgetsRelay({
      channel: `${route.path}:${postfix}`,
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

export function usePlatoonWidgetRelay(postfix: MaybeRefOrGetter<string | undefined>) {
  const { sdk } = useWidgetSdk();

  const platoonSlots = useReactiveState(sdk.data.platoon.slots)
  const playerName = useReactiveState(sdk.data.player.name)
  const platoonId = computed(() => platoonSlots.value?.filter(t => t?.name)
    .map(t => t?.name)
    .toSorted()
    .join(',') || playerName.value || uuidv4())

  const relayPostfix = computed(() => {
    const postfixValue = toValue(postfix)
    if (postfixValue) return postfixValue
    return (platoonId.value || 'default') + (postfixValue ? `|${postfixValue}` : '')
  })
  return useReactiveWidgetRelay(relayPostfix)
}