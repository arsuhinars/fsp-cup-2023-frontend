<template>
  <div>
    <FormComponent>
      <label for="name" class="form-label">Название</label>
      <input type="text" class="form-control max-width-480 mb-3" id="name" required />

      <table class="table table-hover caption-top mt-4 mb-3">
        <caption>
          Участники команды
        </caption>
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">ФИО</th>
            <th scope="col">Пол</th>
            <th scope="col">Страна</th>
            <th scope="col">Город</th>
            <th scope="col">Гражданство</th>
            <th scope="col">Разряд</th>
            <th scope="col">Телефон</th>
            <th scope="col">Почта</th>
            <th scope="col">ГТО</th>
            <th scope="col">Согласие</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <PlayerRow
            :onEditPlayer="() => playerEditForm?.show()"
            :onDeletePlayer="() => deleteModal?.show()"
          />
          <PlayerRow
            :onEditPlayer="() => playerEditForm?.show()"
            :onDeletePlayer="() => deleteModal?.show()"
          />
          <PlayerRow
            :onEditPlayer="() => playerEditForm?.show()"
            :onDeletePlayer="() => deleteModal?.show()"
          />
          <PlayerRow
            :onEditPlayer="() => playerEditForm?.show()"
            :onDeletePlayer="() => deleteModal?.show()"
          />
          <PlayerRow
            :onEditPlayer="() => playerEditForm?.show()"
            :onDeletePlayer="() => deleteModal?.show()"
          />
        </tbody>
      </table>
      <button type="button" class="btn btn-primary" @click="() => createPlayerForm?.show()">
        Добавить участника
      </button>
    </FormComponent>

    <PlayerForm titleText="Изменить участника" ref="playerEditForm" />
    <PlayerForm titleText="Добавить участника" ref="createPlayerForm" />

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
        <h1 class="modal-title fs-2">Удалить участника</h1>
      </template>
      <template v-slot:body>
        <p>Вы уверены, что хотите удалить участника команды?</p>
      </template>
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormComponent from '@/components/FormComponent.vue'
import PlayerRow from '../rows/PlayerRow.vue'
import PlayerForm from './PlayerForm.vue'
import ModalComponent from '../ModalComponent.vue'

const deleteModal = ref<InstanceType<typeof ModalComponent> | null>(null)
const playerEditForm = ref<InstanceType<typeof PlayerForm> | null>(null)
const createPlayerForm = ref<InstanceType<typeof PlayerForm> | null>(null)
</script>
