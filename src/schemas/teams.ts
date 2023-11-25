import type { Player } from './players'

export interface Team {
  id: number
  name: string
  leader_id: number
  leader_full_name: string
}

export interface CreateTeam {
  name: string
}

export interface UpdateTeam {
  name: string
}

export interface TeamComposition {
  id: number
  team: Team
  players: Player[]
}

export interface ShortTeamComposition {
  id: number
  team_id: number
  team_name: string
}
