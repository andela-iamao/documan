import bodyParser from 'body-parser';
import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import routes from './routes/index';

module.exports = (app) => {
  app.set('json spaces', 4);
  app.use(express.static('server/public/docs'));
  app.use(bodyParser.json());
  routes(app);
  app.use(express.static('server/public/docs'));
  return app;
};
