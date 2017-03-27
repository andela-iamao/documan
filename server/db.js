import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

require('dotenv').config();

let db = null;

module.exports = () => {
  if (!db) {
    let sequelize = null;
    if (process.env.NODE_ENV === 'development') {
      sequelize = new Sequelize('documan_test', 'postgres', '', {
        host: 'localhost',
        dialect: 'postgres',
        pool: {
          max: 5,
          min: 0,
          idle: 10000
        }
      });
    } else {
      sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        dialectOptions: {
          ssl: true
        }
      });
    }
    sequelize
      .authenticate()
      .then(() => {
        /* eslint-disable */
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
        /* eslint-disable */
        console.log('Unable to connect to the database:', err);
      });

    db = {
      sequelize,
      Sequelize,
      models: {}
    };

    const dirs = path.join(__dirname, 'models');
    fs.readdirSync(dirs).forEach((file) => {
      const modelDir = path.join(dirs, file);
      const model = sequelize.import(modelDir);
      db.models[model.name] = model;
    });
  }
  return db;
};
