<template>
  <ModalForm
    submitText="Сохранить"
    cancelText="Отмена"
    ref="modalForm"
    @submited="() => emit('submited')"
    :isLoading="props.isLoading"
  >
    <template v-slot:header>
      <h1 class="modal-title fs-2">{{ props.titleText }}</h1>
    </template>
    <template v-slot:body>
      <label for="lastName" class="form-label">Фамилия</label>
      <input type="text" class="form-control mb-2" id="lastName" required />

      <label for="firstName" class="form-label">Имя</label>
      <input type="text" class="form-control mb-2" id="firstName" required />

      <label for="patronymic" class="form-label">Отчество</label>
      <input type="text" class="form-control mb-2" id="patronymic" required />

      <label class="form-label">Пол</label>
      <select class="form-select mb-2">
        <option selected>Мужской</option>
        <option>Женский</option>
      </select>

      <label for="country" class="form-label">Страна</label>
      <input type="text" class="form-control mb-2" id="country" required />

      <label for="city" class="form-label">Город</label>
      <input type="text" class="form-control mb-2" id="city" required />

      <label for="citizenship" class="form-label">Гражданство</label>
      <input type="text" class="form-control mb-2" id="citizenship" required />

      <label for="rank" class="form-label">Рязряд</label>
      <input type="text" class="form-control mb-2" id="rank" required />

      <label for="phone" class="form-label">Телефон</label>
      <input type="tel" class="form-control mb-2" id="phone" required />

      <label for="phone" class="form-label">Почта</label>
      <input type="email" class="form-control mb-2" id="phone" required />

      <label for="gto" class="form-label">ГТО</label>
      <input type="text" class="form-control mb-4" id="gto" required />

      <div class="form-check mb-2">
        <input class="form-check-input" type="checkbox" id="approved" />
        <label class="form-check-label" for="approved">Согласие</label>
      </div>
    </template>
  </ModalForm>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ModalForm from '../ModalForm.vue'

export interface Props {
  isLoading: boolean
  titleText: string
}

const modalForm = ref<InstanceType<typeof ModalForm> | null>(null)

const props = withDefaults(defineProps<Props>(), { isLoading: false })
const emit = defineEmits(['submited'])

function show() {
  modalForm.value?.clear()
  modalForm.value?.show()
}

defineExpose({ show })
</script>
