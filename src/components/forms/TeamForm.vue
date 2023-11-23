<template>
  <div>
    <FormComponent
      class="max-width-480 mb-3"
      :fields="teamFormFields"
      :item-prototype="team"
      :is-loading="props.isLoading"
      submit-text="Сохранить"
    />

    <h2 class="mt-5">Игроки</h2>
    <TableComponent
      :columns="playerTableColumns"
      :items="activePlayers"
      :row-buttons="playerTableButtons"
    />
  </div>
</template>

<style scoped lang="scss">
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';
</style>

<script setup lang="ts">
import { ref } from 'vue'
import TableComponent, { type RowButton, type TableColumn } from '../TableComponent.vue'
import FormComponent, { type FormField } from '@/components/FormComponent.vue'
import { type Team } from '@/schemas/teams'
import { dateFromString, extractFullName } from '@/utils'
import { type Player } from '@/schemas/players'

export interface Props {
  isLoading: boolean
}

const props = withDefaults(defineProps<Props>(), { isLoading: false })

const teamFormFields: FormField[] = [
  {
    inputType: 'text',
    name: 'name',
    displayName: 'Название'
  },
  {
    inputType: 'text',
    name: 'leader_full_name',
    displayName: 'ФИО лидера',
    readOnly: true
  }
]
const playerTableColumns: TableColumn[] = [
  {
    fieldName: 'id',
    displayName: 'id',
    isHeader: true
  },

  {
    fieldName: 'nickname',
    displayName: 'Никнейм'
  },
  {
    fieldName: 'full_name',
    displayName: 'ФИО',
    toStringConverter: (item) => extractFullName(item)
  },
  {
    fieldName: 'birth_date',
    displayName: 'Дата рождения',
    toStringConverter: (item) => dateFromString(item.birth_date).toLocaleDateString()
  },
  {
    fieldName: 'country',
    displayName: 'Страна'
  },
  {
    fieldName: 'city',
    displayName: 'Город'
  },
  {
    fieldName: 'phone',
    displayName: 'Телефон'
  },
  {
    fieldName: 'email',
    displayName: 'Email'
  },
  {
    fieldName: 'citizenship',
    displayName: 'Гражданство'
  },
  {
    fieldName: 'gto_id',
    displayName: 'Номер ГТО'
  },
  {
    fieldName: 'rank',
    displayName: 'Разряд'
  },
  {
    fieldName: 'pd_accepted',
    displayName: 'Соглашение',
    toStringConverter: (player) => (player.pd_accepted ? 'Согласен' : 'Не согласен')
  }
]
const playerTableButtons: RowButton[] = [
  {
    name: 'edit',
    iconClass: 'bi-pencil-fill',
    buttonClass: 'btn-primary'
  },
  {
    name: 'delete',
    iconClass: 'bi-trash-fill',
    buttonClass: 'btn-danger'
  }
]

const team = ref<Team>({ id: 1, name: 'Team_1', leader_full_name: 'Пупкин Василий Иванович' })
const activePlayers = ref<Player[]>([
  {
    id: 1,
    gto_id: 12312312,
    nickname: 'nickname',
    last_name: 'Петров',
    first_name: 'Петр',
    patronymic: 'Петрович',
    birth_date: '2000-12-31',
    country: 'Россия',
    city: 'Самара',
    phone: '123456789',
    email: 'example@mail.com',
    citizenship: 'РФ',
    rank: 'I',
    pd_accepted: true
  },
  {
    id: 2,
    gto_id: 12312312,
    nickname: 'nickname_2.0',
    last_name: 'Пупкин',
    first_name: 'Василий',
    patronymic: 'Иванович',
    birth_date: '2000-12-31',
    country: 'Россия',
    city: 'Самара',
    phone: '123456789',
    email: 'example@mail.com',
    citizenship: 'РФ',
    rank: 'II',
    pd_accepted: false
  }
])
</script>
