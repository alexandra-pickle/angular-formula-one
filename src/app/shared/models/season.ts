import { Race } from './api';

export interface SeasonListViewModel {
  season: string;
}

export interface SeasonViewModel {
  seasonId: string;
  Races: Race[];
  total: number;
}
