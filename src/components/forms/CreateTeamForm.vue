<template>
  <FormComponent class="max-width-480" submit-text="Создать">
    <label for="name" class="form-label">Название</label>
    <input type="text" class="form-control mb-2" id="name" required />
  </FormComponent>
</template>

<script setup lang="ts">
import FormComponent from '../FormComponent.vue'
</script>
