import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { ApiModel, Season, SeasonListViewModel } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class SeasonsService {
  private seasons: BehaviorSubject<SeasonListViewModel[]>;
  private selectedSeasonId: BehaviorSubject<string>;

  constructor(private http: HttpClient) {
    this.seasons = new BehaviorSubject<SeasonListViewModel[]>([]);
    this.selectedSeasonId = new BehaviorSubject<string>('');
  }

  get seasons$(): Observable<SeasonListViewModel[]> {
    return this.seasons.asObservable();
  }

  updateSeasons(seasons: SeasonListViewModel[]) {
    this.seasons.next(seasons);
  }

  get selectedSeasonId$(): Observable<string> {
    return this.selectedSeasonId.asObservable();
  }

  updateSelectedSeasonId(seasonId: string) {
    this.selectedSeasonId.next(seasonId);
  }

  getSeasons(): Observable<SeasonListViewModel[]> {
    return this.http
      .get<ApiModel>('http://ergast.com/api/f1/seasons.json?offset=0&limit=200')
      .pipe(
        map(
          (data) =>
            data?.MRData?.SeasonTable?.Seasons.map((s) => {
              return { season: s.season };
            }) ?? []
        )
      );
  }
}
