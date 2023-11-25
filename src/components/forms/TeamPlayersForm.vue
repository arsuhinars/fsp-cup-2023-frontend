<template>
  <TableComponent
    :columns="tableColumns"
    :items="selfPlayers"
    :is-loading="props.isLoading || isLoadingSelf"
    @row-button-clicked="rowButtonClicked"
  />

  <div class="d-flex flex-row" v-if="!props.readOnly">
    <button
      class="btn btn-primary ms-auto"
      :disabled="props.isLoading || isLoadingSelf"
      @click="addPlayerButtonClicked"
    >
      <div
        class="spinner-border spinner-border-sm me-2"
        v-if="props.isLoading || isLoadingSelf"
      ></div>
      Добавить нового игрока
    </button>
  </div>

  <button
    class="btn btn-primary mt-3"
    v-if="!props.readOnly"
    :disabled="props.isLoading || isLoadingSelf"
    @click="() => emit('submitted', selfPlayers)"
  >
    <div
      class="spinner-border spinner-border-sm me-2"
      v-if="props.isLoading || isLoadingSelf"
    ></div>
    Сохранить
  </button>

  <PlayerModalForm
    :title-text="modalFormTitle"
    :player="activePlayer ?? emptyPlayer"
    :read-only="props.readOnly"
    :is-loading="props.isLoading || isLoadingSelf"
    ref="modalForm"
    @submitted="playerModalSubmitted"
  />

  <ModalComponent
    title-text="Удалить игрока"
    :buttons="[
      { name: 'delete', displayText: 'Удалить', classList: 'btn btn-danger' },
      { name: 'cancel', displayText: 'Отмена', classList: 'btn btn-secondary' }
    ]"
    cancel-button-name="cancel"
    ref="deleteModal"
    @submitted="deleteModalSubmitted"
  >
    <p>{{ deleteModalText }}</p>
  </ModalComponent>
</template>

<script setup lang="ts">
import { dateFromString, extractFullName, pushErrorPage } from '@/utils'
import { nextTick, reactive, ref, watchEffect } from 'vue'
import TableComponent, { type TableColumn } from '../TableComponent.vue'
import ModalComponent from '../ModalComponent.vue'
import PlayerModalForm from './PlayerModalForm.vue'
import { Gender, type Player } from '@/schemas/players'
import { getPlayerById } from '@/api/players'

export interface Props {
  players: Player[]
  isLoading?: boolean
  readOnly?: boolean
}

const emptyPlayer: Player = {
  id: 0,
  gto_id: '',
  nickname: '',
  last_name: '',
  first_name: '',
  patronymic: '',
  gender: Gender.Male,
  birth_date: '2000-01-01',
  country: '',
  city: '',
  phone: '',
  email: '',
  citizenship: '',
  rank: '',
  pd_accepted: false,
  is_active_in_team: false
}

const baseTableColumns: TableColumn[] = [
  {
    type: 'text',
    fieldName: 'nickname',
    displayName: 'Ник'
  },
  {
    type: 'text',
    fieldName: 'full_name',
    displayName: 'ФИО',
    valueReader: (player) => extractFullName(player)
  },
  {
    type: 'text',
    fieldName: 'birth_date',
    displayName: 'Дата рождения',
    valueReader: (player) => dateFromString(player.birth_date).toLocaleDateString()
  },
  {
    type: 'text',
    fieldName: 'pd_accepted',
    displayName: 'Согласие на обработку ПД',
    valueReader: (player) => (player.pd_accepted ? 'Согласен' : 'Не согласен')
  }
]

const props = withDefaults(defineProps<Props>(), { isLoading: false, readOnly: true })
const emit = defineEmits(['submitted'])
const isLoadingSelf = ref<boolean>(false)

const modalForm = ref<InstanceType<typeof PlayerModalForm> | null>(null)
const modalFormTitle = ref<string>('')

const deleteModal = ref<InstanceType<typeof ModalComponent> | null>(null)
const deleteModalText = ref<string>('')

const tableColumns = ref<TableColumn[]>([])

const selfPlayers = reactive<Player[]>([])
const activePlayer = ref<Player | null>(null)

async function rowButtonClicked(name: string, player: Player) {
  switch (name) {
    case 'edit':
      activePlayer.value = null
      isLoadingSelf.value = true
      modalFormTitle.value = 'Изменить игрока'
      modalForm.value?.show()

      try {
        activePlayer.value = await getPlayerById(player.id)
      } catch (error) {
        pushErrorPage(error)
      } finally {
        modalForm.value?.hide()
        isLoadingSelf.value = false
      }

      break
    case 'delete':
      activePlayer.value = player
      deleteModalText.value = `Вы уверены, что хотите удалить игрока ${extractFullName(player)}?`
      deleteModal.value?.show()
      break
  }
}

function playerModalSubmitted(player: Player) {
  if (activePlayer.value === null) {
    selfPlayers.push(Object.assign({}, player))
  } else {
    Object.assign(activePlayer.value, player)
  }

  modalForm.value?.hide()
}

function addPlayerButtonClicked() {
  activePlayer.value = null
  modalFormTitle.value = 'Добавить нового игрока'
  nextTick(() => {
    modalForm.value?.show()
  })
}

function deleteModalSubmitted(button: string) {
  if (button === 'delete' && activePlayer.value !== null) {
    const idx = selfPlayers.indexOf(activePlayer.value)
    if (idx > -1) {
      selfPlayers.splice(idx, 1)
    }
  }
}

watchEffect(() => {
  selfPlayers.length = 0
  for (let player of props.players) {
    selfPlayers.push(Object.assign({}, player))
  }
})

watchEffect(() => {
  if (props.readOnly) {
    tableColumns.value = baseTableColumns
  } else {
    tableColumns.value = baseTableColumns.concat([
      {
        type: 'button',
        name: 'edit',
        displayName: '',
        iconClass: 'bi-pencil-fill',
        buttonClass: 'btn-primary'
      },
      {
        type: 'button',
        name: 'delete',
        displayName: '',
        iconClass: 'bi-trash-fill',
        buttonClass: 'btn-danger'
      }
    ])
  }
})
</script>
