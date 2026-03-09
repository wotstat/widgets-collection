import { SpecializationTag } from '@/components/equipment/equipment'

export namespace NidinEquipmentApi {
  export function getUrl(tankId: string) {
    return `https://nidin.ru/api/tanks/${tankId}/configuration`
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

  export type EquipmentSet = {
    instruction?: number
    slots: number[]
  }

  export type Tank = {
    id: string
    pair_m: string
    role_slot_2?: 'firepower' | 'mobility' | 'scouting' | 'survivability'
    equipment: {
      set_1?: EquipmentSet
      set_2?: EquipmentSet
    }
  }
}