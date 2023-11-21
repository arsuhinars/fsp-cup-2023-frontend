<template>
  <h2>Список турниров</h2>
  <div class="d-flex flex-row align-items-center mt-4">
    <RouterLink :to="{ name: 'create_match' }" class="btn btn-primary ms-auto">
      Создать новый турнир
    </RouterLink>
  </div>
  <table class="table table-hover mt-3">
    <thead>
      <tr>
        <th scope="col">id</th>
        <th scope="col">Название</th>
        <th scope="col">Место проведения</th>
        <th scope="col">Организатор</th>
        <th scope="col">Дисциплина</th>
        <th scope="col">Главный судья</th>
        <th scope="col">Открытие</th>
        <th scope="col">Начало соревнований</th>
        <th scope="col">Окончание соревнований</th>
        <th scope="col">Награждение, закрытие</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <MatchRow />
      <MatchRow />
      <MatchRow />
      <MatchRow />
    </tbody>
  </table>
</template>

<script setup lang="ts">
import MatchRow from '@/components/rows/MatchRow.vue'
</script>
