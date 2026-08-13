<template>
  <div class="line">
    <p>{{ label }}</p>
    <button class="selector" ref="selector" type="button" aria-haspopup="listbox" :aria-expanded="isOpen"
      @click="isOpen = !isOpen">
      <span>{{ selected?.name ?? (isLoading ? 'Загрузка…' : 'Выберите турнир') }}</span>
      <ArrowUpDown class="chevron" />
    </button>

    <PopoverStyled :target="selector" :display="isOpen" @click-outside="isOpen = false"
      placement="bottom-end-float" :arrow-size="0" :offset="5">
      <div class="tournaments nice-scrollbar">
        <p class="message" v-if="error">Не удалось загрузить турниры</p>
        <button v-for="tournament in tournaments" :key="tournament.id" class="tournament"
          :class="{ selected: tournament.id.toString() === value }" :disabled="!isSupported(tournament)"
          @click="select(tournament)">
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
import ArrowUpDown from '@/components/colorPicker/arrow-up-down.svg'
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
}

.selector {
  position: relative;
  width: 140px;
  height: 23px;
  padding: 0.15em 1.5em 0.15em 0.3em;
  color: #fff;
  background: #3b3b3b;
  border: 1px solid #858585;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;

  span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .chevron {
    position: absolute;
    top: 50%;
    right: 6px;
    width: 7px;
    height: 7px;
    fill: #aaa;
    transform: translateY(-50%);
    pointer-events: none;
  }
}

.tournaments {
  width: 390px;
  max-width: calc(100vw - 30px);
  max-height: min(430px, calc(100vh - 30px));
  overflow-y: auto;
  padding: 6px;
}

.tournament {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 9px;
  color: #f2f2f2;
  background: transparent;
  border: 0;
  border-radius: 6px;
  text-align: left;
  cursor: pointer;

  &:hover:not(:disabled) {
    background: #48484a;
  }

  &.selected {
    background: #0a6bcc;
  }

  &:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .name {
    line-height: 1.25;
  }
}

.badges {
  display: flex;
  gap: 5px;
}

.badge {
  padding: 2px 6px;
  border-radius: 999px;
  font-size: 10px;
  line-height: 1.2;
  background: #444;

  &.active,
  &.supported {
    color: #bce9c4;
    background: #285333;
  }

  &.future {
    color: #c6dcff;
    background: #29476f;
  }

  &.past {
    color: #ccc;
  }

  &.unsupported {
    color: #efb8b8;
    background: #5a3030;
  }
}

.message {
  padding: 14px;
  color: #aaa;
  text-align: center;
}
</style>
