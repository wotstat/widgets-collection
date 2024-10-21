import { computed, ref, watch, watchEffect } from "vue";
import { useReactiveState, useReactiveTrigger, useWidgetSdk } from "../widgetSdk";

function getStats(tag: string, key: 'last' | 'pre-last') {
  const value = localStorage.getItem(`wotstat-gun-mark-${key}-${tag}`)

  if (!value) return { movingAvgDamage: 0, damageRating: 0 }
  else return JSON.parse(value)
}

function setStats(tag: string, key: 'last' | 'pre-last', value: { movingAvgDamage: number, damageRating: number }) {
  if (value.movingAvgDamage == -1 || value.damageRating == -1) return

  localStorage.setItem(`wotstat-gun-mark-${key}-${tag}`, JSON.stringify(value))
}

function useBattleGunSum() {
  const { sdk } = useWidgetSdk();
  const isInBattle = useReactiveState(sdk.data.battle.isInBattle)
  const battleDamage = useReactiveState(sdk.data.battle.efficiency.damage)
  const radioAssist = ref(0)
  const trackAssist = ref(0)
  const stunAssist = ref(0)

  watch(isInBattle, () => {
    radioAssist.value = 0
    trackAssist.value = 0
    stunAssist.value = 0
  })

  useReactiveTrigger(sdk.data.battle.onPlayerFeedback, (feedback) => {
    if (feedback.type == 'radioAssist') radioAssist.value += feedback.data.damage
    if (feedback.type == 'trackAssist') trackAssist.value += feedback.data.damage
    if (feedback.type == 'stunAssist') stunAssist.value += feedback.data.damage
  })

  return computed(() => (battleDamage.value ?? 0) + Math.max(radioAssist.value + trackAssist.value + stunAssist.value))
}

export function useGunMarkCalculator() {
  const { sdk } = useWidgetSdk();

  const dossier = useReactiveState(sdk.data.dossier.current)
  const hangarVehicle = useReactiveState(sdk.data.hangar.vehicle.info)
  const battleVehicle = useReactiveState(sdk.data.battle.vehicle)
  const isInBattle = useReactiveState(sdk.data.battle.isInBattle)

  const vehicle = computed(() => isInBattle.value ? battleVehicle.value ?? hangarVehicle.value : hangarVehicle.value)

  const lastVisibleStats = ref({ movingAvgDamage: -1, damageRating: -1 })
  const preLastVisibleStats = ref({ movingAvgDamage: -1, damageRating: -1 })

  watch(vehicle, (veh, oldVeh) => {
    if (!veh || veh.tag == oldVeh?.tag) return

    lastVisibleStats.value = getStats(veh.tag, 'last')
    preLastVisibleStats.value = getStats(veh.tag, 'pre-last')
  }, { immediate: true })

  watch(dossier, (dossier) => {
    if (!dossier) return
    if (!vehicle.value) return

    const lastStats = lastVisibleStats.value

    if (dossier.movingAvgDamage == lastStats.movingAvgDamage || dossier.damageRating == lastStats.damageRating) return
    const dmgDelta = dossier.movingAvgDamage - lastStats.movingAvgDamage
    const ratingDelta = dossier.damageRating - lastStats.damageRating

    if (lastVisibleStats.value.damageRating != -1 && (dmgDelta < 5 || ratingDelta < 0.05)) return

    preLastVisibleStats.value = lastStats
    lastVisibleStats.value = { movingAvgDamage: dossier.movingAvgDamage, damageRating: dossier.damageRating }

    setStats(vehicle.value.tag, 'last', lastVisibleStats.value)
    setStats(vehicle.value.tag, 'pre-last', preLastVisibleStats.value)
  })

  const battleGunSum = useBattleGunSum()

  const battleMovingAvgDamage = computed(() => {
    if (!isInBattle.value) return 0
    const k = 2 / (100 + 1)
    const dossierDmg = dossier.value?.movingAvgDamage ?? 0
    return dossierDmg * (1 - k) + battleGunSum.value * k
  })

  const battleDamageRating = computed(() => {
    if (!isInBattle.value) return 0
    const startDmg = Math.max(0, lastVisibleStats.value.movingAvgDamage)
    const startRating = Math.max(0, lastVisibleStats.value.damageRating)

    const dmgDelta = startDmg - Math.max(0, preLastVisibleStats.value.movingAvgDamage)
    const ratingDelta = startRating - Math.max(0, preLastVisibleStats.value.damageRating)

    const K = dmgDelta * ratingDelta
    if (K == 0) return startRating

    return startRating + (battleMovingAvgDamage.value - startDmg) / K
  })

  const currentDamageRating = computed(() => isInBattle.value ? battleDamageRating.value : lastVisibleStats.value.damageRating)

  return {
    lastVisibleStats,
    preLastVisibleStats,
    battleGunSum,
    battleMovingAvgDamage,
    battleDamageRating,
    currentDamageRating
  }

}