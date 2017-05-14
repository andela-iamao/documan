import express from 'express';
import SearchControllers from '../controllers/SearchControllers';
import { isAdmin } from '../middlewares/checkRoles';
import { verifyToken, isBlacklist } from '../middlewares/authenticate';

const router = express.Router();

export default () => {
  router.get('/api/v1/search/documents',
    verifyToken,
    isBlacklist,
    isAdmin,
    SearchControllers.searchDoc);
  router.get('/api/v1/search/users',
    verifyToken,
    isBlacklist,
    isAdmin,
    SearchControllers.searchUser);
  return router;
};
