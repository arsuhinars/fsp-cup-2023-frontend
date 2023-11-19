<template>
  <div class="user-form-container">
    <FormComponent
      class="user-form border me-4"
      submit-text="Сохранить"
      :is-loading="props.isLoading"
    >
      <h3 class="mb-3">Личная информация</h3>

      <label for="lastName" class="form-label">Фамилия</label>
      <input type="text" class="form-control mb-3" id="lastName" required />

      <label for="firstName" class="form-label">Имя</label>
      <input type="text" class="form-control mb-3" id="firstName" required />

      <label for="patronymic" class="form-label">Отчество</label>
      <input type="text" class="form-control mb-3" id="patronymic" required />

      <label for="birthdate" class="form-label">Дата рождения</label>
      <input type="date" class="form-control mb-3" id="birthdate" required />

      <label for="country" class="form-label">Страна</label>
      <input type="text" class="form-control mb-3" id="country" required />

      <label for="city" class="form-label">Город</label>
      <input type="text" class="form-control mb-3" id="city" required />

      <label for="phone" class="form-label">Номер телефона</label>
      <input type="text" class="form-control mb-3" id="phone" required />

      <label for="email" class="form-label">Адрес электронной почты</label>
      <input type="text" class="form-control mb-3" id="email" required />

      <label class="form-label">Роль</label>
      <select class="form-select mb-4" id="role" disabled>
        <option value="ADMIN" selected>Администратор</option>
        <option value="JUDGE">Судья</option>
        <option value="CAPTAIN">Капитан команды</option>
      </select>
    </FormComponent>
    <FormComponent
      class="user-form border"
      submit-text="Изменить"
      v-if="props.includePasswordForm"
      :is-loading="props.isLoading"
    >
      <h3 class="mb-3">Смена пароля</h3>

      <label for="oldPassword" class="form-label">Старый пароль</label>
      <input type="text" class="form-control mb-3" id="oldPassword" required />

      <label for="newPassword" class="form-label">Новый пароль</label>
      <input type="text" class="form-control mb-3" id="newPassword" required />

      <label for="repeatPassword" class="form-label">Повторите новый пароль</label>
      <input type="text" class="form-control mb-3" id="repeatPassword" required />
    </FormComponent>
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
import FormComponent from '@/components/FormComponent.vue'

export interface Props {
  isLoading: boolean
  includePasswordForm: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  includePasswordForm: true
})
</script>
