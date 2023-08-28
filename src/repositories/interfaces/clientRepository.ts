import { Client } from '../../entities/client';
import { ClientToAdd, Error } from '../../types';
export interface ClientRepository {
  create: (client: ClientToAdd) => Promise<Client | Error>;
  getOrCreate: (client: ClientToAdd) => Promise<Client | Error>;
}
