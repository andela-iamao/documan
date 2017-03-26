// import path from 'path';
import bodyParser from 'body-parser';
import routes from './routes/index';

module.exports = (app) => {
  app.set('json spaces', 4);
  app.use(bodyParser.json());
  routes(app);
  return app;
};
