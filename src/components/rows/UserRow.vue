<template>
  <tr class="cursor-pointer" @click="rowClick">
    <th scope="row">1</th>
    <td>Иванов Иван Иванович</td>
    <td>01.01.2000</td>
    <td>Россия</td>
    <td>Самара</td>
    <td>8800123123</td>
    <td>example@mail.com</td>
    <td>Администратор</td>
    <td>
      <button
        class="btn btn-danger py-1 px-2 fs-6"
        @click="() => emit('deleteUser')"
        ref="deleteButton"
      >
        <i class="bi bi-trash-fill"></i>
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const emit = defineEmits(['deleteUser'])

const deleteButton = ref<HTMLButtonElement | null>(null)

function rowClick(event: MouseEvent) {
  if (
    event.target != deleteButton.value &&
    !deleteButton.value?.contains(event.target as Node | null)
  ) {
    router.push({ name: 'user', params: { id: 1 } })
  }
}
</script>
