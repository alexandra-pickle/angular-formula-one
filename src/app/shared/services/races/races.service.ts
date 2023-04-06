import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, map, Observable } from 'rxjs';
import {
  ApiModel,
  Race,
  RaceDriverStandingsViewModel,
  RaceQualifyingResultsViewModel,
  RaceResultsViewModel,
  SeasonViewModel,
} from '../../models';
import { SeasonsService } from '../seasons/seasons.service';

@Injectable({
  providedIn: 'root',
})
export class RacesService {
  private selectedRaceId: BehaviorSubject<string>;

  constructor(
    private http: HttpClient,
    private readonly seasonsService: SeasonsService
  ) {
    this.selectedRaceId = new BehaviorSubject<string>('');
  }

  get selectedRaceId$(): Observable<string> {
    return this.selectedRaceId.asObservable();
  }

  updateSelectedRaceId(raceId: string) {
    this.selectedRaceId.next(raceId);
  }

  getRacesBySeason(
    seasonId: string,
    currentPage: number,
    pageSize: number
  ): Observable<SeasonViewModel> {
    return this.http
      .get<ApiModel>(
        `http://ergast.com/api/f1/${seasonId}/races.json?offset=${
          currentPage * pageSize
        }&limit=${pageSize}`
      )
      .pipe(
        map((data: ApiModel) => {
          return <SeasonViewModel>{
            seasonId: seasonId,
            Races: data?.MRData?.RaceTable?.Races,
            total: Number(data.MRData.total),
          };
        })
      );
  }

  getRaceResults(
    seasonId: string,
    raceId: string
  ): Observable<RaceResultsViewModel> {
    return this.http
      .get<ApiModel>(
        `http://ergast.com/api/f1/${seasonId}/${raceId}/results.json`
      )
      .pipe(
        map((data: ApiModel) => {
          const race = data?.MRData?.RaceTable?.Races[0];

          return <RaceResultsViewModel>{
            season: race?.season,
            round: race?.round,
            raceName: race?.raceName,
            total: data?.MRData?.total,
            Results: race?.Results,
          };
        })
      );
  }

  getRaceQualifyingResults(
    seasonId: string,
    raceId: string
  ): Observable<RaceQualifyingResultsViewModel> {
    return this.http
      .get<ApiModel>(
        `http://ergast.com/api/f1/${seasonId}/${raceId}/qualifying.json`
      )
      .pipe(
        map((data: ApiModel) => {
          const race = data?.MRData?.RaceTable?.Races[0];

          return <RaceQualifyingResultsViewModel>{
            season: race?.season,
            round: race?.round,
            raceName: race?.raceName,
            total: data?.MRData?.total,
            QualifyingResults: race?.QualifyingResults,
          };
        })
      );
  }

  getRaceDriverStandings(
    seasonId: string,
    raceId: string
  ): Observable<RaceDriverStandingsViewModel> {
    return this.http
      .get<ApiModel>(
        `http://ergast.com/api/f1/${seasonId}/${raceId}/driverStandings.json`
      )
      .pipe(
        map((data: ApiModel) => {
          return <RaceDriverStandingsViewModel>{
            season: data?.MRData?.StandingsTable?.StandingsLists[0]?.season,
            round: data?.MRData?.StandingsTable?.StandingsLists[0]?.round,
            total: data?.MRData?.total,
            DriverStandings:
              data?.MRData?.StandingsTable?.StandingsLists[0]?.DriverStandings,
          };
        })
      );
  }
}
