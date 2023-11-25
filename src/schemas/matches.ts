import type { ShortTeamComposition } from './teams'

export interface Match {
  id: number
  team_composition_a: ShortTeamComposition
  team_composition_b: ShortTeamComposition
  team_composition_winner_id: number | null
  order_number: number
  part_number: number
}

export interface UpdateMatch {
  team_composition_winner_id: number
}
