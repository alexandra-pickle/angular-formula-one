import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  RaceViewModel,
  RaceDriverStandingsViewModel,
  DriverStanding,
} from '../shared/models';
import { RacesService } from '../shared/services/races/races.service';

@Injectable()
export class DriverStandingsDataSource extends DataSource<DriverStanding> {
  isLoading$ = new BehaviorSubject<boolean>(false);
  driverStandings$ = new BehaviorSubject<DriverStanding[]>([]);
  raceHeader$ = new BehaviorSubject<RaceViewModel | undefined>(undefined);

  constructor(private readonly racesService: RacesService) {
    super();
  }

  connect(): Observable<DriverStanding[]> {
    return this.driverStandings$.asObservable();
  }

  disconnect(): void {
    this.driverStandings$.complete();
  }

  loadRaceResults(seasonId: string, raceId: string): void {
    this.isLoading$.next(true);
    this.racesService
      .getRaceDriverStandings(seasonId, raceId)
      .subscribe((raceDriverStandings: RaceDriverStandingsViewModel) => {
        this.driverStandings$.next(raceDriverStandings.DriverStandings);
        this.raceHeader$.next({
          season: raceDriverStandings.season,
          round: raceDriverStandings.round,
          total: raceDriverStandings.total,
        });
        this.isLoading$.next(false);
      });
  }
}
