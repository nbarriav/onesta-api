import { Fruit } from '../entities/fruit';
import { FruitRepository } from './interfaces/fruitRepository';
import { default as FruitModel } from '../db/models/fruit';
import { BaseError, ValidationError } from 'sequelize';
import { Error } from '../types';
import { FieldInstance } from '../db/models/field';
import { Field } from '../entities/field';

export class SQLITEFruitRepository implements FruitRepository {
  async create(fruit: Fruit): Promise<Fruit | Error> {
    try {
      const newFruit = await FruitModel.create(fruit);
      return newFruit;
    } catch (err) {
      return this.handleError(err);
    }
  }

  async getOrCreate(fruitAndField: {
    name: string;
    variety: string;
    field: Field;
  }): Promise<Fruit | Error> {
    const { name, variety, field } = fruitAndField;
    const fruit = { name, variety };
    try {
      const [newFruit, created] = await FruitModel.findOrCreate({
        where: { name: fruit.name, variety: fruit.variety },
        defaults: {
          name: fruit.name,
          variety: fruit.variety,
        },
      });
      field.addFruit(newFruit.id!);
      return newFruit;
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
