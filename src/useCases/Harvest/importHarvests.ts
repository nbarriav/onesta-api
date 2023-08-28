import { HarvestRow } from '../../types';
import { HarvestRepository } from '../../repositories/interfaces/harvestRepository';
import { Error } from '../../types';
export class ImportHarvestsUseCase {
  constructor(private harvestRepository: HarvestRepository) {}

  async execute(harvests: HarvestRow[]): Promise<(HarvestRow | Error)[]> {
    return await this.harvestRepository.addMany(harvests);
  }
}
