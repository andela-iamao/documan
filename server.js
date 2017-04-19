/* eslint-disable */
import express from 'express';
import bodyParser from 'body-parser';
import config from './server/config';
import db from './server/models/index';
/* eslint-enable */

require('dotenv').config();

let app = express();

app = config(app);

if (process.env.NODE_ENV !== 'test') {
  db.sequelize.sync().done(() => {
    app.listen(process.env.PORT, () => {
      /* eslint-disable */
      console.log(`server started on port ${process.env.PORT}`);
      /* eslint-enable */
    });
  });
}

module.exports = app;
