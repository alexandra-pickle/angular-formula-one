import { DriverStanding, QualifyingResult, Result } from './api';

export interface RaceViewModel {
  season: string;
  round: string;
  total: string;
  raceName?: string;
}

export interface RaceResultsViewModel extends RaceViewModel {
  Results: Result[];
}

export interface RaceQualifyingResultsViewModel extends RaceViewModel {
  QualifyingResults: QualifyingResult[];
}

export interface RaceDriverStandingsViewModel extends RaceViewModel {
  DriverStandings: DriverStanding[];
}
