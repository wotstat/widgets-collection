import { equipment, consumables } from './equipmentData'

export type EquipmentTag = typeof equipment[number]['id']
export type ConsumableTag = typeof consumables[number]['id']
export type SpecializationTag = 'firepower' | 'mobility' | 'stealth' | 'survivability'

export type Equipment = {
  id: EquipmentTag,
  index: number,
  name: string,
  desc: string,
  tags: string,
  icon: string,
  categories: string,
  factor: { type: string, desc: string, value: number }[],
}

export type Consumable = {
  id: ConsumableTag,
  icon: string,
  index: number,
  tags: string,
}

const equipmentById = new Map<EquipmentTag, Equipment>(equipment.map(e => [e.id, e as any as Equipment]))
const equipmentByIndex = new Map<number, Equipment>(equipment.map(e => [e.index, e as any as Equipment]))

const consumableById = new Map<ConsumableTag, Consumable>(consumables.map(e => [e.id, e as any as Consumable]))
const consumableByIndex = new Map<number, Consumable>(consumables.map(e => [e.index, e as any as Consumable]))

type Glob = { default: string }
const pngMap = ([k, v]: [string, { default: any }]) => [k.match(/([^\/]+)\.png$/)![1], v.default] as const

const equipmentsSd = new Map(Object.entries(import.meta.glob<Glob>('./assets/equipment/normal/*.png', { eager: true })).map(pngMap))
const equipmentsHd = new Map(Object.entries(import.meta.glob<Glob>('./assets/equipment/hd/*.png', { eager: true })).map(pngMap))

const skillsSd = new Map(Object.entries(import.meta.glob<Glob>('./assets/skills/normal/*.png', { eager: true })).map(pngMap))
const skillsHd = new Map(Object.entries(import.meta.glob<Glob>('./assets/skills/hd/*.png', { eager: true })).map(pngMap))

export function isEquipmentTag(tag: string): tag is EquipmentTag {
  return equipmentById.has(tag as EquipmentTag)
}

export function isConsumableTag(tag: string): tag is ConsumableTag {
  return consumableById.has(tag as ConsumableTag)
}

export function getEquipmentIconByTag(tag: EquipmentTag, hd?: boolean) {
  const iconName = equipmentById.get(tag)?.icon ?? 'unknown'
  return hd ? equipmentsHd.get(iconName) : equipmentsSd.get(iconName)
}

export function isSkillTag(tag: ConsumableTag) {
  return consumableById.get(tag)?.tags.includes('crewSkillBattleBooster') ?? false
}

export function getConsumableIconByTag(tag: ConsumableTag, hd?: boolean) {
  const consumable = consumableById.get(tag)
  if (!consumable) return null

  const iconName = consumable.icon

  if (consumable.tags.includes('crewSkillBattleBooster')) {
    return hd ? skillsHd.get(iconName) : skillsSd.get(iconName)
  }

  return hd ? equipmentsHd.get(iconName) : equipmentsSd.get(iconName)
}

export function getConsumableById(id: ConsumableTag) {
  return consumableById.get(id)
}

export function getConsumableByIndex(index: number) {
  return consumableByIndex.get(index)
}

export function getEquipmentById(id: EquipmentTag) {
  return equipmentById.get(id)
}

export function getEquipmentByIndex(index: number) {
  return equipmentByIndex.get(index)
}