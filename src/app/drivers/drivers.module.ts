import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';

import { DriversComponent } from './drivers.component';
import { DriversDataSource } from './drivers.data-source';

@NgModule({
  declarations: [DriversComponent],
  imports: [CommonModule, MatCardModule, MatTableModule, MatPaginatorModule],
  exports: [DriversComponent],
  providers: [DriversDataSource],
})
export class DriversModule {}
