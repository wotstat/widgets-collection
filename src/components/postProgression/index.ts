type RolePostProgression = {
  tree: {
    steps: {
      id: number
      level: number
      action_type: 'feature' | 'modification' | 'pair_modification'
      action_value: string
    }[]

    pairs: {
      id: string
      first_name: string
      second_name: string
    }[]

    mods: {
      id: number
      name_id: string
      icon: string
    }[]
  }
}

const iconByName = {
  'role_ATSPG_assault_pair_5_2': 'improvedSpeedIndicatorBackwards',
  'role_ATSPG_pair_2_2': 'improvedScope',
  'role_ATSPG_pair_2_1': 'improvedAimingHandling',
  'role_ATSPG_pair_1_1': 'improvedChassisDurability',
  'role_ATSPG_assault_pair_4_1': 'increasedThickness',
  'role_ATSPG_pair_1_2': 'betterFriction',
  'role_ATSPG_assault_pair_5_1': 'improvedSelfRepairingTracks',
  'role_ATSPG_pair_3_2': 'improvedObservationDevice',
  'role_ATSPG_pair_3_1': 'improvedMuzzleBreak',
  'role_ATSPG_assault_pair_4_2': 'improvedGunBreech',
  'role_ATSPG_sniper_pair_5_2': 'improvedAimingHandling',
  'role_ATSPG_sniper_pair_5_1': 'improvedEnginePower',
  'role_ATSPG_sniper_pair_4_2': 'improvedScope',
  'role_ATSPG_sniper_pair_4_1': 'improvedGunBreech',
  'role_ATSPG_support_pair_4_1': 'improvedAimingHandling',
  'role_ATSPG_support_pair_4_2': 'improvedGunBreech',
  'role_ATSPG_support_pair_5_2': 'increasedThickness',
  'role_ATSPG_support_pair_5_1': 'improvedSpeedIndicatorBackwards',
  'role_HT_assault_pair_4_1': 'improvedSpallingResistance',
  'role_HT_assault_pair_4_2': 'improvedSpeedIndicator',
  'role_heavyTank_pair_2_1': 'improvedScope',
  'role_heavyTank_pair_3_2': 'improvedObservationDevice',
  'role_heavyTank_pair_1_1': 'additionalGrousers',
  'role_HT_assault_pair_5_1': 'reinforcedInteriorModules',
  'role_heavyTank_pair_3_1': 'improvedSpallingResistance',
  'role_heavyTank_pair_1_2': 'betterFriction',
  'role_heavyTank_pair_2_2': 'improvedAimingHandling',
  'role_HT_assault_pair_5_2': 'improvedTurretTurningWheels',
  'role_HT_break_pair_5_1': 'increasedThickness',
  'role_HT_break_pair_5_2': 'improvedChassisStability',
  'role_HT_break_pair_4_1': 'improvedSpeedIndicator',
  'role_HT_break_pair_4_2': 'improvedTurretTurningWheels',
  'role_HT_support_pair_4_2': 'improvedGunBreech',
  'role_HT_support_pair_4_1': 'improvedSpeedIndicatorBackwards',
  'role_HT_support_pair_5_1': 'increasedThickness',
  'role_HT_support_pair_5_2': 'improvedAimingHandling',
  'role_HT_universal_pair_4_2': 'improvedTurretTurningWheels',
  'role_HT_universal_pair_5_2': 'improvedChassisStability',
  'role_HT_universal_pair_5_1': 'improvedSpallingResistance',
  'role_HT_universal_pair_4_1': 'improvedSpeedIndicatorBackwards',
  'role_lightTank_pair_1_1': 'improvedEnginePower',
  'role_LT_universal_pair_5_2': 'improvedSharpnessVisor',
  'role_LT_universal_pair_4_2': 'improvedObservationDevice',
  'role_lightTank_pair_2_1': 'improvedGunBreech',
  'role_LT_universal_pair_5_1': 'improvedReflexScopes',
  'role_lightTank_pair_3_1': 'improvedSpallingResistance',
  'role_LT_universal_pair_4_1': 'improvedLightFilters',
  'role_lightTank_pair_3_2': 'improvedSpeedIndicatorBackwards',
  'role_lightTank_pair_1_2': 'improvedSpeedIndicator',
  'role_lightTank_pair_2_2': 'improvedScope',
  'role_LT_wheeled_pair_5_1': 'increasedSensitivityOptics',
  'role_LT_wheeled_pair_4_2': 'improvedGunBreech',
  'role_LT_wheeled_pair_4_1': 'reinforcedStructure',
  'role_LT_wheeled_pair_5_2': 'improvedSelfRepairingWheels',
  'role_mediumTank_pair_1_2': 'betterFriction',
  'role_mediumTank_pair_3_2': 'improvedLightFilters',
  'role_MT_assault_pair_5_1': 'improvedObservationDevice',
  'role_MT_assault_pair_4_2': 'improvedAimingHandling',
  'role_mediumTank_pair_1_1': 'reinforcedInteriorModules',
  'role_mediumTank_pair_3_1': 'improvedSpeedIndicatorBackwards',
  'role_mediumTank_pair_2_2': 'improvedScope',
  'role_MT_assault_pair_5_2': 'improvedEnginePower',
  'role_MT_assault_pair_4_1': 'increasedThickness',
  'role_mediumTank_pair_2_1': 'improvedChassisStability',
  'role_MT_sniper_pair_5_2': 'improvedAimingHandling',
  'role_MT_sniper_pair_4_1': 'improvedGunBreech',
  'role_MT_sniper_pair_5_1': 'improvedEnginePower',
  'role_MT_sniper_pair_4_2': 'improvedScope',
  'role_MT_support_pair_5_2': 'improvedObservationDevice',
  'role_MT_support_pair_4_2': 'improvedAimingHandling',
  'role_MT_support_pair_4_1': 'improvedGunBreech',
  'role_MT_support_pair_5_1': 'improvedSpeedIndicator',
  'role_MT_universal_pair_4_1': 'improvedSpeedIndicator',
  'role_MT_universal_pair_4_2': 'improvedObservationDevice',
  'role_MT_universal_pair_5_2': 'improvedSelfRepairingTracks',
  'role_MT_universal_pair_5_1': 'improvedChassisDurability',
  'role_SPG_pair_5_2': 'improvedAimingHandling',
  'role_SPG_pair_3_2': 'improvedTurretRingStability',
  'role_SPG_pair_2_1': 'improvedSpeedIndicator',
  'role_SPG_pair_2_2': 'improvedMuzzleBreak',
  'role_SPG_pair_1_2': 'improvedEnginePower',
  'role_SPG_pair_3_1': 'improvedChassisStability',
  'role_SPG_pair_5_1': 'increasedThickness',
  'role_SPG_pair_1_1': 'improvedChassisStability',
  'role_SPG_pair_4_2': 'improvedScope',
  'role_SPG_pair_4_1': 'improvedGunBreech',
  'role_HT_flame_pair_2_1': 'reinforcedInteriorModules',
  'role_HT_flame_pair_2_2': 'betterFriction',
  'role_HT_flame_pair_4_1': 'improvedSpallingResistance',
  'role_HT_flame_pair_4_2': 'increasedThickness',
  'role_HT_flame_pair_5_1': 'improvedObservationDevice',
  'role_HT_flame_pair_5_2': 'improvedEnginePower',
  'role_XI_pair_1_1': 'reinforcedInteriorModules',
  'role_XI_pair_1_2': 'improvedTurretRingStability',
  'role_XI_pair_2_1': 'improvedChassisDurability',
  'role_XI_pair_2_2': 'improvedAimingHandling',
  'role_XI_pair_3_1': 'increasedThickness',
  'role_XI_pair_3_2': 'improvedChassisStability',
  'role_XI_279_pair_4_1': 'reinforcedStructure',
  'role_XI_279_pair_4_2': 'improvedObservationDevice',
  'role_XI_279_pair_5_1': 'improvedGunBreech',
  'role_XI_279_pair_5_2': 'improvedScope',
  'role_XI_MBT_B_pair_4_1': 'improvedSpeedIndicator',
  'role_XI_MBT_B_pair_4_2': 'improvedScope',
  'role_XI_MBT_B_pair_5_1': 'improvedObservationDevice',
  'role_XI_MBT_B_pair_5_2': 'improvedMuzzleBreak',
  'role_XI_BZT_70_pair_4_1': 'reinforcedStructure',
  'role_XI_BZT_70_pair_4_2': 'improvedSpeedIndicatorBackwards',
  'role_XI_BZT_70_pair_5_1': 'improvedEnginePower',
  'role_XI_BZT_70_pair_5_2': 'improvedScope'

}

