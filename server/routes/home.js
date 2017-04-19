import express from 'express';
import home from '../controllers/home';

const router = express.Router();

export default () => {
  router.get('/', home);
  return router;
};
