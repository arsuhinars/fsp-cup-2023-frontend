<template>
  <FormComponent
    class="max-width-480"
    submit-text="Сохранить"
    :is-loading="props.isLoading"
    :item-prototype="props.user"
    :fields="formFields"
    :error-text="props.extraErrorText"
    @submitted="(item) => emit('submitted', item)"
  />
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { dateToString } from '@/utils'
import FormComponent, { type FormField } from '@/components/FormComponent.vue'
import {
  type User,
  UserRole,
  USER_ROLE_SELECT_OPTIONS,
  JUDGE_RANK_SELECT_OPTIONS
} from '@/schemas/users'

export interface Props {
  user: User
  isLoading?: boolean
  extraErrorText?: string
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false
})
const emit = defineEmits(['submitted'])

const baseFormFields: FormField[] = [
  {
    inputType: 'text',
    displayName: 'Фамилия',
    name: 'last_name'
  },
  {
    inputType: 'text',
    displayName: 'Имя',
    name: 'first_name'
  },
  {
    inputType: 'text',
    displayName: 'Отчество',
    name: 'patronymic'
  },
  {
    inputType: 'date',
    displayName: 'Дата рождения',
    name: 'birth_date',
    valueWriter: (item, value) => (item.birth_date = dateToString(value))
  },
  {
    inputType: 'text',
    displayName: 'Страна',
    name: 'country'
  },
  {
    inputType: 'text',
    displayName: 'Город',
    name: 'city'
  },
  {
    inputType: 'tel',
    displayName: 'Номер телефона',
    name: 'phone'
  },
  {
    inputType: 'email',
    displayName: 'Адрес электронной почты',
    name: 'email'
  },
  {
    inputType: 'select',
    displayName: 'Роль',
    readOnly: true,
    name: 'role',
    options: USER_ROLE_SELECT_OPTIONS
  }
]

const formFields = ref<FormField[]>([])

watchEffect(() => {
  if (props.user.role === UserRole.Judge) {
    formFields.value = baseFormFields.concat([
      {
        inputType: 'select',
        name: 'judge_rank',
        displayName: 'Должность/специализация судьи',
        options: JUDGE_RANK_SELECT_OPTIONS
      }
    ])
  } else {
    formFields.value = baseFormFields
  }
})
</script>
