import type { GrannyTournamentProps } from './define.widget'

export function uniqueTankTagsByName(rows: { tag: string, name: string }[]) {
  const tags = new Map<string, string>()
  const ambiguous = new Set<string>()

  for (const { tag, name } of rows) {
    if (ambiguous.has(name)) continue
    if (tags.has(name) && tags.get(name) !== tag) {
      tags.delete(name)
      ambiguous.add(name)
    } else tags.set(name, tag)
  }

  return tags
}

export function getReplayName(line: GrannyTournamentProps['bestBattles'][number], tankTags: ReadonlyMap<string, string>) {
  if (!line.date || (!line.tank && !line.tankTag)) return '???'

  const date = new Date(line.date)
  const YYYY = date.getFullYear()
  const MM = (date.getMonth() + 1).toString().padStart(2, '0')
  const DD = date.getDate().toString().padStart(2, '0')

  const HH = date.getHours().toString().padStart(2, '0')
  const mm = date.getMinutes().toString().padStart(2, '0')

  const datePrefix = `${YYYY}${MM}${DD}_${HH}${mm}`
  const tag = line.tankTag || (line.tank ? tankTags.get(line.tank) : undefined)

  if (!tag) return `${datePrefix} (${line.tank})`
  return `${datePrefix}_${tag.replace(':', '-')}`
}
