import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import { db } from '..';
import Farmer from './farmer';
import { BelongsToManyAddAssociationMixin } from 'sequelize';

class ClientInstance extends Model<
  InferAttributes<ClientInstance>,
  InferCreationAttributes<ClientInstance>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare lastName: string;
  declare email: string;

  declare addFarmer: BelongsToManyAddAssociationMixin<typeof Farmer, number>;
}

const Client = db.define<ClientInstance>('Clients', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
});

Client.belongsToMany(Farmer, { through: 'ClientFarmer' });
Farmer.belongsToMany(Client, { through: 'ClientFarmer' });

export default Client;
