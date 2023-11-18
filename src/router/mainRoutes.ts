import type { RouteRecordRaw } from 'vue-router'
import CurrentUserView from '@/views/main/CurrentUserView.vue'
import MatchesListView from '@/views/main/MatchesListView.vue'
import MyTeamView from '@/views/main/MyTeamView.vue'
import TeamsListView from '@/views/main/TeamsListView.vue'
import UsersListView from '@/views/main/UsersListView.vue'

const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/users/current',
    alias: '/',
    name: 'current_user',
    component: CurrentUserView
  },
  {
    path: '/users',
    name: 'users',
    component: UsersListView
  },
  {
    path: '/teams',
    name: 'teams',
    component: TeamsListView
  },
  {
    path: '/teams/my',
    name: 'my_team',
    component: MyTeamView
  },
  {
    path: '/matches',
    name: 'matches',
    component: MatchesListView
  }
]

export default mainRoutes
