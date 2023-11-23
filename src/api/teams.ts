import type { CreateTeam, Team, UpdateTeam } from '@/schemas/teams'
import { apiGet, apiPost, apiPut } from './utils'

export async function getAllTeams() {
  return (await apiGet(`/teams`)) as Team
}

export async function getTeamById(id: number) {
  return (await apiGet(`/teams/${id}`)) as Team
}

export async function getMyTeam() {
  return (await apiGet(`/teams/my`)) as Team
}

export async function createMyTeam(team: CreateTeam) {
  return (await apiPost(`/teams/my`, team)) as Team
}

export async function updateMyTeam(team: UpdateTeam) {
  return (await apiPut(`/teams/my`, team)) as Team
}
