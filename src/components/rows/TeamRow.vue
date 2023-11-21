<template>
  <tr class="cursor-pointer" @click="rowClick">
    <th scope="row">1</th>
    <td>Team_1</td>
    <td>Пупкин Василий Иванович</td>
    <td>5</td>
    <td>
      <button class="btn btn-danger icon-btn" @click="() => emit('deleteTeam')" ref="deleteButton">
        <i class="bi bi-trash-fill"></i>
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const emit = defineEmits(['deleteTeam'])

const deleteButton = ref<HTMLButtonElement | null>(null)

function rowClick(event: MouseEvent) {
  if (
    event.target != deleteButton.value &&
    !deleteButton.value?.contains(event.target as Node | null)
  ) {
    router.push({ name: 'team', params: { id: 1 } })
  }
}
</script>
