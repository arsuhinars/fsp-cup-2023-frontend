<template>
  <h2>Команда</h2>
  <TeamForm class="mt-3" :team="team" :read-only="true" :is-loading="isLoading" />
  <h2 class="mt-5">Игроки</h2>
  <TeamPlayersForm :players="players" :is-loading="isLoading" />
</template>

<script setup lang="ts">
import { getAllPlayersInTeam } from '@/api/players'
import { getTeamById } from '@/api/teams'
import TeamForm from '@/components/forms/TeamForm.vue'
import TeamPlayersForm from '@/components/forms/TeamPlayersForm.vue'
import type { Player } from '@/schemas/players'
import { type Team } from '@/schemas/teams'
import { useAuthStore } from '@/stores/auth'
import { pushErrorPage } from '@/utils'
import { ref, watchEffect } from 'vue'

interface Props {
  id: string
}

const auth = useAuthStore()
const props = defineProps<Props>()

const isLoading = ref<boolean>(false)
const team = ref<Team>({
  id: 0,
  name: '',
  leader_id: 0,
  leader_full_name: ''
})
const players = ref<Player[]>([])

watchEffect(async () => {
  isLoading.value = true

  if (!auth.isAuthorized) {
    return
  }

  try {
    team.value = await getTeamById(Number.parseInt(props.id))
    players.value = await getAllPlayersInTeam(Number.parseInt(props.id))
  } catch (error) {
    pushErrorPage(error)
  } finally {
    isLoading.value = false
  }
})
</script>
