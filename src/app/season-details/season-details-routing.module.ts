import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeasonDetailsComponent } from './season-details.component';

const routes: Routes = [{ path: '', component: SeasonDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeasonDetailsRoutingModule { }
