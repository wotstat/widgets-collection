import { computed, toValue, WatchSource } from "vue";

const nicknamesMap: { [key: string]: string } = {
  "justunick": "Unick",
  "pbody_iwnl_ ": "Pbody",
  "mrpunisher_": "Punisher",
  "kolibria_live": "Kolibria",
  "9l_y_mambl_balerina": "Balerina",
  "phantomic__gtua": "PHANTOMIC",
  "mirash_av_press": "Mirash",
  "keterwind": "KETER",
  "shamanskytv_ vkplay": "Shamansky",
  "pykobodutejib": "PYKAB",
  "romany05_pres": "Romany05"
} as const

export function playerNameProcessor(name: string | undefined) {
  if (!name) return undefined

  if (nicknamesMap[name.toLocaleLowerCase()]) return nicknamesMap[name.toLocaleLowerCase()]

  const removeParts = [
    '_Press',
    'Press'
  ]

  let result = name
  for (const removePart of removeParts) result = result.replace(removePart, '')

  return result.trim()
}

export function usePlayerNameProcessor(value: WatchSource<string | undefined>) {
  return computed(() => playerNameProcessor(toValue(value)))
}