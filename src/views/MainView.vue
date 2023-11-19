<template>
  <main>
    <div class="main-container">
      <div class="left-container border-end">
        <RouterLink :to="{ path: '/' }" class="h2 mb-4 text-decoration-none">
          Sample title
        </RouterLink>
        <NavBar :items="navItems" />
        <button class="btn btn-secondary" @click="async () => await auth.logout()">
          Выйти из аккаунта
        </button>
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
  flex-shrink: 0;
  background-color: $gray-100;
  padding: $spacer * 2;

  .nav {
    flex-grow: 1;
    overflow: scroll;
  }
}

.right-container {
  flex-grow: 1;
  max-height: 100vh;
  background-color: $white;
  overflow: scroll;
  padding: ($spacer * 2) ($spacer * 4) ($spacer * 2) ($spacer * 4);
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
    displayName: 'Мой профиль',
    to: { name: 'current_user' }
  },
  {
    displayName: 'Пользователи',
    to: { name: 'users_list' }
  },
  {
    displayName: 'Команды',
    to: { name: 'teams_list' }
  },
  {
    displayName: 'Моя команда',
    to: { name: 'my_team' }
  },
  {
    displayName: 'Турниры',
    to: { name: 'matches_list' }
  }
]

onMounted(() => {
  if (!auth.isAuthorized) {
    router.replace({ name: 'login' })
  }
})
</script>
