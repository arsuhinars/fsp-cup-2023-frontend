<template>
  <form novalidate ref="form" @submit="(ev) => formSubmitHandler(ev as SubmitEvent)">
    <div class="mb-3" v-for="field in props.fields" :key="field.name">
      <!-- SelectField -->
      <template v-if="field.inputType === 'select'">
        <label class="form-label" :for="field.name">{{ field.displayName }}</label>
        <select class="form-select" :id="field.name" :disabled="props.readOnly || props.isLoading">
          <option
            v-for="option in field.options"
            :key="option.value"
            :value="option.value"
            :selected="readItemValue(field) === option.value"
            @change="(ev) => writeItemValue(field, (ev.target as HTMLSelectElement).value)"
          >
            {{ option.displayName }}
          </option>
        </select>
      </template>
      <!-- CheckboxField -->
      <template v-else-if="field.inputType === 'checkbox'">
        <div class="form-check">
          <input
            class="form-check-input"
            type="checkbox"
            :id="field.name"
            :disabled="props.readOnly || props.isLoading"
            :checked="readItemValue(field)"
            @change="(ev) => writeItemValue(field, (ev.target as HTMLInputElement).checked)"
          />
          <label class="form-check-label" :for="field.name">{{ field.displayName }}</label>
        </div>
      </template>
      <!-- DateTimeField -->
      <template
        v-else-if="
          field.inputType === 'date' || field.inputType === 'datetime' || field.inputType === 'time'
        "
      >
        <label class="form-label" :for="field.name">{{ field.displayName }}</label>
        <input
          class="form-control"
          :type="field.inputType"
          :id="field.name"
          :disabled="props.isLoading"
          :readonly="props.readOnly"
          :value="readItemValue(field)"
          @input="(ev) => writeItemValue(field, (ev.target as HTMLInputElement).valueAsDate)"
        />
      </template>
      <!-- InputField -->
      <template v-else>
        <label class="form-label" :for="field.name">{{ field.displayName }}</label>
        <input
          class="form-control"
          :type="field.inputType"
          :id="field.name"
          :disabled="props.isLoading"
          :readonly="props.readOnly"
          :placeholder="(field as InputField).placeholder ?? ''"
          :value="readItemValue(field)"
          @input="(ev) => writeItemValue(field, (ev.target as HTMLInputElement).value)"
        />
      </template>
    </div>

    <span class="text-danger mt-3" v-if="props.errorText !== undefined">
      {{ props.errorText }}
    </span>

    <button
      type="submit"
      class="btn btn-primary mt-3 d-flex align-items-center"
      v-if="submitText !== undefined"
    >
      <div class="spinner-border spinner-border-sm me-2" v-if="props.isLoading"></div>
      {{ props.submitText }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, watchEffect } from 'vue'

export type FormItem = { [key: string]: any }

export interface BaseField {
  inputType: string
  name: string
  displayName: string
}

export interface InputField extends BaseField {
  inputType: 'text' | 'password' | 'email' | 'url' | 'tel'
  placeholder?: string
  valueReader?: (item: FormItem) => string
  valueWriter?: (item: FormItem, value: string) => void
}

export interface DateTimeField extends BaseField {
  inputType: 'date' | 'datetime' | 'time'
  valueReader?: (item: FormItem) => Date
  valueWriter?: (item: FormItem, value: Date) => void
}

export interface SelectField extends BaseField {
  inputType: 'select'
  options: Array<{ displayName: string; value: string }>
  valueReader?: (item: FormItem) => string
  valueWriter?: (item: FormItem, value: string) => void
}

export interface CheckboxField extends BaseField {
  inputType: 'checkbox'
  valueReader?: (item: FormItem) => boolean
  valueWriter?: (item: FormItem, value: boolean) => void
}

export type FormField = InputField | SelectField | CheckboxField | DateTimeField

interface Props {
  fields: Array<FormField>
  itemPrototype: FormItem
  isLoading?: boolean
  readOnly?: boolean
  submitText?: string
  errorText?: string
}

const props = withDefaults(defineProps<Props>(), { readOnly: false, isLoading: false })
const emit = defineEmits(['submited'])
const item = reactive<{ [key: string]: any }>({})
const form = ref<HTMLFormElement | null>(null)

function readItemValue(field: FormField) {
  return field.valueReader === undefined ? item[field.name] : field.valueReader(item)
}

function writeItemValue(field: FormField, value: any) {
  if (field.valueWriter === undefined) {
    item[field.name] = value
  } else if (field.inputType === 'select') {
    field.valueWriter(item, value)
  } else if (field.inputType === 'checkbox') {
    field.valueWriter(item, value)
  } else if (
    field.inputType === 'date' ||
    field.inputType === 'datetime' ||
    field.inputType === 'time'
  ) {
    field.valueWriter(item, value)
  } else {
    field.valueWriter(item, value)
  }
}

function formSubmitHandler(event: SubmitEvent) {
  event?.preventDefault()

  form.value?.classList.add('wav-validated')

  if (form.value?.checkValidity()) {
    emit('submited', item)
  }
}

watchEffect(() => {
  Object.assign(item, props.itemPrototype)
})

defineExpose({
  item,
  isValid: () => form.value?.checkValidity() ?? false,
  clear: () => {
    Object.assign(item, props.itemPrototype)
    form.value?.classList.remove('wav-validated')
  }
})

// const form = ref<HTMLFormElement | null>(null)

// defineExpose({
//   isValid: () => form.value?.checkValidity() ?? false,
//   invalidate: () => form.value?.classList.remove('was-validated')
// })

// onMounted(() => {
//   form.value?.addEventListener('submit', (event) => {
//     if (!form.value?.checkValidity()) {
//       event.preventDefault()
//       event.stopPropagation()
//     }

//     form.value?.classList.add('was-validated')
//   })
// })

// watchEffect(() => {
//   if (form.value === null) {
//     return
//   }

//   for (let input of form.value.querySelectorAll('input')) {
//     input.readOnly = props.readOnly
//     input.disabled = props.isLoading
//   }

//   for (let select of form.value.querySelectorAll('select')) {
//     select.disabled = props.readOnly || props.isLoading
//   }

//   for (let submit of form.value.querySelectorAll('button[type=submit], input[type=submit]')) {
//     if (submit instanceof HTMLButtonElement || submit instanceof HTMLInputElement) {
//       submit.disabled = props.readOnly || props.isLoading
//     }
//   }
// })
</script>
