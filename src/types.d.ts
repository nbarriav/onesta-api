import { Fruit } from './entities/fruit';

export type Error = {
  message: string;
};

export type FieldToAdd = {
  name: string;
  location: string;
  farmerEmail: string;
};

export type ClientToAdd = {
  name: string;
  lastName: string;
  email: string;
  farmerEmail: string;
};

export type CSVHarvestRow = {
  'Mail Agricultor': string;
  'Nombre Agricultor': string;
  'Apellido Agricultor': string;
  'Mail Cliente': string;
  'Nombre Cliente': string;
  'Apellido Cliente': string;
  'Nombre Campo': string;
  'Ubicación de Campo': string;
  'Fruta Cosechada': string;
  'Variedad Cosechada': string;
};

export type HarvestRow = {
  fruit: Fruit;
  field: Field;
  client: Client;
  farmer: Farmer;
};
