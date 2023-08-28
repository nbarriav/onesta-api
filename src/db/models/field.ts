import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  BelongsToManyAddAssociationMixin,
} from 'sequelize';
import Fruit from './fruit';
import { db } from '..';

export class FieldInstance extends Model<
  InferAttributes<FieldInstance>,
  InferCreationAttributes<FieldInstance>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare location: string;
  declare farmerId: number;

  declare addFruit: BelongsToManyAddAssociationMixin<typeof Fruit, number>;
}

const Field = db.define<FieldInstance>(
  'Fields',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    farmerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Farmers',
        key: 'id',
      },
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['name', 'location'],
      },
    ],
  }
);

Fruit.belongsToMany(Field, { through: 'FieldFruit' });
Field.belongsToMany(Fruit, { through: 'FieldFruit' });

export default Field;
