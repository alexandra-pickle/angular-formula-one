import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SeasonsComponent } from './seasons/seasons.component';
import { SeasonDetailsComponent } from './season-details/season-details.component';

const routes: Routes = [
  {
    path: 'seasons',
    component: SeasonsComponent,
    children: [
      {
        path: ':seasonId',
        component: SeasonDetailsComponent,
      },
    ],
  },
  {
    path: 'seasons/:seasonId/races/:raceId',
    loadChildren: () =>
      import('./race-details/race-details.module').then(
        (m) => m.RaceDetailsModule
      ),
  },
  { path: '', redirectTo: 'seasons', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
