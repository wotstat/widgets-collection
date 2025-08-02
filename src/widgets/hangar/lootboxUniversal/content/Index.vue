<template>
  <div class="main">
    <WidgetCard>
      <div class="background-elements">
        <div class="c1"></div>
        <div class="c2"></div>
      </div>

      <p v-if="isEmpty" class="no-data">
        Вы ещё не открывали контейнеры
      </p>

      <div class="flex line containers">
        <Element v-for="container in containers" :class="containersClass"
          :title="lootboxNames.data.get(container.tag) ?? 'Контейнер'" :value="container.count"
          :icon="`${STATIC_URL}/mt/latest/lootboxes/large/${containerTagToImageName(container.tag)}.webp`"
          :icon-fallback="NoImageLB" />
      </div>

      <div class="space" v-if="currenciesLines.length"></div>

      <div class="currencies">
        <Element v-for="currency in currenciesLines" :class="currency[1]" :title="t(currency[0]).value"
          :value="currencyGetters[currency[0]]()" :icon="currencyIcons[currency[0]]" />
      </div>

      <div class="space" v-if="data.currencies.equipCoins || modernizations.length"></div>

      <div class="modernizations">
        <Element :class="equipCoinsClass" :title="t('equipCoin').value" v-if="data.currencies.equipCoins > 0"
          :value="data.currencies.equipCoins" :icon="EquipCoinIcon" />
        <Element v-for="mod in modernizations" :class="mod.class"
          :title="(artefactsNames.data.get(mod.tag) ?? 'Модернизация').replace('Т1', '')" :value="mod.count"
          :icon="modernizationsImages[`../assets/modernizations/${mod.icon}.png`]" :overlay-icon="ModernizedOverlay" />
      </div>

      <div class="space" v-if="entitlements.length"></div>
      <div class="entitlements" v-if="entitlements.length">
        <Element v-for="entitlement in entitlements" :class="entitlement.class" :title="t(entitlement.tag as any).value"
          :value="entitlement.count" :icon="entitlementsImages[`../assets/entitlements/${entitlement.tag}.png`]" />
      </div>

      <div class="space" v-if="boosters.length"></div>
      <div class="boosters">
        <Element v-for="booster in boosters" :class="booster.class"
          :title="t((booster.tag + (boosters.length > 1 ? ':short' : '')) as any).value" :value="booster.count"
          :icon="boosterImages[`../assets/boosters/${booster.icon}.png`]" :short-log-processor="boosters.length > 2" />
      </div>

      <div :class="boosters.length >= 3 && crewBooks.length >= 3 ? 'small-space' : 'space'" v-if="crewBooks.length">
      </div>
      <div class="crewbooks">
        <Element v-for="book in crewBooks" :class="book.class" :title="t(book.tag as any).value" :value="book.count"
          :icon="crewBoolsImages[`../assets/crewBooks/${book.tag}.png`]" :short-log-processor="crewBooks.length > 2" />
      </div>

      <div
        :class="(crewBooks.length >= 3 || (crewBooks.length == 0 && boosters.length >= 3)) && items.length >= 3 ? 'small-space' : 'space'"
        v-if="items.length"></div>

      <div class="items" :class="items.length == 5 || items.length % 3 == 0 ? 'c-3' : ''">
        <Element v-for="item in items" :class="item.class" :title="artefactsNames.data.get(item.tag) ?? 'Расходник'"
          :value="item.count" :icon="itemsImages[`../assets/items/${item.tag}.png`]"
          :short-log-processor="items.length > 2" />
      </div>

      <div class="space" v-if="battleBoosters.length > 4"></div>

      <div class="battle-boosters-summary" v-if="battleBoosters.length > 4">
        <Element v-if="equipmentCount" :class="crewSkillsCount == 0 ? 'big' : 'medium'" :title="'К оборудованию'"
          :value="equipmentCount" :icon="EquipmentBooster" />
        <Element v-if="crewSkillsCount" :class="equipmentCount == 0 ? 'big' : 'medium'" :title="'Для экипажа'"
          :value="crewSkillsCount" :icon="SkillBooster" />
      </div>

      <div v-if="battleBoosters.length"
        :class="battleBoosters.length >= 3 && (battleBoosters.length > 4 || items.length >= 3 || items.length == 0 && crewBooks.length >= 3) ? 'small-space' : 'space'">
      </div>

      <div class="battle-boosters">
        <Element v-for="booster in battleBoosters" :class="booster.class" :icon="booster.icon"
          :overlay-icon="booster.overlay" :title="artefactsNames.data.get(booster.tag) ?? 'Инструкция'"
          :value="booster.count" :short-log-processor="battleBoosters.length > 3" />
      </div>

      <div class="space" v-if="largeVehicles.length || smallVehicles.length"></div>

      <div class="large-vehicles">
        <LargeVehicle v-for="veh in largeVehicles" :tag="veh" :name="tankNames.data.get(veh) ?? '?'" />
      </div>

      <div class="small-space" v-if="smallVehicles.length && largeVehicles.length"></div>
      <div class="small-vehicles">
        <SmallVehicle v-for="veh in smallVehicles" :tag="veh" :name="tankNames.data.get(veh) ?? '?'" />
      </div>
    </WidgetCard>
  </div>
