import type { Player } from './players'
import type { ShortTeamComposition, Team } from './teams'

export enum TournamentStatus {
  JustCreated = 'JUST_CREATED',
  RegistrationOpened = 'REGISTRATION_OPENED',
  RegistartionClosed = 'REGISTRATION_CLOSED',
  Ongoing = 'ONGOING',
  Finished = 'FINISHED'
}

export interface Tournament {
  id: number
  name: string
  location: string
  discipline: string
  date_registration: string
  date_begin: string
  date_end: string
  date_awards: string
  main_judge_id: number
  state: TournamentStatus
}

export interface CreateTournament {
  name: string
  location: string
  discipline: string
  date_registration: string
  date_begin: string
  date_end: string
  date_awards: string
}

export interface UpdateTournament {
  name: string
  location: string
  discipline: string
  date_registration: string
  date_begin: string
  date_end: string
  date_awards: string
}

export interface TournamentStart {
  team_compositions_ids: number[]
}

export interface TournamentSet {
  team_composition: ShortTeamComposition
  result_place: number
}

export enum TournamentRequestStatus {
  Pending = 'PENDING',
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED'
}

export interface TournamentRequest {
  id: number
  team: Team
  active_players: Player[]
  status: TournamentRequestStatus
}
