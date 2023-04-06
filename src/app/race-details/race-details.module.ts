import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RaceDetailsRoutingModule } from './race-details-routing.module';
import { RaceDetailsComponent } from './race-details.component';
import { RaceResultsModule } from '../race-results/race-results.module';
import { RaceQualifyingModule } from '../race-qualifying/race-qualifying.module';
import { DriverStandingsModule } from '../driver-standings/driver-standings.module';

@NgModule({
  declarations: [RaceDetailsComponent],
  imports: [
    CommonModule,
    RaceDetailsRoutingModule,
    RaceResultsModule,
    RaceQualifyingModule,
    DriverStandingsModule,
  ],
})
export class RaceDetailsModule {}
