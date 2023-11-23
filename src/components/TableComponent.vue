<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="[i, column] in props.columns.entries()" :key="i">
          {{ column.displayName }}
        </th>
        <!-- <th v-for="btn in props.rowButtons" :key="btn.name"></th> -->
      </tr>
    </thead>
    <tbody :class="{ 'placeholder-wave': isLoading }">
      <template v-if="isLoading">
        <tr v-for="i in props.loadingRowsCount" :key="i">
          <td v-for="i in props.columns.length" :key="i">
            <span class="placeholder"></span>
          </td>
        </tr>
      </template>
      <template v-else>
        <tr v-for="[i, item] in props.items.entries()" :key="i">
          <template v-for="col in props.columns" :key="col.fieldName">
            <th v-if="col.type === 'header'">
              {{ readItemValue(item, col) }}
            </th>
            <td v-else-if="col.type === 'text'">
              {{ readItemValue(item, col) }}
            </td>
            <td class="text-center" v-else-if="col.type === 'button'">
              <button
                class="icon-btn btn"
                :class="[col.buttonClass ?? 'btn-primary']"
                @click="() => emit('rowButtonClicked', col.name, item, i)"
              >
                <i class="bi" :class="[col.iconClass]"></i>
              </button>
            </td>
            <td class="text-center" v-else-if="col.type === 'checkmark'">
              <input
                type="checkmark"
                class="form-check-input"
                :checked="readItemValue(item, col)"
                @change="
                  (ev) => emit('rowChecked', (ev.target as HTMLInputElement).checked, item, i)
                "
              />
            </td>
          </template>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped lang="scss">
.placeholder {
  width: 100%;
}
</style>

<script setup lang="ts">
export interface BaseTableColumn {
  type: string
  isHeader?: boolean
  displayName: string
}

export interface TextTableColumn extends BaseTableColumn {
  type: 'text' | 'header'
  fieldName: string
  valueReader?: (a: any) => string
}

export interface CheckmarkTableColumn extends BaseTableColumn {
  type: 'checkmark'
  fieldName: string
  valueReader?: (a: any) => boolean
}

export interface ButtonTableColumn extends BaseTableColumn {
  type: 'button'
  name: string
  iconClass: string
  buttonClass?: string
}

export type TableColumn = TextTableColumn | CheckmarkTableColumn | ButtonTableColumn

export interface Props {
  columns: TableColumn[]
  items: Array<{ [key: string]: any }>
  isLoading?: boolean
  loadingRowsCount?: number
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  loadingRowsCount: 5
})
const emit = defineEmits(['rowButtonClicked', 'rowChecked'])

function readItemValue(item: any, column: TableColumn) {
  switch (column.type) {
    case 'text':
    case 'header':
      return column.valueReader !== undefined
        ? column.valueReader(item)
        : item[column.fieldName].toString()
    case 'checkmark':
      return column.valueReader !== undefined ? column.valueReader(item) : item[column.fieldName]
    default:
      return ''
  }
}
</script>
