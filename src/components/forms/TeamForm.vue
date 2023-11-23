<template>
  <FormComponent
    class="max-width-480"
    :fields="formFields"
    :item-prototype="team"
    :is-loading="props.isLoading"
    :read-only="props.readOnly"
    submit-text="Сохранить"
    @submitted="(team) => emit('submitted', team)"
  />
</template>

<script setup lang="ts">
import FormComponent, { type FormField } from '@/components/FormComponent.vue'
import { type Team } from '@/schemas/teams'

export interface Props {
  team: Team
  isLoading?: boolean
  readOnly?: boolean
}

const props = withDefaults(defineProps<Props>(), { isLoading: false, readOnly: true })
const emit = defineEmits(['submitted'])

const formFields: FormField[] = [
  {
    inputType: 'text',
    name: 'name',
    displayName: 'Название',
    maxLength: 50
  },
  {
    inputType: 'text',
    name: 'leader_full_name',
    displayName: 'ФИО лидера',
    readOnly: true
  }
]
</script>
