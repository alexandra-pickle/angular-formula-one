import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Season, SeasonListViewModel } from '../shared/models';
import { SeasonsService } from '../shared/services/seasons/seasons.service';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.css'],
})
export class SeasonsComponent implements OnInit, OnDestroy {
  private subscriptions = new Array<Subscription>();
  private selectedSeasons = ['2018', '2019', '2020', '2021', '2022'];
  seasons: SeasonListViewModel[] = [];

  constructor(private readonly seasonsService: SeasonsService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.seasonsService.seasons$.subscribe((seasons) => {
        this.seasons = seasons ?? [];
      })
    );

    this.subscriptions.push(
      this.seasonsService
        .getSeasons()
        .subscribe((seasons: SeasonListViewModel[]) => {
          const filteredSeasons = this.filterSeasons(seasons);
          this.seasonsService.updateSeasons(filteredSeasons);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  filterSeasons(seasons: SeasonListViewModel[]): SeasonListViewModel[] {
    return seasons.filter((s) => this.selectedSeasons.indexOf(s.season) > -1);
  }
}
