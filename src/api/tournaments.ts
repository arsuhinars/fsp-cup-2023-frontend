import type { Match, UpdateMatch } from '@/schemas/matches'
import type { TeamComposition } from '@/schemas/teams'
import {
  type CreateTournament,
  type Tournament,
  type TournamentRequest,
  type TournamentSet,
  type UpdateTournament,
  type TournamentStart
} from '@/schemas/tournaments'
import { apiDelete, apiGet, apiPost, apiPut } from './utils'

export async function getAllTournaments() {
  return (await apiGet(`/tournaments`)) as Tournament[]
}

export async function getTournamentById(id: number) {
  return (await apiGet(`/tournaments/${id}`)) as Tournament
}

export async function createTournament(tournament: CreateTournament) {
  return (await apiPost(`/tournaments`, tournament)) as Tournament
}

export async function updateTournamentById(id: number, tournament: UpdateTournament) {
  return (await apiPut(`/tournaments/${id}`, tournament)) as Tournament
}

export async function deleteTournamentById(id: number) {
  await apiDelete(`/tournaments/${id}`)
}

export async function getTournamentTeamCompositions(tournament_id: number) {
  return (await apiGet(`/tournaments/${tournament_id}/team_compositions`)) as TeamComposition[]
}

export async function getTournamentResults(tournament_id: number) {
  return (await apiGet(`/tournaments/${tournament_id}/results`)) as TournamentSet[]
}

export async function startTournamentRegistartion(tournament_id: number) {
  await apiPost(`/tournaments/${tournament_id}/start_registration`, {})
}

export async function closeTournamentRegistartion(tournament_id: number) {
  await apiPost(`/tournaments/${tournament_id}/close_registration`, {})
}

export async function getTournamentRequests(tournament_id: number) {
  return (await apiGet(`/tournaments/${tournament_id}/requests`)) as TournamentRequest[]
}

export async function getMyTournamentRequest(tournament_id: number) {
  return (await apiGet(`/tournaments/${tournament_id}/requests/my`)) as TournamentRequest
}

export async function createTournamentRequest(tournament_id: number) {
  return (await apiPost(`/tournaments/${tournament_id}/requests`, {})) as TournamentRequest
}

export async function acceptTournamentRequest(tournament_request_id: number) {
  await apiPost(`/tournaments/requests/${tournament_request_id}/accept`, {})
}

export async function declineTournamentRequest(tournament_request_id: number) {
  await apiPost(`/tournaments/requests/${tournament_request_id}/decline`, {})
}

export async function startTournament(tournament_id: number, body: TournamentStart) {
  await apiPost(`/tournaments/${tournament_id}/start`, body)
}

export async function getTournamentMatches(tournament_id: number) {
  return (await apiGet(`/tournaments/${tournament_id}/matches`)) as Match[]
}

export async function updateTournamentMatch(match_id: number, match: UpdateMatch) {
  return (await apiPut(`/tournaments/matches/${match_id}`, match)) as Match
}

export async function startNextTournamentMatches(tournament_id: number) {
  await apiPost(`/tournaments/${tournament_id}/matches/next`, {})
}

export async function finishTournament(tournament_id: number) {
  await apiPost(`/tournaments/${tournament_id}/finish`, {})
}
