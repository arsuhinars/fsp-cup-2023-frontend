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
  <TableComponent
    class="table-hover"
    :is-loading="false"
    :columns="tableColumns"
    :items="users"
    :row-buttons="tableButtons"
    @row-clicked="(user: User) => router.push({ name: 'user', params: { id: user.id } })"
    @row-button-clicked="
      (name) => {
        switch (name) {
          case 'delete':
            deleteModal?.show()
        }
      }
    "
  />

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
import { type User, UserRole, userRoleToLocaleString, extractFullName } from '@/schemas/users'
import ModalComponent from '@/components/ModalComponent.vue'
import TableComponent from '@/components/TableComponent.vue'
import type { TableColumn, RowButton } from '@/components/TableComponent.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const tableColumns: TableColumn[] = [
  {
    fieldName: 'id',
    displayName: 'id',
    isHeader: true
  },
  {
    fieldName: 'full_name',
    displayName: 'ФИО',
    toStringConverter: (user) => extractFullName(user)
  },
  {
    fieldName: 'birth_date',
    displayName: 'Дата рождения'
  },
  {
    fieldName: 'country',
    displayName: 'Страна'
  },
  {
    fieldName: 'city',
    displayName: 'Город'
  },
  {
    fieldName: 'phone',
    displayName: 'Телефон'
  },
  {
    fieldName: 'email',
    displayName: 'Почта'
  },
  {
    fieldName: 'role',
    displayName: 'Роль',
    toStringConverter: (user) => userRoleToLocaleString(user.role)
  }
]
const tableButtons: RowButton[] = [
  {
    name: 'delete',
    iconClass: 'bi-trash-fill',
    buttonClass: 'btn-danger'
  }
]
const users: User[] = [
  {
    id: 1,
    last_name: 'Иванов',
    first_name: 'Иван',
    patronymic: 'Иванович',
    birth_date: '31.12.2023',
    country: 'Россия',
    city: 'Самара',
    phone: '88005553535',
    email: 'example@mail.com',
    role: UserRole.Admin
  }
]

const deleteModal = ref<InstanceType<typeof ModalComponent> | null>(null)
</script>
