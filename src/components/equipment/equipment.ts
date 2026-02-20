import { STATIC_URL } from '@/utils/externalUrl'
import { LONG_CACHE_SETTINGS, queryComputed } from '@/utils/db'
import { computed } from 'vue'

export type SpecializationTag = 'firepower' | 'mobility' | 'stealth' | 'survivability'

export type OptionalDevice = {
  tag: string,
  id: number,
  tags: string[],
  icon: string,
  archetype: string,
}

export type Equipment = {
  tag: string,
  id: number,
  tags: string[],
  icon: string,
}

type Game = 'mt' | 'wot'

const data = queryComputed<{
  region: string,
  tag: string,
  id: number,
  tags: string[],
  archetype: string,
  icon: string,
  type: 'device' | 'equipment'
}>(
  () => `
    select region, tag, id, tags, icon, archetype, 'device' as type from OptionalDevicesLatest where region in ('RU', 'EU')
    union all
    select region, tag, id, tags, icon, '', 'equipment' as type from EquipmentsLatest where region in ('RU', 'EU')
  `,
  { settings: LONG_CACHE_SETTINGS }
)

function getDataTagBy<T>(type: 'device' | 'equipment', game: Game) {
  return new Map<string, T>(
    data.value?.data
      .filter(t => t.type == type && (game == 'mt' && t.region == 'RU' || game == 'wot' && t.region == 'EU'))
      .map(e => [e.tag, e as any as T]) ?? []
  )
}

function getDataIdBy<T>(type: 'device' | 'equipment', game: Game) {
  return new Map<number, T>(
    data.value?.data
      .filter(t => t.type == type && (game == 'mt' && t.region == 'RU' || game == 'wot' && t.region == 'EU'))
      .map(e => [e.id, e as any as T]) ?? []
  )
}

const deviceByTag = computed(() => ({ 'wot': getDataTagBy<OptionalDevice>('device', 'wot'), 'mt': getDataTagBy<OptionalDevice>('device', 'mt') }))
const deviceById = computed(() => ({ 'wot': getDataIdBy<OptionalDevice>('device', 'wot'), 'mt': getDataIdBy<OptionalDevice>('device', 'mt') }))

const equipmentByTag = computed(() => ({ 'wot': getDataTagBy<Equipment>('equipment', 'wot'), 'mt': getDataTagBy<Equipment>('equipment', 'mt') }))
const equipmentById = computed(() => ({ 'wot': getDataIdBy<Equipment>('equipment', 'wot'), 'mt': getDataIdBy<Equipment>('equipment', 'mt') }))

export function isDeviceTag(tag: string, game: Game = 'mt') {
  return computed(() => deviceByTag.value[game].has(tag))
}

export function isEquipmentTag(tag: string, game: Game = 'mt') {
  return computed(() => equipmentByTag.value[game].has(tag))
}

function deviceUrl(icon: string, hd?: boolean, game: Game = 'mt') {
  return hd ?
    `${STATIC_URL}/${game}/latest/optionalDevices/medium/${icon}.webp` :
    `${STATIC_URL}/${game}/latest/optionalDevices/small/${icon}.webp`
}

const ICON_RENAME_MAP: Record<string, string> = {
  'naturalCover': 'camouflage'
}
function skillUrl(icon: string, hd?: boolean, game: Game = 'mt') {
  const renamedIcon = ICON_RENAME_MAP[icon] ?? icon

  return hd ?
    `${STATIC_URL}/${game}/latest/skills/medium/${renamedIcon}.webp` :
    `${STATIC_URL}/${game}/latest/skills/small/${renamedIcon}.webp`
}

export function getDeviceIconByTag(tag: string, hd?: boolean, game: Game = 'mt') {
  return computed(() => {
    const iconName = deviceByTag.value[game].get(tag)?.icon ?? 'unknown'
    return deviceUrl(iconName, hd, game)
  })
}

export function isSkillTag(tag: string) {
  return computed(() => getEquipmentByTag(tag).value?.tags.includes('crewSkillBattleBooster') ?? false)
}

export function getEquipmentIconByTag(tag: string, hd?: boolean, game: Game = 'mt') {
  return computed(() => {
    const equipment = getEquipmentByTag(tag, game).value
    if (!equipment) return null

    const iconName = equipment.icon

    if (equipment.tags.includes('crewSkillBattleBooster')) return skillUrl(iconName, hd, game)
    return deviceUrl(iconName, hd, game)
  })
}

export function getEquipmentByTag(tag: string, game: Game = 'mt') {
  return computed(() => equipmentByTag.value[game].get(tag))
}

export function getEquipmentById(id: number, game: Game = 'mt') {
  return computed(() => equipmentById.value[game].get(id))
}

export function getDeviceByTag(tag: string, game: Game = 'mt') {
  return computed(() => deviceByTag.value[game].get(tag))
}

export function getDeviceById(id: number, game: Game = 'mt') {
  return computed(() => deviceById.value[game].get(id))
}

export function getBestAvailableDeviceUpgrade(tag: string, game: Game = 'mt') {
  return computed(() => {
    const device = getDeviceByTag(tag, game).value
    if (!device) return null

    const archetype = device.archetype
    if (!archetype) return device

    const devices = Array.from(deviceByTag.value[game].values())
      .filter(d => d.archetype === archetype)

    const deluxe = devices.find(d => d.tags.includes('deluxe'))
    if (deluxe) return deluxe

    const trophyUpgraded = devices.find(d => d.tags.includes('trophyUpgraded'))
    if (trophyUpgraded) return trophyUpgraded

    const trophyBasic = devices.find(d => d.tags.includes('trophyBasic'))
    if (trophyBasic) return trophyBasic

    if (devices.length > 0) return devices[0]
  })
}

type Transform = {
  scale?: number | { x: number, y: number }
  translate?: { x?: string, y?: string }
}

const scaleFixer: Record<string, Transform> = {
  'improvedVentilation': { scale: 1.25, translate: { y: '6%' } },
  'enhancedAimDrives': { scale: 0.8, translate: { y: '10%' } },
  'rammer': { scale: 1.1, translate: { y: '0%' } },
  'aimingStabilizer': { scale: 0.95, translate: { y: '2%', x: '-2%' } },
  'coatedOptics': { scale: 0.95, translate: { y: '5%' } },
  'additionalInvisibilityDevice': { scale: 0.95, },
  'modernizedDamageVentilation': { scale: 1.1, },
  'modernizedTankRammerSights': { scale: 1.1, },
  'improvedSights': { scale: 1, translate: { x: '3%' } },
  'camouflageNet': { scale: 1.15, translate: { y: '5%' } },
  'antifragmentationLining': { scale: 1.1 },
  'turbocharger': { scale: 1.15 },
}

const scaleFixerMap = new Map<string, Transform>(Object.entries(scaleFixer))

export function getTransformByDeviceTag(icon: string, hd?: boolean): Transform {
  if (!hd) return {}
  const withoutExtension = icon.split('/').pop()?.split('.').shift() ?? ''
  return scaleFixerMap.get(withoutExtension) ?? {}
}

export function getTransformString(transform: Transform): string {
  let result = ''
  if (transform.scale) {
    if (typeof transform.scale === 'number') {
      result += ` scale(${transform.scale})`
    } else {
      result += ` scale(${transform.scale.x}, ${transform.scale.y})`
    }
  }
  if (transform.translate) {
    result += ` translate(${transform.translate.x ?? 0}, ${transform.translate.y ?? 0})`
  }
  return result.trim()
}