import { FieldInstance } from '../../db/models/field';
import { Field } from '../../entities/field';
import { Fruit } from '../../entities/fruit';
import { FruitRepository } from '../../repositories/interfaces/fruitRepository';
import { Error } from '../../types';

export class GetOrCreateFruitUseCase {
  constructor(private fruitRepository: FruitRepository) {}

  async execute(
    fruitAndField: Fruit & { field: Field }
  ): Promise<Fruit | Error> {
    return await this.fruitRepository.getOrCreate(fruitAndField);
  }
}
