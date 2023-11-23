<template>
  <ul class="nav nav-pills flex-column">
    <li class="nav-item" v-for="item in props.items" :key="item.displayName">
      <RouterLink
        class="nav-link"
        :to="item.to"
        :class="{ active: currentRoute?.name == router.resolve(item.to).name }"
        >{{ item.displayName }}</RouterLink
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
import { watchEffect, ref } from 'vue'
import { type RouteLocationRaw, type RouteLocationNormalized, useRouter } from 'vue-router'

export interface NavItem {
  displayName: string
  to: RouteLocationRaw
}

const router = useRouter()

const props = defineProps<{
  items: Array<NavItem>
}>()

const currentRoute = ref<RouteLocationNormalized | null>(null)

watchEffect(() => {
  currentRoute.value = router.currentRoute.value
})
</script>
