<template>
  <div class="line">
    <p>{{ label }}</p>
    <select class="loading" v-if="isLoading" disabled value="loading">
      <option value="loading">Загрузка…</option>
    </select>
    <select v-else v-model="value" @pointerdown="pointerDown" ref="selector">
      <option v-for="variant in allTournaments" :key="variant.id" :value="variant.id">
        {{ variant.name || variant.id }}
      </option>
    </select>

    <PopoverStyled :target="selector" :display="isOpen" @click-outside="isOpen = false" placement="bottom-end-float"
      :arrow-size="0" :offset="5">
      <div class="tournaments nice-scrollbar">
        <div class="search">
          <IconSearch class="icon" />
          <input v-model="search" type="text" placeholder="Введите название или ID" aria-label="Поиск турнира"
            @pointerdown.stop @keydown.esc="isOpen = false">
        </div>
        <div class="results">
          <p class="message" v-if="error && !search">Не удалось загрузить турниры</p>
          <button v-for="tournament in visibleTournaments" :key="tournament.id" class="tournament"
            :class="{ selected: tournament.id.toString() === value }" :disabled="!isSupported(tournament)"
            @click="select(tournament)" @pointerup="pointerUp(tournament)">
            <span class="name">{{ tournament.name }}</span>
            <span class="badges">
              <span class="badge" :class="status(tournament)">{{ statusLabel(tournament) }}</span>
              <span class="badge" :class="isSupported(tournament) ? 'supported' : 'unsupported'">
                {{ isSupported(tournament) ? 'Поддерживается' : 'Не поддерживается' }}
              </span>
            </span>
          </button>
          <p class="message" v-if="isSearching">Ищу турнир…</p>
          <p class="message" v-else-if="searchError">{{ searchError }}</p>
          <p class="message" v-else-if="!isLoading && visibleTournaments.length === 0">Ничего не найдено</p>
        </div>
      </div>
    </PopoverStyled>
  </div>
</template>

<script setup lang="ts">
import IconSearch from '@/assets/icons/search.svg'
import PopoverStyled from '@/components/popover/PopoverStyled.vue'
import { TournamentOption } from '@/utils/defineWidget'
import { computed, onMounted, ref, watch } from 'vue'

const { label, isSupported } = defineProps<{
  label: string
  isSupported: (tournament: TournamentOption) => boolean
}>()

const value = defineModel<string>({ required: true })
const selector = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const isLoading = ref(true)
const error = ref(false)
const tournaments = ref<TournamentOption[]>([])
const externalTournaments = ref<TournamentOption[]>([])
const search = ref('')
const isSearching = ref(false)
const searchError = ref('')

const allTournaments = computed(() => [
  ...externalTournaments.value,
  ...tournaments.value.filter(tournament => !externalTournaments.value.some(item => item.id === tournament.id)),
])

const visibleTournaments = computed(() => {
  const query = search.value.trim()
  if (!query) return allTournaments.value
  if (/^\d+$/.test(query)) return allTournaments.value.filter(tournament => tournament.id === Number(query))

  const normalized = query.toLocaleLowerCase()
  return allTournaments.value.filter(tournament => tournament.name.toLocaleLowerCase().includes(normalized))
})

watch([value, allTournaments], ([current, items]) => {
  if (!current) value.value = items.find(isSupported)?.id.toString() ?? ''
})

watch(search, (rawQuery, _, onCleanup) => {
  const query = rawQuery.trim()
  searchError.value = ''

  if (!/^\d+$/.test(query) || allTournaments.value.some(tournament => tournament.id === Number(query))) {
    isSearching.value = false
    return
  }

  const id = Number(query)
  if (!Number.isSafeInteger(id)) {
    searchError.value = 'Некорректный ID турнира'
    return
  }

  const controller = new AbortController()
  const timeout = window.setTimeout(async () => {
    isSearching.value = true

    try {
      const response = await fetch(`https://challenge.tanki.su/api/v1/tournaments/${id}`, {
        signal: controller.signal,
      })
      if (!response.ok) throw new Error(response.status === 404 ? 'Турнир не найден' : 'Не удалось загрузить турнир')

      const result = await response.json()
      const tournament = result.data as TournamentOption | undefined
      if (!tournament || tournament.id !== id || typeof tournament.name !== 'string') {
        throw new Error('Некорректный ответ API')
      }

      externalTournaments.value = [
        tournament,
        ...externalTournaments.value.filter(item => item.id !== tournament.id),
      ]
    } catch (cause) {
      if (!controller.signal.aborted) {
        searchError.value = cause instanceof Error ? cause.message : 'Не удалось загрузить турнир'
      }
    } finally {
      if (!controller.signal.aborted) isSearching.value = false
    }
  }, 300)

  onCleanup(() => {
    window.clearTimeout(timeout)
    controller.abort()
  })
})

