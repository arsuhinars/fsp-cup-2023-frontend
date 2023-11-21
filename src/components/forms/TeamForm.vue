<template>
  <div>
    <FormComponent :is-loading="props.isLoading">
      <label for="name" class="form-label">Название</label>
      <input type="text" class="form-control max-width-480 mb-3" id="name" required />

      <table class="table table-hover table-sm caption-top mt-4 mb-3">
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

    <PlayerModalForm
      titleText="Изменить участника"
      ref="playerEditForm"
      @submited="() => playerEditForm?.hide()"
    />
    <PlayerModalForm
      titleText="Добавить участника"
      ref="createPlayerForm"
      @submited="() => createPlayerForm?.hide()"
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
import PlayerModalForm from './PlayerModalForm.vue'
import ModalComponent from '../ModalComponent.vue'

export interface Props {
  isLoading: boolean
}

const props = withDefaults(defineProps<Props>(), { isLoading: false })

const deleteModal = ref<InstanceType<typeof ModalComponent> | null>(null)
const playerEditForm = ref<InstanceType<typeof PlayerModalForm> | null>(null)
const createPlayerForm = ref<InstanceType<typeof PlayerModalForm> | null>(null)
</script>
