import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SeasonsService } from './shared/services/seasons/seasons.service';
import { DriversService } from './shared/services/drivers/drivers.service';
import { RacesService } from './shared/services/races/races.service';

import { SeasonsModule } from './seasons/seasons.module';
import { SeasonDetailsModule } from './season-details/season-details.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,

    SeasonsModule,
    SeasonDetailsModule,
  ],
  providers: [SeasonsService, DriversService, RacesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
