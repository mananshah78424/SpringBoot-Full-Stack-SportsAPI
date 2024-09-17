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
  race_distance: string;
  capacity: number | null;
  lap_record: LapRecord;
}

export interface LapRecord {
  time: string;
  driver: string;
  year: string;
}

export interface MainCircuitResponse {
  get: string;
  parameters: any[];
  errors: any[];
  results: number;
  response: Circuit[];
}
