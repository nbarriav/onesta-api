import { Field } from '../../entities/field';
import { FieldRepository } from '../../repositories/interfaces/fieldRepository';
import { Error, FieldToAdd } from '../../types';

export class GetOrCreateFieldUseCase {
  constructor(private fieldRepository: FieldRepository) {}

  async execute(field: FieldToAdd): Promise<Field | Error> {
    return await this.fieldRepository.getOrCreate(field);
  }
}
