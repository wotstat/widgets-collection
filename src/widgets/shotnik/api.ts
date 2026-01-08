import { SpecializationTag } from "@/components/equipment/equipment"


export namespace ShotnikTankEquipment {
  export const URL = 'https://shotnik.pro/static/setups.json'

  export type Pair = [index: number, modification: number]
  export type EquipmentsGroup = number[]

  export type Setup = {
    pairs: Pair[],
    groups: EquipmentsGroup[],
  }

  export type Data = {
    [tag: string]: Setup
  }

  const roleSlotsConstraints = {
    'heavyTank': ['mobility', 'firepower'],
    'mediumTank': ['stealth', 'survivability'],
    'lightTank': ['mobility', 'firepower'],
    'AT-SPG': ['stealth', 'survivability'],
    'SPG': ['stealth', 'survivability'],
  }

  export function roleSlotToSpecialization(roleslot: number, vehicleType: string): SpecializationTag {
    return roleSlotsConstraints[vehicleType as keyof typeof roleSlotsConstraints][roleslot] as SpecializationTag
  }

}