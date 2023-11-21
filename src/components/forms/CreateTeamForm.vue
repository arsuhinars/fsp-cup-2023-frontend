<template>
  <FormComponent class="max-width-480" submit-text="Создать" :is-loading="props.isLoading">
    <label for="name" class="form-label">Название</label>
    <input type="text" class="form-control mb-2" id="name" required />
  </FormComponent>
</template>

<script setup lang="ts">
import FormComponent from '../FormComponent.vue'

interface Props {
  isLoading: boolean
}

const props = withDefaults(defineProps<Props>(), { isLoading: false })
</script>
