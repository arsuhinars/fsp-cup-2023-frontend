<template>
  <main>
    <div class="main-container">
      <div class="left-container border-end">
        <RouterLink :to="{ path: '/' }" class="h2 mb-4 text-decoration-none">
          Sample title
        </RouterLink>
        <NavBar :items="navItems" />
      </div>
      <div class="right-container">
        <RouterView />
      </div>
    </div>
  </main>
</template>

<style scoped lang="scss">
@import 'bootstrap/scss/functions';
@import 'bootstrap/scss/variables';

.main-container {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: stretch;
}

.left-container {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  text-align: center;
  width: 340px;
  background-color: $gray-100;
  padding: $spacer * 2;

  .nav {
    flex-grow: 1;
    overflow: scroll;
  }
}

.right-container {
  flex-grow: 1;
  background-color: $white;
  overflow: scroll;
}
</style>

<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const navItems = [
  {
    displayName: 'Пользователи',
    to: { name: 'users' }
  },
  {
    displayName: 'Команды',
    to: { name: 'teams' }
  },
  {
    displayName: 'Моя команда',
    to: { name: 'my_team' }
  },
  {
    displayName: 'Турниры',
    to: { name: 'matches' }
  }
]

onMounted(() => {
  if (!auth.isAuthorized) {
    router.replace({ name: 'login' })
  }
})
</script>
