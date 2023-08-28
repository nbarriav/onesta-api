import { Sequelize } from 'sequelize';

const env = process.env.NODE_ENV || 'development';
const configEnv = require('./config/config.json')[env];
const db = new Sequelize(
  configEnv.database,
  configEnv.username,
  configEnv.password,
  {
    ...configEnv,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
    logging: false,
  }
);

export { Sequelize, db };
