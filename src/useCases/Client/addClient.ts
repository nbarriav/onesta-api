import { Client } from '../../entities/client';
import { ClientRepository } from '../../repositories/interfaces/clientRepository';
import { ClientToAdd, Error } from '../../types';

export class AddClienttUseCase {
  constructor(private ClientRepository: ClientRepository) {}

  async execute(client: ClientToAdd): Promise<Client | Error> {
    return await this.ClientRepository.create(client);
  }
}
