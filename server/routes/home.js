import express from 'express';
import path from 'path';

const router = express.Router();

module.exports = () => {
  router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/docs', 'index.html'));
  });
  return router;
};
