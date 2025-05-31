
const soloBattles = [import('./battles/1'), import('./battles/2')];
const platoonBattles = [import('./battles/3'), import('./battles/4')];
const onFeedback = import('./feedback/onFeedback')
const onDamage = import('./feedback/onDamage')
const onBattleResult = import('./feedback/battleResults')

let lastOldBattleResultId = 1e6 - 1;
let lastStartedBattleId = 1e6;
let lastShotId = 1e6;

let lastBattleIndex = 0;
let lastShotIndex = 0;

async function getBattleObject(playerName: string, isPlatoon: boolean) {

  let data = isPlatoon ? await platoonBattles[lastBattleIndex % platoonBattles.length] : await soloBattles[lastBattleIndex % soloBattles.length];

  return {
    OnBattleStart: { ...data.OnBattleStart, playerName },
    OnBattleResult: data.OnBattleResult,
    OnShot: data.OnShot,
  }
}

const startedBattles: number[] = [];

export async function getOnBattleStart(override: {
  playerName: string,
  isPlatoon: boolean,
}) {
  lastBattleIndex++;
  const data = await getBattleObject(override.playerName, override.isPlatoon);
  const arenaId = lastStartedBattleId++;
  startedBattles.push(arenaId);
  lastShotIndex = 0;


  return {
    ...data.OnBattleStart,
    playerName: override.playerName,
    arenaID: arenaId,
  }
}

export async function getOnBattleResult(override: {
  playerName: string,
  isPlatoon: boolean,
}) {
  const data = await getBattleObject(override.playerName, override.isPlatoon);
  return {
    ...data.OnBattleResult,
    playerName: override.playerName,
    arenaID: startedBattles.pop() ?? lastOldBattleResultId--,
  }
}

export async function getOnShot(override: {
  playerName: string,
  isPlatoon: boolean,
}) {
  const data = await getBattleObject(override.playerName, override.isPlatoon);
  return {
    ...data.OnShot[lastShotIndex++ % data.OnShot.length],
    playerName: override.playerName,
    arenaID: startedBattles.at(-1) ?? (lastOldBattleResultId),
    shotID: lastShotId++,
  }
}

export async function getBattleResult(override: {
  playerName: string,
  isPlatoon: boolean,
}) {
}

const feedbackIndex = {
  kill: 0,
  damage: 0
}
export async function getFeedback(type: 'kill' | 'damage', override: {
  playerName: string,
  isPlatoon: boolean

}) {
  const data = await onFeedback

  const feedbacks = data.onFeedback.filter(t => t.type == type)

  const res = feedbacks[feedbackIndex[type]++ % feedbacks.length];
  return res
}

let damageIndex = 0
export async function getOnDamage(override: {
  attackerId: number,
  targetId: number
}) {
  const data = await onDamage
  const res = data.onDamage[damageIndex++ % data.onDamage.length];

  return {
    ...res,
    attacker: {
      ...res.attacker,
      playerId: override.attackerId,
    },
    target: {
      ...res.target,
      playerId: override.targetId,
    }
  }
}

let battleResultIndex = 0;
let platoonBattleResultIndex = 0;
export async function getOnBattleResultRaw(options: {
  playerId: number,
  arenaUniqueID: number,
  platoon: number[] | null
}) {
  const data = await onBattleResult
  const target = (options.platoon && options.platoon.length != 0) ?
    data.platoonBattleResults :
    data.battleResults
  const res = structuredClone(target[platoonBattleResultIndex++ % target.length]) as any;


  const accountDBID = res.personal.avatar.accountDBID

  res.personal.avatar.accountDBID = options.playerId;

  const key = Object.keys(res.personal).find(k => k != 'avatar')!;
  res.personal[key].accountDBID = options.playerId;

  res.players[options.playerId] = res.players[accountDBID]
  delete res.players[accountDBID]

  const prebattleID = res.players[options.playerId].prebattleID

  const platoonIds = [...options.platoon ?? []];
  for (const [key, value] of Object.entries(res.players)) {
    if (platoonIds.length == 0) break;
    if ((value as any).prebattleID == prebattleID && key != options.playerId.toString()) {
      const nextId = platoonIds.shift()!;
      res.players[nextId] = res.players[key];
      delete res.players[key];

      res.avatars[nextId] = res.avatars[key];
      delete res.avatars[key];


      for (const [_, value] of Object.entries(res.vehicles)) {
        for (const veh of value as any) {
          if (veh.accountDBID != key) continue;
          veh.accountDBID = nextId;
        }
      }
    }
  }


  res.avatars[options.playerId] = res.avatars[accountDBID]
  delete res.avatars[accountDBID]

  const vehicles = res.vehicles

  for (const [key, value] of Object.entries(vehicles)) {
    for (const veh of value as any) {
      if (veh.accountDBID != accountDBID) continue;
      veh.accountDBID = options.playerId;
    }
  }

  res.arenaUniqueID = options.arenaUniqueID;

  return res
}