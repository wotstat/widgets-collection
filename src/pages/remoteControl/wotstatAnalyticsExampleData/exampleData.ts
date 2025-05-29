
const soloBattles = [import('./battles/1'), import('./battles/2')];
const platoonBattles = [import('./battles/3'), import('./battles/4')];

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