export interface ICars {
  carsNs: number[];
  carsEw: number[];
}

export type TActiveRoad = 'NorthSouth' | 'EastWest';

export interface TCarsToActiveRoad {
  carsNs: 'NorthSouth';
  carsEw: 'EastWest';
}
