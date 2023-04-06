import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { SeasonsComponent } from './seasons.component';

@NgModule({
  declarations: [SeasonsComponent],
  imports: [CommonModule, RouterModule, MatButtonModule],
})
export class SeasonsModule {}
