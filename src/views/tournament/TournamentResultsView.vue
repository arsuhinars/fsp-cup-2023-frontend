<template>
  <h2>Результаты турнира</h2>
</template>

<script setup lang="ts">
import { type Tournament } from '@/schemas/tournaments'
import { inject, provide } from 'vue'

const isLoading = inject<boolean>('isLoading')
const tournament = inject<Tournament | null>('tournament')
</script>
