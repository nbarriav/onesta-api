import { HarvestRow } from '../../types';
import { Error } from '../../types';
export interface HarvestRepository {
  add: (harvest: HarvestRow) => Promise<HarvestRow | Error>;
  addMany: (harvests: HarvestRow[]) => Promise<(HarvestRow | Error)[]>;
  
}
