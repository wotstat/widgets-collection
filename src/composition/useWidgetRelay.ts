import { WidgetsRelay } from "@/utils/widgetsRelay";
import { useRoute } from "vue-router";
import { v4 as uuidv4 } from 'uuid';

export function useWidgetRelay(postfix?: string) {
  const route = useRoute();
  const uuid = uuidv4()

  const relay = new WidgetsRelay({
    channel: route.path + (postfix ?? ''),
    uuid
  })

  return {
    relay,
    uuid
  }
}