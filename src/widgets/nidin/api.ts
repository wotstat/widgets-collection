import { SpecializationTag } from "@/components/equipment/equipment"


export namespace NidinTankEquipment {
  export const URL = 'https://nidin.ru/table/equipment/tankEquipment.json'

  export type EquipmentSet = {
    instructionSlot: { index: number | null }[]
    equipmentSlots: { index: number | null }[]
  }

  export type RoleSlot = 'firepower' | 'mobility' | 'scouting' | 'survivability'

  export function roleSlotToSpecialization(roleslot: RoleSlot): SpecializationTag {
    switch (roleslot) {
      case 'firepower':
      case 'mobility':
      case 'survivability': return roleslot
      case 'scouting': return 'stealth'
    }
  }

  export type Tank = {
    id: string
    roleslot_2?: 'firepower' | 'mobility' | 'scouting' | 'survivability'
    equipment: {
      Set1: EquipmentSet
      Set2: EquipmentSet
    }
  }

  export type Data = {
    tanks: Tank[]
    version_ru: string
  }
}

export namespace NidinTankModifications {
  export const URL = 'https://nidin.ru/table/pairModifications/pairModifications.json'

  export type Modification = string

  export type Tank = {
    id: string
    pairM: Modification
  }

  export type Data = {
    tanks: Tank[]
    version_ru: string
  }
}