<template>
  <h2>Список команд</h2>
  <table class="table table-hover mt-3">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Название</th>
        <th scope="col">ФИО капитана</th>
        <th scope="col">Кол-во участников</th>
      </tr>
    </thead>
    <tbody>
      <TeamRow />
      <TeamRow />
      <TeamRow />
      <TeamRow />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import TeamRow from '@/components/rows/TeamRow.vue'
</script>
