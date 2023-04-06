import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { RaceViewModel, RaceResultsViewModel, Result } from '../shared/models';
import { RacesService } from '../shared/services/races/races.service';

@Injectable()
export class RaceResultsDataSource extends DataSource<Result> {
  isLoading$ = new BehaviorSubject<boolean>(false);
  results$ = new BehaviorSubject<Result[]>([]);
  raceHeader$ = new BehaviorSubject<RaceViewModel | undefined>(undefined);
  numberOfCarsFinished$ = new BehaviorSubject<number>(0);
  numberOfCarsCrashed$ = new BehaviorSubject<number>(0);
  numberOfPlusOneLaps$ = new BehaviorSubject<number>(0);

  constructor(private readonly racesService: RacesService) {
    super();
  }

  connect(): Observable<Result[]> {
    return this.results$.asObservable();
  }

  disconnect(): void {
    this.results$.complete();
  }

  loadRaceResults(seasonId: string, raceId: string): void {
    this.isLoading$.next(true);
    this.racesService
      .getRaceResults(seasonId, raceId)
      .subscribe((raceResults: RaceResultsViewModel) => {
        this.results$.next(raceResults.Results);

        this.numberOfCarsFinished$.next(0);
        this.numberOfCarsCrashed$.next(0);
        this.numberOfCarsCrashed$.next(0);
        // todo: create an enum for status
        for (let r of raceResults.Results) {
          if (r.status === 'Finished') {
            this.numberOfCarsFinished$.next(
              this.numberOfCarsFinished$.value + 1
            );
          }

          if (r.status === 'Collision') {
            this.numberOfCarsCrashed$.next(this.numberOfCarsCrashed$.value + 1);
          }

          if (r.status === '+1 Lap') {
            this.numberOfPlusOneLaps$.next(this.numberOfPlusOneLaps$.value + 1);
          }
        }

        this.raceHeader$.next({
          season: raceResults.season,
          raceName: raceResults.raceName,
          round: raceResults.round,
          total: raceResults.total,
        });
        this.isLoading$.next(false);
      });
  }
}
