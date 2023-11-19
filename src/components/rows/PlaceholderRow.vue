<template>
  <tr class="placeholder-wave">
    <td v-for="i in props.rowsCount" :key="i">
      <span class="placeholder w-100"></span>
    </td>
  </tr>
</template>

<script setup lang="ts">
const props = defineProps<{
  rowsCount: number
}>()
</script>
