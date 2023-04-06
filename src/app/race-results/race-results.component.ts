import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { RacesService } from '../shared/services/races/races.service';
import { SeasonsService } from '../shared/services/seasons/seasons.service';
import { RaceResultsDataSource } from './race-results.data-source';

@Component({
  selector: 'app-race-results',
  templateUrl: './race-results.component.html',
  styleUrls: ['./race-results.component.css'],
})
export class RaceResultsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = new Array<Subscription>();
  dataSource: RaceResultsDataSource;
  displayedColumns: string[] = [
    'pos',
    'no',
    'driver',
    'constructor',
    'laps',
    'grid',
    'time',
    'status',
    'points',
  ];

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly seasonsService: SeasonsService,
    private readonly racesService: RacesService
  ) {
    this.dataSource = new RaceResultsDataSource(this.racesService);
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
