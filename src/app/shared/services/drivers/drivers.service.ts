import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { ApiModel, SeasonDriversViewModel } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class DriversService {
  constructor(private http: HttpClient) {}

  getDriversBySeason(
    seasonId: string,
    currentPage: number,
    pageSize: number
  ): Observable<SeasonDriversViewModel> {
    return this.http
      .get<ApiModel>(
        `http://ergast.com/api/f1/${seasonId}/drivers.json?offset=${
          currentPage * pageSize
        }&limit=${pageSize}`
      )
      .pipe(
        map((data: ApiModel) => {
          return <SeasonDriversViewModel>{
            seasonId: seasonId,
            Drivers: data?.MRData?.DriverTable?.Drivers,
            total: Number(data.MRData.total),
          };
        })
      );
  }
}
