import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './players/players.component';
import { MatchPredictorComponent } from './match-predictor/match-predictor.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: '', redirectTo: '/match-predictor', pathMatch: 'full' }, // Default route
  { path: 'players', component: PlayersComponent },
  { path: 'match-predictor', component: MatchPredictorComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
