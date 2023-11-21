<template>
  <tr class="cursor-pointer" @click="rowClick">
    <th scope="row">1</th>
    <td>Чемпионат города Самара (боевая арена) по компьютерному спорту</td>
    <td>Online</td>
    <td>Федерация компьютерного спорта Самарской области</td>
    <td>Боевая Арена - DOTA 2</td>
    <td>Грозный Ярослав Сергеевич</td>
    <td>01.11.2023 12:00:00</td>
    <td>01.11.2023 18:00:00</td>
    <td>02.11.2023 15:00:00</td>
    <td>02.11.2023 17:00:00</td>
    <td>
      <button class="btn btn-danger icon-btn" @click="() => emit('deleteMatch')" ref="deleteButton">
        <i class="bi bi-trash-fill"></i>
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const emit = defineEmits(['deleteMatch'])

const deleteButton = ref<HTMLButtonElement | null>(null)

function rowClick(event: MouseEvent) {
  if (
    event.target != deleteButton.value &&
    !deleteButton.value?.contains(event.target as Node | null)
  ) {
    router.push({ name: 'match', params: { id: 1 } })
  }
}
</script>
