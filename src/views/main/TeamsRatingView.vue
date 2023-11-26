<template>
  <h2>Таблица общего рейтинга</h2>
  <TableComponent class="mt-5" :columns="tableColumns" :items="tableItems" />
</template>

<script setup lang="ts">
import TableComponent, { type TableColumn } from '@/components/TableComponent.vue'

interface TeamAssessment {
  team_name: string
  team_discipline: string
  team_av_score: number
  team_deviation: number
}

const tableColumns: TableColumn[] = [
  {
    type: 'text',
    fieldName: 'team_name',
    displayName: 'Название команды',
    isHeader: true
  },
  {
    type: 'text',
    fieldName: 'team_discipline',
    displayName: 'Дисциплина'
  },
  {
    type: 'text',
    fieldName: 'team_av_score',
    displayName: 'Средний счет команды'
  },
  {
    type: 'text',
    fieldName: 'team_deviation',
    displayName: 'Отклонение от среднего'
  }
]

const tableItems: TeamAssessment[] = []
</script>
