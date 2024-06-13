export interface ICoordinates {
  x: number;
  y: number;
}

export interface IComment {
  text: string;
  coordinates: ICoordinates;
}
