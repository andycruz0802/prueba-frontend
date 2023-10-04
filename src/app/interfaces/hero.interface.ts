import { StrongPoint } from '../shared/services/heroes/heroes.service';

export interface Hero {
  id: number;
  name: string;
  age: number;
  strong_point?: StrongPoint;
}
