import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
} from 'sequelize';

import { db } from '..';
class FruitInstance extends Model<
  InferAttributes<FruitInstance>,
  InferCreationAttributes<FruitInstance>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare variety: string;
}

const Fruit = db.define<FruitInstance>(
  'Fruits',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    variety: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['name', 'variety'],
      },
    ],
  }
);

export default Fruit;
