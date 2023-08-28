import { Farmer } from '../../entities/farmer';
import { FarmerRepository } from '../../repositories/interfaces/farmerRepository';
import { Error } from '../../types';

export class AddFarmertUseCase {
  constructor(private farmerRepository: FarmerRepository) {}

  async execute(farmer: Farmer): Promise<Farmer | Error> {
    return await this.farmerRepository.create(farmer);
  }
}
