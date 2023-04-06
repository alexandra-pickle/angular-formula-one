import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {
  RaceViewModel,
  RaceQualifyingResultsViewModel,
  QualifyingResult,
} from '../shared/models';
import { RacesService } from '../shared/services/races/races.service';

@Injectable()
export class RaceQualifyingResultsDataSource extends DataSource<QualifyingResult> {
  isLoading$ = new BehaviorSubject<boolean>(false);
  results$ = new BehaviorSubject<QualifyingResult[]>([]);
  raceHeader$ = new BehaviorSubject<RaceViewModel | undefined>(undefined);

  constructor(private readonly racesService: RacesService) {
    super();
  }

  connect(): Observable<QualifyingResult[]> {
    return this.results$.asObservable();
  }

  disconnect(): void {
    this.results$.complete();
  }

  loadRaceResults(seasonId: string, raceId: string): void {
    this.isLoading$.next(true);
    this.racesService
      .getRaceQualifyingResults(seasonId, raceId)
      .subscribe((raceQualifyingResults: RaceQualifyingResultsViewModel) => {
        this.results$.next(raceQualifyingResults.QualifyingResults);
        this.raceHeader$.next({
          season: raceQualifyingResults.season,
          raceName: raceQualifyingResults.raceName,
          round: raceQualifyingResults.round,
          total: raceQualifyingResults.total,
        });
        this.isLoading$.next(false);
      });
  }
}
