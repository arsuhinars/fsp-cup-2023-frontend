<template>
  <h2>Список пользователей</h2>
  <div class="d-flex flex-row align-items-center mt-4">
    <div class="form-floating">
      <select class="form-select" id="roleFilter">
        <option selected>Любая</option>
        <option>Администратор</option>
        <option>Судья</option>
        <option>Капитан команды</option>
      </select>
      <label for="roleFilter">Роль пользователей</label>
    </div>
    <RouterLink :to="{ name: 'create_user' }" class="btn btn-primary ms-auto">
      Создать нового пользователя
    </RouterLink>
  </div>
  <table class="table table-hover mt-3">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">ФИО</th>
        <th scope="col">Дата рождения</th>
        <th scope="col">Страна</th>
        <th scope="col">Город</th>
        <th scope="col">Телефон</th>
        <th scope="col">Почта</th>
        <th scope="col">Роль</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <UserRow @delete-user="() => deleteModal?.show()" />
      <UserRow @delete-user="() => deleteModal?.show()" />
      <UserRow @delete-user="() => deleteModal?.show()" />
      <UserRow @delete-user="() => deleteModal?.show()" />
    </tbody>
  </table>

  <ModalComponent
    :buttons="[
      { name: 'delete', displayText: 'Удалить', classList: 'btn btn-secondary' },
      { name: 'cancel', displayText: 'Отмена', classList: 'btn btn-primary' }
    ]"
    :cancel-button-name="'cancel'"
    @submited="(buttonName) => console.log(buttonName)"
    ref="deleteModal"
  >
    <template v-slot:header>
      <h1 class="modal-title fs-2">Удалить пользователя</h1>
    </template>
    <template v-slot:body>
      <p>Вы уверены, что хотите удалить пользователя?</p>
    </template>
  </ModalComponent>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { ref } from 'vue'
import UserRow from '@/components/rows/UserRow.vue'
import ModalComponent from '@/components/ModalComponent.vue'

const deleteModal = ref<InstanceType<typeof ModalComponent> | null>(null)
</script>
