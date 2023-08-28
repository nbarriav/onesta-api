import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import { db } from '..';
import Field from './field';
export class FarmerInstance extends Model<
  InferAttributes<FarmerInstance>,
  InferCreationAttributes<FarmerInstance>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare lastName: string;
  declare email: string;

  declare addField: (fieldId: number) => Promise<void>;
  declare addClient: (clientId: number) => Promise<void>;
}

const Farmer = db.define<FarmerInstance>('Farmers', {
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

Farmer.hasMany(Field, {
  foreignKey: 'farmerId',
  as: 'fields',
});

Field.belongsTo(Farmer, {
  foreignKey: {
    name: 'farmerId',
    allowNull: false,
  },
  as: 'farmer',
});

export default Farmer;
