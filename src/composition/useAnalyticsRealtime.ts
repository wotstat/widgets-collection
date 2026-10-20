import { useWebSocket, type WebSocketStatus } from '@vueuse/core'
import { computed, shallowRef, toValue, watch, type MaybeRefOrGetter, type ShallowRef } from 'vue'
import { ANALYTICS_REALTIME_URL } from '@/utils/externalUrl'

function numberProcessor(value: unknown) {
  return Number(value)
}

function jsonProcessor(value: unknown) {
  try {
    return JSON.parse(String(value))
  } catch {
    return null
  }
}

export type ChannelsTypes = {
  time: number
  totalEvents: number
  comp7LastRecalculation: Record<string, {
    day: string
    recalculation: string
    daily?: { day: string, recalculation: string }
  }> | null
  battleResult: { id: string, battleMode: string, playerName: string, region: string }[] | null
  comp7Info: { id: string, playerName: string, region: string, rating: number }[] | null
}

type Channels = keyof ChannelsTypes
type ChannelKey = Channels | string & {}
type Result<T> = { data: ShallowRef<T>, hasData: ShallowRef<boolean>, status: ShallowRef<WebSocketStatus> }

const defaults: Partial<ChannelsTypes> = { time: 0, totalEvents: 0 }
const processors: Record<Channels, (value: unknown) => unknown> = {
  time: numberProcessor,
  totalEvents: numberProcessor,
  comp7LastRecalculation: jsonProcessor,
  battleResult: jsonProcessor,
  comp7Info: jsonProcessor,
}

function getChannelPath(channel: MaybeRefOrGetter<ChannelKey>) {
  return toValue(channel).split('?')[0] as Channels
}

export function useAnalyticsRealtime<K extends Channels>(channel: MaybeRefOrGetter<K>): Result<ChannelsTypes[K]>
export function useAnalyticsRealtime<D>(channel: MaybeRefOrGetter<ChannelKey>, defaultValue: D, onDataChange?: (data: D) => void): Result<D>
export function useAnalyticsRealtime<D>(channel: MaybeRefOrGetter<ChannelKey>): Result<D | null>
export function useAnalyticsRealtime<D = unknown>(
  channel: MaybeRefOrGetter<ChannelKey>,
  defaultValue?: D,
  onDataChange?: (data: D) => void,
): Result<D | null> {
  const getDefault = () => (defaultValue ?? defaults[getChannelPath(channel)] ?? null) as D | null
  const result = shallowRef<D | null>(getDefault())
  const hasData = shallowRef(false)

  const realtimeUrl = computed(() => {
    const url = new URL(`${ANALYTICS_REALTIME_URL.replace(/\/$/, '')}/${toValue(channel)}`)
    if (url.protocol === 'https:') url.protocol = 'wss:'
    else if (url.protocol === 'http:') url.protocol = 'ws:'
    return url.href
  })

  function reset() {
    result.value = getDefault()
    hasData.value = false
  }

  const { status } = useWebSocket(realtimeUrl, {
    autoReconnect: { delay: 5000 },
    heartbeat: { message: 'ping', responseMessage: 'pong', interval: 5000, pongTimeout: 5000 },
    onConnected: reset,
    onMessage(socket, event) {
      if (event.data === 'pong' || socket.url !== realtimeUrl.value) return

      const processor = processors[getChannelPath(channel)]
      const value = processor ? processor(event.data) : event.data
      result.value = (value ?? getDefault()) as D | null
      hasData.value = value !== null && value !== undefined
    },
  })

  watch(() => toValue(channel), reset, { flush: 'sync' })
  watch(result, value => {
    if (value !== null && value !== undefined) onDataChange?.(value)
  })

  return { data: result, hasData, status }
}
