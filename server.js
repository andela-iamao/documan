/* eslint-disable */
import express from 'express';
/* eslint-disable */
import bodyParser from 'body-parser';
/* eslint-disable */
import config from './server/config';
/* eslint-disable */
import db from './server/db';

require('dotenv').config();

let app = express();

const database = db();

app = config(app);

app.use(bodyParser.json());
if (process.env.NODE_ENV !== 'test') {
  database.sequelize.sync().done(() => {
    app.listen(process.env.PORT, () => {
      /* eslint-disable */
      console.log(`server started on port ${process.env.PORT}`);
    });
  });
}

module.exports = app;
