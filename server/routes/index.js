import home from './home';
import user from './user';
import swagger from './swagger';

module.exports = (app) => {
  app.use(home());
  app.use(user());
  app.use(swagger());
};
