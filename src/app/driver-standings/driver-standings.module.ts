import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { DriverStandingsComponent } from './driver-standings.component';
import { DriverStandingsDataSource } from './driver-standings.data-source';

@NgModule({
  declarations: [DriverStandingsComponent],
  imports: [CommonModule, MatCardModule, MatTableModule],
  exports: [DriverStandingsComponent],
  providers: [DriverStandingsDataSource],
})
export class DriverStandingsModule {}
