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
