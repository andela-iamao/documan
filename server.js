/* eslint-disable */
import express from 'express';
import config from './server/config';

require('dotenv').config();

import db from './server/models/index';
/* eslint-enable */

let app = express();

app = config(app);

// app.use(express.static('server/public'));

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
