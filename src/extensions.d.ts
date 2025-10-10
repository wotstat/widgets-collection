import { State, Trigger } from "wotstat-widgets-sdk"

type Vector3 = { x: number, y: number, z: number, }

type OnLootboxOpen = {
  eventName: 'OnLootboxOpen',
  claimed: boolean,
  isOpenSuccess: boolean,
  openByTag: string,
  openCount: number,
  openGroup: string,
  rerollCount: number,
  playerName: string,
  region: string,
  containerTag: string,
  parsed: {
    credits: number
    gold: number
    freeXP: number
    crystal: number
    eventCoin: number
    bpcoin: number
    currencies: [string, amount: number][]

    premium: number
    premium_plus: number
    premium_vip: number

    addedVehicles: string[]
    rentedVehicles: [tankTag: string, rentType: string, rentValue: string][]
    compensatedVehicles: [tankTag: string, variant: 'rent' | 'normal', gold: number][]

    slots: number
    berths: number

    items: [itemTag: string, count: number][]
    crewBooks: [bookTag: string, count: number][]

    boosters: [tag: string, time: number, value: number, count: number][]
    discounts: [tag: string, value: number][]
    equip: [tag: string, count: number][]

    lootboxesTokens: [tag: string, count: number][]
    bonusTokens: [tag: string, count: number][]
    extraTokens: [tag: string, count: number][]
    entitlements?: [tag: string, count: number][]

    customizations: [type: string, tag: string, count: number][]
    blueprints: [type: 'VEHICLE' | 'NATION' | 'UNIVERSAL', specification: string, count: number][]

    selectableCrewbook: [crewbookName: string][]

    toys: [toyTag: string, count: number][]
    compensatedToys: [toyTag: string, compensationCurrency: string, count: number][]

  },
  raw: string
}

type OnShot = {
  eventName: 'OnShot',
}

type OnBattleResult = {
  eventName: 'OnBattleResult',
}

declare global {
  interface WidgetsSdkExtensions {
    wotstat: {
      onShotBallisticEvent: Trigger<{
        gravity?: number,
        acceleration?: Vector3,
        gunPoint: Vector3,
        shellSpeed: number,
        tracerStart: Vector3,
        tracerVel: Vector3,
        clientMarkerPoint: Vector3,
        clientShotDispersion: number,
        serverMarkerPoint: Vector3,
        serverShotDispersion: number
      }>
      onEvent: Trigger<OnLootboxOpen | OnShot | OnBattleResult>
      version: State<string>
    }
  }
}