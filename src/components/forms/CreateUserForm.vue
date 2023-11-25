<template>
  <FormComponent
    class="max-width-480"
    submit-text="Создать"
    :is-loading="props.isLoading"
    :item-prototype="createUserPrototype"
    :fields="formFields"
    :error-text="errorText ?? extraErrorText"
    @submitted="formSubmitHandler"
    ref="form"
  />
</template>

<script setup lang="ts">
import FormComponent, { type FormField } from '@/components/FormComponent.vue'
import {
  USER_ROLE_SELECT_OPTIONS,
  type CreateUser,
  UserRole,
  JUDGE_RANK_SELECT_OPTIONS
} from '@/schemas/users'
import { dateToString } from '@/utils'
import { ref, watchEffect } from 'vue'

interface Props {
  isLoading?: boolean
  extraErrorText?: string
}

interface CreateUserForm extends CreateUser {
  repeat_password: string
}

const props = withDefaults(defineProps<Props>(), { isLoading: false })
const emit = defineEmits(['submitted'])

const baseFormFields: FormField[] = [
  {
    inputType: 'text',
    name: 'last_name',
    displayName: 'Фамилия'
  },
  {
    inputType: 'text',
    name: 'first_name',
    displayName: 'Имя'
  },
  {
    inputType: 'text',
    name: 'patronymic',
    displayName: 'Отчество'
  },
  {
    inputType: 'date',
    name: 'birth_date',
    displayName: 'Дата рождения',
    valueWriter: (item, value) => (item.birth_date = dateToString(value))
  },
  {
    inputType: 'text',
    name: 'country',
    displayName: 'Страна'
  },
  {
    inputType: 'text',
    name: 'city',
    displayName: 'Город'
  },
  {
    inputType: 'text',
    name: 'phone',
    displayName: 'Номер телефона'
  },
  {
    inputType: 'text',
    name: 'email',
    displayName: 'Адрес электронной почты'
  },
  {
    inputType: 'password',
    name: 'password',
    displayName: 'Пароль',
    pattern: '^[ -9;-~]*$'
  },
  {
    inputType: 'password',
    name: 'repeat_password',
    displayName: 'Повторите пароль',
    pattern: '^[ -9;-~]*$'
  },
  {
    inputType: 'select',
    name: 'role',
    displayName: 'Роль пользователя',
    options: USER_ROLE_SELECT_OPTIONS
  }
]
const createUserPrototype: CreateUserForm = {
  last_name: '',
  first_name: '',
  patronymic: '',
  birth_date: '2000-12-31',
  country: '',
  city: '',
  phone: '',
  email: '',
  password: '',
  repeat_password: '',
  role: UserRole.Admin,
  judge_rank: null
}

const form = ref<InstanceType<typeof FormComponent> | null>(null)
const formFields = ref<FormField[]>([])
const errorText = ref<string | undefined>(undefined)

function formSubmitHandler(user: CreateUserForm) {
  if (user.password != user.repeat_password) {
    errorText.value = 'Пароли отличаются друг от друга'
    return
  }

  errorText.value = undefined

  if (user.role != UserRole.Judge) {
    user.judge_rank = undefined
  }

  emit('submitted', user)
}

watchEffect(() => {
  if (form.value?.item.role == UserRole.Judge) {
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
