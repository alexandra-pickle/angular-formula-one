import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { RacesService } from '../shared/services/races/races.service';
import { SeasonsService } from '../shared/services/seasons/seasons.service';
import { DriverStandingsDataSource } from './driver-standings.data-source';

@Component({
  selector: 'app-driver-standings',
  templateUrl: './driver-standings.component.html',
  styleUrls: ['./driver-standings.component.css'],
})
export class DriverStandingsComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();
  displayedColumns: string[] = [
    'pos',
    'driver',
    'constructor',
    'points',
    'wins',
  ];
  dataSource: DriverStandingsDataSource;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly seasonsService: SeasonsService,
    private readonly racesService: RacesService
  ) {
    this.dataSource = new DriverStandingsDataSource(this.racesService);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.paramMap.subscribe((paramMap) => {
        const seasonId = paramMap.get('seasonId');
        const raceId = paramMap.get('raceId');

        if (seasonId) {
          this.seasonsService.updateSelectedSeasonId(seasonId);
        }
        if (raceId) {
          this.racesService.updateSelectedRaceId(raceId);
        }
      })
    );

    this.subscriptions.push(
      combineLatest(
        this.seasonsService.selectedSeasonId$,
        this.racesService.selectedRaceId$
      ).subscribe(([seasonId, raceId]) => {
        if (seasonId && raceId) {
          this.dataSource.loadRaceResults(seasonId, raceId);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
