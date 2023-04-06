import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { RaceQualifyingComponent } from './race-qualifying.component';
import { RaceQualifyingResultsDataSource } from './race-qualifying.data-source';

@NgModule({
  declarations: [RaceQualifyingComponent],
  imports: [CommonModule, MatCardModule, MatTableModule],
  exports: [RaceQualifyingComponent],
  providers: [RaceQualifyingResultsDataSource],
})
export class RaceQualifyingModule {}
