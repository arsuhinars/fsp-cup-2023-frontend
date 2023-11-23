<template>
  <div v-if="team === null && !isLoading">
    <h2>Создать команду</h2>
    <CreateTeamForm @submitted="createFormSubmitted" />
  </div>
  <div v-else>
    <h2>Моя команда</h2>
    <TeamForm
      class="mt-3"
      :team="team ?? emptyTeam"
      :read-only="false"
      :is-loading="isLoading"
      @submitted="updateFormSubmitted"
    />
    <h2 class="mt-5">Игроки</h2>
    <TeamPlayersForm
      :players="players"
      :read-only="false"
      @submitted="playersUpdateFormSubmitted"
    />
  </div>
</template>

<script setup lang="ts">
import {
  createPlayerInMyTeam,
  deletePlayerById,
  getAllPlayersInTeam,
  updatePlayerById
} from '@/api/players'
import { createMyTeam, getMyTeam, updateMyTeam } from '@/api/teams'
import { ApiError } from '@/api/utils'
import CreateTeamForm from '@/components/forms/CreateTeamForm.vue'
import TeamForm from '@/components/forms/TeamForm.vue'
import TeamPlayersForm from '@/components/forms/TeamPlayersForm.vue'
import router from '@/router'
import type { Player } from '@/schemas/players'
import type { CreateTeam, Team, UpdateTeam } from '@/schemas/teams'
import { UserRole } from '@/schemas/users'
import { useAuthStore } from '@/stores/auth'
import { pushErrorPage, compareObjects } from '@/utils'
import { onMounted, ref } from 'vue'

const auth = useAuthStore()

const emptyTeam: Team = {
  id: 0,
  name: '',
  leader_id: 0,
  leader_full_name: ''
}

const isLoading = ref<boolean>(false)
const team = ref<Team | null>(null)
const players = ref<Player[]>([])

async function createFormSubmitted(createTeam: CreateTeam) {
  isLoading.value = true

  try {
    team.value = await createMyTeam(createTeam)
    players.value = []
  } catch (error) {
    pushErrorPage(error)
  } finally {
    isLoading.value = false
  }
}

async function updateFormSubmitted(updateTeam: UpdateTeam) {
  isLoading.value = true

  try {
    team.value = await updateMyTeam(updateTeam)
  } catch (error) {
    pushErrorPage(error)
  } finally {
    isLoading.value = false
  }
}

async function playersUpdateFormSubmitted(updatePlayers: Player[]) {
  isLoading.value = true

  const playersByIds = new Map(players.value.map((p) => [p.id, p]))
  const newPlayers = new Array<Player>()

  try {
    for (const p of updatePlayers) {
      if (!playersByIds.has(p.id)) {
        newPlayers.push(await createPlayerInMyTeam(p))
        continue
      }

      if (!compareObjects(p, playersByIds.get(p.id) ?? {})) {
        newPlayers.push(await updatePlayerById(p.id, p))
      } else {
        newPlayers.push(p)
      }

      playersByIds.delete(p.id)
    }

    for (const [id] of playersByIds) {
      await deletePlayerById(id)
    }

    players.value = newPlayers
  } catch (error) {
    pushErrorPage(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  isLoading.value = true

  if (auth.user === null) {
    return
  }

  if (auth.user.role !== UserRole.TeamCaptain) {
    // TODO: сообщение об ошибке
    router.push({ name: 'main' })
    return
  }

  try {
    team.value = await getMyTeam()
    players.value = await getAllPlayersInTeam(team.value.id)
  } catch (error) {
    if (error instanceof ApiError && error.statusCode === 404) {
      team.value = null
    } else {
      pushErrorPage(error)
    }
  } finally {
    isLoading.value = false
  }
})
</script>
