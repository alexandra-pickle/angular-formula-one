import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Race, SeasonViewModel } from '../shared/models';
import { RacesService } from '../shared/services/races/races.service';

@Injectable()
export class RacesDataSource extends DataSource<Race> {
  races$ = new BehaviorSubject<Race[]>([]);
  totalNumberOfRecords$ = new BehaviorSubject<number>(0);
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly racesService: RacesService) {
    super();
  }

  connect(): Observable<Race[]> {
    return this.races$.asObservable();
  }

  disconnect(): void {
    this.races$.complete();
  }

  loadRaces(seasonId: string, currentPage: number, pageSize: number): void {
    this.isLoading$.next(true);
    this.racesService
      .getRacesBySeason(seasonId, currentPage, pageSize)
      .subscribe((data: SeasonViewModel) => {
        this.races$.next(data?.Races);
        this.totalNumberOfRecords$.next(data.total);
        this.isLoading$.next(false);
      });
  }
}
