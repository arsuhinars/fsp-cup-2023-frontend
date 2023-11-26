import type { RouteRecordRaw } from 'vue-router'
import TournamentRegistrationView from '@/views/tournament/TournamentRegistrationView.vue'
import TournamentDistributionView from '@/views/tournament/TournamentDistributionView.vue'
import TournamentOngoingView from '@/views/tournament/TournamentOngoingView.vue'
import TournamentResultsView from '@/views/tournament/TournamentResultsView.vue'

const tournamentRoutes: RouteRecordRaw[] = [
  {
    path: 'registration',
    name: 'tournament_registration',
    props: true,
    component: TournamentRegistrationView
  },
  {
    path: 'teams_distribution',
    name: 'tournament_distribution',
    props: true,
    component: TournamentDistributionView
  },
  {
    path: 'ongoing',
    name: 'tournament_ongoing',
    props: true,
    component: TournamentOngoingView
  },
  {
    path: 'results',
    name: 'tournament_results',
    props: true,
    component: TournamentResultsView
  }
]

export default tournamentRoutes
