import { Farmer } from '../entities/farmer';
import { FarmerRepository } from './interfaces/farmerRepository';
import { default as FarmerModel } from '../db/models/farmer';
import { BaseError, ValidationError } from 'sequelize';
import { Error } from '../types';

export class SQLITEFarmerRepository implements FarmerRepository {
  async create(farmer: Farmer): Promise<Farmer | Error> {
    try {
      const newFarmer = await FarmerModel.create(farmer);
      return newFarmer;
    } catch (err) {
      return this.handleError(err);
    }
  }

  async getOrCreate(farmer: Farmer): Promise<Farmer | Error> {
    try {
      const [newFarmer, _] = await FarmerModel.findOrCreate({
        where: { email: farmer.email },
        defaults: farmer,
      });
      return newFarmer;
    } catch (err) {
      return this.handleError(err);
    }
  }

  private handleError(err: any): Error {
    if (err instanceof ValidationError) {
      return { message: err.message + ' ' + err.errors[0]?.message };
    } else if (err instanceof BaseError) {
      return { message: err.message };
    }
    return { message: 'Unknown error' };
  }
}
