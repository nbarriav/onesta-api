import { Request, Response } from 'express';
import { SQLITEFieldRepository } from '../repositories/SQLiteFieldRepository';
import { Field } from '../entities/field';
import { AddFieldUseCase } from '../useCases/Field/addField';

export class FieldController {
  async addFromHttp(req: Request, res: Response) {
    const { name, location, farmerEmail } = req.body;
    const fieldToAdd = {
      name,
      location,
      farmerEmail,
    };
    if (
      name === undefined ||
      location === undefined ||
      farmerEmail === undefined
    ) {
      res.status(400).send({ error: 'Missing name, location or farmer email' });
      return;
    }
    const repository = new SQLITEFieldRepository();
    const addUseCase = new AddFieldUseCase(repository);
    const newField = await addUseCase.execute(fieldToAdd);
    res.send({ field: newField });
  }
}
