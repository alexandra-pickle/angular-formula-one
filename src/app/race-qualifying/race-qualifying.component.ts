import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subscription } from 'rxjs';
import { RacesService } from '../shared/services/races/races.service';
import { SeasonsService } from '../shared/services/seasons/seasons.service';
import { RaceQualifyingResultsDataSource } from './race-qualifying.data-source';

@Component({
  selector: 'app-race-qualifying',
  templateUrl: './race-qualifying.component.html',
  styleUrls: ['./race-qualifying.component.css'],
})
export class RaceQualifyingComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = new Array<Subscription>();
  displayedColumns: string[] = [
    'pos',
    'no',
    'driver',
    'constructor',
    'Q1',
    'Q2',
    'Q3',
  ];
  dataSource: RaceQualifyingResultsDataSource;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly seasonsService: SeasonsService,
    private readonly racesService: RacesService
  ) {
    this.dataSource = new RaceQualifyingResultsDataSource(this.racesService);
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