</template>


<script setup lang="ts">
import WidgetCard from '@/components/WidgetCard.vue';
import { Props } from '../define.widget';
import NoImageLB from '../assets/containers/noImageLB.png'
import { queryAsyncMap } from '@/utils/db';


import GoldWotIcon from '../assets/currencies/gold.png'
import GoldMtIcon from '../assets/currencies/gold-mt.png'
import CreditsWotIcon from '../assets/currencies/credits.png'
import CreditsMtIcon from '../assets/currencies/credits-mt.png'
import FreeXpIcon from '../assets/currencies/freeXP.png'
import PremiumMtIcon from '../assets/currencies/premium-mt.png'
import MandarinsIcon from '../assets/currencies/nyMandarins.png'
import EquipCoinIcon from '../assets/currencies/equipCoin.png'
import CrystalIcon from '../assets/currencies/bon.png'
import ModernizedOverlay from '../assets/modernizations/equipmentModernized_1_overlay.png'

import i18n from '../i18n.json'

import Element from './Element.vue';
import { computed } from 'vue';
import { useI18nRef } from '@/composition/useI18n';
import SmallVehicle from './SmallVehicle.vue';
import LargeVehicle from './LargeVehicle.vue';
import SkillBooster from '../assets/icons/skillBooster.png';
import EquipmentBooster from '../assets/icons/equipmentBooster.png';
import { getConsumableById, getConsumableIconByTag, isConsumableTag } from '@/components/equipment/equipment';
import { containerTagToImageName, orderByTable } from './utils';
import { STATIC_URL } from '@/utils/externalUrl';

const modernizationsImages = import.meta.glob<string>('../assets/modernizations/*.png', { eager: true, import: 'default' })
const crewBoolsImages = import.meta.glob<string>('../assets/crewBooks/*.png', { eager: true, import: 'default' })
const itemsImages = import.meta.glob<string>('../assets/items/*.png', { eager: true, import: 'default' })
const boosterImages = import.meta.glob<string>('../assets/boosters/*.png', { eager: true, import: 'default' })
const entitlementsImages = import.meta.glob<string>('../assets/entitlements/*.png', { eager: true, import: 'default' })

const { t } = useI18nRef(i18n)

const props = defineProps<Props>()

const currencyIcons = computed(() => ({
  gold: props.game == 'wot' ? GoldWotIcon : GoldMtIcon,
  credits: props.game == 'wot' ? CreditsWotIcon : CreditsMtIcon,
  freeXP: FreeXpIcon,
  premium: props.game == 'wot' ? PremiumMtIcon : PremiumMtIcon,
  mandarins: MandarinsIcon,
  equipCoins: EquipCoinIcon,
  crystals: CrystalIcon,
}))


const isEmpty = computed(() => {
  return props.data.containers.length == 0 &&
    props.data.modernizations.length == 0 &&
    props.data.vehicles.length == 0 &&
    props.data.crewBooks.length == 0 &&
    props.data.currencies.gold == 0 &&
    props.data.currencies.credits == 0 &&
    props.data.currencies.freeXP == 0 &&
    props.data.currencies.premium == 0 &&
    props.data.currencies.mandarins == 0 &&
    props.data.currencies.equipCoins == 0 &&
    props.data.currencies.crystals == 0
})

