import { readonly, ref, watch, watchEffect } from "vue";
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from "../widgetSdk";
import { isAmmoBayDestroyed } from "@/utils/wotUtils";
import { useWidgetStorage } from "../useWidgetStorage";

export const defaultStats = {
  damage: 0,
  assist: 0,
  blocked: 0,
  stun: 0,
  frags: 0,
  radioAssist: 0,
  trackAssist: 0,
  stunAssist: 0,
  distance: 0,
  baseCapturePoints: 0,
  baseCaptureDefend: 0,
  discover: 0,
  fireDamage: 0,
  fire: 0,
  ram: 0,
  ramDamage: 0,
  ammoBayDestroyed: 0,
  ammoBayDestroyedDamage: 0,
  gunMarkDmg: 0,
  chuckScore: 0,
  shotDamage: 0,
  shotDamageMax: 0,
  shotDamageMin: 0,
  damagedShotsCount: 0,
  lifetime: 0,
  duration: 0,
  crits: 0
}

export function useInBattleCollector() {
  const stats = useWidgetStorage('stats', structuredClone(defaultStats))
  const { sdk } = useWidgetSdk()

  const lastFireTickAt = new Map<string, number>()
  const lastBattleStartTime = useWidgetStorage('lastBattleStartTime', 0)
  const lastLifetimeStart = useWidgetStorage('lastLifetimeStart', 0)
  const calculatedLifetime = useWidgetStorage('calculatedLifetime', 0)

  function reset() {
    stats.value = structuredClone(defaultStats)
    lastFireTickAt.clear()
    lastBattleStartTime.value = 0
    lastLifetimeStart.value = 0
    calculatedLifetime.value = 0
  }

  const isInBattle = useReactiveState(sdk.data.battle.isInBattle)
  const playerArena = useReactiveState(sdk.data.battle.arena)
  const playerId = useReactiveState(sdk.data.player.id)
  const serverTime = useReactiveState(sdk.data.game.serverTime)
  const isAlive = useReactiveState(sdk.data.battle.isAlive)
  const battlePeriod = useReactiveState(sdk.data.battle.period)

  watch(isInBattle, (v, old) => { if (v && old === false) reset() })
  useReactiveState(sdk.data.battle.efficiency.damage, t => t != 0 && (stats.value.damage = t))
  useReactiveState(sdk.data.battle.efficiency.assist, t => t != 0 && (stats.value.assist = t))
  useReactiveState(sdk.data.battle.efficiency.stun, t => t != 0 && (stats.value.stun = t))
  useReactiveState(sdk.data.battle.efficiency.blocked, t => t != 0 && (stats.value.blocked = t))

  watch(() => [stats.value.damage, stats.value.radioAssist, stats.value.trackAssist, stats.value.stunAssist] as const, ([dmg, radio, track, stun]) => {
    stats.value.gunMarkDmg = dmg + Math.max(radio, track, stun)
  })

  watch(() => [stats.value.damage, stats.value.frags] as const, ([dmg, frags]) => {
    stats.value.chuckScore = dmg + frags * 200
  })

  watch(serverTime, t => {
    if (!t || !isInBattle.value) return
    if (lastLifetimeStart.value) stats.value.lifetime = calculatedLifetime.value + t - lastLifetimeStart.value
    if (lastBattleStartTime.value) stats.value.duration = t - lastBattleStartTime.value
  })

  watch([isAlive, battlePeriod], async ([alive, battlePeriod]) => {
    await new Promise(r => setTimeout(r, 0))
    if (!battlePeriod || alive == undefined) return

    if (!alive && serverTime.value && isInBattle.value && lastLifetimeStart.value && battlePeriod.tag == 'BATTLE') {
      calculatedLifetime.value += serverTime.value - lastLifetimeStart.value
      lastLifetimeStart.value = 0
    }

    if (alive && battlePeriod.tag == 'BATTLE' && !lastLifetimeStart.value) lastLifetimeStart.value = serverTime.value ?? 0
  })

  watch(battlePeriod, battlePeriod => {
    if (battlePeriod?.tag == 'BATTLE' && !lastBattleStartTime.value) {
      lastBattleStartTime.value = serverTime.value ?? 0
    }
  })

  useReactiveTrigger(sdk.data.battle.onPlayerFeedback, t => {
    if (t.type == 'radioAssist') stats.value.radioAssist += t.data.damage
    if (t.type == 'trackAssist') stats.value.trackAssist += t.data.damage
    if (t.type == 'stunAssist') stats.value.stunAssist += t.data.damage
    if (t.type == 'kill') stats.value.frags += t.data.vehicle.team != playerArena.value?.team ? 1 : -1
    if (t.type == 'baseCapturePoints') stats.value.baseCapturePoints += t.data.points
    if (t.type == 'baseCaptureDropped') stats.value.baseCaptureDefend += t.data.points
    if (t.type == 'spotted') stats.value.discover += 1
    if (t.type == 'crit') stats.value.crits += 1

    if (t.type == 'damage' && t.data.attackReason == 'fire') {
      stats.value.fire += 1
    }

    if (t.type == 'damage' && t.data.attackReason == 'ramming') {
      stats.value.ram += 1
    }
  })

  useReactiveTrigger(sdk.data.battle.onDamage, dmg => {
    const player = playerId.value
    if (!player || !playerArena.value) return

    if (!dmg.attacker || !dmg.target) return
    if (dmg.attacker.playerId != player) return
    if (dmg.target.team == playerArena.value.team) return

    if (isAmmoBayDestroyed(dmg.health)) {
      stats.value.ammoBayDestroyed += 1
      stats.value.ammoBayDestroyedDamage += dmg.damage
    }

    if (dmg.reason == 'fire') {
      stats.value.fireDamage += dmg.damage
    }

    if (dmg.reason == 'ramming') {
      stats.value.ramDamage += dmg.damage
    }

    if (dmg.reason == 'shot') {
      if (stats.value.damagedShotsCount == 0) stats.value.shotDamageMin = dmg.damage

      stats.value.shotDamage += dmg.damage
      stats.value.damagedShotsCount += 1
      stats.value.shotDamageMin = Math.min(stats.value.shotDamageMin, dmg.damage)
      stats.value.shotDamageMax = Math.max(stats.value.shotDamageMax, dmg.damage)
    }

  })

  const position = useReactiveState(sdk.data.battle.position)
  watch(position, (p, old) => {
    if (!p || !old) return

    const distance = Math.sqrt((p[0] - old[0]) ** 2 + (p[1] - old[1]) ** 2 + (p[2] - old[2]) ** 2)
    stats.value.distance += distance
  })


  return readonly(stats)
}