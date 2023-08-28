import { HarvestRepository } from './interfaces/harvestRepository';
import { HarvestRow, Error } from '../types';
import { SQLITEClientRepository } from './SQLiteClientRepository';
import { SQLITEFieldRepository } from './SQLiteFieldRepository';
import { SQLITEFruitRepository } from './SQLiteFruitRepository';
import { SQLITEFarmerRepository } from './SQLiteFarmerRepository';
import { GetOrCreateClientUseCase } from '../useCases/Client/getOrCreate';
import { GetOrCreateFarmerUseCase } from '../useCases/Farmer/getOrCreate';
import { GetOrCreateFruitUseCase } from '../useCases/Fruit/getOrCreate';
import { GetOrCreateFieldUseCase } from '../useCases/Field/getOrCreate';
import { Farmer } from '../entities/farmer';
import { Fruit } from '../entities/fruit';
import { Field } from '../entities/field';
import { FieldInstance } from '../db/models/field';

export class CSVHarvestRepository implements HarvestRepository {
  async add(harvest: HarvestRow): Promise<HarvestRow | Error> {
    const { valid, message } = this.validateRow(harvest);
    if (!valid && message) {
      return { message };
    }
    const { client, farmer, field, fruit } = harvest;
    try {
      const addedFarmer = (await this.addEntity(
        farmer,
        SQLITEFarmerRepository,
        GetOrCreateFarmerUseCase
      )) as Farmer;
      const addedField = (await this.addEntity(
        { ...field, farmerEmail: addedFarmer.email },
        SQLITEFieldRepository,
        GetOrCreateFieldUseCase
      )) as Field;
      await this.addEntity<
        Fruit,
        Fruit & { field: Field },
        typeof SQLITEFruitRepository,
        typeof GetOrCreateFruitUseCase
      >(
        { ...fruit, field: addedField },
        SQLITEFruitRepository,
        GetOrCreateFruitUseCase
      );
      await this.addEntity(
        { ...client, farmerEmail: addedFarmer.email },
        SQLITEClientRepository,
        GetOrCreateClientUseCase
      );
    } catch (error) {
      console.log(error);
      return { message: 'Row cannot be added' };
    }

    return harvest;
  }

  async addMany(harvests: HarvestRow[]): Promise<(HarvestRow | Error)[]> {
    const results: (HarvestRow | Error)[] = [];
    for (const harvest of harvests) {
      const toPush = await this.add(harvest);
      results.push(toPush);
    }
    return results;
  }

  private validateRow(row: HarvestRow): { valid: boolean; message?: string } {
    for (const key in row) {
      if (row[key as keyof HarvestRow]) {
        for (const key2 in row[key as keyof HarvestRow]) {
          if (
            !row[key as keyof HarvestRow][key2 as keyof HarvestRow] ||
            row[key as keyof HarvestRow][key2 as keyof HarvestRow].trim() === ''
          ) {
            return { valid: false, message: 'Missing ' + key2 };
          }
        }
      }
    }
    return { valid: true };
  }

  private addEntity<
    T,
    M extends T,
    R extends new () => InstanceType<R>,
    U extends new (repo: InstanceType<R>) => {
      execute: (data: M) => Promise<T | Error>;
    }
  >(data: M, repo: R, useCase: U): Promise<Error | T> {
    const repository = new repo();
    const useCaseInstance = new useCase(repository);
    return useCaseInstance.execute(data);
  }
}
