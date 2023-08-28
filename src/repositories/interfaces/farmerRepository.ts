import { Farmer } from '../../entities/farmer';
import { Error } from '../../types';
export interface FarmerRepository {
  create: (fruit: Farmer) => Promise<Farmer | Error>;
  getOrCreate: (fruit: Farmer) => Promise<Farmer | Error>;
}
