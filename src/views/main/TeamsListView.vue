<template>
  <h2 class="mb-3">Список команд</h2>
  <TableComponent
    class="table-hover mt-4"
    :is-loading="isLoading"
    :columns="tableColumns"
    :items="teams"
    @row-button-clicked="rowButtonClicked"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TableComponent, { type TableColumn } from '@/components/TableComponent.vue'
import { useAuthStore } from '@/stores/auth'
import type { Team } from '@/schemas/teams'
import { useRouter } from 'vue-router'
import { pushErrorPage } from '@/utils'
import { getAllTeams } from '@/api/teams'

const auth = useAuthStore()
const router = useRouter()

const tableColumns: TableColumn[] = [
  {
    type: 'header',
    fieldName: 'id',
    displayName: 'id',
    isHeader: true
  },
  {
    type: 'text',
    fieldName: 'name',
    displayName: 'Название'
  },
  {
    type: 'text',
    fieldName: 'leader_full_name',
    displayName: 'ФИО капитана'
  },
  {
    type: 'button',
    name: 'show',
    displayName: '',
    iconClass: 'bi-eye-fill',
    buttonClass: 'btn-primary'
  }
]

const isLoading = ref<boolean>(false)
const teams = ref<Team[]>([])

function rowButtonClicked(name: string, team: Team) {
  switch (name) {
    case 'show':
      router.push({ name: 'team', params: { id: team.id } })
      break
  }
}

onMounted(async () => {
  if (auth.user === null) {
    return
  }

  isLoading.value = true

  try {
    teams.value = await getAllTeams()
  } catch (error) {
    pushErrorPage(error)
  } finally {
    isLoading.value = false
  }
})
</script>
