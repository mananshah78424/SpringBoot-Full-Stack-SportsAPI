export interface Location {
  country: string;
  city: string;
}

export interface Competition {
  name: string;
  location: Location;
}

export interface Circuit {
  id: number;
  name: string;
  image: string;
  competition: Competition;
  first_grand_prix: number | null;
  laps: number | null;
  length: string;
  raceDistance: string;
  capacity: number | null;
}

export interface MainCircuitResponse {
  get: string;
  parameters: any[];
  errors: any[];
  results: number;
  response: Circuit[];
}
