<template>
  <h2>Список пользователей</h2>
  <div class="d-flex flex-row align-items-center mt-4">
    <div class="form-floating">
      <select class="form-select" id="roleFilter" v-model="roleFilter">
        <option value="ANY">Любая</option>
        <option value="ADMIN">Администратор</option>
        <option value="JUDGE">Судья</option>
        <option value="TEAM_CAPTAIN">Капитан команды</option>
      </select>
      <label for="roleFilter">Роль пользователей</label>
    </div>
    <RouterLink :to="{ name: 'create_user' }" class="btn btn-primary ms-auto">
      Создать нового пользователя
    </RouterLink>
  </div>
  <TableComponent
    class="table-hover"
    :is-loading="isLoading"
    :columns="tableColumns"
    :items="users"
    :row-buttons="tableButtons"
    @row-button-clicked="rowButtonClicked"
  />

  <ModalComponent
    title-text="Удалить пользователя"
    :buttons="[
      { name: 'delete', displayText: 'Удалить', classList: 'btn btn-secondary' },
      { name: 'cancel', displayText: 'Отмена', classList: 'btn btn-primary' }
    ]"
    :cancel-button-name="'cancel'"
    @submitted="deleteModalSubmitted"
    ref="deleteModal"
  >
    <p>Вы уверены, что хотите удалить пользователя?</p>
  </ModalComponent>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { type User, userRoleToLocaleString, UserRole } from '@/schemas/users'
import ModalComponent from '@/components/ModalComponent.vue'
import TableComponent from '@/components/TableComponent.vue'
import type { TableColumn, RowButton } from '@/components/TableComponent.vue'
import { useRouter } from 'vue-router'
import { deleteUserById, getAllUsers } from '@/api/users'
import { dateFromString, extractFullName, pushErrorPage } from '@/utils'

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
    displayName: 'Дата рождения',
    toStringConverter: (user) => dateFromString(user.birth_date).toLocaleDateString()
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
    name: 'edit',
    iconClass: 'bi-pencil-fill',
    buttonClass: 'btn-primary'
  },
  {
    name: 'delete',
    iconClass: 'bi-trash-fill',
    buttonClass: 'btn-danger'
  }
]

const isLoading = ref<boolean>(false)
const users = ref<User[]>([])
const deleteModal = ref<InstanceType<typeof ModalComponent> | null>(null)
const deleteModalUser = ref<User | null>(null)
const roleFilter = ref<string>('ANY')

async function updateUsers() {
  let role: UserRole | null = roleFilter.value as UserRole
  if (roleFilter.value == 'ANY') {
    role = null
  }

  isLoading.value = true
  try {
    users.value = await getAllUsers(role)
  } catch (error) {
    pushErrorPage(error)
  }
  isLoading.value = false
}

async function deleteModalSubmitted(buttonName: string) {
  if (buttonName != 'delete' || deleteModalUser.value === null) {
    return
  }

  isLoading.value = true
  try {
    await deleteUserById(deleteModalUser.value.id)
    await updateUsers()
  } catch (error) {
    pushErrorPage(error)
  } finally {
    isLoading.value = false
  }
}

function rowButtonClicked(name: string, user: User) {
  switch (name) {
    case 'edit':
      router.push({ name: 'user', params: { id: user.id } })
      break
    case 'delete':
      deleteModalUser.value = user
      deleteModal.value?.show()
      break
  }
}

onMounted(async () => {
  await updateUsers()
})

watch(roleFilter, updateUsers)
</script>
