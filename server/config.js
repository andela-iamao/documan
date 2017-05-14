import bodyParser from 'body-parser';
import express from 'express';
import routes from './routes/index';

module.exports = (app) => {
  app.set('json spaces', 4);
  app.use(express.static('server/public/docs'));
  app.use(bodyParser.json());
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
  routes(app);
  app.use(express.static('server/public/docs'));
  return app;
};
