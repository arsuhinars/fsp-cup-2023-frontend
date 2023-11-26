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

const tableItems: TeamAssessment[] = [
  {
    team_name: 'Infinity',
    team_discipline: 'Dota 2',
    team_av_score: 31.018436,
    team_deviation: 1.739091
  },
  {
    team_name: 'Sprout',
    team_discipline: 'CS 2',
    team_av_score: 30.061712,
    team_deviation: 0.301454
  },
  {
    team_name: 'BIG',
    team_discipline: 'CS 2',
    team_av_score: 28.471558,
    team_deviation: 0.232612
  },
  {
    team_name: 'Apeks',
    team_discipline: 'CS 2',
    team_av_score: 19.762486,
    team_deviation: -0.144428
  },
  {
    team_name: 'ALTERNATE',
    team_discipline: 'CS 2',
    team_av_score: 14.098473,
    team_deviation: -0.389638
  },
  {
    team_name: 'BOOM Esports',
    team_discipline: 'Dota 2',
    team_av_score: 6.86494,
    team_deviation: -0.39379
  },
  {
    team_name: 'Mad Kings',
    team_discipline: 'Dota 2',
    team_av_score: 5.925756,
    team_deviation: -0.476725
  },
  {
    team_name: 'BocaJuniors',
    team_discipline: 'Dota 2',
    team_av_score: 1.48829,
    team_deviation: -0.868576
  }
]
</script>
