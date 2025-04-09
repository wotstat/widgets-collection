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
          :icon="containersImages[`../assets/containers/${container.tag}.png`] ?? NoImageLB" />
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

      <div class="space" v-if="crewBooks.length"></div>

      <div class="crewbooks">
        <Element v-for="book in crewBooks" :class="book.class" :title="t(book.tag as any).value" :value="book.count"
          :icon="crewBoolsImages[`../assets/crewBooks/${book.tag}.png`]" :short-log-processor="crewBooks.length > 2" />
      </div>

      <div :class="crewBooks.length >= 3 && items.length >= 3 ? 'small-space' : 'space'" v-if="items.length"></div>

      <div class="items">
        <Element v-for="item in items" :class="item.class" :title="t(item.tag as any).value" :value="item.count"
          :icon="itemsImages[`../assets/items/${item.tag}.png`]" :short-log-processor="items.length > 2" />
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
import { ContainersData } from '../define.widget';
import NoImageLB from '../assets/containers/noImageLB.png'
import { queryAsyncMap } from '@/utils/db';


import GoldIcon from '../assets/currencies/gold.png'
import CreditsIcon from '../assets/currencies/credits.png'
import FreeXpIcon from '../assets/currencies/freeXP.png'
import PremiumIcon from '../assets/currencies/premiumLesta.png'
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

const containersImages = import.meta.glob<string>('../assets/containers/*.png', { eager: true, import: 'default' })
const modernizationsImages = import.meta.glob<string>('../assets/modernizations/*.png', { eager: true, import: 'default' })
const crewBoolsImages = import.meta.glob<string>('../assets/crewBooks/*.png', { eager: true, import: 'default' })
const itemsImages = import.meta.glob<string>('../assets/items/*.png', { eager: true, import: 'default' })

const { t } = useI18nRef(i18n)
const currencyIcons = {
  gold: GoldIcon,
  credits: CreditsIcon,
  freeXP: FreeXpIcon,
  premium: PremiumIcon,
  mandarins: MandarinsIcon,
  equipCoins: EquipCoinIcon,
  crystals: CrystalIcon,
}

const props = defineProps<{
  data: ContainersData
}>()

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

const crewBooks = computed(() => {
  const books = props.data.crewBooks

  if (books.length == 1) return books.map(t => ({ tag: t.tag, count: t.count, class: 'big wide' }))
  if (books.length == 2) return books.map(t => ({ tag: t.tag, count: t.count, class: 'medium' }))

  if (books.length == 4) return books.map(t => ({ tag: t.tag, count: t.count, class: 'super-mini' }))

  return books.map(t => ({ tag: t.tag, count: t.count, class: 'mini' }))
})

const items = computed(() => {
  const books = props.data.items

  if (books.length == 1) return books.map(t => ({ tag: t.tag, count: t.count, class: 'big wide' }))
  if (books.length == 2) return books.map(t => ({ tag: t.tag, count: t.count, class: 'medium' }))

  if (books.length == 4) return books.map(t => ({ tag: t.tag, count: t.count, class: 'super-mini' }))

  return books.map(t => ({ tag: t.tag, count: t.count, class: 'mini' }))
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
      grid-template-columns: repeat(3, 1fr);
    }

    &:has(> :nth-child(n+4)) {
      grid-template-columns: repeat(4, 1fr);
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
  border-radius: 1em;
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