const currencyGetters = {
  gold: () => props.data.currencies.gold,
  credits: () => props.data.currencies.credits,
  freeXP: () => props.data.currencies.freeXP,
  premium: () => props.data.currencies.premium,
  mandarins: () => props.data.currencies.mandarins,
  equipCoins: () => props.data.currencies.equipCoins,
  crystals: () => props.data.currencies.crystals,
}

const containers = computed(() => {
  return props.data.containers
})

const containersClass = computed(() => {
  if (containers.value.length == 0) return 'hidden'
  if (containers.value.length == 1) return 'extra'
  if (containers.value.length == 2) return 'large'
  if (containers.value.length == 3) return 'big'
  if (containers.value.length < 7) return 'medium'
  return 'small'
})

const currenciesLines = computed(() => {

  const priority = [
    'gold',
    'credits',
    'crystals',
    'freeXP',
    'premium',
    'mandarins',
  ] as const


  const lines: [typeof priority[number], string][] = []

  const nonZero: typeof priority[number][] = []
  const data = props.data.currencies

  for (const key of priority) {
    if (data[key] > 0) {
      nonZero.push(key)
    }
  }

  if (nonZero.length == 0) {
    return []
  }

  if (nonZero.length == 1) {
    lines.push([nonZero[0], 'wide large'])
  } else if (nonZero.length == 2) {
    lines.push([nonZero[0], 'wide big'], [nonZero[1], 'wide big'])
  } else {

    if (nonZero.length % 2 != 0) {
      let targetClass = 'medium'
      if (equipCoinsClass.value.includes('wide') || containersClass.value == 'big') targetClass = 'big'
      else if (containersClass.value == 'large') targetClass = 'large'

      lines.push([nonZero.shift()!, `wide ${targetClass}`])
    }

    for (let i = 0; i < nonZero.length; i += 2) {
      lines.push([nonZero[i], 'medium'], [nonZero[i + 1], 'medium'])
    }
  }

  return lines
})

const modernizationsClass = computed(() => props.data.modernizations.length <= 3 ? 'medium' : 'small')
const equipCoinsClass = computed(() => {
  const modCount = props.data.modernizations.length
  if (props.data.currencies.equipCoins == 0) return 'hidden'
  if (modCount % 2 == 0 || modCount == 1) return 'big wide'
  if (modCount <= 3) return 'medium'

  return 'small'
})

const modernizations = computed(() => {
  const count = props.data.modernizations.length

  return props.data.modernizations.map((t, i) => {
    let targetClass = modernizationsClass.value

    if (count == 1 || count % 2 != 0 && i == 0 && props.data.currencies.equipCoins == 0) targetClass += ' wide'

    return {
      tag: t.tag,
      icon: t.tag.replace(/\d$/, ''),
      count: t.count,
      class: targetClass,
    }
  })
})

const largeVehicles = computed(() => props.data.vehicles.filter(t => t.isLegendary).map(t => t.tag).slice(0, 3))
const smallVehicles = computed(() => {
  return props.data.vehicles.filter(t => !largeVehicles.value.includes(t.tag)).map(t => t.tag)
})

const boostersPriority = [
  'booster_xp:100',
  'booster_xp:50',
  'booster_credits:50',
  'booster_free_xp_and_crew_xp:200',
  'booster_free_xp_and_crew_xp:300',
]

const boosterToImage = {
  'booster_xp:100': 'booster_xp_premium',
  'booster_xp:50': 'booster_xp',
  'booster_credits:50': 'booster_credits',
  'booster_free_xp_and_crew_xp:300': 'booster_free_xp_and_crew_xp_premium',
  'booster_free_xp_and_crew_xp:200': 'booster_free_xp_and_crew_xp',
}

const boosters = computed(() => {
  const boosters = orderByTable(boostersPriority, props.data.boosters, i => i.tag)

  let targetClass = 'super-mini'

  if (boosters.length == 1) targetClass = 'big wide'
  else if (boosters.length == 2) targetClass = 'medium'
  else if (boosters.length == 3) targetClass = 'mini'

  return boosters.map(t => ({
    tag: t.tag,
    count: t.count,
    class: targetClass,
    icon: t.tag in boosterToImage ? boosterToImage[t.tag as keyof typeof boosterToImage] : undefined
  }))
})

const crewBooksPriority = [
  'personalBook',
  'universalBook',
  'universalGuide',
  'guide',
  'universalBrochure',
  'brochure',
]

