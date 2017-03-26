import express from 'express';
import bodyParser from 'body-parser';
import config from './server/config';
import db from './server/db';

let app = express();

const database = db();

app = config(app);

app.set('port', 5000);

app.use(bodyParser.json());

database.sequelize.sync().done(() => {
  app.listen(app.get('port'), () => {
    console.log(`server started on port ${app.get('port')}`);
  });
});

module.exports = app;
