<template>
  <div>
    <label for="requestStatus" class="form-label">Статус заявки</label>
    <input
      id="requestStatus"
      type="text"
      class="form-control"
      :value="
        request === null
          ? 'Заявка не отправлена'
          : tournamentRequestStatusToLocaleString(request.status)
      "
      disabled
      readonly
    />

    <button
      type="button"
      class="btn btn-primary"
      :disabled="
        props.isLoading ||
        request?.status === TournamentRequestStatus.Pending ||
        request?.status == TournamentRequestStatus.Accepted
      "
      @click="() => emit('submitted')"
    >
      <div class="spinner-border spinner-border-sm me-2" v-if="props.isLoading"></div>
      {{
        request?.status !== TournamentRequestStatus.Declined
          ? 'Отправить заявку'
          : 'Отправить заявку повторно'
      }}
    </button>
  </div>
</template>

<script setup lang="ts">
import {
  type TournamentRequest,
  tournamentRequestStatusToLocaleString,
  TournamentRequestStatus
} from '@/schemas/tournaments'

interface Props {
  isLoading?: boolean
  request: TournamentRequest | null
}

const props = withDefaults(defineProps<Props>(), { isLoading: false })
const emit = defineEmits(['submitted'])
</script>
