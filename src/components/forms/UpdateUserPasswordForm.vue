<template>
  <FormComponent
    class="max-width-480"
    submit-text="Сохранить"
    :is-loading="props.isLoading"
    :item-prototype="formItemPrototype"
    :fields="formFields"
    :error-text="passwordFormError"
    @submitted="submitHandler"
    ref="form"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormComponent, { type FormField } from '@/components/FormComponent.vue'
import { useAuthStore } from '@/stores/auth'

export interface Props {
  isLoading?: boolean
}

export interface PasswordUpdate {
  old_password: string
  new_password: string
  repeat_password: string
}

const auth = useAuthStore()

const props = withDefaults(defineProps<Props>(), {
  isLoading: false
})
const emit = defineEmits(['submitted'])

const formFields: FormField[] = [
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
const formItemPrototype: PasswordUpdate = {
  new_password: '',
  old_password: '',
  repeat_password: ''
}

const form = ref<InstanceType<typeof FormComponent> | null>(null)
const passwordFormError = ref<string | undefined>(undefined)

function submitHandler(passwordUpdate: PasswordUpdate) {
  if (passwordUpdate.old_password != auth.password) {
    passwordFormError.value = 'Указан неверный пароль'
    return
  }

  if (passwordUpdate.new_password != passwordUpdate.repeat_password) {
    passwordFormError.value = 'Пароли отличаются друг от друга'
    return
  }

  passwordFormError.value = undefined
  form.value?.clear()

  emit('submitted', passwordUpdate.new_password)
}
</script>
