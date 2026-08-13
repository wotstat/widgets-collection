<template>
  <main class="page">
    <header>
      <div>
        <h1>Сетка поддерживаемых турниров</h1>
        <p>Исторические турниры из get-active с результатом игрока на первом месте.</p>
      </div>
      <button type="button" :disabled="loading" @click="load">Обновить</button>
    </header>

    <p v-if="loading" class="state">Загружаю турниры…</p>
    <p v-else-if="error" class="state error">{{ error }}</p>
    <p v-else class="state">Поддерживается: {{ examples.length }} из {{ totalCount }}</p>

    <section class="grid">
      <article v-for="example in examples" :key="example.tournament.id" class="example">
        <div class="meta">
          <div>
            <h2>{{ example.tournament.name }}</h2>
            <p>#{{ example.tournament.id }} · {{ describeRule(example.tournament) }}</p>
          </div>
          <a :href="example.widgetUrl" target="_blank" rel="noreferrer">{{ example.nickname }}</a>
        </div>
        <iframe
          :title="`${example.tournament.name} — ${example.nickname}`"
          :src="example.widgetUrl"
          loading="lazy"
        />
      </article>
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  ChallengeTournament,
  isSupportedTournament,
} from '@/widgets/tournament/universal/define.widget'

const API_URL = 'https://challenge.tanki.su/api/v1/tournaments'
const FORCED_TOURNAMENT_IDS = [1015, 801]

type Participant = {
  user: { name: string }
}

type TournamentExample = {
  tournament: ChallengeTournament,
  nickname: string,
  widgetUrl: string,
}

const examples = ref<TournamentExample[]>([])
const totalCount = ref(0)
const loading = ref(false)
const error = ref('')

function describeRule(tournament: ChallengeTournament) {
  if (tournament.stats_type === 'best_series') {
    return `лучшая серия из ${tournament.series_size} · ${tournament.victory_type}`
  }

  return `лучшие бои: ${tournament.best_battles} · ${tournament.victory_type}`
}

async function loadTournament(id: number) {
  const response = await fetch(`${API_URL}/${id}?offset=0&limit=1`)
  if (!response.ok) return null

  const { data } = await response.json() as {
    data: ChallengeTournament & { participants?: Participant[] }
  }

  const nickname = data.participants?.[0]?.user.name
  if (!nickname || !isSupportedTournament(data)) return null

  const query = new URLSearchParams({
    tournament: data.id.toString(),
    nickname,
    skin: 'transparent',
  })

  return {
    tournament: data,
    nickname,
    widgetUrl: `/tournament/universal?${query}`,
  }
}

async function load() {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch(`${API_URL}/get-active`)
    if (!response.ok) throw new Error(`API вернул ${response.status}`)

    const { data } = await response.json() as { data: { id: number }[] }
    const ids = [...new Set([...FORCED_TOURNAMENT_IDS, ...data.map(item => item.id)])]
    totalCount.value = ids.length

    const loaded = await Promise.all(ids.map(id => loadTournament(id).catch(() => null)))
    examples.value = loaded.filter((item): item is TournamentExample => item !== null)
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'Не удалось загрузить турниры'
  } finally {
    loading.value = false
  }
}

onMounted(load)
</script>

<style lang="scss" scoped>
.page {
  box-sizing: border-box;
  min-height: 100vh;
  padding: 32px;
  color: #f4f4f4;
  background: #151515;
}

header,
.meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

h1,
h2,
p {
  margin: 0;
}

header p,
.meta p,
.state {
  margin-top: 6px;
  color: #999;
}

button,
a {
  color: #ffc94a;
}

button {
  padding: 8px 14px;
  border: 1px solid #555;
  border-radius: 6px;
  background: #252525;
  cursor: pointer;
}

button:disabled {
  cursor: default;
  opacity: .5;
}

.state {
  margin: 24px 0 12px;
}

.error {
  color: #ff6b6b;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 520px), 1fr));
  gap: 20px;
}

.example {
  overflow: hidden;
  border: 1px solid #333;
  border-radius: 10px;
  background: #1e1e1e;
}

.meta {
  min-height: 58px;
  padding: 12px 16px;
  border-bottom: 1px solid #333;
}

.meta h2 {
  font-size: 16px;
}

.meta p {
  font-size: 12px;
}

.meta a {
  flex-shrink: 0;
}

iframe {
  display: block;
  width: 100%;
  height: 430px;
  border: 0;
}

@media (max-width: 600px) {
  .page {
    padding: 16px;
  }

  header,
  .meta {
    align-items: flex-start;
  }
}
</style>
