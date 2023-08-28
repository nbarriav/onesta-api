import { Field } from '../entities/field';
import { FieldRepository } from './interfaces/fieldRepository';
import { default as FieldModel } from '../db/models/field';
import { BaseError, ValidationError } from 'sequelize';
import { Error, FieldToAdd } from '../types';
import { FarmerInstance, default as FarmerModel } from '../db/models/farmer';
export class SQLITEFieldRepository implements FieldRepository {
  async create(fieldtoAdd: FieldToAdd): Promise<Field | Error> {
    try {
      const farmer = await this.getFarmer(fieldtoAdd.farmerEmail);
      if (!farmer) {
        return { message: 'Farmer not found' };
      }
      const field = {
        name: fieldtoAdd.name,
        location: fieldtoAdd.location,
        farmerId: farmer.id,
      };
      const newField = await FieldModel.create(field);
      return newField;
    } catch (err) {
      console.log(err);
      return this.handleError(err);
    }
  }

  async getOrCreate(fieldtoAdd: FieldToAdd): Promise<Field | Error> {
    try {
      const farmer = await this.getFarmer(fieldtoAdd.farmerEmail);
      if (!farmer) {
        return { message: 'Farmer not found' };
      }
      const [newField, created] = await FieldModel.findOrCreate({
        where: { name: fieldtoAdd.name, location: fieldtoAdd.location },
        defaults: {
          name: fieldtoAdd.name,
          location: fieldtoAdd.location,
          farmerId: farmer.id!,
        },
      });
      if (created) {
        await farmer.addField(newField.id!);
      }
      return newField;
    } catch (err) {
      console.log(err);
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

  private getFarmer(farmerEmail: string): Promise<FarmerInstance | null> {
    return new Promise((resolve, reject) => {
      FarmerModel.findOne({ where: { email: farmerEmail } })
        .then((farmer) => {
          if (farmer) {
            resolve(farmer);
          } else {
            resolve(null);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