const crewBooks = computed(() => {
  const books = orderByTable(crewBooksPriority, props.data.crewBooks, i => i.tag)

  if (books.length == 1) return books.map(t => ({ tag: t.tag, count: t.count, class: 'big wide' }))
  if (books.length == 2) return books.map(t => ({ tag: t.tag, count: t.count, class: 'medium' }))

  if (books.length == 4) return books.map(t => ({ tag: t.tag, count: t.count, class: 'super-mini' }))

  return books.map(t => ({ tag: t.tag, count: t.count, class: 'mini' }))
})

const itemsPriority = [
  'ration',
  'largeMedkit',
  'largeRepairkit',
  'autoExtinguishers',
]

const items = computed(() => {
  const items = orderByTable(itemsPriority, props.data.items, i => i.tag)

  if (items.length == 1) return items.map(t => ({ tag: t.tag, count: t.count, class: 'big wide' }))
  if (items.length == 2) return items.map(t => ({ tag: t.tag, count: t.count, class: 'medium' }))
  if (items.length % 3 == 0) return items.map(t => ({ tag: t.tag, count: t.count, class: 'mini' }))
  return items.map(t => ({ tag: t.tag, count: t.count, class: 'super-mini' }))
})

const crewSkillsCount = computed(() => {
  return props.data.battleBoosters
    .filter(t => isConsumableTag(t.tag) && getConsumableById(t.tag)?.tags?.includes('crewSkillBattleBooster'))
    .reduce((acc, t) => acc + t.count, 0)
})
const equipmentCount = computed(() => {
  return props.data.battleBoosters
    .filter(t => isConsumableTag(t.tag) && !getConsumableById(t.tag)?.tags?.includes('crewSkillBattleBooster'))
    .reduce((acc, t) => acc + t.count, 0)
})

const boosterPriority = [
  'turbochargerBattleBooster',
  'additInvisibilityDeviceBattleBooster',
  'improvedSightsBattleBooster',
  'rammerBattleBooster',
  'improvedVentilationBattleBooster',
  'improvedArmorBattleBooster',
  'coatedOpticsBattleBooster',
  'improvedConfigurationBattleBooster',
  'aimingStabilizerBattleBooster',
  'enhancedAimDrivesBattleBooster'
]

const battleBoosters = computed(() => {
  const boosters = orderByTable(boosterPriority, props.data.battleBoosters, b => b.tag).slice(0, 6)

  let targetClass = 'super-mini'
  if (boosters.length == 1) targetClass = 'big wide'
  else if (boosters.length == 2) targetClass = 'medium'
  else if (boosters.length == 3) targetClass = 'mini'

  return boosters.map(t => {

    if (!isConsumableTag(t.tag)) return { tag: t.tag, icon: 'test', count: t.count, class: 'medium' }

    const consumable = getConsumableById(t.tag)

    const isSkill = consumable?.tags?.includes('crewSkillBattleBooster')

    return {
      tag: t.tag,
      count: t.count,
      icon: getConsumableIconByTag(t.tag, true),
      overlay: isSkill ? SkillBooster : EquipmentBooster,
      class: targetClass
    }
  })
})

const entitlements = computed(() => {
  const entitlements = props.data.entitlements

  let targetClass = 'super-mini'
  if (entitlements.length == 1) targetClass = 'large wide'
  else if (entitlements.length == 2) targetClass = 'medium'
  else if (entitlements.length == 3) targetClass = 'mini'

  return entitlements.map(t => ({
    tag: t.tag,
    count: t.count,
    class: targetClass,
    icon: t.tag,
  }))
})

const lootboxNames = queryAsyncMap<{ tag: string, nameRU: string }, Map<string, string>>(`select * from LootboxesLocalization`, t => new Map(t.map(t => [t.tag, t.nameRU])))
const artefactsNames = queryAsyncMap<{ tag: string, nameRU: string }, Map<string, string>>(`select * from ArtefactsLocalization`, t => new Map(t.map(t => [t.tag, t.nameRU])))
const tankNames = queryAsyncMap<{ tag: string, nameRU: string, shortRU: string }, Map<string, string>>(`select * from VehiclesLocalization`, t => new Map(t.map(t => [t.tag, t.shortRU])))

</script>


<style lang="scss" scoped>
.secondary-color {
  color: #ffffffb6;
}

