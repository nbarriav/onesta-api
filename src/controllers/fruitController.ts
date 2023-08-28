import { Request, Response } from 'express';
import { AddFruitUseCase } from '../useCases/Fruit/addFruit';
import { SQLITEFruitRepository } from '../repositories/SQLiteFruitRepository';
import { Fruit } from '../entities/fruit';
export class FruitController {
  async addFromHttp(req: Request, res: Response) {
    const { name, variety } = req.body;
    const fruit: Fruit = {
      name,
      variety,
    };
    if (name === undefined || variety === undefined) {
      res.status(400).send({ error: 'Missing name or variety' });
      return;
    }
    const repository = new SQLITEFruitRepository();
    const addUseCase = new AddFruitUseCase(repository);
    const newFruit = await addUseCase.execute(fruit);
    res.send({ fruit: newFruit });
  }
}
