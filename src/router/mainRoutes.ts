import type { RouteRecordRaw } from 'vue-router'
import CurrentUserView from '@/views/main/CurrentUserView.vue'
import MatchesListView from '@/views/main/MatchesListView.vue'
import MyTeamView from '@/views/main/MyTeamView.vue'
import TeamsListView from '@/views/main/TeamsListView.vue'
import UsersListView from '@/views/main/UsersListView.vue'
import UserView from '@/views/main/UserView.vue'
import TeamView from '@/views/main/TeamView.vue'
import MatchView from '@/views/main/MatchView.vue'
import CreateUserView from '@/views/main/CreateUserView.vue'
import CreateTeamView from '@/views/main/CreateTeamView.vue'
import CreateMatchView from '@/views/main/CreateMatchView.vue'

const mainRoutes: RouteRecordRaw[] = [
  {
    path: '/users/current',
    alias: '/',
    name: 'current_user',
    component: CurrentUserView
  },
  {
    path: '/users/all',
    name: 'users_list',
    component: UsersListView
  },
  {
    path: '/users/:id',
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
    path: '/teams/all',
    name: 'teams_list',
    component: TeamsListView
  },
  {
    path: '/teams/my',
    name: 'my_team',
    component: MyTeamView
  },
  {
    path: '/teams/:id',
    name: 'team',
    component: TeamView,
    props: true
  },
  {
    path: '/teams/create',
    name: 'create_team',
    component: CreateTeamView
  },
  {
    path: '/matches/all',
    name: 'matches_list',
    component: MatchesListView
  },
  {
    path: '/matches/:id',
    name: 'match',
    component: MatchView,
    props: true
  },
  {
    path: '/matches/create',
    name: 'create_match',
    component: CreateMatchView
  }
]

export default mainRoutes
