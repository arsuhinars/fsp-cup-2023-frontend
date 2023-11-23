export enum UserRole {
  Admin = 'ADMIN',
  Judge = 'JUDGE',
  TeamCaptain = 'TEAM_CAPTAIN'
}

export function userRoleToLocaleString(role: UserRole): string {
  switch (role) {
    case UserRole.Admin:
      return 'Администратор'
    case UserRole.Judge:
      return 'Судья'
    case UserRole.TeamCaptain:
      return 'Капитан команды'
    default:
      return ''
  }
}

export const USER_ROLE_SELECT_OPTIONS = Object.values(UserRole).map((role) => {
  return { displayName: userRoleToLocaleString(role), value: role }
})

export enum JudgeRank {
  MatchJudge = 'MATCH_JUDGE',
  MainTournamentJudge = 'MAIN_TOURNAMENT_JUDGE',
  TournamentSecretary = 'TOURNAMENT_SECRETARY'
}

export function judgeRankToLocaleString(rank: JudgeRank | null): string {
  switch (rank) {
    case JudgeRank.MatchJudge:
      return 'Матчевый судья'
    case JudgeRank.MainTournamentJudge:
      return 'Главный судья соревнований'
    case JudgeRank.TournamentSecretary:
      return 'Секретарь соревнований'
    default:
      return '—'
  }
}

export const JUDGE_RANK_SELECT_OPTIONS = Object.values(JudgeRank).map((rank) => {
  return { displayName: judgeRankToLocaleString(rank), value: rank }
})

export interface User {
  id: number
  last_name: string
  first_name: string
  patronymic: string
  birth_date: string
  country: string
  city: string
  phone: string
  email: string
  role: UserRole
  judge_rank: JudgeRank | null
}

export interface CreateUser {
  password: string
  last_name: string
  first_name: string
  patronymic: string
  birth_date: string
  country: string
  city: string
  phone: string
  email: string
  role: UserRole
  judge_rank?: JudgeRank | null
}

export interface UpdateUser {
  last_name: string
  first_name: string
  patronymic: string
  birth_date: string
  country: string
  city: string
  phone: string
  email: string
  role: UserRole
  judge_rank: JudgeRank | null
}
