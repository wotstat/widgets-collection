import type { ClickHouseSettings } from '@clickhouse/client-web'

export type LocalizationDictionary = 'ArenasLocalizationDictionary' | 'VehiclesLocalizationDictionary'
  | 'LootboxesLocalizationDictionary' | 'ArtefactsLocalizationDictionary'

// dictGet is non-deterministic because dictionaries can be reloaded. Their names may be cached for 10 minutes.
export const LOCALIZATION_CACHE_SETTINGS = {
  use_query_cache: 1,
  query_cache_ttl: 600,
  query_cache_nondeterministic_function_handling: 'save'
} satisfies ClickHouseSettings

export function isLestaRegion(region: string | null | undefined) {
  return ['RU', 'CT', 'RPT', 'PT_RU'].includes(region?.toUpperCase() ?? '')
}

function sqlString(value: string) {
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`
}

function localizationLocales(region: string, locale?: string | null) {
  const fallback = isLestaRegion(region) ? 'RU' : region.toUpperCase() === 'CN' ? 'ZH_CN' : 'EN'
  const requested = locale?.trim().replace(/-/g, '_').toUpperCase() || fallback
  return [...new Set([requested, fallback])]
}

function localizedName(dictionary: LocalizationDictionary, region: string, locale?: string | null, nameColumn = 'name') {
  const names = localizationLocales(region, locale).map(language => {
    const value = `dictGetOrDefault('${dictionary}', '${nameColumn}', (${sqlString(region.toUpperCase())}, ${sqlString(language)}, tag), '')`
    return `nullIf(nullIf(nullIf(${value}, ''), '?empty?'), tag)`
  })

  return `coalesce(${names.join(', ')}, tag)`
}

export function selectArenaNames(region: string, locale?: string | null) {
  return `
    select id, ${localizedName('ArenasLocalizationDictionary', region, locale)} as name
    from (
      select id, argMax(tag, datetime) as tag
      from ArenasLatest
      where region = ${sqlString(region.toUpperCase())}
      group by id
    )
  `
}

export function selectVehicleNamesWithLevels(region: string, locale?: string | null) {
  return `
    select tag, level, ${localizedName('VehiclesLocalizationDictionary', region, locale, 'shortName')} as name
    from (
      select tag, argMax(level, datetime) as level
      from VehiclesLatest
      where region = ${sqlString(region.toUpperCase())}
      group by tag
    )
  `
}

export function selectLocalizationNames(dictionary: LocalizationDictionary, region: string, locale?: string | null, nameColumn: 'name' | 'shortName' = 'name') {
  const locales = localizationLocales(region, locale).reverse().map(sqlString).join(', ')
  const column = `localization.${nameColumn}`

  return `
    select tag, argMax(${column}, indexOf([${locales}], locale)) as name
    from ${dictionary} as localization
    where region = ${sqlString(region.toUpperCase())} and locale in (${locales})
      and ${column} not in ('', '?empty?', tag)
    group by tag
  `
}
