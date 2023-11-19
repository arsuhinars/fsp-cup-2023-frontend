<template>
  <h2>Список команд</h2>
  <div class="d-flex flex-row align-items-center mt-4">
    <RouterLink :to="{ name: 'create_team' }" class="btn btn-primary ms-auto">
      Создать новую команду
    </RouterLink>
  </div>
  <table class="table table-hover mt-3">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Название</th>
        <th scope="col">ФИО капитана</th>
        <th scope="col">Кол-во участников</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <TeamRow @delete-team="() => deleteModal?.show()" />
      <TeamRow @delete-team="() => deleteModal?.show()" />
      <TeamRow @delete-team="() => deleteModal?.show()" />
      <TeamRow @delete-team="() => deleteModal?.show()" />
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
      <h1 class="modal-title fs-2">Удалить команду</h1>
    </template>
    <template v-slot:body>
      <p>Вы уверены, что хотите удалить команду?</p>
    </template>
  </ModalComponent>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import TeamRow from '@/components/rows/TeamRow.vue'
import ModalComponent from '@/components/ModalComponent.vue'

const deleteModal = ref<InstanceType<typeof ModalComponent> | null>(null)
</script>
