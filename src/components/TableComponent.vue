<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="column in props.columns" :key="column.fieldName">
          {{ column.displayName }}
        </th>
        <th v-for="btn in props.rowButtons" :key="btn.name"></th>
      </tr>
    </thead>
    <tbody class="placeholder-wave">
      <template v-if="isLoading">
        <tr v-for="i in props.loadingRowsCount" :key="i">
          <td v-for="i in props.columns.length + props.rowButtons.length" :key="i">
            <span class="placeholder w-100"></span>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="[i, item] in props.items.entries()" :key="i">
          <template v-for="col in props.columns" :key="col.fieldName">
            <th
              class="cursor-pointer"
              v-if="col.isHeader ?? false"
              @click="() => emit('rowClicked', item, i)"
            >
              {{ readItemValue(item, col) }}
            </th>
            <td class="cursor-pointer" v-else @click="() => emit('rowClicked', item, i)">
              {{ readItemValue(item, col) }}
            </td>
          </template>

          <td v-for="btn in props.rowButtons" :key="btn.name">
            <button
              class="icon-btn btn"
              :class="[btn.buttonClass ?? 'btn-primary']"
              @click="() => emit('rowButtonClicked', btn.name, item, i)"
            >
              <i class="bi" :class="[btn.iconClass]"></i>
            </button>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<script setup lang="ts">
export interface TableColumn {
  isHeader?: boolean
  displayName: string
  fieldName: string
  toStringConverter?: (a: any) => string
}

export interface RowButton {
  name: string
  iconClass: string
  buttonClass?: string
}

export interface Props {
  isLoading?: boolean
  columns: TableColumn[]
  rowButtons?: RowButton[]
  items: { [key: string]: any }
  loadingRowsCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  rowButtons: () => new Array(),
  loadingRowsCount: 5
})
const emit = defineEmits(['rowClicked', 'rowButtonClicked'])

function readItemValue(item: any, column: TableColumn): string {
  if (column.toStringConverter === undefined) {
    return item[column.fieldName].toString()
  } else {
    return column.toStringConverter(item)
  }
}
</script>
