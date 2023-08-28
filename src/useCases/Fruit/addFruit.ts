import { Fruit } from '../../entities/fruit';
import { FruitRepository } from '../../repositories/interfaces/fruitRepository';
import { Error } from '../../types';
export class AddFruitUseCase {
  constructor(private fruitRepository: FruitRepository) {}

  async execute(fruit: Fruit): Promise<Fruit | Error> {
    return await this.fruitRepository.create(fruit);
  }
}
