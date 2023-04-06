import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';

import { RacesComponent } from './races.component';
import { RacesDataSource } from './races.data-source';

@NgModule({
  declarations: [RacesComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
  ],
  exports: [RacesComponent],
  providers: [RacesDataSource],
})
export class RacesModule {}
