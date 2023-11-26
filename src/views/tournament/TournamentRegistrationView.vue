<template>
  <div>
    <template v-if="auth.user?.role === UserRole.TeamCaptain">
      <h2>Регистрация на турнир</h2>
      <CreateTournamentRequest :is-loading="props.isLoading" :request="myRequest" />
    </template>
    <template v-else-if="auth.user?.role === UserRole.Judge">
      <h2>Список заявок на регистрацию</h2>
    </template>
  </div>
</template>

<script setup lang="ts">
import { type TournamentRequest, type Tournament } from '@/schemas/tournaments'
import { UserRole } from '@/schemas/users'
import { useAuthStore } from '@/stores/auth'
import CreateTournamentRequest from '@/components/forms/CreateTournamentRequest.vue'
import { ref } from 'vue'

const auth = useAuthStore()

interface Props {
  isLoading: boolean
  tournament: Tournament
}

const props = defineProps<Props>()
const myRequest = ref<TournamentRequest | null>(null)
const requests = ref<TournamentRequest[]>([])
</script>
