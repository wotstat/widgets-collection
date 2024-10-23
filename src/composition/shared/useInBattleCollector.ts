import { readonly, ref, watch } from "vue";
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from "../widgetSdk";
import { isAmmoBayDestroyed } from "@/utils/wotUtils";

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
}

export function useInBattleCollector() {
  const stats = ref(structuredClone(defaultStats))
  const { sdk } = useWidgetSdk()

  const lastFireTickAt = new Map<string, number>()

  function reset() {
    stats.value = structuredClone(defaultStats)
    lastFireTickAt.clear()
  }

  const isInBattle = useReactiveState(sdk.data.battle.isInBattle)
  const playerArena = useReactiveState(sdk.data.battle.arena)
  const playerId = useReactiveState(sdk.data.player.id)
  watch(isInBattle, v => { if (v) reset() })

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


  useReactiveTrigger(sdk.data.battle.onPlayerFeedback, t => {
    if (t.type == 'radioAssist') stats.value.radioAssist += t.data.damage
    if (t.type == 'trackAssist') stats.value.trackAssist += t.data.damage
    if (t.type == 'stunAssist') stats.value.stunAssist += t.data.damage
    if (t.type == 'kill') stats.value.frags += t.data.vehicle.team != playerArena.value?.team ? 1 : -1
    if (t.type == 'baseCapturePoints') stats.value.baseCapturePoints += t.data.points
    if (t.type == 'baseCaptureDropped') stats.value.baseCaptureDefend += t.data.points
    if (t.type == 'spotted') stats.value.discover += 1

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