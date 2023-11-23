<template>
  <FormComponent
    class="max-width-480"
    :fields="formFields"
    :item-prototype="teamPrototype"
    :is-loading="props.isLoading"
    submit-text="Создать"
    @submitted="(team) => emit('submitted', team)"
  />
</template>

<script setup lang="ts">
import type { CreateTeam } from '@/schemas/teams'
import FormComponent, { type FormField } from '../FormComponent.vue'

interface Props {
  isLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), { isLoading: false })
const emit = defineEmits(['submitted'])

const formFields: FormField[] = [
  {
    inputType: 'text',
    name: 'name',
    displayName: 'Название',
    maxLength: 50
  }
]
const teamPrototype: CreateTeam = {
  name: ''
}
</script>
