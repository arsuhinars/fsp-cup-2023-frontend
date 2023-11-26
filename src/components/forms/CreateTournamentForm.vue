<template>
  <FormComponent
    class="max-width-480"
    submit-text="Создать"
    :is-loading="props.isLoading"
    :item-prototype="itemPrototype"
    :fields="formFields"
    @submitted="(tournament: CreateTournament) => emit('submitted', tournament)"
    ref="form"
  />
</template>

<script setup lang="ts">
import FormComponent from '../FormComponent.vue'
import { dateToString } from '@/utils'
import type { FormField } from '../FormComponent.vue'
import type { CreateTournament } from '@/schemas/tournaments'

interface Props {
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), { isLoading: false })
const emit = defineEmits(['submitted'])

const formFields: FormField[] = [
  {
    inputType: 'text',
    name: 'name',
    displayName: 'Название'
  },
  {
    inputType: 'text',
    name: 'location',
    displayName: 'Место проведения'
  },
  {
    inputType: 'text',
    name: 'discipline',
    displayName: 'Дисциплина'
  },
  {
    inputType: 'date',
    name: 'date_registration',
    displayName: 'Дата начала регистрации',
    valueWriter: (item, date) => (item.date_registration = dateToString(date))
  },
  {
    inputType: 'date',
    name: 'date_begin',
    displayName: 'Дата начала соревнований',
    valueWriter: (item, date) => (item.date_begin = dateToString(date))
  },
  {
    inputType: 'date',
    name: 'date_end',
    displayName: 'Дата окончания соревнований',
    valueWriter: (item, date) => (item.date_end = dateToString(date))
  },
  {
    inputType: 'date',
    name: 'date_awards',
    displayName: 'Дата награждения, закрытия',
    valueWriter: (item, date) => (item.date_awards = dateToString(date))
  }
]
const itemPrototype: CreateTournament = {
  name: '',
  location: '',
  discipline: '',
  date_registration: '2000-01-01',
  date_begin: '2000-01-01',
  date_end: '2000-01-01',
  date_awards: '2000-01-01'
}
</script>
