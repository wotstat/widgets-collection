import { computed, toValue, WatchSource } from "vue";

const nicknamesMap: { [key: string]: string } = {} as const

export function playerNameProcessor(name: string | undefined) {
  if (!name) return undefined

  if (nicknamesMap[name.toLocaleLowerCase()]) return nicknamesMap[name.toLocaleLowerCase()]

  const removeParts = [
    '_Press',
    'Press',
    '_CHUCK',
    '_Chuck'
  ]

  let result = name
  for (const removePart of removeParts) result = result.replace(removePart, '')

  return result.trim()
}

export function usePlayerNameProcessor(value: WatchSource<string | undefined>) {
  return computed(() => playerNameProcessor(toValue(value)))
}