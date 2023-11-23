<template>
  <ModalForm
    submitText="Сохранить"
    cancelText="Выйти"
    :titleText="props.titleText"
    :fields="formFields"
    :itemPrototype="props.player"
    :isLoading="props.isLoading"
    :readOnly="props.readOnly"
    ref="modalForm"
    @submitted="(player) => emit('submitted', player)"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ModalForm from '../ModalForm.vue'
import type { FormField } from '../FormComponent.vue'
import { dateFromString, dateToString } from '@/utils'
import type { Player } from '@/schemas/players'

export interface Props {
  player: Player
  titleText: string
  isLoading?: boolean
  readOnly?: boolean
}

const modalForm = ref<InstanceType<typeof ModalForm> | null>(null)

const formFields: FormField[] = [
  {
    inputType: 'text',
    name: 'nickname',
    displayName: 'Ник',
    maxLength: 50
  },
  {
    inputType: 'text',
    name: 'last_name',
    displayName: 'Фамилия',
    maxLength: 50
  },
  {
    inputType: 'text',
    name: 'first_name',
    displayName: 'Имя',
    maxLength: 50
  },
  {
    inputType: 'text',
    name: 'patronymic',
    displayName: 'Отчество',
    maxLength: 50
  },
  {
    inputType: 'date',
    name: 'birth_date',
    displayName: 'Дата рождения',
    valueReader: (player) => dateFromString(player.birth_date),
    valueWriter: (player, date) => (player.birth_date = dateToString(date))
  },
  {
    inputType: 'text',
    name: 'country',
    displayName: 'Страна',
    maxLength: 50
  },
  {
    inputType: 'text',
    name: 'city',
    displayName: 'Город',
    maxLength: 50
  },
  {
    inputType: 'text',
    name: 'phone',
    displayName: 'Номер телефона',
    maxLength: 50
  },
  {
    inputType: 'text',
    name: 'email',
    displayName: 'Адрес электронной почты',
    maxLength: 50
  },
  {
    inputType: 'text',
    name: 'citizenship',
    displayName: 'Гражданство',
    maxLength: 50
  },
  {
    inputType: 'text',
    name: 'gto_id',
    displayName: 'Номер ГТО',
    maxLength: 50
  },
  {
    inputType: 'text',
    name: 'rank',
    displayName: 'Разряд',
    maxLength: 50
  },
  {
    inputType: 'checkbox',
    name: 'pd_accepted',
    displayName: 'Согласие на обработку ПД'
  }
]

const props = withDefaults(defineProps<Props>(), { isLoading: false, readOnly: false })
const emit = defineEmits(['submitted'])

function show() {
  modalForm.value?.show()
}

function hide() {
  modalForm.value?.hide()
}

defineExpose({ show, hide })
</script>