.main {
  font-size: 1em;
  overflow: hidden;
  color: #fffefc;

  .card {
    position: relative;
    border-radius: 2em;
    background-color: rgb(28, 28, 28);
    border: 0.1em solid rgba(255, 255, 255, 0.05);
    padding: 0.9em;
  }

  .mini-card {
    box-shadow: inset 0 0 0.8em rgb(255 255 255 / 2%), 0 0 0.5em 0px rgb(0 0 0 / 2%);
    background-color: rgba(255, 255, 255, 0.04);
    border: 0.06em solid rgba(255, 255, 255, 0.05);
    padding: 0.8em;
    font-size: 1em;
    border-radius: 1em;
  }

  .space {
    height: 1em;
  }

  .small-space {
    height: 0.5em;
  }

  .no-data {
    font-size: 1.2em;
    text-align: center;
    color: #ffffffb6;
    margin: 0.5em 0;
  }

  .containers {
    display: grid;
    grid-template-columns: 100%;
    gap: 0.5em;

    &:has(> :nth-child(n+4)) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .currencies {
    display: grid;
    gap: 0.5em;
    grid-template-columns: repeat(2, 1fr);

    .wide {
      grid-column: 1 / -1;
    }
  }

  .modernizations {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5em;

    .wide {
      grid-column: 1 / -1;
    }
  }

  .boosters {
    display: flex;
    gap: 0.5em;

    div {
      flex: 1;
    }

    .mini {
      :deep(.icon) {
        height: 2.3em;
        margin: 0;
        margin-left: -0.3em;
        margin-right: -0.45em;
      }
    }

    .super-mini {
      :deep(.icon) {
        height: 3em;
        margin: -0.6em;
        margin-top: -0.2em;
        margin-bottom: -1em;
      }

      :deep(.count) {
        filter: drop-shadow(0 -0.1em 0.2em rgba(0, 0, 0, 1)) drop-shadow(0 -0.1em 0.2em rgba(0, 0, 0, 1))
      }
    }

  }

  .entitlements,
  .crewbooks {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5em;

    .wide {
      grid-column: 1 / -1;

      :deep(.icon) {
        img {
          min-width: 5.8em;
          object-fit: contain;
          margin-left: -0.4em;
        }
      }
    }

    &:has(> :nth-child(n+3)) {
      grid-template-columns: repeat(3, 1fr);
    }

    &:has(> :nth-child(n+4)) {
      grid-template-columns: repeat(4, 1fr);
    }

    &:has(> :nth-child(n+5)) {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  .items {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5em;

    .wide {
      grid-column: 1 / -1;
    }

    .mini {
      :deep(.icon) {
        height: 2.3em;
        margin: 0;
        margin-left: -0.3em;
        margin-right: -0.45em;
      }
    }

    &:has(> :nth-child(n+3)) {
      grid-template-columns: repeat(4, 1fr);

      &.c-3 {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  .battle-boosters-summary {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5em;

    &:has(> :nth-child(n+2)) {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  .battle-boosters {
    display: grid;
    display: flex;
    gap: 0.5em;

    :deep(.overlay-icon) {
      width: 40%;
      height: auto;
      inset: unset;
      bottom: 0;
      left: 0;
    }

    :deep(.icon) {
      filter: drop-shadow(0 0 0.3em rgba(148, 255, 26, 0.4));
    }

    >div {
      flex: 1;
    }
  }

  .small-vehicles {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.5em;

    &:has(> :nth-child(n+2)) {
      grid-template-columns: repeat(2, 1fr);
    }

    &:has(> :nth-child(n+7)) {
      grid-template-columns: repeat(3, 1fr);

      :deep(.name) {
        font-size: 0.9em;
      }

      :deep(.img) {
        margin-left: -0.7em;
      }
    }
  }

  .large-vehicles {
    display: flex;
    gap: 0.5em;

    >div {
      flex: 1;
    }
  }
}

.background-elements {
  position: absolute;
  inset: 0;
  border-radius: 2em;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
  opacity: 0.3;

  .c1 {
    position: absolute;
    background-color: rgba(255, 0, 174, 0.1);

    filter: blur(7em);
    border-radius: 200em;

    top: -20%;
    right: -10%;
    width: 80%;
    height: 90%;
  }


  .c2 {
    position: absolute;
    background-color: rgba(0, 255, 8, 0.1);

    filter: blur(7em);
    border-radius: 200em;

    bottom: -40%;
    left: 0%;
    width: 80%;
    height: 90%;
  }
}
</style>