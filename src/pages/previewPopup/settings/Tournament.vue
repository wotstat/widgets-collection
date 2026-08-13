<template>
  <div class="line">
    <p>{{ label }}</p>
    <select class="loading" v-if="isLoading" disabled value="loading">
      <option value="loading">Загрузка…</option>
    </select>
    <select v-else v-model="value" @pointerdown="pointerDown" ref="selector">
      <option v-for="variant in tournaments" :key="variant.id" :value="variant.id">
        {{ variant.name || variant.id }}
      </option>
    </select>

    <PopoverStyled :target="selector" :display="isOpen" @click-outside="isOpen = false" placement="bottom-end-float"
      :arrow-size="0" :offset="5">
      <div class="tournaments nice-scrollbar">
        <p class="message" v-if="error">Не удалось загрузить турниры</p>
        <button v-for="tournament in tournaments" :key="tournament.id" class="tournament"
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
        <p class="message" v-if="!isLoading && !error && tournaments.length === 0">Турниров пока нет</p>
      </div>
    </PopoverStyled>
  </div>
</template>

<script setup lang="ts">
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

const selected = computed(() => tournaments.value.find(tournament => tournament.id.toString() === value.value))

watch([value, tournaments], ([current, items]) => {
  if (!current) value.value = items.find(isSupported)?.id.toString() ?? ''
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
  padding: 5px;

  gap: 0;

  &::-webkit-scrollbar-track {
    margin-block-end: 7px;
    margin-block-start: 7px;
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
