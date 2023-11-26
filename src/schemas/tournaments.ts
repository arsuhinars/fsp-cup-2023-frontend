import type { Player } from './players'
import type { ShortTeamComposition, Team } from './teams'

export enum TournamentStatus {
  JustCreated = 'JUST_CREATED',
  RegistrationOpened = 'REGISTRATION_OPENED',
  RegistartionClosed = 'REGISTRATION_CLOSED',
  Ongoing = 'ONGOING',
  Finished = 'FINISHED'
}

export function tournamentStatusToLocaleString(status: TournamentStatus) {
  switch (status) {
    case TournamentStatus.JustCreated:
      return 'Создан'
    case TournamentStatus.RegistrationOpened:
      return 'Открыта регистрация'
    case TournamentStatus.RegistartionClosed:
      return 'Регистрация закрыта'
    case TournamentStatus.Ongoing:
      return 'Проводится'
    case TournamentStatus.Finished:
      return 'Завершен'
    default:
      return ''
  }
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
  main_judge_full_name: string
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

export function tournamentRequestStatusToLocaleString(status: TournamentRequestStatus): string {
  switch (status) {
    case TournamentRequestStatus.Pending:
      return 'Ожидает ответа'
    case TournamentRequestStatus.Accepted:
      return 'Одобрена'
    case TournamentRequestStatus.Declined:
      return 'Отклонена'
  }
}

export interface TournamentRequest {
  id: number
  team: Team
  active_players: Player[]
  status: TournamentRequestStatus
}
