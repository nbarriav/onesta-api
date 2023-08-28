import { Request, Response } from 'express';
import { SQLITEClientRepository } from '../repositories/SQLiteClientRepository';
import { ClientToAdd } from '../types';
import { AddClienttUseCase } from '../useCases/Client/addClient';

export class ClientController {
  async addFromHttp(req: Request, res: Response) {
    const { name, lastName, email, farmerEmail } = req.body;
    const client: ClientToAdd = {
      name,
      lastName,
      email,
      farmerEmail,
    };
    if (
      name === undefined ||
      lastName === undefined ||
      email === undefined ||
      farmerEmail === undefined
    ) {
      res
        .status(400)
        .send({ error: 'Missing name, last name, email or farmerEmail' });
      return;
    }
    const repository = new SQLITEClientRepository();
    const addUseCase = new AddClienttUseCase(repository);
    const newClient = await addUseCase.execute(client);
    res.send({ client: newClient });
  }
}
