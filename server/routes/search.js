import express from 'express';
import { searchDoc, searchUser } from '../controllers/search';
import auth from '../config/auth';
import { isAdmin } from '../helpers/helper';

const router = express.Router();

export default () => {
  router.get('/api/v1/search/documents', auth, isAdmin, searchDoc);
  router.get('/api/v1/search/users', auth, isAdmin, searchUser);
  return router;
};
