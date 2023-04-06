import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { RaceResultsComponent } from './race-results.component';
import { RaceResultsDataSource } from './race-results.data-source';

@NgModule({
  declarations: [RaceResultsComponent],
  imports: [CommonModule, MatCardModule, MatTableModule],
  exports: [RaceResultsComponent],
  providers: [RaceResultsDataSource],
})
export class RaceResultsModule {}
