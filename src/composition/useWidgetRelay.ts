import { useRoute } from "vue-router";
import { v4 as uuidv4 } from 'uuid';
import { computed, MaybeRefOrGetter, shallowRef, toValue } from "vue";
import { watch } from "vue";
import { useReactiveState, useWidgetSdk, WidgetsRelay } from "./widgetSdk";
import { RELAY_URL } from "@/utils/externalUrl";

export function useWidgetRelay(postfix: string) {
  const route = useRoute();
  const uuid = uuidv4()

  const relay = new WidgetsRelay({
    url: RELAY_URL,
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
    return new WidgetsRelay({
      url: RELAY_URL,
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
  const playerId = useReactiveState(sdk.data.player.id)

  const platoonId = computed(() => {
    if (!platoonSlots.value || platoonSlots.value.filter(Boolean).length === 0)
      return playerId.value == undefined ? `id:${uuidv4()}` : `id:${playerId.value}`

    return platoonSlots.value
      .filter(t => t)
      .map(slot => `id:${slot!.dbid}`)
      .sort()
      .join('_')
  })

  const relayPostfix = computed(() => {
    const postfixValue = toValue(postfix)
    if (postfixValue) return postfixValue

    return platoonId.value
  })

  return useReactiveWidgetRelay(relayPostfix)
}