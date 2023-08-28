export interface Field {
  id?: number;
  name: string;
  location: string;
  farmerId: number;

  addFruit(fruitId: number): void;
}
