/* eslint-disable */
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import config from '../config/config';
/* eslint-enable */

const basename = path.basename(module.filename);
const db = {};
const sequelize = new Sequelize(config.url, config);

// let sequelize = null;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env.NODE_ENV[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

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
