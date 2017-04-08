import express from 'express';
import { create } from '../controllers/document';

const router = express.Router();

export default () => {
  router.post('/api/v1/documents', create);
  return router;
};
