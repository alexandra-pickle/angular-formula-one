import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasonDetailsRoutingModule } from './season-details-routing.module';
import { SeasonDetailsComponent } from './season-details.component';
import { RacesModule } from '../races/races.module';
import { DriversModule } from '../drivers/drivers.module';
import { DriverStandingsModule } from '../driver-standings/driver-standings.module';

@NgModule({
  declarations: [SeasonDetailsComponent],
  imports: [
    CommonModule,
    SeasonDetailsRoutingModule,
    RacesModule,
    DriversModule,
    DriverStandingsModule,
  ],
})
export class SeasonDetailsModule {}
