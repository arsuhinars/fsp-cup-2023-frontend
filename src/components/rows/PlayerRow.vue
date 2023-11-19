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
      <button type="button" class="btn btn-primary py-2" @click="() => emit('editPlayer')">
        <i class="bi bi-pencil-fill"></i>
      </button>
    </td>
    <td>
      <button type="button" class="btn btn-danger py-2" @click="() => emit('deletePlayer')">
        <i class="bi bi-trash-fill"></i>
      </button>
    </td>
  </tr>
</template>

<script setup lang="ts">
const emit = defineEmits(['editPlayer', 'deletePlayer'])
</script>
