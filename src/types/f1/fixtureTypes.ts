export interface RaceResponse {
  response: Race[];
}

export interface Race {
  id: number;
  competition: Competition;
  circuit: Circuit;
  season: number;
  laps: Laps;
  data: string;
  type: RaceType;
  distance: string;
  status: string;

  date: string;
  timezone: string;
}

export interface Competition {
  name: string;
  location: Location;
}

export interface Location {
  country: string;
  city: string;
}

export interface Circuit {
  name: string;
  image: string;
}
export interface Laps {
  total: number;
}

export enum RaceType {
  RACE = "Race",
  FIRST_QUALIFYING = "1st Qualifying",
  SECOND_QUALIFYING = "2nd Qualifying",
  THIRD_QUALIFYING = "3rd Qualifying",
  SPRINT = "Sprint",
  FIRST_SPRINT_SHOOTOUT = "1st Sprint Shootout",
  SECOND_SPRINT_SHOOTOUT = "2nd Sprint Shootout",
  THIRD_SPRINT_SHOOTOUT = "3rd Sprint Shootout",
  FIRST_PRACTICE = "1st Practice",
  SECOND_PRACTICE = "2nd Practice",
  THIRD_PRACTICE = "3rd Practice",
}
