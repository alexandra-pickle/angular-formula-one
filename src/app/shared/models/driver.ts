import { Driver } from './api';

export interface SeasonDriversViewModel {
  seasonId: string;
  Drivers: Driver[];
  total: number;
}
