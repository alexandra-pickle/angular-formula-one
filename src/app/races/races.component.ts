import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { RacesService } from '../shared/services/races/races.service';
import { RacesDataSource } from './races.data-source';
import { SeasonsService } from '../shared/services/seasons/seasons.service';

@Component({
  selector: 'app-races',
  templateUrl: './races.component.html',
  styleUrls: ['./races.component.css'],
})
export class RacesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = new Array<Subscription>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource: RacesDataSource;
  seasonId: string | undefined;
  displayedColumns: string[] = ['raceName'];
  currentPage = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [10, 15, 25];

  constructor(
    private readonly racesService: RacesService,
    private readonly seasonsService: SeasonsService
  ) {
    this.dataSource = new RacesDataSource(this.racesService);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.seasonsService.selectedSeasonId$.subscribe((seasonId) => {
        if (seasonId) {
          this.seasonId = seasonId;
          this.dataSource.loadRaces(
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
          this.dataSource.loadRaces(
            this.seasonId,
            this.paginator.pageIndex,
            this.paginator.pageSize
          );
        }
      })
    );
  }
}
