<template>
  <div class="user-form-container">
    <div class="user-form border me-4">
      <h3 class="mb-3">Личная информация</h3>
      <FormComponent
        submit-text="Сохранить"
        :is-loading="props.isLoading"
        :item-prototype="props.user"
        :fields="updateFormFields"
        @submitted="(item) => emit('submittedUser', item)"
      />
    </div>

    <div class="user-form border me-4" v-if="props.includePasswordForm">
      <h3 class="mb-3">Смена пароля</h3>
      <FormComponent
        submit-text="Сохранить"
        :is-loading="props.isLoading"
        :item-prototype="passwordUpdatePrototype"
        :fields="passwordUpdateFormFields"
        :error-text="passwordFormError"
        @submitted="(item) => passwordSubmitHandler(item)"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';

.user-form-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
}

.user-form {
  flex-grow: 1;
  flex-shrink: 0;
  border-radius: $border-radius-lg;
  padding: $spacer * 2;
}
</style>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { dateToString } from '@/utils'
import FormComponent, { type FormField } from '@/components/FormComponent.vue'
import {
  type User,
  UserRole,
  JudgeRank,
  judgeRankToLocaleString,
  USER_ROLE_SELECT_OPTIONS
} from '@/schemas/users'
import { useAuthStore } from '@/stores/auth'

export interface Props {
  user: User
  isLoading?: boolean
  includePasswordForm?: boolean
}

export interface PasswordUpdate {
  old_password: string
  new_password: string
  repeat_password: string
}

const auth = useAuthStore()

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  includePasswordForm: true
})
const emit = defineEmits(['submittedUser', 'submittedPassword'])

const baseUpdateFormFields: FormField[] = [
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
    disabled: true,
    name: 'role',
    options: USER_ROLE_SELECT_OPTIONS
  }
]
const passwordUpdateFormFields: FormField[] = [
  {
    inputType: 'password',
    name: 'old_password',
    displayName: 'Старый пароль'
  },
  {
    inputType: 'password',
    name: 'new_password',
    displayName: 'Новый пароль'
  },
  {
    inputType: 'password',
    name: 'repeat_password',
    displayName: 'Повторите пароль пароль'
  }
]
const passwordUpdatePrototype: PasswordUpdate = {
  new_password: '',
  old_password: '',
  repeat_password: ''
}

const updateFormFields = ref<FormField[]>(baseUpdateFormFields)
const passwordFormError = ref<string | undefined>(undefined)

async function passwordSubmitHandler(passwordUpdate: PasswordUpdate) {
  if (passwordUpdate.old_password != auth.password) {
    passwordFormError.value = 'Указан неверный пароль'
    return
  }

  if (passwordUpdate.new_password != passwordUpdate.repeat_password) {
    passwordFormError.value = 'Пароли отличаются друг от друга'
    return
  }

  passwordFormError.value = undefined

  emit('submittedPassword', passwordUpdate.new_password)
}

watchEffect(() => {
  if (props.user.role === UserRole.Judge) {
    updateFormFields.value = baseUpdateFormFields.concat([
      {
        inputType: 'select',
        name: 'judge_rank',
        displayName: 'Должность/специализация судьи',
        options: Object.values(JudgeRank).map((rank) => {
          return { displayName: judgeRankToLocaleString(rank), value: rank }
        })
      }
    ])
  } else {
    updateFormFields.value = baseUpdateFormFields
  }
})
</script>
