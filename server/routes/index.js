import home from './home';
import user from './user';
import document from './document';
import search from './search';
import swagger from './swagger';

module.exports = (app) => {
  app.use(swagger());
  app.use(home());
  app.use(user());
  app.use(document());
  app.use(search());
};
