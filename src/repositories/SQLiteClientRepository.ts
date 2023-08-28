import { Client } from '../entities/client';
import { ClientRepository } from './interfaces/clientRepository';
import { default as ClientModel } from '../db/models/client';
import { default as FarmerModel } from '../db/models/farmer';
import { BaseError, ValidationError } from 'sequelize';
import { ClientToAdd, Error } from '../types';

export class SQLITEClientRepository implements ClientRepository {
  async create(client: ClientToAdd): Promise<Client | Error> {
    try {
      const farmerId = await this.getFarmerId(client.farmerEmail);
      if (!farmerId) {
        return { message: 'Farmer not found' };
      }
      const newClientData = {
        name: client.name,
        lastName: client.lastName,
        email: client.email,
      };
      const newClient = await ClientModel.create(newClientData);
      await newClient.addFarmer(farmerId);
      return newClient;
    } catch (err) {
      return this.handleError(err);
    }
  }

  async getOrCreate(client: ClientToAdd): Promise<Client | Error> {
    try {
      const farmer = await FarmerModel.findOne({
        where: { email: client.farmerEmail },
      });
      if (!farmer) {
        return { message: 'Farmer not found' };
      }
      const [newClient, created] = await ClientModel.findOrCreate({
        where: { email: client.email },
        defaults: {
          name: client.name,
          lastName: client.lastName,
          email: client.email,
        },
      });
      if (created) {
        await newClient.addFarmer(farmer.id);
      }
      return newClient;
    } catch (err) {
      return this.handleError(err);
    }
  }
  private getFarmerId(farmerEmail: string): Promise<number | null> {
    return new Promise((resolve, reject) => {
      FarmerModel.findOne({ where: { email: farmerEmail } })
        .then((farmer) => {
          if (farmer) {
            resolve(farmer.id);
          } else {
            resolve(null);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  private handleError(err: any): Error {
    if (err instanceof ValidationError) {
      return { message: err.message + ' ' + err.errors[0]?.message };
    } else if (err instanceof BaseError) {
      return { message: err.message };
    }
    console.log(err);
    return { message: 'Unknown error' };
  }
}
