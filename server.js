import express from 'express';
import bodyParser from 'body-parser';
import config from './server/config';
import db from './server/db';

require('dotenv').config();

let app = express();

const database = db();

app = config(app);

app.use(bodyParser.json());

database.sequelize.sync().done(() => {
  app.listen(process.env.PORT, () => {
    console.log(`server started on port ${process.env.PORT}`);
  });
});

module.exports = app;
