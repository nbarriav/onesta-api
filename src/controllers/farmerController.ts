import { Request, Response } from 'express';
import { SQLITEFarmerRepository } from '../repositories/SQLiteFarmerRepository';
import { Farmer } from '../entities/farmer';
import { AddFarmertUseCase } from '../useCases/Farmer/addFarmer';

export class FarmerController {
  async addFromHttp(req: Request, res: Response) {
    const { name, lastName, email } = req.body;
    const farmer: Farmer = {
      name,
      lastName,
      email,
    };
    if (name === undefined || lastName === undefined || email === undefined) {
      res.status(400).send({ error: 'Missing name, last name or email' });
      return;
    }
    const repository = new SQLITEFarmerRepository();
    const addUseCase = new AddFarmertUseCase(repository);
    const newFarmer = await addUseCase.execute(farmer);
    res.send({ farmer: newFarmer });
  }
}