type TournamentStatus = 'active' | 'future' | 'past'

function status(tournament: TournamentOption): TournamentStatus {
  const now = Date.now()
  const start = new Date(`${tournament.started_at}Z`).getTime()
  const finish = new Date(`${tournament.finished_at}Z`).getTime()

  if (tournament.status === 'active' || start <= now && now <= finish) return 'active'
  if (start > now || tournament.status === 'ready') return 'future'
  return 'past'
}

function statusLabel(tournament: TournamentOption) {
  return { active: 'Идёт', future: 'Скоро', past: 'Прошёл' }[status(tournament)]
}

let afterPointerDown = false
function pointerDown(event: PointerEvent) {
  event.preventDefault()
  event.stopPropagation()
  afterPointerDown = true
  isOpen.value = !isOpen.value

  document.addEventListener('pointerup', () => {
    afterPointerDown = false
  }, { once: true })
}

function pointerUp(tournament: TournamentOption) {
  if (!afterPointerDown) return

  afterPointerDown = false

  select(tournament)
  isOpen.value = false
}

function select(tournament: TournamentOption) {
  if (!isSupported(tournament)) return
  value.value = tournament.id.toString()
  search.value = ''
  isOpen.value = false
}

onMounted(async () => {
  try {
    const response = await fetch('https://challenge.tanki.su/api/v1/tournaments')
    if (!response.ok) throw new Error(`Tournament API responded with ${response.status}`)
    const result = await response.json()
    const order = { active: 0, future: 1, past: 2 }

    tournaments.value = (result.data as TournamentOption[]).toSorted((a, b) => {
      const byStatus = order[status(a)] - order[status(b)]
      if (byStatus !== 0) return byStatus
      const direction = status(a) === 'past' ? -1 : 1
      return direction * (new Date(a.started_at).getTime() - new Date(b.started_at).getTime())
    })

  } catch (e) {
    console.error(e)
    error.value = true
  } finally {
    isLoading.value = false
  }
})
</script>

<style lang="scss" scoped>
.line {
  position: relative;

  select {
    cursor: pointer;
  }
}

.tournaments {
  width: 330px;
  max-width: calc(100vw - 30px);
  max-height: 275px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0;

  &::-webkit-scrollbar-track {
    margin-block-end: 7px;
    margin-block-start: 7px;
  }

  .search {
    position: sticky;
    top: 0;
    z-index: 2;
    display: flex;
    flex: none;
    align-items: center;
    height: 2em;
    max-height: 2em;
    background: #2a2a2a;
    border-bottom: 1px solid #424242;

    input {
      flex: 1;
      min-width: 0;
      height: 100%;
      padding: 0 5px 0 0;
      font-size: .85em;
      color: #fff;
      background: transparent;
      border: unset;
      outline: none;
    }

    .icon {
      padding: 5px;
      padding-left: 10px;
      height: 1.8em;
    }
  }

  .results {
    padding: 5px;
    display: flex;
    flex-direction: column;
  }

  .tournament {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 4px;
    min-height: 42px;
    padding: 7px 10px;
    color: #f2f2f2;
    background: transparent;
    border: 0;
    cursor: pointer;
    font-size: 14px;
    position: relative;
    border-radius: 5px;

    &::after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: -0.5px;
      height: 1px;
      z-index: 1;
      background-color: var(--separator-color, #4b4b4b);
      display: none;
    }

    &:not(:last-child)::after {
      display: block;
    }

    &.selected:has(+:not(.selected))::after {
      display: none;
    }

    &:not(.selected):has(+.selected)::after {
      display: none;
    }

    &:hover:not(:disabled):not(.selected) {
      background: #353535;
    }

    &.selected {
      background: #0a6bcc;
    }

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    &:last-of-type {
      border-bottom: 0;
    }

    .name {
      flex: 1;
      min-width: 0;
      line-height: 1.25;
    }

    .badges {
      display: flex;
      flex: none;
      align-items: center;
      justify-content: flex-end;
      gap: 6px;

      .badge {
        padding: 1px 4px;
        color: white;
        border-radius: 20px;
        font-size: 8px;
        line-height: 1.35;
        text-transform: uppercase;
        font-weight: bold;

        &.active,
        &.supported {
          background-color: #2ca062;
        }

        &.future {
          background-color: #2d67a0;
        }

        &.past {
          color: #999;
        }

        &.unsupported {
          color: #d69b9b;
          border-color: #704747;
        }
      }

    }

  }
}

.message {
  padding: 14px;
  color: #aaa;
  text-align: center;
}
</style>
