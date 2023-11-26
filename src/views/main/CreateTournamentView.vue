<template>
  <div>
    <h2>Создать новый турнир</h2>
    <CreateTournamentForm class="mt-3" :is-loading="isLoading" @submitted="formSubmitHandler" />
  </div>
</template>

<script setup lang="ts">
import { createTournament } from '@/api/tournaments'
import CreateTournamentForm from '@/components/forms/CreateTournamentForm.vue'
import type { CreateTournament } from '@/schemas/tournaments'
import { pushErrorPage } from '@/utils'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoading = ref<boolean>(false)

async function formSubmitHandler(tournamentForm: CreateTournament) {
  isLoading.value = true

  try {
    const tournament = await createTournament(tournamentForm)
    router.push({ name: 'tournament_registration', params: { id: tournament.id } })
  } catch (error) {
    pushErrorPage(error)
  } finally {
    isLoading.value = false
  }
}
</script>
