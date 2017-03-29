import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

require('dotenv').config();

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../config/config.json`)[env];
const db = {};

let sequelize = null;
if (process.env.DATABASE_URL) {
  console.log('running dequelize on production');
  sequelize = new Sequelize('postgres://pxisbnzbniigwu:c0044e5c83851252180bc5c32de917282fda05809c1b478356b0ca31ff9d93db@ec2-107-22-223-6.compute-1.amazonaws.com:5432/d3gk5ajj3np9u5', {
    dialectOptions: {
      ssl: true
    }
  });
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize
  .authenticate()
  .then(() => {
    //
  })
  .catch(() => {
    // Do this if errors occured while initializing databse
  });

fs
   .readdirSync(__dirname)
   .filter(file =>
     (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
   )
   .forEach((file) => {
     const model = sequelize.import(path.join(__dirname, file));
     db[model.name] = model;
   });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
