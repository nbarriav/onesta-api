import { Field } from '../../entities/field';
import { Error, FieldToAdd } from '../../types';
export interface FieldRepository {
  create: (field: FieldToAdd) => Promise<Field | Error>;
  getOrCreate: (field: FieldToAdd) => Promise<Field | Error>;
}
