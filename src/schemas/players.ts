export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export const GENDER_SELECT_OPTIONS = [
  {
    displayName: 'Мужской',
    value: Gender.Male
  },
  {
    displayName: 'Женский',
    value: Gender.Female
  }
]

export interface Player {
  id: number
  gto_id: string
  nickname: string
  last_name: string
  first_name: string
  patronymic: string
  gender: Gender
  birth_date: string
  country: string
  city: string
  phone: string
  email: string
  citizenship: string
  rank: string
  pd_accepted: boolean
  is_active_in_team: boolean
}

export interface CreatePlayer {
  gto_id: string
  nickname: string
  last_name: string
  first_name: string
  patronymic: string
  gender: Gender
  birth_date: string
  country: string
  city: string
  phone: string
  email: string
  citizenship: string
  rank: string
  pd_accepted: boolean
}

export interface UpdatePlayer {
  gto_id: string
  nickname: string
  last_name: string
  first_name: string
  patronymic: string
  gender: Gender
  birth_date: string
  country: string
  city: string
  phone: string
  email: string
  citizenship: string
  rank: string
  pd_accepted: boolean
  is_active_in_team: boolean
}
