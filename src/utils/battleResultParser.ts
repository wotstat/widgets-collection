


type WotVehicle = {
  accountDBID: number
  kills: number
  damageDealt: number
  damageBlockedByArmor: number
  damageAssistedTrack: number
  damageAssistedStun: number
  damageAssistedSmoke: number
  damageAssistedRadio: number
  spotted: number

  credits: number
  capturePoints: number
  damageReceived: number
  damaged: number
  directHits: number
  lifeTime: number
  mileage: number
  shots: number
  xp: number
}

type Player = {
  avatar: {
    playerRank?: number,
  }
  bdid: number,
  clanAbbrev: string,
  clanDBID: number,
  name: string,
  prebattleID: number,
  realName: string,
  team: number,
}

function get<T>(obj: object | null, key: string) {
  return obj && key in obj ? obj[key as keyof typeof obj] as T : null;
}

function sum(key: string) {
  return (acc: number, value: any) => acc + value[key]
}


export function parseBattleResult(result: unknown) {
  if (typeof result !== 'object' || result === null) return null

  const arenaUniqueID = get<number>(result, 'arenaUniqueID')
  const players = get<object>(result, 'players')
  const personal = get<object>(result, 'personal')
  const vehicles = get<{ [key: number]: WotVehicle[] }>(result, 'vehicles')
  if (!players || !vehicles || !personal) return null

  const avatar = get<object>(personal, 'avatar')
  const avatars = get<Record<number, object>>(result, 'avatars')
  if (!avatar || !avatars) return null

  const personalBdid = get<number>(avatar, 'accountDBID')
  if (!personalBdid) return null

  const transformedPlayers = Object.entries(players).map(([key, value]) => ({
    ...value,
    avatar: avatars[Number.parseInt(key)],
    bdid: Number.parseInt(key)
  })) as Player[]

  const playerByBdid = new Map<number, Player>(transformedPlayers.map(player => [player.bdid, player]))

  const playerByVehicle = new Map<number, Player>()
  const vehicleByPlayer = new Map<number, WotVehicle[]>()

  for (const [key, value] of Object.entries(vehicles)) {
    const keyNumber = Number.parseInt(key)
    for (const vehicle of value) {
      playerByVehicle.set(keyNumber, playerByBdid.get(vehicle.accountDBID)!)

      if (!vehicleByPlayer.has(keyNumber)) {
        vehicleByPlayer.set(keyNumber, [])
      }

      vehicleByPlayer.get(keyNumber)!.push(vehicle)
    }
  }

  const playerVehiclePairs = Array.from(vehicleByPlayer.entries())
    .map(([playerBdid, vehicles]) => ({
      player: playerByBdid.get(vehicles[0].accountDBID)!,
      vehicles: vehicles,
      stats: {
        kills: vehicles.reduce(sum('kills'), 0),
        damageDealt: vehicles.reduce(sum('damageDealt'), 0),
        damageBlockedByArmor: vehicles.reduce(sum('damageBlockedByArmor'), 0),
        damageAssistedTrack: vehicles.reduce(sum('damageAssistedTrack'), 0),
        damageAssistedStun: vehicles.reduce(sum('damageAssistedStun'), 0),
        damageAssistedSmoke: vehicles.reduce(sum('damageAssistedSmoke'), 0),
        damageAssistedRadio: vehicles.reduce(sum('damageAssistedRadio'), 0),
        credits: vehicles.reduce(sum('credits'), 0),
        capturePoints: vehicles.reduce(sum('capturePoints'), 0),
        damageReceived: vehicles.reduce(sum('damageReceived'), 0),
        damaged: vehicles.reduce(sum('damaged'), 0),
        directHits: vehicles.reduce(sum('directHits'), 0),
        lifeTime: vehicles.reduce(sum('lifeTime'), 0),
        mileage: vehicles.reduce(sum('mileage'), 0),
        shots: vehicles.reduce(sum('shots'), 0),
        spotted: vehicles.reduce(sum('spotted'), 0),
        xp: vehicles.reduce(sum('xp'), 0),
      }
    }))

  const personalVehicle = playerVehiclePairs.find(pair => pair.player.bdid === personalBdid)

  const common = get<object>(result, 'common')

  return {
    arenaUniqueID,
    common: {
      bonusType: get<number>(common, 'bonusType'),
    },
    players: playerVehiclePairs,
    personal: personalVehicle
  }
}
