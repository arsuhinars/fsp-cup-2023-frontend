<template>
  <h2>Список доступных турниров</h2>
  <div class="d-flex flex-row mt-4" v-if="auth.user !== null && auth.user.role === UserRole.Judge">
    <RouterLink :to="{ name: 'create_tournament' }" class="btn btn-primary ms-auto">
      Создать новый турнир
    </RouterLink>
  </div>
  <TableComponent
    class="table-hover"
    :is-loading="isLoading"
    :columns="tableColumns"
    :items="tournaments"
    @row-button-clicked="rowButtonClicked"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TableComponent, { type TableColumn } from '@/components/TableComponent.vue'
import { useAuthStore } from '@/stores/auth'
import { UserRole } from '@/schemas/users'
import { type Tournament, tournamentStatusToLocaleString } from '@/schemas/tournaments'
import { dateFromString, pushErrorPage } from '@/utils'
import { getAllTournaments } from '@/api/tournaments'
import router from '@/router'

const auth = useAuthStore()

const tableColumns: TableColumn[] = [
  {
    type: 'text',
    fieldName: 'name',
    displayName: 'Название'
  },
  {
    type: 'text',
    fieldName: 'location',
    displayName: 'Место проведения'
  },
  {
    type: 'text',
    fieldName: 'discipline',
    displayName: 'Дисциплина'
  },
  {
    type: 'text',
    fieldName: 'date_registration',
    displayName: 'Дата начала регистрации',
    valueReader: (t) => dateFromString(t.date_registration).toLocaleDateString()
  },
  {
    type: 'text',
    fieldName: 'date_begin',
    displayName: 'Дата начала соревнований',
    valueReader: (t) => dateFromString(t.date_begin).toLocaleDateString()
  },
  {
    type: 'text',
    fieldName: 'date_end',
    displayName: 'Дата окончания соревнований',
    valueReader: (t) => dateFromString(t.date_end).toLocaleDateString()
  },
  {
    type: 'text',
    fieldName: 'date_awards',
    displayName: 'Дата награждения, закрытие',
    valueReader: (t) => dateFromString(t.date_awards).toLocaleDateString()
  },
  {
    type: 'text',
    fieldName: 'main_judge_full_name',
    displayName: 'ФИО главного судьи'
  },
  {
    type: 'text',
    fieldName: 'state',
    displayName: 'Состояние',
    valueReader: (t) => tournamentStatusToLocaleString(t.state)
  },
  {
    type: 'button',
    displayName: '',
    iconClass: 'bi-eye-fill',
    name: 'show',
    buttonClass: 'btn-primary'
  }
]

const isLoading = ref<boolean>(false)
const tournaments = ref<Tournament[]>([])

function rowButtonClicked(name: string, tournament: Tournament) {
  switch (name) {
    case 'show':
      router.push({ name: 'tournament', params: { id: tournament.id } })
      break
  }
}

onMounted(async () => {
  isLoading.value = true

  try {
    tournaments.value = await getAllTournaments()
  } catch (error) {
    pushErrorPage(error)
  } finally {
    isLoading.value = false
  }
})
</script>