type Glob = { default: string }
const pngMap = ([k, v]: [string, { default: any }]) => [k.match(/([^\/]+)\.png$/)![1], v.default] as const
const iconPackForGlobs = (glob: Record<string, Glob>) => new Map(Object.entries(glob).map(pngMap))

const iconPack = {
  24: iconPackForGlobs(import.meta.glob<Glob>('./assets/24x24/*.png', { eager: true })),
  80: iconPackForGlobs(import.meta.glob<Glob>('./assets/80x80/*.png', { eager: true })),
  100: iconPackForGlobs(import.meta.glob<Glob>('./assets/100x100/*.png', { eager: true })),
  120: iconPackForGlobs(import.meta.glob<Glob>('./assets/120x120/*.png', { eager: true })),
} as const


export function getIconNameByTag(tag: string) {
  return tag in iconByName ? iconByName[tag as keyof typeof iconByName] : null
}

export function getIconUrlByTag(tag: string, enabled: boolean = true, resolution: keyof typeof iconPack = 100) {
  const pack = iconPack[resolution]
  const iconName = getIconNameByTag(tag)
  if (!iconName) return pack.get('improvedScope')
  const icon = pack.get(iconName + (enabled ? '' : '_disabled'))
  return icon
}

export function getIconUrlByName(name: string, enabled: boolean = true, resolution: keyof typeof iconPack = 100) {
  const pack = iconPack[resolution]
  const icon = pack.get(name + (enabled ? '' : '_disabled'))
  return icon
}