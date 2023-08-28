import { Fruit } from '../../entities/fruit';
import { Error } from '../../types';
import { Field } from '../../entities/field';
export interface FruitRepository {
  create: (fruit: Fruit) => Promise<Fruit | Error>;
  getOrCreate: (fruitAndField: {
    name: string;
    variety: string;
    field: Field;
  }) => Promise<Fruit | Error>;
}
