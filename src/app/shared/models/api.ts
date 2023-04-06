export interface ApiModel {
  MRData: MRData;
}

export interface MRData {
  limit: string;
  offset: string;
  series: string;
  total: string;
  url: string;
  xmlns: string;
  RaceTable?: RaceTable;
  SeasonTable?: SeasonTable;
  DriverTable?: DriverTable;
  StandingsTable?: StandingsTable;
}

export interface RaceTable {
  Races: Race[];
  season: string;
  round?: string;
}

export interface Race {
  Circuit: Circuit;
  date: Date;
  raceName: string;
  round: string;
  season: string;
  time: Time;
  url: string;
  Results?: Result[];
  QualifyingResults?: QualifyingResult[];
  FirstPractice?: DateTime;
  Qualifying?: DateTime;
  SecondPractice?: DateTime;
  ThirdPractice?: DateTime;
}

export interface Circuit {
  Location: Location;
  circuitId: string;
  circuitName: string;
  url: string;
}

export interface Location {
  country: string;
  locality: string;
  lat: string;
  long: string;
}

export interface Result {
  Driver: Driver;
  FastestLap: Lap;
  Constructor: Constructor;
  Time: Time;
  grid: string;
  laps: string;
  number: string;
  points: string;
  position: string;
  positionText: string;
  status: string;
}

export interface QualifyingResult {
  Constructor: Constructor;
  Driver: Driver;
  Q1: string;
  Q2: string;
  Q3: string;
  number: string;
  position: string;
}

export interface Lap {
  AverageSpeed: Speed;
  Time: Time;
  lap: string;
  rank: string;
}

export interface Constructor {
  constructorId: string;
  name: string;
  nationality: string;
  url: string;
}

export interface SeasonTable {
  Seasons: Season[];
}

export interface Season {
  season: string;
  url: string;
}

export interface DriverTable {
  Drivers: Driver[];
  season: string;
}

export interface Driver {
  code: string;
  dateOfBirth: string;
  driverId: string;
  familyName: string;
  givenName: string;
  nationality: string;
  permanentNumber: string;
  url: string;
}

export interface DateTime {
  date: Date;
  time: Time;
}

export interface Time {
  time: string;
  millis?: string;
}

export interface Speed {
  units: string;
  speed: string;
}

export interface StandingsTable {
  StandingsLists: StandingsList[];
  round: string;
  season: string;
}

export interface StandingsList {
  DriverStandings: DriverStanding[];
  round: string;
  season: string;
}

export interface DriverStanding {
  Constructors: Constructor[];
  Driver: Driver;
  points: string;
  position: string;
  positionText: string;
  wins: string;
}
