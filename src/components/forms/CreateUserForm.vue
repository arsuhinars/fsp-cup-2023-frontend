<template>
  <FormComponent class="user-form small-container">
    <label for="lastName" class="form-label">Фамилия</label>
    <input type="text" class="form-control mb-2" id="lastName" required />

    <label for="firstName" class="form-label">Имя</label>
    <input type="text" class="form-control mb-2" id="firstName" required />

    <label for="patronymic" class="form-label">Отчество</label>
    <input type="text" class="form-control mb-2" id="patronymic" required />

    <label for="birthdate" class="form-label">Дата рождения</label>
    <input type="date" class="form-control mb-2" id="birthdate" required />

    <label for="country" class="form-label">Страна</label>
    <input type="text" class="form-control mb-2" id="country" required />

    <label for="city" class="form-label">Город</label>
    <input type="text" class="form-control mb-2" id="city" required />

    <label for="phone" class="form-label">Номер телефона</label>
    <input type="text" class="form-control mb-2" id="phone" required />

    <label for="email" class="form-label">Адрес электронной почты</label>
    <input type="text" class="form-control mb-2" id="email" required />

    <label class="form-label">Роль</label>
    <select class="form-select mb-4" id="role">
      <option value="ADMIN" selected>Администратор</option>
      <option value="JUDGE">Судья</option>
      <option value="CAPTAIN">Капитан команды</option>
    </select>

    <label for="password" class="form-label mt-4">Пароль</label>
    <input type="password" class="form-control mb-2" id="password" required />

    <label for="repeatPassword" class="form-label">Повторите пароль</label>
    <input type="password" class="form-control mb-4" id="repeatPassword" required />

    <button type="submit" class="btn btn-primary mt-3">Создать</button>
  </FormComponent>
</template>

<script setup lang="ts">
import FormComponent from '@/components/FormComponent.vue'
</script>
