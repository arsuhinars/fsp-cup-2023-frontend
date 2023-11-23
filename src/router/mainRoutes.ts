import type { RouteRecordRaw } from 'vue-router'
import CurrentUserView from '@/views/main/CurrentUserView.vue'
import MyTeamView from '@/views/main/MyTeamView.vue'
import TeamsListView from '@/views/main/TeamsListView.vue'
import UsersListView from '@/views/main/UsersListView.vue'
import UserView from '@/views/main/UserView.vue'
import TeamView from '@/views/main/TeamView.vue'
import CreateUserView from '@/views/main/CreateUserView.vue'

const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/users/current/edit',
    alias: '/',
    name: 'current_user',
    component: CurrentUserView
  },
  {
    path: '/users',
    name: 'users_list',
    component: UsersListView
  },
  {
    path: '/users/:id/edit',
    name: 'user',
    component: UserView,
    props: true
  },
  {
    path: '/users/create',
    name: 'create_user',
    component: CreateUserView
  },
  {
    path: '/teams',
    name: 'teams_list',
    component: TeamsListView
  },
  {
    path: '/teams/my/edit',
    name: 'my_team',
    component: MyTeamView
  },
  {
    path: '/teams/:id',
    name: 'team',
    component: TeamView,
    props: true
  }
]

export default mainRoutes
