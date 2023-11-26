<template>
  <main>
    <div class="main-container">
      <div class="left-container border-end">
        <RouterLink :to="{ path: '/' }" class="h2 mb-4 text-decoration-none">
          Russian Esports Tool
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
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import NavBar, { type NavItem } from '@/components/NavBar.vue'
import { useAuthStore } from '@/stores/auth'
import { UserRole } from '@/schemas/users'

const auth = useAuthStore()
const router = useRouter()

const adminNavItems = [
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
    displayName: 'Турниры',
    to: { name: 'tournaments_list' }
  },
  {
    displayName: 'Рейтинг',
    to: { name: 'teams_rating' }
  }
]

const judgeNavItems = [
  {
    displayName: 'Мой профиль',
    to: { name: 'current_user' }
  },
  {
    displayName: 'Команды',
    to: { name: 'teams_list' }
  },
  {
    displayName: 'Турниры',
    to: { name: 'tournaments_list' }
  },
  {
    displayName: 'Рейтинг',
    to: { name: 'teams_rating' }
  }
]

const captainNavItems = [
  {
    displayName: 'Мой профиль',
    to: { name: 'current_user' }
  },
  {
    displayName: 'Моя команда',
    to: { name: 'my_team' }
  },
  {
    displayName: 'Команды',
    to: { name: 'teams_list' }
  },
  {
    displayName: 'Турниры',
    to: { name: 'tournaments_list' }
  },
  {
    displayName: 'Рейтинг',
    to: { name: 'teams_rating' }
  }
]

const navItems = ref<NavItem[]>([])

onMounted(() => {
  if (!auth.isAuthorized) {
    router.replace({ name: 'login' })
  }

  switch (auth.user?.role) {
    case UserRole.Admin:
      navItems.value = adminNavItems
      break
    case UserRole.Judge:
      navItems.value = judgeNavItems
      break
    case UserRole.TeamCaptain:
      navItems.value = captainNavItems
      break
  }
})
</script>
