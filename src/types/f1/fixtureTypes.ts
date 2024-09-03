export interface RaceResponse {
  response: Race;
}

export interface Race {
  id: number;
  competition: Competition;
  circuitDetails: CircuitDetails;
  season: number;
  laps: Laps;
  data: string;
  type: string;
  distance: string;
  status: string;
}

export interface Competition {
  name: string;
  location: Location;
}

export interface Location {
  country: string;
  city: string;
}

export interface CircuitDetails {
  name: string;
  image: string;
}
export interface Laps {
  total: number;
}
