import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { DriversService } from '../shared/services/drivers/drivers.service';
import { SeasonsService } from '../shared/services/seasons/seasons.service';
import { DriversDataSource } from './drivers.data-source';

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css'],
})
export class DriversComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  private subscriptions: Subscription[] = new Array<Subscription>();
  dataSource: DriversDataSource;
  seasonId: string | undefined;
  displayedColumns: string[] = ['givenName', 'familyName'];
  currentPage = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 15, 25];

  constructor(
    private readonly driversService: DriversService,
    private readonly seasonsService: SeasonsService
  ) {
    this.dataSource = new DriversDataSource(this.driversService);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.seasonsService.selectedSeasonId$.subscribe((seasonId) => {
        if (seasonId) {
          this.seasonId = seasonId;
          this.dataSource.loadDrivers(
            this.seasonId,
            this.currentPage,
            this.pageSize
          );
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.paginator.page.subscribe(() => {
        if (this.seasonId) {
          this.dataSource.loadDrivers(
            this.seasonId,
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }
      })
    );
  }
}
