require('dotenv').config();

const envs = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: process.env.DB_DIALECT
  },
  test: {
    url: process.env.TEST_DATABASE_URL,
    dialect: process.env.DB_DIALECT,
    logging: false
  },
  production: {
    url: process.env.BACKUP_DATABASE,
    dialect: process.env.DB_DIALECT
  }
};


const env = process.env.NODE_ENV || 'development';
module.exports = envs[env];
