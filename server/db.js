import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

let db = null;

module.exports = () => {
  if (!db) {
    const sequelize = new Sequelize('documan_test', 'postgres', '', {
      host: 'localhost',
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        idle: 10000
      }
    });

    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');
      })
      .catch((err) => {
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
