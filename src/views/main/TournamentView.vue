<template>
  <h2>Турнир</h2>
  <nav style="--bs-breadcrumb-divider: '>'" class="mt-3">
    <ol class="breadcrumb">
      <li
        class="breadcrumb-item"
        :class="{ active: b.name === activeBreadcrumb }"
        v-for="b in breadcrumbs"
        :key="b.name"
      >
        {{ b.displayName }}
      </li>
    </ol>
  </nav>

  <template v-if="tournament !== null">
    <template v-if="activeBreadcrumb === 'registration'">
      <TournamentRegistrationView :is-loading="isLoading" :tournament="tournament" />
    </template>
    <template v-else-if="activeBreadcrumb === 'teams_distribution'">
      <TournamentDistributionView />
    </template>
    <template v-else-if="activeBreadcrumb === 'ongoing'">
      <TournamentOngoingView />
    </template>
    <template v-else-if="activeBreadcrumb === 'results'">
      <TournamentResultsView />
    </template>
  </template>
</template>

<style scoped lang="scss">
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';

.breadcrumb-item {
  color: $gray-600;
  font-weight: $font-weight-normal;
}

.breadcrumb-item.active {
  color: $primary;
  font-weight: $font-weight-medium;
}
</style>

<script setup lang="ts">
import { getTournamentById } from '@/api/tournaments'
import { type Tournament, TournamentStatus } from '@/schemas/tournaments'
import { pushErrorPage } from '@/utils'
import { ref, watchEffect } from 'vue'
import { useRouter, type RouteLocationRaw } from 'vue-router'
import TournamentRegistrationView from '../tournament/TournamentRegistrationView.vue'
import TournamentDistributionView from '../tournament/TournamentDistributionView.vue'
import TournamentOngoingView from '../tournament/TournamentOngoingView.vue'
import TournamentResultsView from '../tournament/TournamentResultsView.vue'

interface Props {
  id: string
}

interface TournamentBreadcrumbStage {
  name: string
  displayName: string
  route: RouteLocationRaw
}

const router = useRouter()
const props = defineProps<Props>()

const breadcrumbs: TournamentBreadcrumbStage[] = [
  {
    name: 'create',
    displayName: 'Создание',
    route: { name: 'create_tournament' }
  },
  {
    name: 'registration',
    displayName: 'Регистрация',
    route: { name: 'tournament_registration' }
  },
  {
    name: 'teams_distribution',
    displayName: 'Распределение команд',
    route: { name: 'tournament_distribution' }
  },
  {
    name: 'ongoing',
    displayName: 'Проведение матчей',
    route: { name: 'tournament_ongoing' }
  },
  {
    name: 'results',
    displayName: 'Результаты',
    route: { name: 'tournament_results' }
  }
]

const isLoading = ref<boolean>(false)
const tournament = ref<Tournament | null>(null)
const activeBreadcrumb = ref<string>('')

watchEffect(async () => {
  isLoading.value = true

  try {
    tournament.value = await getTournamentById(Number.parseInt(props.id))
  } catch (error) {
    pushErrorPage(error)
    return
  } finally {
    isLoading.value = false
  }

  let targetRoute: RouteLocationRaw = { name: 'create_tournament' }
  switch (tournament.value?.state) {
    case TournamentStatus.RegistrationOpened:
    case TournamentStatus.JustCreated:
      activeBreadcrumb.value = 'registration'
      targetRoute = { name: 'tournament_registration', params: { id: props.id } }
      break
    case TournamentStatus.RegistartionClosed:
      activeBreadcrumb.value = 'teams_distribution'
      targetRoute = { name: 'tournament_distribution', params: { id: props.id } }
      break
    case TournamentStatus.Ongoing:
      activeBreadcrumb.value = 'ongoing'
      targetRoute = { name: 'tournament_ongoing', params: { id: props.id } }
      break
    case TournamentStatus.Finished:
      activeBreadcrumb.value = 'results'
      targetRoute = { name: 'tournament_results', params: { id: props.id } }
      break
  }

  router.replace(targetRoute)
})
</script>
