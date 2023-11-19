<template>
  <tr>
    <th scope="row">1</th>
    <td>Иванов Иван Иванович</td>
    <td>М</td>
    <td>Россия</td>
    <td>Самара</td>
    <td>РФ</td>
    <td>I</td>
    <td>8800123123</td>
    <td>example@mail.com</td>
    <td>11-22-1111111</td>
    <td>Согласен</td>
    <td>
      <button
        type="button"
        class="btn btn-primary py-1 px-2 fs-6"
        @click="() => emit('editPlayer')"
      >
        <i class="bi bi-pencil-fill"></i>
      </button>
    </td>
    <td>
      <button
        type="button"
        class="btn btn-danger py-1 px-2 fs-6"
        @click="() => emit('deletePlayer')"
      >
        <i class="bi bi-trash-fill"></i>
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
const emit = defineEmits(['editPlayer', 'deletePlayer'])
</script>
