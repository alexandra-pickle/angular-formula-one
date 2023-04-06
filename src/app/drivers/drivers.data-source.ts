import { DataSource } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Driver, SeasonDriversViewModel } from '../shared/models';
import { DriversService } from '../shared/services/drivers/drivers.service';

@Injectable()
export class DriversDataSource extends DataSource<Driver> {
  drivers$ = new BehaviorSubject<Driver[]>([]);
  totalNumberOfRecords$ = new BehaviorSubject<number>(0);
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly driversService: DriversService) {
    super();
  }

  connect(): Observable<Driver[]> {
    return this.drivers$.asObservable();
  }

  disconnect(): void {
    this.drivers$.complete();
  }

  loadDrivers(seasonId: string, currentPage: number, pageSize: number): void {
    this.isLoading$.next(true);
    this.driversService
      .getDriversBySeason(seasonId, currentPage, pageSize)
      .subscribe((data: SeasonDriversViewModel) => {
        this.drivers$.next(data?.Drivers);
        this.totalNumberOfRecords$.next(data.total);
        this.isLoading$.next(false);
      });
  }
}
