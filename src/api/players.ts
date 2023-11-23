import type { CreatePlayer, Player, UpdatePlayer } from '@/schemas/players'
import { apiDelete, apiGet, apiPost, apiPut } from './utils'

export async function getAllPlayersInTeam(team_id: number) {
  return (await apiGet(`/teams/${team_id}/players`)) as Player[]
}

export async function createPlayerInMyTeam(player: CreatePlayer) {
  return (await apiPost(`/teams/my/players`, player)) as Player
}

export async function getPlayerById(id: number) {
  return (await apiGet(`/players/${id}`)) as Player
}

export async function updatePlayerById(id: number, player: UpdatePlayer) {
  return (await apiPut(`/players/${id}`, player)) as Player
}

export async function deletePlayerById(id: number) {
  return await apiDelete(`/players/${id}`)
}
