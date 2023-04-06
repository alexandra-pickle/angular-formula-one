import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SeasonsService } from '../shared/services/seasons/seasons.service';

@Component({
  selector: 'app-season-details',
  templateUrl: './season-details.component.html',
  styleUrls: ['./season-details.component.css'],
})
export class SeasonDetailsComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription();
  seasonId: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private seasonsService: SeasonsService
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.activatedRoute.paramMap.subscribe((paramMap) => {
        const seasonId = paramMap.get('seasonId');

        if (seasonId) {
          this.seasonId = seasonId;
          this.seasonsService.updateSelectedSeasonId(seasonId);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
