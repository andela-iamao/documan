// import path from 'path';
import routes from './routes';
// import bodyParser from 'body-parser';

module.exports = (app) => {
  routes(app);
  // app.use(path);
  // app.use(bodyParser);
  return app;
};
