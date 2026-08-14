import { defineWidget, TournamentOption } from '@/utils/defineWidget'

export type SupportedVictoryType = 'exp' | 'damage' | 'kills' | 'score'

export type ChallengeTournament = TournamentOption & {
  participants_count: number
}

export function isSupportedTournament(tournament: TournamentOption) {
  if (tournament.stats_type === 'total') {
    const isKnownTotal = tournament.battle_type === 'random'
      ? ['exp', 'damage', 'kills'].includes(tournament.victory_type)
      : tournament.battle_type === 'battle_royale' && tournament.victory_type === 'exp'

    return isKnownTotal && (tournament.best_battles ?? 0) > 0
  }

  const isKnownSeries = tournament.stats_type === 'best_series' && (
    tournament.battle_type === 'random' && tournament.victory_type === 'damage' ||
    tournament.battle_type === 'battle_royale' && tournament.victory_type === 'score'
  )

  return isKnownSeries && (tournament.series_size ?? 0) > 0
}

export type UniversalTournamentProps = {
  hideL1: boolean,
  hideL2: boolean,
  hideL3: boolean,
  hideL4: boolean,
  skin?: 'default' | 'transparent',
  place: number
  battleCount: number,
  targetBattleCount: number,
  ruleLabel: string,
  isSeries: boolean,
  currentSeriesSum: number,
  bestSeriesSum: number,
  bestBattles: {
    tank: string | null,
    date: number | null,
    score: number,
    today: boolean,
  }[],
  bestSeries: {
    tank: string | null,
    date: number | null,
    score: number,
    today: boolean,
  }[],
  last10: number[],
  lastBattle?: {
    tank: string | null,
    score: number
  }
}

export default defineWidget({
  name: 'Универсальный турнирный',
  description: 'Универсальный виджет для турниров challenge.tanki.su',
  params: [
    { type: 'tournament', target: 'tournament', label: 'Турнир', default: '', isSupported: isSupportedTournament },
    { type: 'separator' },
    {
      type: 'select', target: 'skin', label: 'shared:style:title', variants: [
        { value: 'default', label: 'Стандартный' },
        { value: 'transparent', label: 'shared:style:transparent' },
      ], default: 'transparent'
    },
    { type: 'accentColorParam' },
    { type: 'backgroundColorParam', visible: ctx => ctx.skin === 'default' },
    { type: 'checkbox', target: 'hideL1', label: 'Скрыть заголовок', default: false },
    { type: 'checkbox', target: 'hideL2', label: 'Скрыть таблицу', default: false },
    { type: 'checkbox', target: 'hideL3', label: 'Скрыть график', default: false },
    { type: 'checkbox', target: 'hideL4', label: 'Скрыть лучшую серию', default: false },
  ]
})
