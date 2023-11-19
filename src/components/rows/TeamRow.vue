<template>
  <tr class="cursor-pointer" @click="() => router.push({ name: 'team', params: { id: 1 } })">
    <th scope="row">1</th>
    <td>Team_1</td>
    <td>Пупкин Василий Иванович</td>
    <td>5</td>
  </tr>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
